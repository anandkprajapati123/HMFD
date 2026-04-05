import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";
import "./MyOrders.css";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.post(
        url+"/api/order/userorders",{},{headers:{token}}
      );

      if (res.data.success) {
        setOrders(res.data.data);
      }

    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-card">
            <p><img src={assets.parcel_icon} alt="" /></p>
            <p><b>Order ID:</b> {order._id}</p>
            <p><b>Amount:</b> ₹{order.amount}</p>
            <p><b>Status:</b> {order.status}</p>

            <div>
              <b>Items:</b>
              {order.items.map((item, i) => (
                <p key={i} className="order-item">
                  {item.name} × {item.quantity}
                </p>
              ))}
            </div>
            <button onClick={fetchOrders}>Track Order</button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;