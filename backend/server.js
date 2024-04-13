import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 5001;

dotenv.config();

// to parse the incoming requests with JSON payloads
app.use(express.json());

app.use("/api/auth", authRoutes);

// app.get("/", (req, res) => {
//     res.send("Hello world!!");
//   });  

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`)});
