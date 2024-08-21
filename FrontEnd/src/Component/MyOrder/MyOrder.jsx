import './MyOrder.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UseGlobalContext } from '../../Context';

const MyOrder = () => {
  const { url, OrderId } = UseGlobalContext()
  const [myOrder, setMyOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([]);
  const [message, setMessage] = useState('');

  console.log("MyOrder:", myOrder);

  const fetchOrderId = async () => {
    try {
        setLoading(true);
        const response = await axios.get(`${url}api/order/orderId`, {
            params: { OrderId }
        });

        if (response.data.success) {
            console.log("Response", response.data.orderData[0]);
            setMyOrder(response.data.orderData[0]);
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
      fetchOrderId();
    }, []);

  return (
    <div className='my_order'>
      {
        myOrder ? <div className='available_Order_Con'>
          {
            loading ? <h2>Loading.........</h2>
              :
              <>
                  <h3>Name: {myOrder.name}</h3>
                  <p>Quantity: {myOrder.quantity}</p>
                  <div>
                    <p>Image:</p>
                    <img src={`${url}images/${myOrder.image}`} alt=""/>
                  </div>
              </>
          }
        </div>
          :
          <div>
            <h3 style={{color:"black"}}>!ORDER EMPTY!</h3>
          </div>
      }
    </div>
  )
}

export default MyOrder
