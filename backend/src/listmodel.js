import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const gemini = new GoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function listModels() {
  try {
    const models = await gemini.listModels();
    console.log(models);
  } catch (err) {
    console.error("Error listing models:", err);
  }
}

listModels();
