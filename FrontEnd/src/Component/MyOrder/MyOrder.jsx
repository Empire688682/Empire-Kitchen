import './MyOrder.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UseGlobalContext } from '../../Context';

const MyOrder = () => {
  const { url } = UseGlobalContext();
  const [orderId, setOrderId] = useState(localStorage.getItem("orderId") || "")
  const [userOrder, setUserOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  console.log(userOrder);
  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}api/order/orderId`, {
        params: { orderId }
      });

      if (response.data.success) {
        console.log("Response", response.data.orderData);
        localStorage.setItem("userOrder", response.data.order);
        setUserOrder(response.data.order);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      setMessage("Failed to fetch order");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div className='myOrder'>
      <div className="header">
        <div className="image">Image</div>
        <div className="name">Name</div>
        <div className="name">Payment Details</div>
        <div className="remove">Delivery method</div>
      </div>
      {
        userOrder.length > 0 ? <>
          {
            loading ? <h3>Loading...</h3>
              :
              <>
                {
                  userOrder.map((order) => {
                    return <div className="content" key={order._id}>
                      <div className="image">
                        <img src={`${url}images/${order.image}`} alt="" />
                      </div>
                      <div className="name">
                        <div>{order.name}</div>
                        <div>${order.divrice}</div>
                        <div>Quantity: {order.quantity}</div>
                      </div>
                      <div className="name"> Items total: ${order.price * order.quantity }</div>
                      <div className="remove">Door delivery</div>
                    </div>
                  })
                }
              </>
          }
        </> : <>No order available</>
      }
    </div>
  );
}

export default MyOrder;