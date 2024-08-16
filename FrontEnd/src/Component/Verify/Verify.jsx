import React, { useEffect, useState } from 'react';
import './Verify.css'
import { UseGlobalContext } from '../../Context';
import { useLocation } from 'react-router-dom';

const Verify = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const orderId =  queryParams.get('orderId');
    const wentThrough = queryParams.get("success");
    const {getTotalValue,setOrderId} = UseGlobalContext();

    useEffect(() => {
      if (wentThrough === 'true') { // Assuming 'true' is the value passed for success
          localStorage.removeItem("cartItems");
          setOrderId(orderId);
          console.log("SUCCESS: Payment was successful, cartItems removed.");
      }
  }, [wentThrough]); 

  return (
    <div className="success-container">
    <div className="success-message">
        <h1>Thank You for Your Purchase!</h1>
        <p>Your payment was successful. Your order is being processed.</p>
        <div className="order-details">
            <h2>Order Details</h2>
            <p><strong>Order ID:</strong> <span id="order-id">{orderId}</span></p>
            <p><strong>Amount Paid:</strong> $<span id="amount-paid">{getTotalValue()+20}</span></p>
        </div>
        <a href="/" className="btn">Continue Shopping</a>
    </div>
</div>
  )
}

export default Verify
