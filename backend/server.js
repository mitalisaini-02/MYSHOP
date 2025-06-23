import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import dotenv from 'dotenv';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import jwt from 'jsonwebtoken';
import orderRouter from './routes/orderRoute.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await connectDB();          
    await connectCloudinary();    
    app.use(cors());
    app.use(express.json());
    app.use((req, res, next) => {
      console.log(`[${req.method}] ${req.url}`);
      next();
    });

    app.use('/api/user', userRouter);
    app.use('/api/product', productRouter);
    app.use('/api/cart', cartRouter); // Assuming you have a cartRouter
    app.use('/api/order',orderRouter );
    app.get('/', (req, res) => {
      res.send('Welcome to the backend server!');
    });

    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('❌ Error starting server:', error);
  }
};

startServer(); // 👈 Kick off async startup
