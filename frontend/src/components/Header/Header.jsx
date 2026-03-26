// The Header component is a functional component that serves as the top section of the application. It displays a welcoming message and a call-to-action button for users to view the menu. The component is styled using an external CSS file, 'Header.css', which defines the layout and appearance of the header section. The Header component is designed to be visually appealing and to encourage users to explore the food options available on the platform. It is a simple yet effective component that contributes to the overall user experience of the application.
// Used in: Home.jsx


import React from 'react'
import './Header.css'
import { assets } from '../../assets/assets'

const Header = () => {
  return (
    <div className='header'>
      <div className="header-contents">
        <h1>Fresh Healthy Food</h1>
        <p>Recommended for you</p>
        <div className="header-search">
          <img src={assets.search_icon} className="search-icon" alt="" />
          <input type="text" placeholder="Search your favorite food..." />
        </div>
      </div>
    </div>
  )
}

export default Header