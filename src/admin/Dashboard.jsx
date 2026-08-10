import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "https://aquadude-backend.onrender.com/api/orders"
      );

      setOrders(res.data.data || []);
    } catch (error) {
      console.log("Failed to fetch orders:", error);
    }
  };

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const totalRevenue = orders.reduce(
    (total, order) => total + Number(order.totalPrice || 0),
    0
  );

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        <Card
          title="Total Orders"
          value={totalOrders}
        />

        <Card
          title="Pending Orders"
          value={pendingOrders}
        />

        <Card
          title="Delivered Orders"
          value={deliveredOrders}
        />

        <Card
          title="Total Revenue"
          value={`₹${totalRevenue}`}
        />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
      }}
    >
      <h3
        style={{
          margin: 0,
          color: "#555",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          marginTop: "15px",
          color: "#0284c7",
        }}
      >
        {value}
      </h1>
    </div>
  );
}