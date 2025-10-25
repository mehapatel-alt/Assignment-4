import React, { useState, useEffect } from "react";
import AddProduct from "./AddProduct";
import ProductList from "./ProductList";
import "../vendor-styles.css";

const API_URL = "http://localhost:4000/products";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  // Fetch products from JSON Server
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  // Add new product
  const handleAddProduct = (prod) => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(prod),
    })
      .then((res) => res.json())
      .then((data) => setProducts([...products, data]))
      .catch((err) => console.log(err));
  };

  // Delete product by id
  const handleDeleteProduct = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => {
        setProducts(products.filter((p) => p.id !== id));
        if (editProduct && editProduct.id === id) setEditProduct(null);
      })
      .catch((err) => console.log(err));
  };

  // Edit product by id
  const handleEditProduct = (id) => {
    const prod = products.find((p) => p.id === id);
    setEditProduct(prod);
  };

  // Update product
  const handleUpdateProduct = (updatedProd) => {
    fetch(`${API_URL}/${updatedProd.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProd),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(products.map((p) => (p.id === data.id ? data : p)));
        setEditProduct(null);
      })
      .catch((err) => console.log(err));
  };

  // Cancel edit
  const handleCancelEdit = () => setEditProduct(null);

  return (
    <div className="container my-5 vendor-page vendor-dashboard">
      <h2>Vendor Dashboard</h2>
      <p>Here you will see your products, orders, and sales summary.</p>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5>Total Products</h5>
              <p>{products.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5>Total Orders</h5>
              <p>5</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5>Revenue</h5>
              <p>$250</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <AddProduct
          onAdd={handleAddProduct}
          editProduct={editProduct}
          onUpdate={handleUpdateProduct}
          onCancel={handleCancelEdit}
        />
        <ProductList
          products={products}
          onDelete={handleDeleteProduct}
          onEdit={handleEditProduct}
        />
      </div>
    </div>
  );
};

export default Dashboard;
