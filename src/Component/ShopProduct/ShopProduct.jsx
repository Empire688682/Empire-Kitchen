import React, { useState } from 'react';
import './ShopProduct.css'
import { UseGlobalContext } from '../../Context';
import Menu from '../Menu/Menu'
import Item from '../Item/Item';
import {menu_list} from '../Asset/assets'

const ShopProduct = () => {
    const {food_list} = UseGlobalContext()
    const [category, setCategory] = useState("All");

  return (
    <div className='shop-product'>
      <Menu category={category} setCategory={setCategory}/>
      <h1>Top Meal Near You</h1>
      <div className="product">
      {
        food_list.map((items, i) =>{
          console.log(items.id)
            return <Item key={i} name={items.name} image={items.image} price={items.price} description={items.description} id={items.id}/>
        })
      }
      </div>
    </div>
  )
}

export default ShopProduct