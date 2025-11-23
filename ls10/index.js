import dotenv from "dotenv";
dotenv.config();

import express from "express";
import swaggerUi from "swagger-ui-express";
import connectDB from "./src/config/database.js";
import { specs } from "./src/config/swagger.js";
import routes from "./src/routes/index.js";
import errorHandler from "./src/middleware/errorHandler.js";
// import loggerMiddleware from './src/middleware/logger.js';
import logger from "./src/config/logger.js";
// import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors())

// app.use(loggerMiddleware);
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({extended: true}))

// Health check
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "API is running",
  });
});

app.use("/api", routes);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
