// The Header component is a functional component that serves as the top section of the application. It displays a welcoming message and a call-to-action button for users to view the menu. The component is styled using an external CSS file, 'Header.css', which defines the layout and appearance of the header section. The Header component is designed to be visually appealing and to encourage users to explore the food options available on the platform. It is a simple yet effective component that contributes to the overall user experience of the application.
// Used in: Home.jsx


import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
      <div className="overlay"></div>

      <div className="header-contents">
        <h2>Fresh Homemade Meals, Delivered Daily</h2>
        <p>Healthy. Hygienic. Made with Love.</p>
        <a href="#explore-menu" className="header-btn">
          View Menu
        </a>
      </div>
    </div>
  )
}

export default Header