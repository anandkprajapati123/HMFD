// Used in App.jsx to render the place order page when the user navigates to the place order route. The PlaceOrder component is a form that collects delivery information from the user and displays the cart total. It uses the StoreContext to access the total cart amount and calculates the delivery fee and total amount accordingly. The form includes fields for the user's name, email, address, and phone number, as well as a button to proceed to payment. The component is styled using the PlaceOrder.css file.
// The PlaceOrder component is a functional component that renders a form for collecting delivery information and displaying the cart total. It uses the useContext hook to access the StoreContext, which provides the getTotalCartAmount function to calculate the total amount in the cart. The component also uses the useNavigate hook from react-router-dom to navigate to the payment page when the user clicks the "Proceed to Payment" button. The form includes input fields for the user's name, email, address, and phone number, and it calculates the delivery fee based on whether there are items in the cart. The styling of the component is handled through an external CSS file, 'PlaceOrder.css'. Overall, the PlaceOrder component provides a user interface for users to enter their delivery information and review their cart total before proceeding to payment.

import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    const orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    if (orderItems.length === 0) {
      alert("Cart is empty");
      return;
    }
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 6,
    };
    // send data to our API
    try {
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });

      if (response.data.success) {
        const { order, key } = response.data;

        const options = {
          key: key,
          amount: order.amount,
          currency: order.currency,
          name: "Food Delivery",
          description: "Order Payment",
          order_id: order.id,

          handler: async function (response) {
            try {
              const verifyRes = await axios.post(
                url + "/api/order/verify",
                {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                },
                { headers: { token } },
              );

              if (verifyRes.data.success) {
                await axios.post(
                  url + "/api/order/delete-failed",
                  {},
                  { headers: { token } },
                );
                alert("Payment Verified");
                setTimeout(() => {
                  window.location.href = "/myorders";
                }, 1000);
                window.location.href = "/success?refresh=true";
              } else {
                alert("Payment verification failed");
              }
            } catch (error) {
              console.log(error);
              alert("Verification error");
            }
          },

          modal: {
            ondismiss: function () {
              alert("Payment Cancelled");
            },
          },

          prefill: {
            name: data.firstName + " " + data.lastName,
            email: data.email,
            contact: data.phone,
          },

          theme: { color: "#4caf7d" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      console.log("FULL ERROR:", error);
      console.log("BACKEND ERROR:", error.response?.data);
      alert(error.response?.data?.message || "Server Error");
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-container">
        <div className="place-order-left">
          <h2 className="title">Delivery Information</h2>

          <div className="form-group multi-fields">
            <input
              required
              name="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
              type="text"
              placeholder="First Name"
            />
            <input
              required
              name="lastName"
              onChange={onChangeHandler}
              value={data.lastName}
              type="text"
              placeholder="Last Name"
            />
          </div>

          <div className="form-group">
            <input
              required
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="Email Address"
            />
          </div>

          <div className="form-group">
            <input
              required
              name="street"
              onChange={onChangeHandler}
              value={data.street}
              type="text"
              placeholder="Street Address"
            />
          </div>

          <div className="form-group multi-fields">
            <input
              required
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              type="text"
              placeholder="City"
            />
            <input
              required
              name="state"
              onChange={onChangeHandler}
              value={data.state}
              type="text"
              placeholder="State"
            />
          </div>

          <div className="form-group multi-fields">
            <input
              required
              name="pincode"
              onChange={onChangeHandler}
              value={data.pincode}
              type="text"
              placeholder="Pin Code"
            />
            <input
              required
              name="country"
              onChange={onChangeHandler}
              value={data.country}
              type="text"
              placeholder="Country"
            />
          </div>

          <div className="form-group">
            <input
              required
              name="phone"
              onChange={onChangeHandler}
              value={data.phone}
              type="text"
              placeholder="Phone Number"
            />
          </div>
        </div>

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
              <b>
                ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 6}
              </b>
            </div>

            <button type="submit" className="payment-btn">
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
