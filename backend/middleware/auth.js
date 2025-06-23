import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js'; 
const authUser = async (req, res, next) => {
  const token = req.headers.token; 
  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized. Please log in again." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.id }; // ✅ Safer to overwrite whole user object
    const user = await userModel.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }


    next();
  } catch (error) {
    console.error("❌ Authentication error:", error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authUser;
