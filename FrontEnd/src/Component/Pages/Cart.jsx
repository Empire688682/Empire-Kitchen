import React from 'react';
import { UseGlobalContext } from '../../Context';
import './Cart.css';

const Cart = () => {
  const { food_list, shipingFeeToggle, cartItems, removeFromCart, addTocart, getTotalValue } = UseGlobalContext()
  return (
    <div className='cart'>
      <div className="cart-head">
        <h1 className='product'>Product</h1>
        <h1 className='head-title'>Price</h1>
        <h1 className='head-title'>Quantity</h1>
        <h1 className='head-title'>Total</h1>
      </div>
      {
        food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return <div className="cart-head cart-items" key={item._id}>
              <p className='product'>{item.name}</p>
              <p className='head-title'>${item.price}</p>
              <div className='head-title quantity-con'>
                <h3 className='quantity'>{cartItems[item._id]}</h3>
                <div className='plus-minus'>
                  <p onClick={() => addTocart(item._id)}>+</p>
                  <p onClick={() => removeFromCart(item._id)}>-</p>
                </div>
              </div>
              <p className='head-title'>${item.price * cartItems[item._id]}</p>
            </div>
          }
          else{
            return null
          }
        })
      }
       {shipingFeeToggle && shipingFeeToggle? <div className="cart-head cart-items">
        <p className='product'></p>
        <p className='head-title'></p>
        <div className='head-title quantity-con'>
          <h5 className='plus-minus'>
            Shiping Fee
          </h5>
        </div>
        <h5 className='head-title'>free</h5>
      </div>:null}

      <div className="cart-head cart-items">
        <p className='product'></p>
        <p className='head-title'></p>
        <div className='head-title quantity-con'>
          <h3 className='plus-minus'>
            Sub Total
          </h3>
        </div>
        <h3 className='head-title'>${getTotalValue()}</h3>
      </div>
      {shipingFeeToggle && shipingFeeToggle?<div className='check-out-btn-con'><button className='check-out-btn'>Check Out</button></div>:null}
    </div>
  )
}

export default Cart
