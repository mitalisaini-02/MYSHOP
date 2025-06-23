import express from 'express';
import { loginUser, registerUser, adminLogin } from '../controllers/userController.js';
import authUser from '../middleware/auth.js';
import {
  getUserProfile,
  updateUserAddress
} from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);
userRouter.post('/adminlogin', adminLogin);

// ✅ Secured profile routes using token (not userId in URL)
userRouter.get('/profile', authUser, getUserProfile);
userRouter.put('/update-address', authUser, updateUserAddress);
export default userRouter;
