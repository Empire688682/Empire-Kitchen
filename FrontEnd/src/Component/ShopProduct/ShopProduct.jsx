import React, { useState } from 'react';
import './ShopProduct.css'
import { UseGlobalContext } from '../../Context';
import Menu from '../Menu/Menu'
import Item from '../Item/Item';
import {menu_list} from '../Asset/assets'

const ShopProduct = () => {
    const {food_list, url} = UseGlobalContext()
    const [category, setCategory] = useState("All");

  return (
    <div className='shop-product'>
      <Menu category={category} setCategory={setCategory}/>
      <h1>Top Meal Near You</h1>
      <div className="product">
      {
        food_list.map((items) =>{
          if(category === "All" || category === items.category){
            return <Item key={items._id} name={items.name} image={url+"images/"+items.image} price={items.price} description={items.description} id={items._id}/>
          }
        })
      }
      </div>
    </div>
  )
}

export default ShopProduct