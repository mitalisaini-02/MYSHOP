import express from 'express';

import authUser from '../middleware/auth.js';

import { addToCart, updateCart, getCartData } from '../controllers/cartController.js';

const cartRouter = express.Router();

cartRouter.post('/add', authUser, addToCart);
cartRouter.put('/update', authUser, updateCart);
cartRouter.get('/get', authUser, getCartData);

export default cartRouter;
