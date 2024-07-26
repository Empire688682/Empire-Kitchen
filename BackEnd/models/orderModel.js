import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true }
});

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  items: { type: [itemSchema], required: true },
  totalItems: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  shippingFee: { type: Number, default: 20 },
  orderDate: { type: Date, default: Date.now },
  shippingAddress: { type: addressSchema, required: true },
  paymentStatus: { type: String, default: "Processing" },
});

const OrderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default OrderModel;
