import express, { json } from "express";
import cors from "cors";
import route from "./route.js";
import { responseFormat, errorHandler } from "./middleware.js";
import { config, HTTP_STATUS_CODES, MESSAGE  } from "./config.js";

// APP
const app = express();

// Middlewares
app.use(json());
app.use(cors());

// Routes
app.get("/", (req, res) => { res.status(HTTP_STATUS_CODES.OK).json({ message: "Hola FzSports!" }); });
app.use("/api", route, responseFormat);

// Middleware error handler
app.use(errorHandler);

export default app;