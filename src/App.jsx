import TrackOrder from "./pages/TrackOrder";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import ContactPage from "./pages/ContactPage";

import Admin from "./admin/Admin";
import Login from "./admin/Login";
import ProtectedRoute from "./admin/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<ProductsPage />} />

        <Route path="/contact" element={<ContactPage />} />

        <Route path="/admin/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;