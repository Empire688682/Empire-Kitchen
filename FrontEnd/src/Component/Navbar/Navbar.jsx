import React, { useEffect, useState } from 'react'
import './Navbar.css'
import menu_Open from '../Asset/light_menu.png'
import menu_Close from '../Asset/light_close_menu.png'
import Cart_Icon from '../Asset/basket_icon.png'
import { NavLink, useNavigate } from 'react-router-dom';
import LogSign from '../LoginSignin/LogSign';
import { UseGlobalContext } from '../../Context';
import profile_Icon from '../Asset/profile_icon.png';


const Navbar = () => {
  const [menu, setMenu] = useState("Home");
  const { token, setToken, loginStatus, setLoginStatus, cartAdd} = UseGlobalContext();
  const navigate = useNavigate();
  const [ismenu, setIsMenu] = useState(false);
  const [background, setBackground] = useState(false);

  console.log(cartAdd)

  useEffect(()=>{
    let lastScrollY = 0;
    const handleScroll = () =>{
      if(window.scrollY > lastScrollY){
        setBackground(true);
      }
      else{
        setBackground(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  },[])

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cartItems");
    setToken("");
    navigate("/");
    localStorage.removeItem("User Data")
    window.location.reload();
  }

  const menuToTop = () => {
    setIsMenu(false);
    window.scrollTo(0, 0)
  } 

  const menuToTop2 = () => {
    setIsMenu(false);
    window.scrollTo(0, 20)
  }

  const handleSignupClick = () => {
    setIsMenu(false);
    setLoginStatus(true)
  }

  const handleAddCart = () => {
    if (!token) {
      setLoginStatus(true);
      navigate("/")
    }
    else {
      setLoginStatus(false);
      navigate("/cart")
    }

  }

  return (
    <div className={`navbar_con ${background? "show":""}`}>
      <div className='navbar'>
        {
          loginStatus ? <LogSign setLoginStatus={setLoginStatus} /> : <></>
        }
        <div className="logo_con" onClick={menuToTop}>
          <NavLink className="logo" to="/">Empire Kitchen.</NavLink>
        </div>
        <div className='cart-icon-mobile' onClick={menuToTop2}>
              <img onClick={handleAddCart} src={Cart_Icon} />
              {cartAdd? <p></p>:null}
            </div>
        <div className="menu_icon">
          <img onClick={() => setIsMenu(!ismenu)} src={ismenu ? menu_Close : menu_Open} alt="" />
        </div>
        <div className={ismenu ? 'menu_All' : "menu_All close"}>
          <div className="menu mobile_menu">
            <ul>
              <NavLink onClick={menuToTop} style={{ textDecoration: "none" }} to='/'><li onClick={() => setMenu("Home")}>Home {menu === "Home" ? <hr /> : null}</li></NavLink>
              <a onClick={menuToTop} style={{ textDecoration: "none" }} href="#menu"> <li onClick={() => setMenu("Menu")}>Menu {menu === "Menu" ? <hr /> : null}</li></a>
              <a onClick={menuToTop} href="#contact" style={{ textDecoration: "none" }}> <li onClick={() => setMenu("Contact")}>Contact us {menu === "Contact" ? <hr /> : null}</li></a>
            </ul>
          </div>
          <div className="login-section">
            <div className='cart-icon' onClick={menuToTop}>
              <img onClick={handleAddCart} src={Cart_Icon} />
              {cartAdd? <p></p>:null}
            </div>
            {
              token && token ? <div className='user_con'><img src={profile_Icon} alt="" />
                <ul>
                  <NavLink to="/profile" className='li' onClick={() => setIsMenu(false)} style={{textDecoration:"none"}}>Profile</NavLink>
                  <li className='li' onClick={() => setIsMenu(false)} ><p onClick={logoutUser}>Logout</p></li>
                </ul>
              </div>
                :
                <button className='signup_button' onClick={handleSignupClick} >Signup</button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
