import React from 'react'
import back from '../Asset/basket_icon.png'
import './Footer.css'
import Contact from '../Contact/Contact'
import { FaHeart } from "react-icons/fa";
import { FaArrowAltCircleUp } from "react-icons/fa";

const Footer = () => {
  return (
    
    <div className='footer_Con'>
     <div id="contact">
      <Contact/>
     </div>
     <div className="footer">
     <p className="designer"> &copy Copyrighted 2023 <a href="#">JAY-EMPIRE</a> <FaHeart style={{color:"red"}}/> All rights reserved </p>
     <span onClick={()=> window.scrollTo(0,20)}>< FaArrowAltCircleUp className="toTop" title='To top' /></span>
     </div>
    </div>
  )
}

export default Footer
