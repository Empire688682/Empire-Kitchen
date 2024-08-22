import React, { useEffect} from 'react';
import './Verify.css'
import { UseGlobalContext } from '../../Context';
import { NavLink, useLocation } from 'react-router-dom';

const Verify = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const orderId =  queryParams.get('orderId');
    const wentThrough = queryParams.get("success");
    const {getTotalValue, token} = UseGlobalContext();

    useEffect(()=>{
        if(!token){
          window.location.replace("/")
        }
      },[])

    console.log("VERIFY:",orderId)

    useEffect(() => {
      if (wentThrough === 'true') { // Assuming 'true' is the value passed for success
          localStorage.removeItem("cartItems");
          localStorage.setItem("orderId", orderId)
      }
  }, []); 

  return (
    <div className="success-container">
    <div className="success-message">
        <h1>Thank You for Your Purchase!</h1>
        <p>Your payment was successful. Your order is being processed.</p>
        <div className="order-details">
            <h2>Order Details</h2>
            <p><strong>Order ID:</strong> <span id="order-id">{orderId}</span></p>
            <p><strong>Amount Paid:</strong> #<span id="amount-paid">{getTotalValue()+2000}</span></p>
        </div>
        <NavLink to="/" className="btn">Continue Shopping</NavLink>
    </div>
</div>
  )
}

export default Verify
