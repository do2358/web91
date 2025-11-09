import logger from '../config/logger.js';

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    logger.error(`Error: ${err.message}`, {
        method: req.method,
        url: req.originalUrl || req.url,
        status: statusCode,
        stack: err.stack,
        ip: req.ip || req.connection.remoteAddress
    });

    res.status(statusCode);
    res.json({
        success: false,
        error: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};

export default errorHandler;

