import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 50px",
        background: "#0ea5e9",
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Link
        to="/"
        style={{
          color: "white",
          textDecoration: "none",
        }}
      >
        <h2>AquaDude</h2>
      </Link>

      <div
        style={{
          display: "flex",
          gap: "25px",
          alignItems: "center",
        }}
      >
        <a href="#about" style={{ color: "white" }}>
          About
        </a>

        <a href="#products" style={{ color: "white" }}>
          Products
        </a>

        <a href="#contact" style={{ color: "white" }}>
          Contact
        </a>

        <Link
          to="/track-order"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Track Order
        </Link>
      </div>
    </nav>
  );
}