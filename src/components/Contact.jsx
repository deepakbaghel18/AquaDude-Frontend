import { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [quantity, setQuantity] = useState(1);

  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const price = 250;
  const totalPrice = quantity * price;

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const placeOrder = async () => {
    if (!name || !phone || !address) {
      setError("Please fill all the details.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setOrder(null);

      const res = await axios.post(
        "https://aquadude-backend.onrender.com/api/orders",
        {
          name,
          phone,
          address,
          product: "20L Alkaline Water",
          quantity,
          price,
        }
      );

      setOrder(res.data.data);

      setName("");
      setPhone("");
      setAddress("");
      setQuantity(1);
    } catch (err) {
      console.log(err);
      setError("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      style={{
        padding: "80px 40px",
        background: "#ffffff",
        textAlign: "center",
      }}
    >
      {!order ? (
        <>
          <h2 style={{ fontSize: "42px" }}>
            Place Your Order
          </h2>

          <div
            style={{
              maxWidth: "600px",
              margin: "40px auto",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={inputStyle}
            />

            <textarea
              rows="4"
              placeholder="Delivery Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={inputStyle}
            />

            {/* Quantity */}
            <div>
              <h3 style={{ marginBottom: "10px" }}>
                20L Alkaline Water
              </h3>

              <p
                style={{
                  marginBottom: "10px",
                  color: "#555",
                }}
              >
                Price: ₹{price} per can
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  style={quantityButtonStyle}
                >
                  −
                </button>

                <span
                  style={{
                    fontSize: "22px",
                    fontWeight: "bold",
                    minWidth: "30px",
                  }}
                >
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  style={quantityButtonStyle}
                >
                  +
                </button>
              </div>

              <h3
                style={{
                  marginTop: "15px",
                  color: "#0284c7",
                }}
              >
                Total: ₹{totalPrice}
              </h3>
            </div>

            {error && (
              <p style={{ color: "red" }}>
                {error}
              </p>
            )}

            <button
              onClick={placeOrder}
              disabled={loading}
              style={{
                ...buttonStyle,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </>
      ) : (
        <div
          style={{
            maxWidth: "600px",
            margin: "40px auto",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            background: "#f8fafc",
          }}
        >
          <h2 style={{ color: "#16a34a" }}>
            🎉 Order Placed Successfully!
          </h2>

          <p
            style={{
              marginTop: "25px",
              fontSize: "18px",
            }}
          >
            Your Order ID:
          </p>

          <h1
            style={{
              color: "#0284c7",
              letterSpacing: "2px",
            }}
          >
            {order.orderId}
          </h1>

          <p>
            Please save this Order ID to track your delivery.
          </p>

          <p>
            <strong>Product:</strong> {order.product}
          </p>

          <p>
            <strong>Quantity:</strong> {order.quantity}
          </p>

          <p>
            <strong>Price / Unit:</strong> ₹{order.price}
          </p>

          <p>
            <strong>Total:</strong> ₹{order.totalPrice}
          </p>

          <p>
            <strong>Status:</strong> 🟡 Order Received
          </p>

          <button
            onClick={() => {
              window.location.href = "/track-order";
            }}
            style={buttonStyle}
          >
            Track My Order
          </button>
        </div>
      )}
    </section>
  );
}

const inputStyle = {
  padding: "15px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const buttonStyle = {
  padding: "15px",
  background: "#0284c7",
  color: "white",
  border: "none",
  borderRadius: "30px",
  fontSize: "18px",
  cursor: "pointer",
};

const quantityButtonStyle = {
  width: "45px",
  height: "45px",
  borderRadius: "50%",
  border: "none",
  background: "#0284c7",
  color: "white",
  fontSize: "28px",
  cursor: "pointer",
};