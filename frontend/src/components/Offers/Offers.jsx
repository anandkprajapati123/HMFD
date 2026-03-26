// Offers.jsx
// The Offers component is a functional component that displays a section of exciting offers for users. It includes a title, a subtitle, and a container that holds individual offer cards. Each offer card highlights a specific promotion, such as a discount or free delivery, along with the relevant details and coupon codes. The Offers component is designed to attract users' attention and encourage them to take advantage of the available deals. It can be used in the Home page or any other relevant section of the application to showcase current promotions and incentives for customers.
// Used in: Home.jsx to display current promotions and incentives for customers.



import React from 'react'
import './Offers.css'

const Offers = () => {
  return (
    <div className='offers' id='offers'>

      <div className="offers-container">

        {/* HEADER */}
        <div className="offers-header">
          <h2>Exciting Offers</h2>
          <p>Fresh homemade meals at unbeatable prices!</p>
        </div>

        {/* CARDS */}
        <div className="offers-list">

          <div className="offer-card">
            <h3>FLAT 20% OFF</h3>
            <p>On your first order above ₹199</p>
            <span className='coupon'>FRESH20</span>
          </div>

          <div className="offer-card">
            <h3>Free Delivery</h3>
            <p>On orders above ₹299</p>
            <span className='coupon'>No Code</span>
          </div>

          <div className="offer-card">
            <h3>Buy 2 Get 1 Free</h3>
            <p>On selected Thali combos</p>
            <span className='coupon'>Limited</span>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Offers