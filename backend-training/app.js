import express from "express";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import logger from "./middlewares/logger.js";

const app = express();

app.use(cookieParser());
app.use(logger);
//thay parseBody
app.use(express.json());

//rotes
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

//error handler
app.use(errorHandler);

export default app;
