import React from 'react'
import back from '../Asset/basket_icon.png'
import './Footer.css'

const Footer = () => {
  return (
    <div id='footer'>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit animi ea necessitatibus aut repellat consequuntur accusantium neque expedita, exercitationem illum! Voluptatem perspiciatis, quam sed sequi sapiente vel amet voluptates ex?</p>
      <img src={back}  onClick={() => window.scroll(0,20)}/>
    </div>
  )
}

export default Footer
