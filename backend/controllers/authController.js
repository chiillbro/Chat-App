import User from "../models/User.js";

import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const SignUp = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (!fullName || !username || !password || !confirmPassword || !gender) {
      throw new Error("Please fill all the fields");
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json("Username already exists");
    }

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json(newUser);
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error singing up", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser?.password || ""
    );

    if (!existingUser || !isPasswordValid) {
      return res.status(400).json("Invalid username or password");
    }

    generateTokenAndSetCookie(existingUser._id, res);
    res.status(200).json(existingUser);
  } catch (error) {
    console.log("Error singing up", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const LogOut = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(400).json("Logged out successfully!");
  } catch (error) {
    console.log("Error singing up", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
