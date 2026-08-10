import { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "https://aquadude-backend.onrender.com/api/orders"
      );

      setOrders(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const markDelivered = async (id) => {
    try {
      await axios.put(
        `https://aquadude-backend.onrender.com/api/orders/${id}`
      );

      fetchOrders();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      order.name?.toLowerCase().includes(searchText) ||
      order.phone?.toLowerCase().includes(searchText) ||
      order.product?.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" ||
      order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Customer Orders</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name, phone or product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "15px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          fontSize: "16px",
          boxSizing: "border-box",
        }}
      />

      {/* Status Filter */}
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        style={{
          marginTop: "10px",
          padding: "12px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          fontSize: "16px",
        }}
      >
        <option value="All">All Orders</option>
        <option value="Pending">Pending</option>
        <option value="Delivered">Delivered</option>
      </select>

      {/* Orders Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
        border="1"
      >
        <thead
          style={{
            background: "#0284c7",
            color: "white",
          }}
        >
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price / Unit</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order._id}>
              <td>{order.name}</td>
              <td>{order.phone}</td>
              <td>{order.address}</td>
              <td>{order.product}</td>
              <td>{order.quantity}</td>
              <td>₹{order.price}</td>

              <td>
                ₹
                {order.totalPrice
                  ? order.totalPrice
                  : order.price * order.quantity}
              </td>

              <td>{order.status}</td>

              <td>
                {order.status === "Pending" ? (
                  <button
                    onClick={() => markDelivered(order._id)}
                    style={{
                      padding: "8px 15px",
                      background: "#16a34a",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Deliver
                  </button>
                ) : (
                  "✅ Delivered"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredOrders.length === 0 && (
        <p style={{ marginTop: "20px" }}>
          No orders found.
        </p>
      )}
    </div>
  );
}