import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import route from "./route.js";
import { responseFormat, errorHandler } from "./middleware.js";
import { connDB } from "./database.js";
import { config } from "./config.js";

// Connect to database
connDB();

const app = express();

app.use(json());
app.use(cors());
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API",
    status: "OK",
  });
});

app.use("/api", route, responseFormat);

mongoose.connection.once('open',() => {
  
  console.log('Connected to MongoDB');
  app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}`));
  
})
