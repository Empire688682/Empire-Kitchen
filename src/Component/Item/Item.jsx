import React, { useState } from 'react'
import './Item.css'
import star_Icon from '../Asset/rating_starts.png';
import Plus_Icon from '../Asset/add_icon_white.png'
import Plus_Green from '../Asset/add_icon_green.png'
import Remove_Green from  '../Asset/remove_icon_red.png'

const Item = (prop) => {
  const [itemsCount, setItemsCount] = useState(0)

  return (
    <div className='item'>
      <img className='item-img' src={prop.image} />
      {
        !itemsCount? <div >
        <img className="count-img" src={Plus_Icon} onClick={()=> setItemsCount(prev=> prev+1)}/>
       </div>:
       <div className="item-count">
        <img src={Plus_Green} onClick={()=> setItemsCount(prev=> prev+1)}/>
        <p>{itemsCount}</p>
        <img src={Remove_Green} onClick={()=> setItemsCount(prev=> prev-1)}/>
       </div>
      }
      <div className="item-name">
        <h3>{prop.name}</h3>
        <img src={star_Icon}/>
      </div>
      <p className="description">{prop.description}</p>
      <p className='price'>${prop.price}</p>
    </div>
  )
}

export default Item
