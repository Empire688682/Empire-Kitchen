import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId:{type:String, required:false},
  items:{type:Array, required:true},
  amount:{type:Number, required:true},
  address:{type:Object, required:true},
  date:{type:Date, default:Date.now()},
  payment:{type:String, default:"Food Processing"},
  status:{type:String, default:false},
})
const OrderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default OrderModel;
