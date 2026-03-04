// This component represents the navigation bar of the application. It includes a logo, menu items, and icons for search and shopping basket. The menu items are highlighted based on the user's selection.
// assets: The component imports assets such as the logo, search icon, and basket icon from a centralized assets file.
// state: The component uses the useState hook to manage the state of the currently active menu item. When a menu item is clicked, the state is updated to reflect the active selection, which in turn updates the styling of the menu items to indicate which one is active.
// routing: The component uses the Link component from react-router-dom to enable navigation between different routes in the application without causing a full page reload.
// The Navbar component is a functional component that renders the navigation bar of the application. It includes a logo, menu items, and icons for search and shopping basket.
// The menu items are highlighted based on the user's selection, and the component uses state to manage the active menu item. The Link component from react-router-dom is used for navigation between different routes in the application.
// Used in: App.jsx

import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

const Navbar = ({setShowLogin}) => {

  const [menu, setMenu] = useState("home");

  const {getTotalCartAmount} = useContext(StoreContext);

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className='logo' /></Link>
      <ul className="navbar-menu">
  <li>
    <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
  </li>
  <li>
    <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
  </li>
  <li>
    <a href='#offers' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>Offers</a>
  </li>
  <li>
    <a href='#footer' onClick={()=>setMenu("contact us")} className={menu==="contact us"?"active":""}>Contact Us</a>
  </li>
</ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        <button onClick={()=>setShowLogin(true)}>sign in</button>
      </div>
    </div>
  )
}
export default Navbar