import React, { useEffect, useState } from "react";
import "./Order.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

function Orders({ url }) {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Failed to load orders");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  const statusHandler = async (orderId, newStatus) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: newStatus,
      });

      if (response.data.success) {
        toast.success("Status Updated");
        fetchAllOrders(); // refresh UI
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="orders-container">
      <h2 className="orders-title">All Orders</h2>

      <div className="orders-list">
        {orders.map((order, index) => (
          <div key={index} className="order-card">
            <div className="order-left">
              <img src={assets.parcel_icon} alt="parcel" />

              <div className="order-details">
                <p className="order-food">
                  {order.items.map((item, i) =>
                    i === order.items.length - 1
                      ? `${item.name} x${item.quantity}`
                      : `${item.name} x${item.quantity}, `,
                  )}
                </p>

                <p className="order-user">
                  {order.address.firstName} {order.address.lastName}
                </p>

                <div className="order-address">
                  <p>{order.address.street}</p>
                  <p>
                    {order.address.city}, {order.address.state},{" "}
                    {order.address.country} - {order.address.pincode}
                  </p>
                </div>

                <p className="order-phone">{order.address.phone}</p>
              </div>
            </div>

            <div className="order-right">
              <p>
                <b>Items:</b> {order.items.length}
              </p>
              <p>
                <b>Total:</b> ₹{order.amount}
              </p>

              <select
                onChange={(e) => statusHandler(order._id, e.target.value)}
                className="status-select">
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
