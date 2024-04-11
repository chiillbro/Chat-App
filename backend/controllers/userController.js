import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );

    res.status(200).json(allUsers);
  } catch (error) {
    console.log("error in userController", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
