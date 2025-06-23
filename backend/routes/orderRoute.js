import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import {placeOrder,verifyStripe,placeOrderStripe, allOrders,userOrders,updateStatus } from '../controllers/orderController.js';
const orderRouter = express.Router();
import authUser from '../middleware/auth.js';

// payment features

orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

orderRouter.post('/userorder', authUser, userOrders);


orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/place/stripe', authUser, placeOrderStripe);


orderRouter.post('/verifystripe', authUser, verifyStripe);
export default orderRouter;