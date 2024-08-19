import './Profile.css';
import React, { useState } from 'react';
import axios from 'axios';
import { UseGlobalContext } from '../../Context';

const Profile = () => {
  const {url} = UseGlobalContext()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("User Data")) || "");
  const [data, setData] = useState({
    userId: `${user._id}`,
    fName: `${user.fName}`,
    lName: `${user.lName}`,
    email: `${user.email}`,
    gender: `${user.gender}`,
    dBirth: `${user.dBirth}`
  });
  const [resMessage, setResMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const edditUser = async () =>{
    try {
      setLoading(true)
      const response = await axios.post(url+"api/users/eddit", data);
      if(response){
        setTimeout(()=>{
          setResMessage(false);
        }, 1000);
        setResMessage(true);
        const User = response.data.user
        localStorage.setItem("User Data", JSON.stringify(User));
      }
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false)
    }
  }

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    edditUser()
  };
  
  
  return (
    <div className='profile'>
      <div className="small_col">
        <h2>ACCOUT DASHBOARD</h2>
        <ul>
          <li><span>Account Information</span></li>
          <li><span>Address Book</span></li>
          <li><span>My Orders</span></li>
        </ul>
      </div>
      <div className="big_col">
        <div className="content_block_title">
          <h2>User Information</h2>
        </div>
        <div className="info_form">
        <form onSubmit={handleFormSubmission}>
            <input
              onChange={handleOnchange}
              value={data.fName}
              name="fName"
              type="text"
              placeholder='First Name'
              required
            />
            <input
              onChange={handleOnchange}
              value={data.lName}
              name="lName"
              type="text"
              placeholder='Last Name'
              required
            />
          <input
            onChange={handleOnchange}
            value={data.email}
            name="email"
            type="email"
            placeholder='Email'
            required
          />
            <select onChange={handleOnchange} name="gender" value={data.gender}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              onChange={handleOnchange}
              value={data.dBirth}
              name="dBirth"
              type="date"
              required
            />
            {
              resMessage ? <p style={{color:"black"}}>Saved Changed</p>:""
            }
          <input type='submit' value={loading? "Saving...":"Save Change"}></input>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
