import './MyOrder.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UseGlobalContext } from '../../Context';

const MyOrder = () => {
  const { url, OrderId } = UseGlobalContext()
  const [myOrder, setMyOrder] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  console.log("MyOrder:", myOrder);

  const fetchOrderId = async () => {
    console.log("MyOrder:",OrderId);
    if (OrderId.length > 0) {
      try {
        setLoading(true);
        console.log("MyOrderAfter:",OrderId);
        const response = await axios.get(url + "api/order/orderId", {headers:{OrderId}});
        if (response) {
          console.log("Response", response);
        }
      } catch (error) {
        console.log(error)
      }
      finally {
        setLoading(false)
      }
    }
    else {
      return null
    }
  };

  useEffect(() => {
    fetchOrderId()
  }, [])
  return (
    <div className='my_order'>
      {
        myOrder ? <div className='available_Order_Con'>
          {
            loading ? <h2>Loading.........</h2>
              :
              <>
                Order available
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
