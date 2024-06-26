import React, { useState } from 'react'
import './Navbar.css'
import Search_Icon from '../Asset/search_icon.png';
import Cart_Icon from '../Asset/basket_icon.png'
import { NavLink } from 'react-router-dom';
import LogSign from '../LoginSignin/LogSign';
import { UseGlobalContext } from '../../Context';

const Navbar = () => {
    const [menu, setMenu] = useState("Home")
    const [loginStatus, setLoginStatus] = useState(false);
    const {cartIcon} = UseGlobalContext()
  return (
    <div className='navbar'>
      {
        loginStatus? <LogSign setLoginStatus={setLoginStatus}/>:<></>
      }
      <h1 className="logo">Empire Kitchen.</h1>
      <div className="menu">
        <ul>
            <NavLink style={{textDecoration:"none"}} to='/'><li onClick={() =>setMenu("Home")}>Home {menu === "Home"? <hr />:null}</li></NavLink>
            <a style={{textDecoration:"none"}}  href="#menu"> <li onClick={() =>setMenu("Menu")}>Menu {menu === "Menu"? <hr />:null}</li></a>
            <a href="#mobile" style={{textDecoration:"none"}} ><li onClick={() =>setMenu("Mobile")}>Mobile {menu === "Mobile"? <hr />:null}</li></a>
            <a href="#footer" style={{textDecoration:"none"}}> <li onClick={() =>setMenu("Contact")}>Contact us {menu === "Contact"? <hr />:null}</li></a>
        </ul>
      </div>
      <div className="login-section">
        <img src={Search_Icon}/>
        <NavLink to='/cart'><div className='cart-icon'><img src={Cart_Icon}/><p className={cartIcon && cartIcon? "cart-icon-p":''}></p></div></NavLink>
        <button onClick={()=> setLoginStatus(true)} >Login</button>
      </div>
    </div>
  )
}

export default Navbar
