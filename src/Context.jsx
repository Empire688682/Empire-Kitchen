import React, { useContext } from 'react'
import {food_list} from '../src/Component/Asset/assets'

const ShopContext = React.createContext();
export const ShopProvider = ({children}) => {
    console.log(food_list)
  return <ShopContext.Provider value={{food_list}}>
    {children}
  </ShopContext.Provider>
}
 export const UseGlobalContext = () =>{
    return useContext(ShopContext)
 }
