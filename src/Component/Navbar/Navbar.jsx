import React, { useState } from 'react'
import './Navbar.css'
import Search_Icon from '../Asset/search_icon.png';
import Cart_Icon from '../Asset/basket_icon.png'

const Navbar = () => {
    const [menu, setMenu] = useState("Home")
  return (
    <div className='navbar'>
      <h1 className="logo">Empire Kitchen.</h1>
      <div className="menu">
        <ul>
            <li onClick={() =>setMenu("Home")}>Home {menu === "Home"? <hr />:null}</li>
            <li onClick={() =>setMenu("Menu")}>Menu {menu === "Menu"? <hr />:null}</li>
            <li onClick={() =>setMenu("Mobile")}>Mobile {menu === "Mobile"? <hr />:null}</li>
            <li onClick={() =>setMenu("Contact")}>Contact us {menu === "Contact"? <hr />:null}</li>
        </ul>
      </div>
      <div className="login-section">
        <img src={Search_Icon}/>
        <img src={Cart_Icon}/>
        <button>Login</button>
      </div>
    </div>
  )
}

export default Navbar
