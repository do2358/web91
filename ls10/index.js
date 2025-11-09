import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './src/config/database.js';
import routes from './src/routes/index.js';
import errorHandler from './src/middleware/errorHandler.js';
// import loggerMiddleware from './src/middleware/logger.js';
import logger from './src/config/logger.js';
// import bodyParser from 'body-parser';

console.log('0')

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

console.log('1')

// app.use(loggerMiddleware);
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({extended: true}))


console.log('1')

// Health check
app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'API is running'
    });
});


console.log('3')

app.use('/api', routes);

console.log('4')


app.use(errorHandler);

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});