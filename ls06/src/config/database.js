import mongoose from 'mongoose';
import logger from './logger.js';

const connectDB = async () => {
    try {
        logger.info(`Starting MongoDB connection... ${process.env.MONGODB_URI}`);
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/web91');
        logger.info(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        logger.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;

