import OrderModel from "../models/orderModel.js";
import { UserModel } from "../models/userModel.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_KEY);

//Placing user order from frontEnd
const PlaceOrder = async (req, res) => {
    const {userId, items, amount, address} = req.body;
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
                prduct_data:{
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
                unit_amount:2*100*1500
            },
            quantity:1
        });

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:"payment",
            success_url:`${frontEndUrl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontEndUrl}/verify?success=false&orderId=${newOrder._id}`
        });

        res.json({succes:true, session_url:session.url});

    } catch (error) {
        console.log(error);
        res.json({succes:false, message:"Error"});
    }
}

export { PlaceOrder }

