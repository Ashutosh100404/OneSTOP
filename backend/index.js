// index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import CompanyRoute from "./routes/company.route.js";
import cors from "cors";
import userRoute from "./routes/user.route.js";
import serverless from "serverless-http";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const URI = process.env.MongoDBURI;

// Connect to MongoDB (connect once on cold start)
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  isConnected = true;
  console.log("Connected to MongoDB");
}

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.use("/company", CompanyRoute);
app.use("/user", userRoute);

// No app.listen() here!
// Export handler for Vercel
export default app;
