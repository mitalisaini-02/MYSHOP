import mongoose from "mongoose";
const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  postalCode: { type: String },
  country: String,
  firstName: String,
  lastName: String,
  phone: { type: String},
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  cartData: { type: Object, default: {}, minimize: false },
  address: { type: addressSchema, default: {} },
});

const userModel = mongoose.models.user || mongoose.model('user', userSchema);
export default userModel;
