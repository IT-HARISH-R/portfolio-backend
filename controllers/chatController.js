import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { GEMINI_API_KEY } from "../utlis/config.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY); 

const chatController = {
    chatRes: async (req, res) => {
        console.log("1")
        try {
            const { message } = req.body;
            console.log(message)
            console.log("2")

            if (!message || typeof message !== "string") {
                return res.status(400).json({ error: "Invalid or missing message in request." });
            }

            console.log("3")
            let userMessage = message.trim().toLowerCase();
            let aiResponse = "";

            console.log("4")
            // Custom greetings
            if (["hi", "hello"].includes(userMessage)) {
                userMessage = "I'm your communication trainer. Are you ready to begin? Say 'Hi' or 'Hello'.";
            }

            console.log("5")
            // Initialize Gemini Model
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

            // Retry Logic: 3 attempts max
            let retries = 3;
            let delay = 3000; // Initial delay = 3 seconds

            console.log("6")
            for (let i = 0; i < retries; i++) {
                try {
                    console.log("6.2")
                    const result = await model.generateContent([message]);
                    console.log("6.3")
                    console.log(result.response.text())
                    aiResponse = await result.response.text();
                    break; // Success, exit retry loop
                } catch (error) {
                    const status = error?.status || error?.code;

                    if (status === 429) {
                        console.warn(`Rate limit exceeded. Retrying in ${delay / 1000} seconds...`);
                        await new Promise((resolve) => setTimeout(resolve, delay));
                        delay *= 2; // Exponential backoff
                    } else if (status === 403 || status === 401) {
                        console.error("Gemini API is not authorized or enabled for this project.");
                        aiResponse = "API access is restricted. Please check your Gemini API settings.";
                        break;
                    } else {
                        console.error("Unexpected Error:", error.message || error);
                        aiResponse = "An error occurred. Please try again later.";
                        break;
                    }
                }
            }
            console.log("7")

            // Final fallback if response is still empty
            if (!aiResponse) {
                aiResponse = "I'm currently unavailable. Please try again later!";
            }

            console.log("8")
            return res.json({ reply: aiResponse });

        } catch (error) {
            console.log("end")
            console.error("Fatal Error:", error);
            res.status(500).json({ error: "Failed to fetch response from Gemini AI" });
        }
    }
};

export default chatController;
