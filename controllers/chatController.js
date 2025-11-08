import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Use a supported model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

const chatController = {
  chatRes: async (req, res) => {
    const { message } = req.body;

    try {
      const result = await model.generateContent(message);
      const response = result.response;
      const reply = response.text();

      res.json({ reply });
    } catch (error) {
      console.error("Gemini API Error:", error.message || error);
      res.status(500).json({ error: "Failed to get response from Gemini API" });
    }
  },
};

export default chatController;
   