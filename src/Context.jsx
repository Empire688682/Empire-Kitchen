import React, { useContext, useEffect, useState } from 'react'
import {food_list} from '../src/Component/Asset/assets'

const ShopContext = React.createContext();
export const ShopProvider = ({children}) => {

  const [cartItems, setCartItems] = useState({});
  const addTocart = (itemsId) =>{
    if(!cartItems[itemsId]){
      setCartItems((prev)=>({...prev, [itemsId]:1}))
    }
    else{
      setCartItems((prev) => ({...prev, [itemsId]:prev[itemsId]+1}))
    }
  }
   const removeFromCart = (itemsId) =>{
    setCartItems((prev) => ({...prev, [itemsId]:prev[itemsId]-1}))
   }

   useEffect(() =>{
    console.log(cartItems)
   }, [cartItems])
  return <ShopContext.Provider value={{food_list,cartItems,addTocart,removeFromCart,setCartItems}}>
    {children}
  </ShopContext.Provider>
}
 export const UseGlobalContext = () =>{
    return useContext(ShopContext)
 }
