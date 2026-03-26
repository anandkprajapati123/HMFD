// Used in App.jsx to render the place order page when the user navigates to the place order route. The PlaceOrder component is a form that collects delivery information from the user and displays the cart total. It uses the StoreContext to access the total cart amount and calculates the delivery fee and total amount accordingly. The form includes fields for the user's name, email, address, and phone number, as well as a button to proceed to payment. The component is styled using the PlaceOrder.css file.
// The PlaceOrder component is a functional component that renders a form for collecting delivery information and displaying the cart total. It uses the useContext hook to access the StoreContext, which provides the getTotalCartAmount function to calculate the total amount in the cart. The component also uses the useNavigate hook from react-router-dom to navigate to the payment page when the user clicks the "Proceed to Payment" button. The form includes input fields for the user's name, email, address, and phone number, and it calculates the delivery fee based on whether there are items in the cart. The styling of the component is handled through an external CSS file, 'PlaceOrder.css'. Overall, the PlaceOrder component provides a user interface for users to enter their delivery information and review their cart total before proceeding to payment.



import React, { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);

  return (
    <div className="place-order">
      <div className="place-order-container">

        {/* LEFT FORM */}
        <div className="place-order-left">
          <h2 className="title">Delivery Information</h2>

          <div className="form-group multi-fields">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>

          <div className="form-group">
            <input type="email" placeholder="Email Address" />
          </div>

          <div className="form-group">
            <input type="text" placeholder="Street Address" />
          </div>

          <div className="form-group multi-fields">
            <input type="text" placeholder="City" />
            <input type="text" placeholder="State" />
          </div>

          <div className="form-group multi-fields">
            <input type="text" placeholder="Pin Code" />
            <input type="text" placeholder="Country" />
          </div>

          <div className="form-group">
            <input type="text" placeholder="Phone Number" />
          </div>
        </div>

        {/* RIGHT SUMMARY */}
        <div className="place-order-right">
          <div className="order-summary">

            <h2>Order Summary</h2>

            <div className="summary-row">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>

            <div className="summary-row">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 6}</p>
            </div>

            <div className="summary-row total">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 6}</b>
            </div>

            <button className="payment-btn">Proceed to Payment</button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default PlaceOrder;