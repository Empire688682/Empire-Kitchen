import React from 'react';
import './Contact.css';
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";

const Contact = () => {
  return (
    <div className="contact">
    <div className="container">
        <h1>Contact Us </h1>
        <div className="row">
            <div className="col-2">
               <form action="https://api.web3forms.com/submit" method="POST" id="form">

               <div className="label-container-two">
                <input type="hidden" name="access_key" value="5c7fd0a9-1735-4d2a-8af8-724f4ce23686"/>
                    <div className="two-row">
                        <label htmlFor="fname">First name</label>
                        <input type="text" required id="fname"/>
                    </div>
                    <div className="two-row">
                        <label htmlFor="lname">Last name</label>
                        <input type="text" required id="lname"/>
                    </div>
               </div>
                <div className="label-container">
                    <label htmlFor="email">Email</label>
                    <input type="email" required id="email"/>
                </div>
                <div className="label-container">
                    <label htmlFor="message">Your Message</label>
                   <textarea id="message" cols="30" rows="2"></textarea>
                </div>
                <input type="submit" value="Submit" className="btn"/>
               </form>
            </div>
            <div className="col-2">
               <div className="contact-info">
                <h3>Contact Info</h3>
                <p><i className="fa fa-location-dot"></i> 13 Koshebinu Street. Ikorodu, Lagos Nigeria</p>
                <a href="tel:+2349154358139"><i className="fa fa-phone"></i> +234-915-435-8139</a><br/>
                <a href="tel:+2349123088199"><i className="fa fa-phone"></i> +234-912-308-8199</a><br/>
                <a href="mailto:asehindej@gmail.com"> <i className="fa fa-envelope"></i> asehindej@gmail.com</a>
               </div>
               <div className="social-icon">
                <h2>Our social links</h2>
                  <div className="icon-container">
                   <a href="https://web.facebook.com/juwon.asehinde.7"><FaFacebookF className="fa" /></a>
                   <a href="https://www.instagram.com/jahwonempire/"><FaInstagram className="fa" /></a>
                   <a href="https://twitter.com/AsehindeJwon"><FaTwitter className="fa" /></a>
                   <a href="https://wa.link/6t4obt"><IoLogoWhatsapp className="fa" /></a>
                  </div>
               </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Contact
