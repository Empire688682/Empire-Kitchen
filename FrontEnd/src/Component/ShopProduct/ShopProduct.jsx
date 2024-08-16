import React, { useState, useEffect } from 'react';
import './ShopProduct.css'
import { UseGlobalContext } from '../../Context';
import Menu from '../Menu/Menu'
import star_Icon from '../Asset/rating_starts.png';
import Plus_Icon from '../Asset/add_icon_white.png'
import Plus_Green from '../Asset/add_icon_green.png'
import Remove_Green from '../Asset/remove_icon_red.png'
import FastDeliver from '../FastDeliver/FastDeliver';
import error_Img from '../Asset/Error_404.jpg'

const ShopProduct = () => {
  const { food_list, cartItems, url, addTocart, removeFromCart, token, setLoginStatus, setShipingFeeToggle } = UseGlobalContext()
  const [category, setCategory] = useState("All");

  const handleAddCart = (id) => {
    if (!token) {
      setLoginStatus(true);
      localStorage.removeItem("cartItems");
    }
    else {
      addTocart(id);
      setShipingFeeToggle(true)
    }

  }

  return (
    <div className='shop-product'>
      <Menu category={category} setCategory={setCategory} />
      <h1 className='title'>Top Meal Near You</h1>
      <div className="all_Product" id='allItems'>
        {
          food_list.length < 0 ? <div>
            {
              food_list.map((items) => {
                if (category === "All" || category === items.category) {
                  return (
                    <div className='item' key={items._id}>
                      <div className="item_img_con">
                        <img className='item-img' src={`${url}images/${items.image}`} />
                      </div>
                      {
                        !cartItems[items._id] ? <div className="item-count" >
                          <img className="count-img" src={Plus_Icon} onClick={() => handleAddCart(items._id)} />
                        </div> :
                          <div className="item-count">
                            <img src={Plus_Green} onClick={() => addTocart(items._id)} />
                            <p style={{ color: "black" }}>{cartItems[items._id]}</p>
                            <img src={Remove_Green} onClick={() => removeFromCart(items._id)} />
                          </div>
                      }
                      <div className="item-name">
                        <h3>{items.name}</h3>
                        <img src={star_Icon} />
                      </div>
                      <p className="description">{items.description}</p>
                      <p className='price'>${items.price}</p>
                    </div>
                  )
                }
              })
            }
          </div>
            :
            <div id='nofood_available' style={{margin:"50px 0", textAlign:"center"}}> <img src={error_Img} alt="" style={{width:"150px"}}/><h1 style={{color:"red"}}> !Oops! An Error Occured NO Food Available, Please Check Your Internet Connection And Try Again!</h1></div>
        }
      </div>
      <FastDeliver />
    </div>
  )
}

export default ShopProduct