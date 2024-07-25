import React, { useState } from 'react'
import './LoginSignin.css';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { UseGlobalContext } from '../../Context';

const LogSign = ({ setLoginStatus }) => {
  const { url, setToken, token } = UseGlobalContext();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loginStage, setLogInStage] = useState("Login")

  const userControl = async (e) => {
    e.preventDefault();
    let newUrl = url
    if (loginStage === "Login") {
      newUrl += "api/users/login"
    }
    else {
      newUrl += "api/users/add"
    }
    const response = await axios.post(newUrl, data);
    console.log(newUrl)
    if (response.data.success === true) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.success);
      setLoginStatus(false)
    }
    else {
      alert(response.data.message);
    }
  };


  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  const handleFormSubmission = (e) => {
    e.preventDefault();
    userControl();
  }

  return (
    <div className='log-sign-con'>
      <div className='log-sign'>
        <div onClick={() => setLoginStatus(false)}><RxCross2 className="icon" /></div>
        {
          loginStage === "Signup" ? <h4>Signup</h4> : <h4>Login</h4>
        }
        <form onSubmit={handleFormSubmission}>
          {
            loginStage === "Signup" ? <input onChange={handleOnchange} value={data.name} name="name" type="text" placeholder='Your Name' required /> : <></>
          }
          <input onChange={handleOnchange} value={data.email} name="email" type="email" placeholder='Your Email' required />
          <input onChange={handleOnchange} value={data.password} name="password" type="password" placeholder='Your Password' />
          <button type='submit'>{loginStage === "Signup" ? "Sign Up" : 'Login'}</button>
        </form>
        <p className='form-policy'><input type='checkbox' required /> <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet illo laborum accusamus modi consequuntur ipsam iusto quas saepe eveniet nulla, ipsa doloremque soluta velit minus ea rerum consequatur, vero deserunt.</span></p>
        <div className="login-status">
          <p className='create-already'>Create a new account? <span onClick={() => setLogInStage("Signup")}>Click here</span></p>
          <p className='create-already'>Already have account? <span onClick={() => setLogInStage("Login")}>Login</span></p>
        </div>
      </div>

    </div>
  )
}

export default LogSign
