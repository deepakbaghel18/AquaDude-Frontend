# 💧 AquaDude – Water Delivery Platform

AquaDude is a full-stack web-based water delivery platform that allows customers to place water orders online and track their orders using a unique Order ID. It also provides an admin dashboard for managing customer orders and delivery status.

## 🚀 Live Demo

🔗 **Live Website:** https://aqua-dude-frontend.vercel.app

## 📂 GitHub Repository

🔗 **GitHub:** https://github.com/deepakbaghel18/AquaDude

---

## ✨ Features

### 👤 Customer Features
- Place water delivery orders online
- Enter customer name, phone number, and delivery address
- Receive a unique Order ID after placing an order
- Track order using the Order ID
- View order details and delivery status

### 🛠️ Admin Features
- Admin authentication
- View all customer orders
- Search and manage orders
- Update order delivery status
- Delete orders
- View order details including total price

---

## 🧑‍💻 Technology Stack

### Frontend
- React.js
- JavaScript
- Axios
- HTML
- CSS

### Backend
- Node.js
- Express.js
- RESTful APIs

### Database
- MongoDB

### Deployment
- Vercel – Frontend
- Render – Backend
- MongoDB Atlas – Database

### Tools
- Git
- GitHub
- VS Code
- Postman

---

## 🏗️ Project Architecture

```text
Customer
   │
   ▼
React.js Frontend
   │
   │ HTTP Requests
   ▼
Node.js + Express.js Backend
   │
   │ Mongoose
   ▼
MongoDB Atlas
