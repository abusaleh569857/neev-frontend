import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddProduct = () => {
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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to fetch categories", err));
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.imageUrl || !formData.price) {
      setError("Title, Image URL & Price are required");
      return;
    }

    axios
      .post("http://localhost:5000/api/products", formData)
      .then(() => {
        setSuccess("Product added!");
        setError("");
        setTimeout(() => navigate("/admin/products"), 1000);
      })
      .catch((err) => {
        console.error("Add product failed", err);
        setError("Failed to add product");
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow font-sans mb-20 md:mb-2">
      <h2 className="text-2xl font-bold text-center text-[#ff003c] mb-4">
        Add New Product
      </h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 grid-cols-1 md:grid-cols-2"
      >
        {/* title, desc, imageUrl */}
        <div className="col-span-2">
          <label className="font-medium block mb-1">Title *</label>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            value={formData.title}
          />
        </div>

        <div className="col-span-2">
          <label className="font-medium block mb-1">Description</label>
          <textarea
            name="description"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            value={formData.description}
          />
        </div>

        <div className="col-span-2">
          <label className="font-medium block mb-1">Image URL *</label>
          <input
            type="text"
            name="imageUrl"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            value={formData.imageUrl}
          />
        </div>

        {/* Price, Color */}
        <div>
          <label className="font-medium block mb-1">Price (৳) *</label>
          <input
            type="number"
            step="0.01"
            name="price"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            value={formData.price}
          />
        </div>
        <div>
          <label className="font-medium block mb-1">Color</label>
          <input
            type="text"
            name="color"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            value={formData.color}
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="font-medium block mb-1">Quantity *</label>
          <input
            type="number"
            name="quantity"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            value={formData.quantity}
          />
        </div>
        <div>
          <label className="font-medium block mb-1">Available Quantity *</label>
          <input
            type="number"
            name="available_quantity"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            value={formData.available_quantity}
          />
        </div>

        {/* Trending */}
        <div className="col-span-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="is_trending"
              onChange={handleChange}
              checked={formData.is_trending}
              className="form-checkbox h-4 w-4 text-indigo-600"
            />
            <span className="ml-2">Trending Product</span>
          </label>
        </div>

        {/* Categories select */}
        <div className="col-span-2">
          <label className="font-medium block mb-1">Categories</label>
          <select
            name="categoryIds"
            multiple
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

        {/* Submit button */}
        <div className="col-span-2 mt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-4 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          >
            ← Back
          </button>

          <button className="w-full bg-[#ff003c] text-white py-2 rounded hover:bg-red-600">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
