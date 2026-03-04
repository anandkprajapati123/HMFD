// Used in App.jsx to render the place order page when the user navigates to the place order route. The PlaceOrder component is a form that collects delivery information from the user and displays the cart total. It uses the StoreContext to access the total cart amount and calculates the delivery fee and total amount accordingly. The form includes fields for the user's name, email, address, and phone number, as well as a button to proceed to payment. The component is styled using the PlaceOrder.css file.
// The PlaceOrder component is a functional component that renders a form for collecting delivery information and displaying the cart total. It uses the useContext hook to access the StoreContext, which provides the getTotalCartAmount function to calculate the total amount in the cart. The component also uses the useNavigate hook from react-router-dom to navigate to the payment page when the user clicks the "Proceed to Payment" button. The form includes input fields for the user's name, email, address, and phone number, and it calculates the delivery fee based on whether there are items in the cart. The styling of the component is handled through an external CSS file, 'PlaceOrder.css'. Overall, the PlaceOrder component provides a user interface for users to enter their delivery information and review their cart total before proceeding to payment.



import React, { useContext } from "react";
import "./PlaceOrder.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);

  const navigate = useNavigate();
  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>
        <input type="email" placeholder="Email Address" />
        <input type="text" placeholder="Street" />
        <div className="multi-fields">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="Pin Code" />
          <input type="text" placeholder="Country" />
        </div>
        <input type="text" placeholder="Phone Number" />
      </div>
      <div className="place-order-right">
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Sub Total</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delovery Fee</p>
                <p>₹{getTotalCartAmount() === 0 ? 0 : 6}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 6}
                </b>
              </div>
            </div>
            <button>Proceed to Payment</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;