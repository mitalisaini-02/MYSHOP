import userModel from "../models/userModel.js"; 
// ➕ Add item to cart
const addToCart = async (req, res) => {
  try {
    const { itemid, size } = req.body;
    console.log("📦 Cart request body:", req.body);

    const userId = req.user.userId;
    console.log("🔑 User ID from token:", userId);

    const user = await userModel.findById(userId);

    if (!user) {
      console.log("❌ User not found in DB");
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("🧾 Existing cartData:", user.cartData);

    let cartdata = user.cartData || {};

    if (cartdata[itemid]) {
      cartdata[itemid][size] = (cartdata[itemid][size] || 0) + 1;
    } else {
      cartdata[itemid] = { [size]: 1 };
    }

   user.cartData = cartdata;
user.markModified('cartData'); // ✅ ADD THIS LINE
await user.save();


    console.log("✅ Updated cartData:", user.cartData);

    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.error("❌ Error adding to cart:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔄 Update item in cart
const updateCart = async (req, res) => {
  try {
    const { itemid, size, quantity } = req.body;
    const user = await userModel.findById(req.user.userId); // ✅ use auth token

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartItem = user.cartData || {};

    if (cartItem[itemid]) {
      if (quantity > 0) {
        cartItem[itemid][size] = quantity;
      } else {
        delete cartItem[itemid][size];
        if (Object.keys(cartItem[itemid]).length === 0) {
          delete cartItem[itemid];
        }
      }
    }

    user.cartData = cartItem;
user.markModified('cartData'); // ✅ ADD THIS LINE
await user.save();



    return res.json({ success: true, message: "Cart updated successfully" });
  } catch (error) {
    console.error("❌ Error updating cart:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 📦 Get cart data
const getCartData = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, cartdata: user.cartData || {} });
  } catch (error) {
    console.error("❌ Error fetching cart data:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getCartData };
