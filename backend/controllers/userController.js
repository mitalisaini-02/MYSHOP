
import validator from 'validator';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken'; 
import userModel from '../models/userModel.js'; 
import dotenv from 'dotenv';
dotenv.config();
//  console.log("Incoming register body:", req.body);

const createToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET);
};


// GET user profile (for auto-fill)
 const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log("🚀 getUserProfile called for userId:", userId); // Debugging line
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ PUT /update-address
const updateUserAddress = async (req, res) => {
  try {
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({ success: false, message: "Address is required" });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user.userId,
      { address },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "Address updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }
        const token = createToken(user._id);
        res.json({ success: true, token });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const registerUser = async (req, res) => {
     console.log("🚀 registerUser called");
  console.log("📦 req.body = ", req.body); // Debug here

    try {
        const { name, email, password } = req.body;
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });

        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

};

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: "Invalid admin credentials" });
        }
        const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


export { getUserProfile, updateUserAddress, loginUser, registerUser, adminLogin };
