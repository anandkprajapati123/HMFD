// The Footer component is a functional component that renders the footer section of the website. It includes three main sections: the left section contains the company logo, a brief description, and social media icons; the center section lists company-related links such as Home, About us, Delivery, and Privacy policy; and the right section provides contact information including a phone number and email address. The component also includes a horizontal line and a copyright notice at the bottom. The styling for the Footer component is handled through an external CSS file, 'Footer.css', to ensure a visually appealing and consistent design across the website. Overall, the Footer component serves as an informative and navigational element for users visiting the website.Used in Home.jsx to provide information about the company and contact details at the bottom of the page.
// Used in: Home.jsx to provide information about the company and contact details at the bottom of the page.

import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>

      <div className="footer-container">

        <div className="footer-content">

          {/* LEFT */}
          <div className="footer-content-left">
            <img src={assets.play_store} alt="" className="footer-logo" />

            <p>
              Delicious food delivered to your doorstep. Fresh ingredients,
              fast delivery, and amazing taste every time.
            </p>

            <div className="footer-social-icons">
              <img src={assets.facebook_icon} alt="" />
              <img src={assets.twitter_icon} alt="" />
              <img src={assets.linkedin_icon} alt="" />
            </div>
          </div>

          {/* CENTER */}
          <div className="footer-content-center">
            <h2>Company</h2>
            <ul>
              <li>Home</li>
              <li>About Us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          {/* RIGHT */}
          <div className="footer-content-right">
            <h2>Contact</h2>
            <ul>
              <li>+91-9137184135</li>
              <li>anandkprajapati011@gmail.com</li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="footer-copyright">
          © 2026 Tomato.com — All Rights Reserved
        </p>

      </div>

    </div>
  )
}

export default Footer