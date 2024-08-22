import React, { useState } from 'react';
import './Cart.css';
import { UseGlobalContext } from '../../Context';
import axios from 'axios';

const Order = () => {
    const { getTotalValue, token, food_list, cartItems, url } = UseGlobalContext();
    const [data, setData] = useState({
        FirstName: "",
        LastName: "",
        Email: "",
        City: "",
        Street: "",
        ZipCode: "",
        Phone: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);  // For error messages
    const [showToast, setShowToast] = useState(false); // For toast notifications

    const handleOnchange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmision = (e) => {
        e.preventDefault();
        placeOrder();
    };

    const placeOrder = async () => {
        let orderItem = [];

        food_list.forEach((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = { ...item, quantity: cartItems[item._id] };
                orderItem.push(itemInfo);
            }
        });

        let orderData = {
            address: data,
            items: orderItem,
            amount: getTotalValue() + 20  // Add delivery fee
        };

        try {
            setLoading(true);
            let response = await axios.post(`${url}api/order/place`, orderData, {
                headers: { token }
            });

            if (response.data.success) {
                const { session_url } = response.data;
                window.location.replace(session_url);
            } else {
                setError(response.data.message);
                setShowToast(true);
            }
        } catch (error) {
            console.log(error);
            setError('An error occurred while placing your order. Please try again.');
            setShowToast(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="order">
            {showToast && 
                <div className="toast">
                    <p>{error}</p>
                    <button onClick={() => setShowToast(false)}>Close</button>
                </div>
            }
            <div className="order_con">
                <div className="two_col">
                    <h3>Delivery Information</h3>
                    <form onSubmit={handleFormSubmision}>
                        <input onChange={handleOnchange} required value={data.FirstName} type="text" name="FirstName" placeholder='First name' />
                        <input onChange={handleOnchange} required value={data.LastName} type="text" name="LastName" placeholder='Last name' />
                        <input onChange={handleOnchange} required value={data.Email} type="email" name="Email" placeholder='Email' />
                        <input onChange={handleOnchange} required value={data.City} type="text" name="City" placeholder='City' />
                        <input onChange={handleOnchange} required value={data.Street} type="text" name="Street" placeholder='Street' />
                        <input onChange={handleOnchange} required value={data.ZipCode} type="number" name="ZipCode" placeholder='Zip code' />
                        <input onChange={handleOnchange} required value={data.Phone} type="tel" name="Phone" placeholder='Phone' />
                        <button id='submitButton' type='submit' style={{ display: 'none' }}>Submit</button>
                    </form>
                </div>
                <div className="two_col cart">
                    <h3>Cart Totals</h3>
                    <div>Subtotal <h4>#{getTotalValue()}</h4></div>
                    <div>Delivery fees <h4>#2000</h4></div>
                    <div>Total <h4>#{getTotalValue() + 20}</h4></div>
                    <label htmlFor='submitButton' className='button-label'>
                        {loading ? "Processing..." : "Proceed to checkout"}
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Order;
