import express from "express";
import { getMessages, sendMessage } from "../controllers/messageController.js";
import checkLogin from "../middlewares/checkLogin.js";
const router = express.Router();

router.post("/send/:id", checkLogin, sendMessage);

router.get("/:id", checkLogin, getMessages);

export default router;
