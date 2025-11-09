import logger from '../config/logger.js';

const loggerMiddleware = (req, res, next) => {
    const startTime = Date.now();
    
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        const logData = {
            method: req.method,
            url: req.originalUrl || req.url,
            status: res.statusCode,
            duration: `${duration}ms`,
            ip: req.ip || req.connection.remoteAddress,
            userAgent: req.get('user-agent') || ''
        };

        const message = `${req.method} ${req.originalUrl || req.url} ${res.statusCode} - ${duration}ms`;

        if (res.statusCode >= 500) {
            logger.error(message, logData);
        } else if (res.statusCode >= 400) {
            logger.warn(message, logData);
        } else {
            logger.info(message, logData);
        }
    });

    next();
};

export default loggerMiddleware;

