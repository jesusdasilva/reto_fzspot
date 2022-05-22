import app from "./app.js";
import mongoose from "mongoose";
import { connDB } from "./database.js";
import { config } from "./config.js";

// Connect to DataBase
connDB();

// START SERVER
mongoose.connection.once('open',() => {
    console.log('Connected to MongoDB');

    app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}`));
  })