import jwt from 'jsonwebtoken';
import logger from '../config/logger.js';

export const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || 'your_jwt_secret_key'
        );

        req.userId = decoded.id;
        next();
    } catch (error) {
        logger.error(`Auth error: ${error.message}`);
        return res.status(401).json({
            success: false,
            message: 'Invalid token',
            error: error.message
        });
    }
};

export const optionalAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (token) {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET || 'your_jwt_secret_key'
            );
            req.userId = decoded.id;
        }
        next();
    } catch (error) {
        // Continue without authentication
        next();
    }
};
