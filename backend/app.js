import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import path from "path";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import connectDB from "./db/connectDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.send("Hello My backend server");
// });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => console.log(`Server listening to ${PORT}`));
