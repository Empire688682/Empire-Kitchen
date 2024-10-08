import OrderModel from "../models/orderModel.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_KEY);

// Placing user order from frontEnd
const PlaceOrder = async (req, res) => {
    const { items, amount, address } = req.body;
    const frontEndUrl = "https://empire-kitchen-1.onrender.com";
    // const frontEndUrl = "http://localhost:5173";

    try {
        // Create a new order in your database
        const newOrder = new OrderModel({
            items,
            amount,
            address
        });

        await newOrder.save();

        // Prepare line items for Stripe Checkout
        const line_items = items.map((item) => ({
            price_data: {
                currency: "ngn",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100  // Convert from USD to NGN and then to kobo
            },
            quantity: item.quantity
        }));

        // Add delivery charges
        line_items.push({
            price_data: {
                currency: "ngn",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2000 * 100  // Delivery fee in kobo
            },
            quantity: 1
        });

        // Create a Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],  // Specify the payment methods
            line_items: line_items,
            mode: "payment",
            success_url: `${frontEndUrl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontEndUrl}/verify?success=false&orderId=${newOrder._id}`
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



const fetchUserOrder = async (req, res) => {
    const { orderId } = req.query;  // Retrieve from query parameters

    if (!orderId) {
        return res.json({ success: false, message: "No OrderId found" });
    }
    try {
        const order = await OrderModel.findById(orderId);

        if (!order) {
            return res.json({ success: true, message: "No Order found" });
        }

        order.payment = true;

        await order.save()

        return res.json({ success: true, order:order.items, message: "Order found" });

    } catch (error) {
        console.log("ERROR:", error);
        return res.json({ success: false, message: "ERROR" });
    }
};

const fetchAllOrder = async (req, res) => {

    try {
        const order = await OrderModel.find({});

        if (!order) {
            return res.json({ success: true, message: "No Order found" });
        }

        return res.json({ success: true, order, message: "Order found" });

    } catch (error) {
        console.log("ERROR:", error);
        return res.json({ success: false, message: "ERROR" });
    }
};

const remaoveDelOrder = async (req, res) => {
    const orderId = req.body.id
    try {
        
        if (!orderId) {
            return res.json({ success: true, message: "No Order found" });
        }

        await OrderModel.findByIdAndDelete({_id:orderId});

        return res.json({ success: true, message: "Order Deleted" });

    } catch (error) {
        console.log("ERROR:", error);
        return res.json({ success: false, message: "ERROR" });
    }
};

export { PlaceOrder, fetchUserOrder, fetchAllOrder, remaoveDelOrder }

