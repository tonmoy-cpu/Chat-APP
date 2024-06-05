import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import OpenAI from "openai";
import openAiRoutes from "./routes/openai.js";
// import geminiAiRoutes from "./routes/gemini.js";
import authRoutes from "./routes/auth.js";
// import { GoogleGenerativeAI } from "@google/generative-ai";
/*CONFIGURATION*/
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}))
app.use(morgan("common"));
app.use(bodyParser.json({ limit:"30mb", extended:"true" }));
app.use(bodyParser.urlencoded({ limit:"30mb", extended: "true" }));
app.use(cors());
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// OPENAI CONFIGURATION
export const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
//   apiKey:"nothing",
	baseURL: " https://api.pawan.krd/gpt-3.5-unfiltered/v1",
//   baseURL:"http://localhost:3040/v1",
  });
//Gemini setup
// export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use("/openai",openAiRoutes);
// app.use("/gemini",geminiAiRoutes);
app.use("/auth",authRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`It is running on Port: ${PORT}`);
});
