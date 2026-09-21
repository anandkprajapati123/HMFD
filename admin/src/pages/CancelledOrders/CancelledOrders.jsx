import React, { useEffect, useState } from "react";
import "./CancelledOrders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

function CancelledOrders({ url }) {
  const [cancelledOrders, setCancelledOrders] = useState([]);

  const fetchCancelledOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        // Filter orders that are not paid OR status is Cancelled
        const filtered = response.data.data.filter(
          (order) => !order.payment || order.status === "Cancelled"
        );
        setCancelledOrders(filtered);
      } else {
        toast.error("Failed to load cancelled orders");
      }
    } catch (error) {
      toast.error("Server error loading cancelled orders");
    }
  };

  const removeOrderHandler = async (orderId) => {
    try {
      const response = await axios.post(url + "/api/order/remove", { orderId });
      if (response.data.success) {
        toast.success("Cancelled order record removed");
        fetchCancelledOrders();
      } else {
        toast.error("Failed to remove order");
      }
    } catch (error) {
      toast.error("Server error removing order");
    }
  };

  useEffect(() => {
    fetchCancelledOrders();
  }, []);

  return (
    <div className="cancelled-orders-page">
      <div className="page-header" style={{ marginBottom: "24px" }}>
        <h1 className="page-title">Cancelled / Unpaid Orders</h1>
        <p className="page-subtitle">View orders where payment was cancelled or failed by the customer</p>
      </div>

      {cancelledOrders.length === 0 ? (
        <div className="cancelled-empty">
          <div className="cancelled-empty-icon">✅</div>
          <h3>No Cancelled Orders</h3>
          <p>Great news! There are currently no cancelled or unpaid orders.</p>
        </div>
      ) : (
        <div className="cancelled-orders-list">
          {cancelledOrders.map((order, index) => (
            <div key={index} className="cancelled-order-card">
              <div className="order-icon-wrap cancelled-icon">
                <img src={assets.parcel_icon} alt="parcel" />
              </div>

              <div className="cancelled-order-info">
                <div className="cancelled-badge-header">
                  <span className="unpaid-badge">❌ Payment Cancelled / Unpaid</span>
                  <span className="cancelled-date">
                    {order.date ? new Date(order.date).toLocaleString() : "Recently"}
                  </span>
                </div>

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
                    {order.address?.firstName} {order.address?.lastName}
                  </span>
                  <span className="order-meta-item">
                    <span className="order-meta-icon">📞</span>
                    {order.address?.phone}
                  </span>
                </div>

                <div className="order-address-block">
                  <strong>Delivery Address</strong>
                  {order.address?.street}, {order.address?.city}, {order.address?.state}, {order.address?.country} – {order.address?.pincode}
                </div>
              </div>

              <div className="cancelled-order-actions">
                <div className="order-amount">₹{order.amount}</div>
                <div className="order-count-badge">
                  {order.items.length} item{order.items.length > 1 ? "s" : ""}
                </div>
                <button
                  className="delete-cancelled-btn"
                  onClick={() => removeOrderHandler(order._id)}
                  title="Remove from history"
                >
                  Delete Record
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CancelledOrders;
