import User from "../models/User.js";

const authmiddleware = async (req, res, next) => {
  const { userId } = req.auth;
  if (!userId) {
    res.json({ success: false, message: "not authorized" });
  } else {
    const user = await User.findById(userId);
    req.user = user;
    next();
  }
};

export default authmiddleware;
