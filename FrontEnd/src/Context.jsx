import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

const ShopContext = React.createContext();
export const ShopProvider = ({children}) => {

  const [food_list, setFood_List] = useState([]);
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cartItems")) || {});
  const [shipingFeeToggle, setShipingFeeToggle] = useState(JSON.parse(localStorage.getItem("shipingFeeToggle")) || false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [networkError, setNetworkError] = useState(false);

  //const url = "https://empire-kitchen.onrender.com/";
  const url = "http://localhost:6886/";
  
  const getFood = async () =>{
    try {
      const response = await axios.get(url+"api/foods/food");
      if(response){
        setFood_List(response.data.data)
      }
      else{
        console.log("ERROR")
      }
    } catch (error) {
      console.log(error);
      setNetworkError(true);
    }
  };

  useEffect(()=>{
    getFood();
  },[]);

  useEffect(()=>{
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  },[cartItems]);
 
  function addTocart(itemId){
    setCartItems((prev) => {
      if(!prev[itemId]){
        return {...prev, [itemId]: 1}
      }
      else{
        return {...prev, [itemId]:prev[itemId] +1}
      }
    });
  }

  function removeFromCart(itemId){
    setCartItems((prev)=>{
      if(prev[itemId]>0){
        return {...prev, [itemId]:prev[itemId]-1}
      }
    })
  }
  
  const getTotalValue = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let totalInfo = food_list.find((product) => product._id === item);
        if (totalInfo) {
          total += totalInfo.price * cartItems[item];
        }
      }
    }
    return total;
  };

  const [loginStatus, setLoginStatus] = useState(false);
  const [cartAdd, setCartAdd] = useState(JSON.parse(localStorage.getItem("cartAdd")) || false);

  const handleCartIcon = () => {
    let isInCart = Object.keys(cartItems).some((itemId) => cartItems[itemId] > 0);
    setCartAdd(isInCart);
    localStorage.setItem("cartAdd", JSON.stringify(isInCart));
  };

  useEffect(()=>{
    handleCartIcon();
  },[cartItems]);
  
  return <ShopContext.Provider value={{
  food_list,
  url,
  shipingFeeToggle,
  setShipingFeeToggle,
  removeFromCart,
  addTocart,
  getTotalValue,
  cartItems,
  setCartItems,
  token, 
  setToken,
  networkError,
  loginStatus, 
  setLoginStatus,
  cartAdd
  }}>
    {children}
  </ShopContext.Provider>
}
 export const UseGlobalContext = () =>{
    return useContext(ShopContext)
 }
