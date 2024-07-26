import OrderModel from "../models/orderModel.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_KEY);

const PlaceOrder = async (req, res) => {
    try {
        const { name, email, items, totalItems, totalAmount, shippingFee, shippingAddress } = req.body;
        // Create a new order instance
        const newOrder = new OrderModel({
            name,
            email,
            items,
            totalItems,
            totalAmount,
            shippingFee,
            shippingAddress
        });
        // Transform the items to match Stripe's expected format
        const lineItems = items.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                },
                unit_amount: item.price * 100, // Stripe expects amounts in cents
            },
            quantity: item.quantity,
        }));

        // Create a Stripe session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'https://example.com/success',
            cancel_url: 'https://example.com/cancel',
        });

        // Save the order to the database
        await newOrder.save();

        // Send the session ID to the frontend
        res.json({ success: true, sessionId: session.id });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export { PlaceOrder }

