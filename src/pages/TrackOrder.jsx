import { useState } from "react";
import axios from "axios";

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const trackOrder = async () => {
    if (!orderId.trim()) {
      setError("Please enter your Order ID");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setOrder(null);

      const id = orderId.trim().toUpperCase();

      const res = await axios.get(
        `https://aquadude-backend.onrender.com/api/orders/${id}`
      );

      if (res.data.success && res.data.data) {
        setOrder(res.data.data);
      } else {
        setError("Order not found.");
      }
    } catch (err) {
      console.log("Track order error:", err);
      setError("Order not found. Please check your Order ID.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusText = () => {
    if (order.status === "Delivered") {
      return "🟢 Delivered";
    }

    if (order.status === "Out for Delivery") {
      return "🔵 Out for Delivery";
    }

    return "🟡 Order Received";
  };

  const getStatusColor = () => {
    if (order.status === "Delivered") {
      return "#16a34a";
    }

    if (order.status === "Out for Delivery") {
      return "#2563eb";
    }

    return "#f59e0b";
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        minHeight: "70vh",
      }}
    >
      <h1
        style={{
          color: "#0284c7",
          marginBottom: "10px",
        }}
      >
        💧 Track Your Order
      </h1>

      <p>
        Enter the Order ID you received after placing your order.
      </p>

      <input
        type="text"
        placeholder="Example: AQUA-22KITGT"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        style={{
          width: "100%",
          padding: "14px",
          marginTop: "15px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          fontSize: "16px",
          boxSizing: "border-box",
        }}
      />

      <button
        onClick={trackOrder}
        disabled={loading}
        style={{
          marginTop: "15px",
          padding: "14px 25px",
          background: "#0284c7",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "16px",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? "Searching..." : "Track Order"}
      </button>

      {error && (
        <p
          style={{
            color: "red",
            marginTop: "20px",
          }}
        >
          {error}
        </p>
      )}

      {order && (
        <div
          style={{
            marginTop: "30px",
            padding: "25px",
            background: "#ffffff",
            color: "#111111",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              marginTop: 0,
            }}
          >
            Order Details
          </h2>

          <p>
            <strong>Order ID:</strong>{" "}
            {order.orderId || "N/A"}
          </p>

          <p>
            <strong>Product:</strong>{" "}
            {order.product || "N/A"}
          </p>

          <p>
            <strong>Quantity:</strong>{" "}
            {order.quantity || 0}
          </p>

          <p>
            <strong>Total:</strong>{" "}
            ₹{order.totalPrice || 0}
          </p>

          <p>
            <strong>Order Date:</strong>{" "}
            {order.createdAt
              ? new Date(order.createdAt).toLocaleString("en-IN")
              : "N/A"}
          </p>

          <h3
            style={{
              marginTop: "25px",
              marginBottom: "10px",
            }}
          >
            Status
          </h3>

          <p
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: getStatusColor(),
              marginTop: 0,
            }}
          >
            {getStatusText()}
          </p>
        </div>
      )}
    </div>
  );
}