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

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `https://aquadude-backend.onrender.com/api/orders/${id}`,
        {
          status,
        }
      );

      fetchOrders();
    } catch (err) {
      console.log(err);
      alert("Failed to update order status");
    }
  };

  const deleteOrder = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://aquadude-backend.onrender.com/api/orders/${id}`
      );

      fetchOrders();
    } catch (err) {
      console.log(err);
      alert("Failed to delete order");
    }
  };

  const filteredOrders = orders.filter((order) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      order.name?.toLowerCase().includes(searchText) ||
      order.phone?.toLowerCase().includes(searchText) ||
      order.product?.toLowerCase().includes(searchText) ||
      order.orderId?.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" ||
      order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status) => {
    if (status === "Delivered") {
      return {
        color: "#16a34a",
        fontWeight: "bold",
      };
    }

    if (status === "Out for Delivery") {
      return {
        color: "#2563eb",
        fontWeight: "bold",
      };
    }

    return {
      color: "#f59e0b",
      fontWeight: "bold",
    };
  };

  return (
    <div
      style={{
        marginTop: "40px",
      }}
    >
      <h2>Customer Orders</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by Order ID, name, phone or product..."
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
        <option value="Out for Delivery">
          Out for Delivery
        </option>
        <option value="Delivered">Delivered</option>
      </select>

      {/* Orders Table */}
      <div
        style={{
          width: "100%",
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            minWidth: "1200px",
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
              <th>Order ID</th>
              <th>Date & Time</th>
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
                <td
                  style={{
                    fontSize: "13px",
                    fontWeight: "bold",
                  }}
                >
                  {order.orderId
                    ? order.orderId
                    : `#${order._id.slice(-6).toUpperCase()}`}
                </td>

                <td>
                  {order.createdAt
                    ? new Date(
                        order.createdAt
                      ).toLocaleString("en-IN")
                    : "N/A"}
                </td>

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

                <td style={getStatusStyle(order.status)}>
                  {order.status === "Pending" && "🟡 "}
                  {order.status === "Out for Delivery" && "🔵 "}
                  {order.status === "Delivered" && "🟢 "}
                  {order.status}
                </td>

                <td>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    {order.status === "Pending" && (
                      <button
                        onClick={() =>
                          updateStatus(
                            order._id,
                            "Out for Delivery"
                          )
                        }
                        style={{
                          padding: "8px 12px",
                          background: "#2563eb",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                      >
                        Out for Delivery
                      </button>
                    )}

                    {order.status === "Out for Delivery" && (
                      <button
                        onClick={() =>
                          updateStatus(
                            order._id,
                            "Delivered"
                          )
                        }
                        style={{
                          padding: "8px 12px",
                          background: "#16a34a",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                      >
                        Mark Delivered
                      </button>
                    )}

                    {order.status === "Delivered" && (
                      <span
                        style={{
                          color: "#16a34a",
                          fontWeight: "bold",
                        }}
                      >
                        ✅ Delivered
                      </span>
                    )}

                    <button
                      onClick={() =>
                        deleteOrder(order._id)
                      }
                      style={{
                        padding: "8px 12px",
                        background: "#dc2626",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredOrders.length === 0 && (
        <p style={{ marginTop: "20px" }}>
          No orders found.
        </p>
      )}
    </div>
  );
}