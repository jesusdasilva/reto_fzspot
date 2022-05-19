import mongoose from "mongoose";
import { config } from "./config.js";

const connDB = async () => {
  try {
    await mongoose.connect(config.DB_URI);
  } catch (err) {
    console.error(err);
  }
};

export { connDB };
