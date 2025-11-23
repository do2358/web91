import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import logger from '../config/logger.js';

const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET || 'your_jwt_secret_key',
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
};

export const register = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username, email, and password are required'
            });
        }

        // if (password !== confirmPassword) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Passwords do not match'
        //     });
        // }

        // Check if user already exists
        let user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
            return res.status(409).json({
                success: false,
                message: 'User with this email or username already exists'
            });
        }

        // Create new user
        user = await User.create({
            username,
            email,
            password
        });

        // Generate token
        const token = generateToken(user._id);

        logger.info(`User registered: ${user.email}`);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            data: user
        });
    } catch (error) {
        logger.error(`Register error: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Error during registration',
            error: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Find user and select password
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check password
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Generate token
        const token = generateToken(user._id);

        logger.info(`User logged in: ${user.email}`);

        // Return user without password
        const userWithoutPassword = user.toJSON();

        res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            token,
            data: userWithoutPassword
        });
    } catch (error) {
        logger.error(`Login error: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Error during login',
            error: error.message
        });
    }
};

