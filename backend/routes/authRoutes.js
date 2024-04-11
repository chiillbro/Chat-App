import express from "express";
import { Login, LogOut, SignUp } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", SignUp);

router.post("/login", Login);

router.post("/logout", LogOut);

export default router;
