import React from 'react'
import Hero from '../Hero/Hero'
import ShopProduct from '../ShopProduct/ShopProduct'
import './Shop.css'

const Shop = () => {
  return (
    <div className='shop'>
      <Hero/>
      <ShopProduct/>
    </div>
  )
}

export default Shop
