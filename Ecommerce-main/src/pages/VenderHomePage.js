import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import "../vendor-styles.css";

const API_URL = "http://localhost:4000/products"; // use the same port as JSON Server

const VendorHome = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from JSON Server
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteProduct = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => {
        setProducts(products.filter((p) => p.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const handleEditProduct = (id) => {
    // Optional: redirect to dashboard to edit
    window.location.href = `/vendor-dashboard`; // or implement inline edit here
  };

  return (
    <div className="container text-center my-5 vendor-page vendor-home">
      <h1>Welcome to LadyLuxe Vendor Portal</h1>
      <p className="lead mt-3">
        Manage your products, view orders, and grow your business with ease.
      </p>

      <h2 className="mt-5">Your Products</h2>
      {products.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        <ProductList
          products={products}
          onDelete={handleDeleteProduct}
          onEdit={handleEditProduct}
        />
      )}
    </div>
  );
};

export default VendorHome;
