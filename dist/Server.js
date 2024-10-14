// Package Import
import express from "express";
import cors from "cors";
import { returnError } from "./src/exception/errorHandler.js";
import fs from "fs";
import connectDB from "./config/db.js";
// Middleware Imports
import { postTrimmer } from "./src/middleware/trimmer.js";
// Importing Routes
import indexRoute from "./src/routes/indexRoute.js";
fs.existsSync(process.cwd() + "/uploads") ||
    fs.mkdirSync(process.cwd() + "/uploads");
// Start Server
const app = express();
// Connect Database
connectDB();
// Adding CORS Middleware
app.use(cors());
// Parsing Body
app.use(express.json());
app.use(express.urlencoded());
// Trimming Post Requests
app.use(postTrimmer);
// Define Routes
app.use("/api", indexRoute);
app.get("/", (req, res) => {
    res.send("API Running");
});
// Handiling Invalid Url
app.use((req, res, next) => {
    res.status(404).json({ errors: [{ msg: "Invalid Url" }] });
});
// Error Handler
app.use(returnError);
// Webserver Port
const port = parseInt(process.env.SERVER_PORT || "5000", 10);
app.listen(port, "0.0.0.0", () => {
    console.log(`App is running on port ${port}`);
});
