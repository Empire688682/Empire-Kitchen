import './Profile.css';
import React, { useState } from 'react'

const Profile = () => {
  const [user, setUser] = useState(localStorage.getItem("User Data") || "");
  console.log(user);
  
  
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
          <form >
            <div>
              <p>First name</p>
              <input
                type="text"
              />
            </div>
            <div>
              <p>Last name</p>
              <input
                type="text"
              />
            </div>
            <div>
              <p>Email</p>
              <input
                type="email"
              />
            </div>
            <div>
              <p>Gender</p>
              <select
              >
                <option value="male">Male</option>
                <option value="famale">Famale</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div>
              <p>Date of birth</p>
              <input
                type="date"
              />
            </div>
            <div className="newsletters">
              <input
                className="newsletter_input"
                type="checkbox"
              />
              <p>Newsletter subsciption</p>
            </div>
            <div className="save_button">
              <input
                className="submit_button"
                type="submit"
                value="save changes"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
