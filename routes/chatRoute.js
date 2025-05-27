import express from "express"
import chatController from "../controllers/chatController.js";

export const chatRoute = express.Router();

chatRoute.post("/ask", chatController.chatRes) 