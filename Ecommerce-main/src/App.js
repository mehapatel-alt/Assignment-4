import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Import components
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import NavbarComponent from "./components/NavbarComponent";
import Footer from "./components/Footer";

// Import pages
import CustomerDashboard from "./pages/CustomerDashboard";
import VendorDashboard from "./pages/VenderDashboard";
import VendorHomePage from "./pages/VenderHomePage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import CheckOutPage from "./pages/CheckOutPage";

function AppContent() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [saveForLater, setSaveForLater] = useState([]);
  const location = useLocation();

  // Cart functions
  const addToCart = (product) => {
    if (!cart.find((p) => p.id === product.id)) {
      setCart([...cart, product]);
    }
  };
  const removeFromCart = (id) => {
    setCart(cart.filter((p) => p.id !== id));
  };

  // Wishlist functions
  const addToWishlist = (product) => {
    if (!wishlist.find((p) => p.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };
  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((p) => p.id !== id));
  };

  // Save for later
  const addToSaveForLater = (product) => {
    if (!saveForLater.find((p) => p.id === product.id)) {
      setSaveForLater([...saveForLater, product]);
    }
    removeFromCart(product.id);
  };

  const removeFromSaveForLater = (id) => {
    setSaveForLater(saveForLater.filter((p) => p.id !== id));
  };

  // Hide navbar on login and register pages
  const hideNavbarPaths = ["/login", "/register"];

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && (
        <NavbarComponent cartCount={cart.length} wishlistCount={wishlist.length} />
      )}

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/checkout" element={<CheckOutPage cart={cart} />} />

        {/* Customer Routes */}
        <Route
          path="/customer-dashboard"
          element={<CustomerDashboard addToCart={addToCart} addToWishlist={addToWishlist} />}
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              removeFromCart={removeFromCart}
              addToSaveForLater={addToSaveForLater}
              saveForLater={saveForLater}
              addToCart={addToCart}
              removeFromSaveForLater={removeFromSaveForLater}
            />
          }
        />
        <Route
          path="/wishlist"
          element={<WishlistPage wishlist={wishlist} removeFromWishlist={removeFromWishlist} />}
        />

        {/* Vendor Routes */}
        <Route path="/vendor-home" element={<VendorHomePage />} />
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />
      </Routes>

      {!hideNavbarPaths.includes(location.pathname) && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}