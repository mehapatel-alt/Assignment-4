import React, { useState, useEffect } from "react";
import "../vendor-styles.css";

const AddProduct = ({ onAdd, editProduct, onUpdate, onCancel }) => {
  const [product, setProduct] = useState({ name: "", price: "", category: "" });

  useEffect(() => {
    if (editProduct) setProduct(editProduct); // keep id for update
    else setProduct({ name: "", price: "", category: "" });
  }, [editProduct]);

  const handleChange = (e) =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product.name || !product.price || !product.category) return;

    if (editProduct) onUpdate({ ...product }); // ensure id is included
    else onAdd(product);

    setProduct({ name: "", price: "", category: "" });
  };

  return (
    <div className="mt-4">
      <h4>{editProduct ? "Edit Product" : "Add Product"}</h4>
      <form onSubmit={handleSubmit} className="mt-3">
        <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={product.image || ""}
        onChange={handleChange}
        className="form-control mb-2"
        />
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-primary me-2">
          {editProduct ? "Update" : "Add"}
        </button>
        {editProduct && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
