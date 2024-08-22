import React, { useEffect, useState } from 'react'
import './order.css'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Order = ({ apiUrl }) => {
  const [allOrder, setAllOrder] = useState([]);
  const [items, setItems] = useState([]);
  const [address, setAddress] = useState([]);

  useEffect(() => {
    allOrder && allOrder.map((order) => {
      setItems(order.items)
      setAddress(order.address)
    })
  }, [allOrder]);


  const fetchorder = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/order/allorder`);
      if (response.data.success === true) {
        setAllOrder(response.data.order);
      }
    } catch (error) {
      console.log("orderFetchError:", error)
    }
  };

  useEffect(() => {
    fetchorder()
  }, []);

  const removeDeliveredOrder = async (orderId) => {
    try {
      const response = await axios.post(`${apiUrl}api/order/removeorder`, { id:orderId })
      if (response.data.success === true) {
        fetchorder();
        toast.success(response.data.message);
      }
      else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='order_items'>
      <ToastContainer style={{ width: "80%" }} />
      <h2>All order List</h2>
      {
        allOrder.length > 0 ? <>
          {
            allOrder.map((order) => {
              return <div className="content" key={order._id}>
                <div>
                  <div className="header_item">Item</div>
                  {
                    items.map((item, id) => {
                      return <div key={id} className='item'>
                        <small key={id}>
                          Name: {item.name}
                        </small> <br />
                        <small>
                          Qty: {item.quantity}
                        </small>
                      </div>
                    })
                  }
                </div>
                <div>
                  {
                    // If there's a single address for each order
                    order.address && (
                      <div>
                        <div className="header_address">Shipping Address</div>
                        <small className='address'>
                          Name: {order.address.FirstName} {order.address.LastName}
                        </small><br />
                        <small>
                          Email: {order.address.Email}
                        </small><br />
                        <small>
                          City: {order.address.City}
                        </small><br />
                        <small>
                          Street: {order.address.Street}
                        </small><br />
                        <small>
                          ZipCode: {order.address.ZipCode}
                        </small><br />
                        <small>
                          Phone: {order.address.Phone}
                        </small>
                      </div>
                    )
                  }
                </div>
                <div>
                  <div className="header_amount">Total Amount</div>
                  <div className="amount">#{order.amount}</div>
                </div>
                <div>
                  <div className="header_remove">Remove</div>
                  <div className="remove" onClick={() => removeDeliveredOrder(order._id)}>X</div>
                </div>
              </div>
            })
          }
        </> : <>No Order available</>
      }
    </div>
  )
}

export default Order
