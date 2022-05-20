import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import route from "./route.js";
import { responseFormat, errorHandler } from "./middleware.js";
import { connDB } from "./database.js";
import { config, HTTP_STATUS_CODES, MESSAGE  } from "./config.js";

// APP
const app = express();

// Middlewares
app.use(json());
app.use(cors());

// Routes
app.get("/", (req, res) => { res.status(HTTP_STATUS_CODES.OK).json({ message: MESSAGE.HOLA }); });
app.use("/api", route, responseFormat);

// Middleware error handler
app.use(errorHandler);

// Connect to database
connDB();

// START SERVER
mongoose.connection.once('open',() => {
  
  console.log('Connected to MongoDB');
  app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}`));
  
})
