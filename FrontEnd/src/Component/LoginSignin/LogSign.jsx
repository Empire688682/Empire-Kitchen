import React, { useState } from 'react'
import './LoginSignin.css';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { UseGlobalContext } from '../../Context';
import loading_Gif from '../Asset/loading_gif.gif'

const LogSign = ({ setLoginStatus }) => {
  const { url } = UseGlobalContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    fName: "",
    lName: "",
    email: "",
    gender: "Male",
    password: "",
    dBirth: ""
  });

  const [loginStage, setLogInStage] = useState("Login");

  const userControl = async () => {
    let newUrl = url;
    if (loginStage === "Login") {
      newUrl += "api/users/login";
    } else {
      newUrl += "api/users/add";
    }

    try {
      setLoading(true);
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        console.log("Full Response:", response);
        localStorage.setItem("token", response.data.token);
        const User = response.data.user
        localStorage.setItem("User Data", JSON.stringify(User));
        setLoginStatus(false);
        setData({
          fName: "",
          lName: "",
          email: "",
          gender: "Male",
          password: "",
          dBirth: ""
        });
        window.location.replace("/")
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    userControl();
  };

  return (
    <div className='log-sign-con'>
      <div className='log-sign'>
        <div onClick={() => setLoginStatus(false)}><RxCross2 className="icon" /></div>
        <h4>{loginStage === "Signup" ? "Signup" : "Login"}</h4>
        <form onSubmit={handleFormSubmission}>
          {loginStage === "Signup" && (
            <input
              onChange={handleOnchange}
              value={data.fName}
              name="fName"
              type="text"
              placeholder='First Name'
              required
            />
          )}
          {loginStage === "Signup" && (
            <input
              onChange={handleOnchange}
              value={data.lName}
              name="lName"
              type="text"
              placeholder='Last Name'
              required
            />
          )}
          <input
            onChange={handleOnchange}
            value={data.email}
            name="email"
            type="email"
            placeholder='Email'
            required
          />
          <input
            onChange={handleOnchange}
            value={data.password}
            name="password"
            type="password"
            placeholder='Password'
            required
          />
          {loginStage === "Signup" && (
            <select onChange={handleOnchange} name="gender" value={data.gender}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          )}
          {loginStage === "Signup" && (
            <input
              onChange={handleOnchange}
              value={data.dBirth}
              name="dBirth"
              type="date"
              required
            />
          )}
          {
            loading ? <button className='loading_gif'><span>PROCESSING</span><img src={loading_Gif} alt="" /></button>
              :
              <button type='submit'>{loginStage === "Signup" ? "Sign Up" : 'Login'}</button>
          }
        </form>
        <div className="login-status">
          {loginStage === "Signup" ? (
            <p className='create-already'>Already have an account? <span onClick={() => setLogInStage("Login")}>Login</span></p>
          ) : (
            <p className='create-already'>Create a new account? <span onClick={() => setLogInStage("Signup")}>Click here</span></p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LogSign;
