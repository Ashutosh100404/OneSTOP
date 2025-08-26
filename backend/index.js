import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import CompanyRoute from "./routes/company.route.js";
import cors from "cors";
import userRoute from "./routes/user.route.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

async function startServer() {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to mongoose");

    app.use("/company", CompanyRoute);
    app.use("/user", userRoute);

    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  } catch (error) {
    console.log("Error:", error);
  }
}

startServer();