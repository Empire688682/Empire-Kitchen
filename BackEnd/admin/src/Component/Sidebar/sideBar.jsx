import React from 'react';
import './SideBar.css';
import add_Icon from '../Assets/add_icon_green.png';
import list_Icon from '../Assets/bag_icon.png';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className='sideBar'>
      <div className="pages">
        <NavLink style={{textDecoration:"none"}} to='/add' className="page">
            <img src={add_Icon} alt=""/>
            <p>Add Items</p>
        </NavLink>
        <NavLink style={{textDecoration:"none"}} to='/list' className="page">
            <img src={list_Icon} alt=""/>
            <p>List Items</p>
        </NavLink>
        <NavLink style={{textDecoration:"none"}} to='/order' className="page">
            <img src={list_Icon} alt=""/>
            <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default SideBar
