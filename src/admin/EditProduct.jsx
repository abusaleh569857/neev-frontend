import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditProduct = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    price: "",
    quantity: "",
    available_quantity: "",
    color: "",
    is_trending: false,
    categoryIds: [],
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Load categories
    axios
      .get("http://localhost:5000/api/products/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to load categories", err));

    // Load product details
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setFormData(res.data))
      .catch((err) => console.error("Failed to load product", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked, options } = e.target;
    if (name === "categoryIds") {
      const selected = Array.from(options)
        .filter((o) => o.selected)
        .map((o) => o.value);
      setFormData({ ...formData, categoryIds: selected });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/products/${id}`, formData)
      .then(() => {
        Swal.fire("Success!", "Product updated successfully.", "success");
        navigate("/admin/products");
      })
      .catch((err) => {
        console.error("Update failed", err);
        Swal.fire("Error", "Failed to update product", "error");
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mb-20">
      <h2 className="text-2xl font-bold text-center text-[#ff003c] mb-4">
        Edit Product
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 grid-cols-1 md:grid-cols-2"
      >
        {/* Title */}
        <div className="col-span-2">
          <label className="font-medium block mb-1">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="font-medium block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Image */}
        <div className="col-span-2">
          <label className="font-medium block mb-1">Image URL *</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Price, Color */}
        <div>
          <label className="font-medium block mb-1">Price (৳) *</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="font-medium block mb-1">Color</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="font-medium block mb-1">Quantity *</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="font-medium block mb-1">Available Quantity *</label>
          <input
            type="number"
            name="available_quantity"
            value={formData.available_quantity}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Trending */}
        <div className="col-span-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="is_trending"
              checked={formData.is_trending}
              onChange={handleChange}
              className="form-checkbox h-4 w-4 text-indigo-600"
            />
            <span className="ml-2">Trending Product</span>
          </label>
        </div>

        {/* Categories */}
        <div className="col-span-2">
          <label className="font-medium block mb-1">Categories</label>
          <select
            name="categoryIds"
            multiple
            value={formData.categoryIds}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <div className="col-span-2 mt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-4 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          >
            ← Back
          </button>
          <button className="w-full bg-[#ff003c] text-white py-2 rounded hover:bg-red-600">
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
