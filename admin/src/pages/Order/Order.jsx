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
        fetchAllOrders();
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  const getStatusClass = (status) => {
    if (status === "Delivered") return "status-delivered";
    if (status === "Out for Delivery") return "status-delivery";
    return "status-processing";
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="orders-page">
      <div className="page-header" style={{ marginBottom: "24px" }}>
        <h1 className="page-title">Orders</h1>
        <p className="page-subtitle">Track and manage all customer orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="orders-empty">
          <div className="orders-empty-icon">📦</div>
          <h3>No orders yet</h3>
          <p>Orders will appear here once customers start placing them.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order, index) => (
            <div key={index} className="order-card">
              {/* Icon */}
              <div className="order-icon-wrap">
                <img src={assets.parcel_icon} alt="parcel" />
              </div>

              {/* Info */}
              <div className="order-info">
                <p className="order-items-text">
                  {order.items.map((item, i) =>
                    i === order.items.length - 1
                      ? `${item.name} ×${item.quantity}`
                      : `${item.name} ×${item.quantity}, `
                  )}
                </p>

                <div className="order-meta-row">
                  <span className="order-meta-item">
                    <span className="order-meta-icon">👤</span>
                    {order.address.firstName} {order.address.lastName}
                  </span>
                  <span className="order-meta-item">
                    <span className="order-meta-icon">📞</span>
                    {order.address.phone}
                  </span>
                  <span className={`status-badge ${getStatusClass(order.status)}`}>
                    {order.status || "Food Processing"}
                  </span>
                </div>

                <div className="order-address-block">
                  <strong>Delivery Address</strong>
                  {order.address.street},{" "}
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country} – {order.address.pincode}
                </div>
              </div>

              {/* Actions */}
              <div className="order-actions">
                <div>
                  <div className="order-amount">₹{order.amount}</div>
                  <div className="order-count-badge">{order.items.length} item{order.items.length > 1 ? "s" : ""}</div>
                </div>
                <select
                  onChange={(e) => statusHandler(order._id, e.target.value)}
                  value={order.status || "Food Processing"}
                  className="status-select"
                >
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
