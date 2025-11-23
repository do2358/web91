import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TeachingX API',
      version: '1.0.0',
      description: 'Express + Mongoose MVC Project API Documentation',
      contact: {
        name: 'API Support',
        email: 'support@teachingx.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Development server',
      },
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'User ID',
            },
            username: {
              type: 'string',
              description: 'Username',
            },
            email: {
              type: 'string',
              description: 'User email',
            },
            avatar: {
              type: 'string',
              description: 'User avatar URL',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Post: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Post ID',
            },
            title: {
              type: 'string',
              description: 'Post title',
            },
            content: {
              type: 'string',
              description: 'Post content',
            },
            author: {
              type: 'string',
              description: 'Author user ID',
            },
            image: {
              type: 'string',
              description: 'Post image URL',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
            },
            message: {
              type: 'string',
            },
            errors: {
              type: 'object',
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Auth',
        description: 'Authentication endpoints',
      },
      {
        name: 'Users',
        description: 'User management endpoints',
      },
      {
        name: 'Posts',
        description: 'Post management endpoints',
      },
      {
        name: 'Upload',
        description: 'File upload endpoints',
      },
    ],
  },
  apis: [
    './src/routes/auth.routes.js',
    './src/routes/user.routes.js',
    './src/routes/post.routes.js',
    './src/routes/upload.routes.js',
  ],
};

export const specs = swaggerJSDoc(options);
