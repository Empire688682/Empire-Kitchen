import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  items:{type:Array, required:true},
  amount:{type:Number, required:true},
  address:{type:Object, required:true},
  date:{type:Date, default:Date.now()},
  payment:{type:Boolean, default:false},
  status:{type:String, default:"Food Processing"},
})
const OrderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default OrderModel;
