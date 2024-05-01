import React from 'react'
import './Menu.css';
import {menu_list} from '../Asset/assets'

const Menu = ({category, setCategory}) => {
  return (
    <div className='food-menu' id='menu'>
      <h2>Explore our menu</h2>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur molestias doloremque repellat cumque sed nam quas excepturi rem alias? Dolorum velit ipsa vitae maiores laboriosam ea earum impedit dolore praesentium?</p>
      <div className="menu-images-con">
           {
            menu_list.map((items,i)=>{
              return ( <div key={i} className="menu-box">
              <img className={category === items.menu_name? "active":''} src={items.menu_image} onClick={()=>setCategory(prev => prev != items.menu_name? prev = items.menu_name:"All")}/>
              <h3>{items.menu_name}</h3>
          </div>)
            })
           }
      </div>
    </div>
  )
}

export default Menu
