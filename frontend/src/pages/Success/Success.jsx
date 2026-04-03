import React from "react";
import { useNavigate } from "react-router-dom";
import "./success.css";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <h1 className="success-title">Payment Successful</h1>
      <p>Your order has been placed successfully.</p>

      <div className="success-buttons">
        <button onClick={() => navigate("/")}>Go Home</button>
        <button onClick={() => navigate("/myorders")}>View My Orders</button>
      </div>
    </div>
  );
};

export default Success;
