import express, { json } from "express";
import cors from "cors";
import route from "./route.js";
import { responseFormat, errorHandler } from "./middleware.js";

// APP
const app = express();

// Middlewares
app.use(json());
app.use(cors());

// Routes
app.use("/api", route, responseFormat);

// Middleware error handler
app.use(errorHandler);

export default app;