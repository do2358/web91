/**
 * @lessons
 * 
1. Viết API việc đăng ký user với userName, id sẽ được là một string ngẫu nhiên, không được phép trùng, bắt đầu từ ký tự US (ví dụ: US8823).
2. Viết API cho phép user tạo bài post (thêm bài post, xử lý id tương tự user).
3. Viết API cho phép user chỉnh sửa lại bài post (chỉ user tạo bài viết mới được phép chỉnh sửa).
4. Viết API cho phép user được comment vào bài post
5. Viết API cho phép user chỉnh sửa comment (chỉ user tạo comment mới được sửa)
6. Viết API lấy tất cả comment của một bài post.
7. Viết API lấy tất cả các bài post, 3 comment đầu (dựa theo index) của tất cả user .
8. Viết API lấy một bài post và tất cả comment của bài post đó thông qua postId

Tất cả các API đều phải được sử dụng với RESTful API.
 */

/**
 * @description
 * use express js, mongodb, mongoose
 * 
 */


import express from 'express';
import mongoose from 'mongoose';
import User from './src/models/user.model.js';
import Post from './src/models/post.model.js';
import Comment from './src/models/coment.model.js';
const app = express();
const port = 3000;

app.use(express.json());

// Init database
console.log('Connecting to MongoDB');
mongoose.connect('mongodb://100.104.82.112:27017/web91?directConnection=true', {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
});


// Add routes here

// API user register
// POST /users/register
// Logic: user input username
// Check username is already exists
// If exists, return error
// If not exists, create new user
// Return success
// Return user data

app.post('/users/register', async (req, res) => {
    const { username } = req.body;
    // validate username is required
    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }
    console.log('username', username);
    const user = await User.findOne({ username: username });
    console.log('user', user);
    if (user) {
        return res.status(400).json({ error: 'Username already exists, please try another username' });
    }

    try {
        // while generate id. if id is already exists, generate new id
        let id = '';
        while (true) {
            id = `US${Math.floor(1000 + Math.random() * 9000)}`;
            const existedUser = await User.findOne({ id });
            if (!existedUser) {
                break;
            }
        }
        console.log("debug: create new user", { id, username });
        const newUser = await User.create({ id, username });
        console.log('newUser', newUser);
        return res.status(200).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// 2. Viết API cho phép user tạo bài post (thêm bài post, xử lý id tương tự user).
// POST /posts/create
// Logic: user input content
// Logic genId:" `POST_userId_username_timestamp`"
// Check content is required
// If not exists, return error
// If exists, create new post
// Return success
// Return post data

app.post('/posts/create', async (req, res) => {
    const { title, content, authorId, description } = req.body;
    // validate title, content, authorId, description is required   
    if (!title || !content || !authorId || !description) {
        return res.status(400).json({ error: 'Title, content, authorId, description are required' });
    }
    // valiet authorId is exists in users collection
    const author = await User.findOne({ id: authorId });
    if (!author) {
        return res.status(400).json({ error: 'AuthorId is not exists' });
    }
    // genereate id: `POST_userId_username_timestamp`
    const id = `POST_${authorId}_${author.username}_${Date.now()}`;
    // save post to database
    const newPost = await Post.create({ id, title, content, authorId, description });
    return res.status(200).json({ message: 'Post created successfully', post: newPost });
    // return post data
})

// 3. Viết API cho phép user chỉnh sửa lại bài post (chỉ user tạo bài viết mới được phép chỉnh sửa).
// PUT /posts/update/:postId
// Logic: validate postId is required
// postId is exists in posts collection
// authorId is the same as the user who created the post
// update post data
// return success
// return post data
app.put('/posts/update/:postId', async (req, res) => {
    const { postId } = req.params;
    const { title, content, description, authorId } = req.body;
    // validate postId is required
    if (!postId) {
        return res.status(400).json({ error: 'PostId is required' });
    }
    const post = await Post.findOne({ id: postId });
    if (!post) {
        return res.status(400).json({ error: 'PostId is not exists' });
    }
    if (post.authorId !== authorId) {
        return res.status(400).json({ error: 'You are not the author of this post' });
    }
    if (title) {
        post.title = title;
    }
    if (content) {
        post.content = content;
    }
    if (description) {
        post.description = description;
    }
    const updatedPost = await Post.findOneAndUpdate({ id: postId }, { title, content, description }, { new: true });
    return res.status(200).json({ message: 'Post updated successfully', post: post });
})

// 4. Viết API cho phép user được comment vào bài post
// POST "posts/:postId/comment"
// Logic: postId is required
// postId is exists in posts collection
// content is required
// authorId is exists in users collection
// save comment to database
// return success
// return comment data

app.post('/posts/:postId/comment', async (req, res) => {
    const { postId } = req.params;
    const { content, authorId } = req.body;
    // validate postId is required
    if (!postId) {
        return res.status(400).json({ error: 'PostId is required' });
    }
    const post = await Post.findOne({ id: postId });
    if (!post) {
        return res.status(400).json({ error: 'PostId is not exists' });
    }
    const author = await User.findOne({ id: authorId });
    if (!author) {
        return res.status(400).json({ error: 'AuthorId is not exists' });
    }
    const comment = await Comment.create({ postId, content, authorId });
    return res.status(200).json({ message: 'Comment created successfully', comment: comment });
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});