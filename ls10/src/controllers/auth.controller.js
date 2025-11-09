import User from '../models/user.model.js';

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // const user = await User.create({ username, email, password });

        // hash
        // gen salt
        // hash pw
        // save pw to db
        // return token
        res.status(201).json({
            success: true,
            // data: user,
            message: 'User registered successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

