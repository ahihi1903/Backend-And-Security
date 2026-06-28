import express from "express";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
//import logger from "./middlewares/logger.js";
import uploadRoutes from "./routes/uploadRoutes.js";

import morgan from "morgan";
import requestLogger from "./middlewares/requestLogger.js";

const app = express();

app.use(cookieParser());
app.use(requestLogger);
//thay parseBody
app.use(express.json());

app.use(morgan("dev"));

//rotes
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/upload", uploadRoutes);
app.use("/uploads", express.static("uploads"));

//error handler
app.use(errorHandler);

export default app;
