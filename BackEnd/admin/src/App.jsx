import React from 'react';
import Navbar from './Component/navbar/navbar';
import SideBar from './Component/Sidebar/sideBar';
import { Route, Routes } from 'react-router-dom';
import AddItems from './Component/pages/addItems/addItems';
import ListItems from './Component/pages/listItems/listItems';
import Order from './Component/pages/order/order';
import Home from './Home';
import PageNotFound from './Component/pages/pageNotFound/pageNotFound';


const App = () => {
   const apiUrl = "http://localhost:6886/";
  return (
    <div>
      <Navbar />
      <hr />
      <div className="contents">
        <div className="side_bar_con">
          <SideBar />
        </div>
        <div className="display_con">
          <Routes>
            <Route path='/' element={<Home apiUrl={apiUrl} />} />
            <Route path='/add' element={<AddItems apiUrl={apiUrl} />} />
            <Route path='/order' element={<Order apiUrl={apiUrl} />} />
            <Route path='/list' element={<ListItems apiUrl={apiUrl} />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </div>
      </div>

    </div>
  )
}

export default App
