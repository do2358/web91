import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './src/config/database.js';
import routes from './src/routes/index.js';
import errorHandler from './src/middleware/errorHandler.js';
import loggerMiddleware from './src/middleware/logger.js';
import logger from './src/config/logger.js';

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(loggerMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Health check
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'API is running'
    });
});

app.use('/api', routes);

app.use(errorHandler);

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});