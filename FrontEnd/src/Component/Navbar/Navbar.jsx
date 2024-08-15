import React, { useState } from 'react'
import './Navbar.css'
import Search_Icon from '../Asset/search_icon.png';
import Cart_Icon from '../Asset/basket_icon.png'
import { NavLink, useNavigate } from 'react-router-dom';
import LogSign from '../LoginSignin/LogSign';
import { UseGlobalContext } from '../../Context';
import profile_Icon from '../Asset/profile_icon.png';


const Navbar = () => {
  const [menu, setMenu] = useState("Home")
  const { token, setToken, loginStatus, setLoginStatus } = UseGlobalContext();
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.clear();
    setToken("");
    navigate("/");
    window.location.reload();
  }

  return (
    <div className="navbar_con">
      <div className='navbar'>
        {
          loginStatus ? <LogSign setLoginStatus={setLoginStatus} /> : <></>
        }
        <h1 className="logo">Empire Kitchen.</h1>
        <div className="menu">
          <ul>
            <NavLink style={{ textDecoration: "none" }} to='/'><li onClick={() => setMenu("Home")}>Home {menu === "Home" ? <hr /> : null}</li></NavLink>
            <a style={{ textDecoration: "none" }} href="#menu"> <li onClick={() => setMenu("Menu")}>Menu {menu === "Menu" ? <hr /> : null}</li></a>
            <a href="#contact" style={{ textDecoration: "none" }}> <li onClick={() => setMenu("Contact")}>Contact us {menu === "Contact" ? <hr /> : null}</li></a>
          </ul>
        </div>
        <div className="login-section">
          <a href="#menu">
            <img src={Search_Icon} />
          </a>
          <NavLink to='/cart'><div className='cart-icon'><img src={Cart_Icon} /></div></NavLink>
          {
            token ? <div className='user_con'><img src={profile_Icon} alt="" />
              <ul>
                <li>Orders</li>
                <li onClick={logoutUser}>Logout</li>
              </ul>
            </div>
              :
              <button onClick={() => setLoginStatus(true)} >Signup</button>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar
