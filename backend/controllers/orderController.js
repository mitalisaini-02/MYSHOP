import orderModel from "../models/orderModel.js";
import userModel from "../models/userMOdel.js";
// GETWAY INITAILSE
import Stripe from "stripe";
const currency = 'inr';
const delivery_charges = 10; // Example delivery charges, adjust as needed
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const placeOrder = async (req, res) => {
  try {
    const { items, amount, address ,directBuy} = req.body;
    const userId = req.user.userId; // ✅ Extract from token

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: 'COD',
      payment: false,
      date: Date.now()
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();
if(!directBuy) {
    await userModel.findByIdAndUpdate(userId, { cartData: {} }); // ✅ Correct filter
}
    res.json({ success: true, message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to place order", error: error.message });
  }
};

const placeOrderStripe = async (req, res) => {
  try {
    const { items, amount, address,directBuy } = req.body;
    const userId = req.user.userId; // ✅ Extract from token
    const { origin } = req.headers;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: 'Stripe',
      payment: false,
      date: Date.now()
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();
  
    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.title || item.name
        },
        unit_amount: item.price * 100
      },
      quantity: item.quantity
    }));
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: 'delivery_charges'
        },
        unit_amount: delivery_charges * 100
      },
      quantity: 1
    });

    const session = await stripe.checkout.sessions.create({

      line_items,
      mode: 'payment',
     success_url: `${origin}/verify?success=true&orderId=${newOrder._id}&directBuy=${directBuy ? 'true' : 'false'}`,
cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}&directBuy=${directBuy ? 'true' : 'false'}`,
 });

    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to place order", error: error.message });
  }
};
const verifyStripe = async (req, res) => {
  let { orderId, success ,directBuy} = req.body;
   const userId = req.user.userId; 
  try {
        success = success === 'true' || success === true;

    if (success) {
      await orderModel.findByIdAndUpdate(orderId, { payment: true })
      if(!directBuy) {
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      }
      return res.json({ success: true });  // ✅ Add this line
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  }
  catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to place order", error: error.message });
  }
}




// all order data for admin panel
const allOrders = async (req, res) => {
  try {

    const orders = await orderModel.find({});
    res.json({ success: true, orders });


  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }

}
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}







const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Order status updated successfully" })

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to update order status", error: error.message });
  }
}




export {
  placeOrder,
  placeOrderStripe,
  verifyStripe,
 
  allOrders,
  userOrders,
  updateStatus
};
