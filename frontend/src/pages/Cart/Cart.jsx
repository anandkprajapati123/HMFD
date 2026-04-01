// This is the Cart page component. It displays the items in the cart and allows the user to remove items from the cart. It uses the StoreContext to get the cart items, food list, and removeFromCart function. The component renders a list of cart items with their details such as title, price, quantity, total, and a remove button. The styling is handled through an external CSS file, 'Cart.css', to enhance the visual presentation of the component. Overall, the Cart component provides an interactive way for users to view and manage their cart items within the application.Used in App.jsx to render the cart page when the user navigates to the cart route.
// Used in: App.jsx to render the cart page when the user navigates to the cart route.

import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {

  const { cartItems, food_list, removeFromCart, getTotalCartAmount,url } = useContext(StoreContext);
  const navigate = useNavigate()

  return (
    <div className="cart">
      <div className="cart-container">

        <div className="cart-items">

          {food_list.map((item) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={item._id} className="cart-item">
                  <img src={url+"/images/"+item.image} alt="" />
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p>₹{item.price}</p>
                  </div>

                  <div className="cart-item-qty">
                    <p>Qty: {cartItems[item._id]}</p>
                  </div>

                  <div className="cart-item-total">
                    ₹{item.price * cartItems[item._id]}
                  </div>

                  <p onClick={() => removeFromCart(item._id)} className="remove-btn">✕</p>

                </div>
              );
            }
            return null;
          })}

        </div>

        <div className="cart-bottom">

          <div className="cart-total">
            <h2>Cart Summary</h2>

            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 6}</p>
            </div>

            <div className="cart-total-details total">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 6}</b>
            </div>

            <button onClick={() => navigate('/order')}>
              Proceed to Checkout
            </button>
          </div>

          <div className="cart-promocode">
            <p>Have a promo code?</p>

            <div className="cart-promocode-input">
              <input type="text" placeholder="Enter code" />
              <button>Apply</button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Cart;