import express from 'express';
import mongoose from 'mongoose';
import UsersModel from './model/users.js';
import PostsModel from './model/posts.js';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
const saltRounds = 10;

const url = "mongodb+srv://vietanhnguyen1050_db_user:qeSBxDLcNmzFl2Ry@testmx.pafudpa.mongodb.net/?appName=TestMX";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(1050, () => {
  console.log('Server is running on port 1050');
});

// B1
app.post('/users/register', async (req, res) => {
    try {
        const body = req.body || {};
        if (!body || Object.keys(body).length === 0) {
            console.warn('Empty request body for /users/register');
            return res.status(400).send({
                message: 'Request body is missing. Ensure Content-Type header is set and a body is sent.',
                data: null,
                success: false
            });
        }

        const email = body.email;
        const rawUserName = body.userName ?? body.username ?? body.name;
        const password = body.password;

        const userName = typeof rawUserName === 'string' ? rawUserName.trim() : rawUserName;

        if (!email || String(email).trim() === '') {
            return res.status(400).send({
                message: 'email is required!',
                data: null,
                success: false
            });
        }
        if (!userName) {
            console.warn('Missing userName field. Received body:', JSON.stringify(body));
            return res.status(400).send({
                message: 'userName is required! (accepted keys: userName, username, name). Ensure it is not empty.',
                data: null,
                success: false
            });
        }
        if (!password || String(password).trim() === '') {
            return res.status(400).send({
                message: 'password is required!',
                data: null,
                success: false
            });
        }
        const existedEmail = await UsersModel.findOne({
            email
        });
        if (existedEmail) {
            return res.status(409).send({
                message: 'Email already exists!',
                data: null,
                success: false
            });
        }
    
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const createdUser = await UsersModel.create({
            email,
            userName,
            password: hashedPassword
        });
        res.status(201).send({
            data: createdUser,
            message: 'Register successful!',
            success: true
        });
    } catch (error) {
        console.error('Unexpected error in /users/register:', error);
        res.status(500).send({
            message: error.message || 'Internal server error',
            error: error.toString(),
            data: null,
            success: false
        });
    }
});

// B2
app.get('/users/login', async (req, res) => {
    try {
        const body = req.body || {};
        if (!body || Object.keys(body).length === 0) {
            console.warn('Empty request body for /users/login');
            return res.status(400).send({
                message: 'Request body is missing. Ensure Content-Type header is set and a body is sent.',
                data: null,
                success: false
            });
        }

        const email = body.email;
        const password = body.password;

        if (!email || String(email).trim() === '') {
            return res.status(400).send({
                message: 'email is required!',
                data: null,
                success: false
            });
        }

        if (!password || String(password).trim() === '') {
            return res.status(400).send({
                message: 'password is required!',
                data: null,
                success: false
            });
        }

        const existingUser = await UsersModel.findOne({ email });
        
        if (!existingUser) {
            return res.status(401).send({
                message: 'Invalid email or password!',
                data: null,
                success: false
            });
        }

        if (!existingUser.password) {
            return res.status(500).send({
                message: 'User password is not set. Please contact support or re-register.',
                data: null,
                success: false
            });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        
        if (!isPasswordValid) {
            return res.status(401).send({
                message: 'Invalid email or password!',
                data: null,
                success: false
            });
        }

        const newApiKey = `mern-$${existingUser._id}$-$${existingUser.email}$-$${generateApiKey()}$`;
        await UsersModel.updateOne(
            { _id: existingUser._id },
            { $set: { apiKey: newApiKey } }
        );

        res.status(200).send({
            message: 'Login successful!',
            data: existingUser,
            newApiKey: newApiKey,
            success: true
        });
    } catch (error) {
        console.error('Unexpected error in /users/login:', error);
        res.status(500).send({
            message: error.message || 'Internal server error',
            error: error.toString(),
            data: null,
            success: false
        });
    }

});

function generateApiKey() {
  const key = crypto.randomUUID();
  return key;
}

// B3
app.post('/posts', async (req, res) => {
  try {
        const body = req.body || {};
        const apiKey = req.query.apiKey;

        if (!apiKey || String(apiKey).trim() === '') {
            return res.status(401).send({
                message: 'apiKey is required!',
                data: null,
                success: false
            });
        }

        const user = await UsersModel.findOne({ apiKey });
        if (!user) {
            return res.status(401).send({
                message: 'Invalid or expired apiKey!',
                data: null,
                success: false
            });
        }

        if (!body || Object.keys(body).length === 0) {
            console.warn('Empty request body for /posts');
            return res.status(400).send({
                message: 'Request body is missing. Ensure Content-Type header is set and a body is sent.',
                data: null,
                success: false
            });
        }

        const content = body.content;

        if (!content || String(content).trim() === '') {
            console.warn('Missing content field. Received body:', JSON.stringify(body));
            return res.status(400).send({
                message: 'content is required!',
                data: null,
                success: false
            });
        }

        const createdPost = await PostsModel.create({
            content,
            userId: user._id,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        
        res.status(201).send({
            data: createdPost,
            message: 'Post created successfully!',
            success: true
        });
    } catch (error) {
        console.error('Unexpected error in /posts:', error);
        res.status(500).send({
            message: error.message || 'Internal server error',
            error: error.toString(),
            data: null,
            success: false
        });
    }
});

// B4
app.put('/posts/:postId', async (req, res) => {
    try {
        const body = req.body || {};
        const apiKey = req.query.apiKey;
        const postId = req.params.postId;

        if (!apiKey || String(apiKey).trim() === '') {
            return res.status(401).send({
                message: 'apiKey is required in query parameters!',
                data: null,
                success: false
            });
        }

        if (!postId || String(postId).trim() === '') {
            return res.status(400).send({
                message: 'postId is required in URL parameters!',
                data: null,
                success: false
            });
        }

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).send({
                message: 'Invalid postId format! Use URL format: PUT /posts/{postId}?apiKey={apiKey}',
                data: null,
                success: false
            });
        }

        const existingPost = await PostsModel.findById(postId);
        if (!existingPost) {
            return res.status(404).send({
                message: 'Post not found!',
                data: null,
                success: false
            });
        }

        const user = await UsersModel.findById(existingPost.userId);
        if (!user) {
            return res.status(404).send({
                message: 'User not found!',
                data: null,
                success: false
            });
        }

        if (user.apiKey !== apiKey) {
            return res.status(403).send({
                message: 'Invalid apiKey! You are not authorized to update this post.',
                data: null,
                success: false
            });
        }

        const content = body.content;
        if (!content || String(content).trim() === '') {
            return res.status(400).send({
                message: 'content is required!',
                data: null,
                success: false
            });
        }

        const updatedPost = await PostsModel.findByIdAndUpdate(
            postId,
            { 
                content,
                updatedAt: new Date()
            },
            { new: true }
        );

        res.status(200).send({
            data: updatedPost,
            message: 'Post updated successfully!',
            success: true
        });
    } catch (error) {
        console.error('Unexpected error in PUT /posts/:postId:', error);
        res.status(500).send({
            message: error.message || 'Internal server error',
            error: error.toString(),
            data: null,
            success: false
        });
    }
});