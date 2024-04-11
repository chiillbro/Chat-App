import express from "express";
import checkLogin from "../middlewares/checkLogin.js";
import { getUsers } from "../controllers/userController.js";

const router = express.Router();

router.get("/", checkLogin, getUsers);
export default router;
