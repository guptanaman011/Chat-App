import User from "../models/user.model.js";

async function getUsersForSideBar(req, res) {
  try {
    const loogedInUser = req.user._id;

    const filteredUsers = await User.find({ _id: { $ne: loogedInUser } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (err) {
    console.log("Error in getUserForSideBar function ", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export { getUsersForSideBar };
