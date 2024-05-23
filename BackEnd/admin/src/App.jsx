import React from 'react';
import Navbar from './Component/navbar/navbar';
import SideBar from './Component/Sidebar/sideBar';
import { Route, Routes } from 'react-router-dom';
import AddItems from './Component/pages/addItems/addItems';
import ListItems from './Component/pages/listItems/listItems';
import Order from './Component/pages/order/order';
import Home from './Home';
import {ToastContainer} from 'react-toastify';
import PageNotFound from './Component/pages/pageNotFound/pageNotFound';


const App = () => {
  return (
    <div>
      <Navbar/>
      <hr />
      <div className="contents">
      <SideBar/>
      <Routes>
        <Route path='/add' element={<AddItems/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/list' element={<ListItems/>}/>
        <Route path='/order' element={<Order/>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
      </div>
      
    </div>
  )
}

export default App
