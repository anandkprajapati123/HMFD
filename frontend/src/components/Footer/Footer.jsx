// The Footer component is a functional component that renders the footer section of the website. It includes three main sections: the left section contains the company logo, a brief description, and social media icons; the center section lists company-related links such as Home, About us, Delivery, and Privacy policy; and the right section provides contact information including a phone number and email address. The component also includes a horizontal line and a copyright notice at the bottom. The styling for the Footer component is handled through an external CSS file, 'Footer.css', to ensure a visually appealing and consistent design across the website. Overall, the Footer component serves as an informative and navigational element for users visiting the website.Used in Home.jsx to provide information about the company and contact details at the bottom of the page.
// Used in: Home.jsx to provide information about the company and contact details at the bottom of the page.

import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.play_store} alt="" />
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum similique reprehenderit accusamus.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get In Touch</h2>
          <ul>
            <li>+91-72357-87323</li>
            <li>food123@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2026 © Tomato.com - All Right Reserved</p>
    </div>
  )
}

export default Footer