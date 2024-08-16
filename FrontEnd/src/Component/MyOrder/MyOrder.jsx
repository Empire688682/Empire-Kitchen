import './MyOrder.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UseGlobalContext } from '../../Context';

const MyOrder = () => {
    const {url, OrderId} = UseGlobalContext()
    const [myOrder, setMyOrder] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(localStorage.getItem("user") || "") ;


    const fetchOder = async () =>{
        try {
            setLoading(true);
            const response = await axios.get(url+"api/order/orderId", {OrderId});
            if(response){
                console.log(response.data);
            }
        } catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    };
    
    useEffect(()=>{
        
    },[])
  return (
    <div className='my_order'>
        <h1>@ <span>{user}</span> WELCOME TO YOUR ORDER PAGE</h1>
      {
        myOrder?""
        :
        <div>
            <h2>No Order Available</h2>
        </div>
      }
    </div>
  )
}

export default MyOrder
