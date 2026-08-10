import { useNavigate } from "react-router-dom";

import Dashboard from "./Dashboard";
import Orders from "./Orders";

export default function Admin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div
      style={{
        padding: "40px",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            color: "#0284c7",
            margin: 0,
          }}
        >
          AquaDude Admin Panel
        </h1>

        <button
          onClick={handleLogout}
          style={{
            padding: "12px 20px",
            background: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Logout
        </button>
      </div>

      <Dashboard />

      <Orders />
    </div>
  );
}