import OrderModel from "../models/orderModel.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_KEY);

//Placing user order from frontEnd
const PlaceOrder = async (req, res) => {
    const {userId, items, amount, address} = req.body;
    //const frontEndUrl = "https://empire-kitchen-1.onrender.com";
    const frontEndUrl = "http://localhost:5173";
    
    try {
        const newOrder = new OrderModel({
            userId, 
            items, 
            amount, 
            address
        });

        await newOrder.save();

        const line_items = items.map((item) =>({
            price_data:{
                currency:"ngn",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price *100*1500
            }, 
            quantity:item.quantity
        }));

        line_items.push({
            price_data:{
                currency:"ngn",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:20*100*1500
            },
            quantity:1
        });

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:"payment",
            success_url:`${frontEndUrl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontEndUrl}/verify?success=false&orderId=${newOrder._id}`
        });

        res.json({success:true, session_url:session.url});

    } catch (error) {
        console.log(error);
        res.json({succes:false, message:"Error"});
    }
};


const fetchUserOrder = async (req, res) => {
    const { OrderId } = req.query;  // Retrieve from query parameters

    if (!OrderId) {
        return res.json({ success: false, message: "No OrderId found" });
    }
    try {
        const order = await OrderModel.findById(OrderId);

        if (!order) {
            return res.json({ success: true, message: "No Order found" });
        }

        const orderData = order.items

        console.log("ORDERData:", orderData);
        return res.json({ success: true, orderData, message: "Order found" });

    } catch (error) {
        console.log("ERROR:", error);
        return res.json({ success: false, message: "ERROR" });
    }
};

export { PlaceOrder, fetchUserOrder }

