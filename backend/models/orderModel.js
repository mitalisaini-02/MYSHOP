import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },

    // 💡 Change address from string to object
    address: {
      firstName: String,
      lastName: String,
      email: String,
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
      phone: String,
    },

    status: { type: String, default: 'Orderd Placed' },
    paymentMethod: { type: String, required: true },
    payment: { type: Boolean, default: false },
    date: { type: Number, default: Date.now }
  },
  { timestamps: true }
);

// Model export (safe way to avoid re-registration in dev environments)
const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);
export default orderModel;
