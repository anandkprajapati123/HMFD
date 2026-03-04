// The LoginPopup component is a functional component that renders a login/signup form as a popup. It uses the useState hook to manage the current state of the form, which can be either "Login" or "Sign Up". The component receives a prop called setShowLogin, which is a function used to toggle the visibility of the popup. The form includes input fields for email and password, and conditionally renders an additional input field for the user's name when in "Sign Up" mode. The component also includes a checkbox for agreeing to terms of use and privacy policy, and a button to submit the form. Additionally, there are links to switch between login and signup modes. The styling of the component is handled through an external CSS file, 'LoginPopup.css'. Overall, the LoginPopup component provides a user interface for authentication within the application.
// Used in: App.jsx to render a login/signup popup when the user clicks on the sign-in button in the Navbar component.


import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'

const LoginPopup = ({setShowLogin}) => {

  const [currState, setCurrState] = useState("Login")

  return (
    <div className='login-popup'>
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState==="Login"?<></>:
          <input type="text" placeholder='Your Name' required />}
          <input type="email" placeholder='Your Email' required />
          <input type="password" placeholder='Your Password' required />
        </div>
        <button>{currState==="Sign Up"?"Create account":"Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>Continue, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState==="Login"?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click Here!</span></p>:<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login Here</span></p>}
      </form>
    </div>
  )
}

export default LoginPopup