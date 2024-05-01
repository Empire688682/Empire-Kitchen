import React, { useContext, useEffect, useState } from 'react'
import {food_list} from '../src/Component/Asset/assets'

const ShopContext = React.createContext();
export const ShopProvider = ({children}) => {

  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cartItems")) || {});
  const [cartIcon, setCartIcon] = useState(JSON.parse(localStorage.getItem("cartIcon")) || false)
  const [shipingFeeToggle, setShipingFeeToggle] = useState(JSON.parse(localStorage.getItem("shipingFeeToggle")) || false)

  useEffect(()=>{
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  },[cartItems])

  useEffect(()=>{
    localStorage.setItem("shipingFeeToggle", JSON.stringify(shipingFeeToggle));
  },[cartIcon])

  console.log(cartIcon)

  useEffect(()=>{
    localStorage.setItem("cartIcon", JSON.stringify(cartIcon));
  },[cartIcon])
 
  function addTocart(itemId){
    setCartItems((prev)=>{
      if(!prev[itemId]){
        return {...prev, [itemId]:1}
      }else{
        return {...prev, [itemId]:prev[itemId]+1}
      }
    })
  }

  function removeFromCart(itemId){
    setCartItems((prev)=>{
      if(prev[itemId]>0){
        return {...prev, [itemId]:prev[itemId]-1}
      }
    })
  }
  
  function getTotalValue(){
    let total = 0;
    for(const item in cartItems){
      if(cartItems[item] > 0){
        setShipingFeeToggle(true);
        setCartIcon(true)
        const totalInfo = food_list.find((product)=> product.id === item);
        total += totalInfo.price * cartItems[item];
      }else{
        setCartIcon(false)
        setShipingFeeToggle(false)
      }
    }
    return total
  }

  return <ShopContext.Provider value={{food_list,shipingFeeToggle,cartIcon,removeFromCart,addTocart,getTotalValue,cartItems,setCartItems}}>
    {children}
  </ShopContext.Provider>
}
 export const UseGlobalContext = () =>{
    return useContext(ShopContext)
 }
