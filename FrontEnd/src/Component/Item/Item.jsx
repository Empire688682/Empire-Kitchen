import React from 'react'
import './Item.css'
import star_Icon from '../Asset/rating_starts.png';
import Plus_Icon from '../Asset/add_icon_white.png'
import Plus_Green from '../Asset/add_icon_green.png'
import Remove_Green from  '../Asset/remove_icon_red.png'
import { UseGlobalContext } from '../../Context';

const Item = ({name, image, price, description, id}) => {

  const {cartItems,addTocart,removeFromCart,token,setLoginStatus} = UseGlobalContext();
  const handleAddCart = (id) =>{
    if(!token){
      setLoginStatus(true);
      localStorage.clear("cartItems");
    }
    else{
      addTocart(id);
    }

  }

  return (
    <div className='item' key={id}>
      <img className='item-img' src={image} />
      {
        !cartItems[id]? <div className="item-count" >
        <img className="count-img" src={Plus_Icon} onClick={() =>handleAddCart(id)}/>
       </div>:
       <div className="item-count">
        <img src={Plus_Green} onClick={() =>addTocart(id)}/>
        <p>{cartItems[id]}</p>
        <img src={Remove_Green} onClick={() =>removeFromCart(id)}/>
       </div>
      }
      <div className="item-name">
        <h3>{name}</h3>
        <img src={star_Icon}/>
      </div>
      <p className="description">{description}</p>
      <p className='price'>${price}</p>
    </div>
  )
}

export default Item
