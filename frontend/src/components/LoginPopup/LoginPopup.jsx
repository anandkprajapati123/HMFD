// The LoginPopup component is a functional component that renders a login/signup form as a popup. It uses the useState hook to manage the current state of the form, which can be either "Login" or "Sign Up". The component receives a prop called setShowLogin, which is a function used to toggle the visibility of the popup. The form includes input fields for email and password, and conditionally renders an additional input field for the user's name when in "Sign Up" mode. The component also includes a checkbox for agreeing to terms of use and privacy policy, and a button to submit the form. Additionally, there are links to switch between login and signup modes. The styling of the component is handled through an external CSS file, 'LoginPopup.css'. Overall, the LoginPopup component provides a user interface for authentication within the application.
// Used in: App.jsx to render a login/signup popup when the user clicks on the sign-in button in the Navbar component.
// axios is use for API call

import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url,setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if(currState==="Login"){
      newUrl +="/api/user/login";
    }
    else{
      newUrl +="/api/user/register";
    }

    const response = await axios.post(newUrl,data);

    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      setShowLogin(false);
      window.location.reload();
    }
    else{
      alert(response.data.message);
    }

  }



  return (
    <div className="login-popup" onClick={() => setShowLogin(false)}>
      <form onSubmit={onLogin} className="login-popup-container" onClick={(e) => e.stopPropagation()}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>

        <div className="login-popup-inputs">
          {currState === "Login" ? null : (
            <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Your Name"
              required />
          )}
          <input
            name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Your Email" required />
          <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="Your Password" required />
        </div>

        <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"}</button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>Agree to terms & privacy policy</p>
        </div>

        {currState === "Login" ? (
          <p className="toggle-text">
            Create a new account?
            <span onClick={() => setCurrState("Sign Up")}> Sign Up</span>
          </p>
        ) : (
          <p className="toggle-text">
            Already have an account?
            <span onClick={() => setCurrState("Login")}> Login</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
