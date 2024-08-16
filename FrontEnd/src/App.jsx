import React from 'react'
import Navbar from './Component/Navbar/Navbar'
import Shop from './Component/Shop/Shop'
import Cart from './Component/Pages/Cart';
import PageNotFound from './Component/Pages/PageNotFound';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './Component/Footer/Footer';
import Order from './Component/Pages/Order';
import Verify from './Component/Verify/Verify';
import MyOrder from './Component/MyOrder/MyOrder';
import Profile from './Component/Profile/Profile';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<Order/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/orders' element={<MyOrder/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
