import React, { useState } from 'react'
import './LoginSignin.css';
import { RxCross2 } from "react-icons/rx";

const LogSign = ({setLoginStatus}) => {
    const [loginStage, setLogInStage] = useState("Login")
  return (
    <div className='log-sign-con'>
        <div className='log-sign'>
        <div onClick={() => setLoginStatus(false)}><RxCross2 className="icon" /></div>
        {
            loginStage === "Signup"? <h4>Signup</h4>:<h4>Login</h4>
        }
      <form>
        {
            loginStage === "Signup"? <input type="text" placeholder='Your Name' required/>:<></>
        }
        <input type="email" placeholder='Your Email' required/>
        <input type="password" placeholder='Your Password'/>
        <button type='submit'>{loginStage === "Signup"? "Sign Up":'Login'}</button>
      </form>
      <p className='form-policy'><input type='checkbox' required /> <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet illo laborum accusamus modi consequuntur ipsam iusto quas saepe eveniet nulla, ipsa doloremque soluta velit minus ea rerum consequatur, vero deserunt.</span></p>
      <div className="login-status">
        <p className='create-already'>Create a new account? <span onClick={()=> setLogInStage("Signup")}>Click here</span></p>
        <p className='create-already'>Already have account? <span onClick={()=> setLogInStage("Login")}>Login</span></p>
      </div>
        </div>
    
    </div>
  )
}

export default LogSign
