import './MyOrder.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UseGlobalContext } from '../../Context';

const MyOrder = ({ user }) => {
  const { url, OrderId } = UseGlobalContext()
  const [myOrder, setMyOrder] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchOrder = async () => {
    if (OrderId.length > 0) {
      try {
        setLoading(true);
        const response = await axios.get(url + "api/order/orderId", { OrderId });
        if (response) {
          console.log(response.data);
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
    fetchOrder()
  }, [])
  return (
    <div className='my_order'>
      <h1>@ <span>{user}</span> Welcome to your Order Page</h1>
      {
        myOrder ? <>Order available</>
          :
          <div>
            <h2>No Order Available</h2>
          </div>
      }
    </div>
  )
}

export default MyOrder
