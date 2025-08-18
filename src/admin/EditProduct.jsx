import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const EditProduct = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(search);
  const color = queryParams.get("color");
  const size = queryParams.get("size");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    is_trending: false,
    categoryIds: [],
    variants: [],
    discount: {
      discount_percentage: "",
      start_date: "",
      end_date: "",
    },
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to load categories", err));

    axios
      .get(`http://localhost:5000/api/products/admin/${id}`, {
        params: { color, size },
      })
      .then((res) => {
        const data = res.data;
        console.log("data : ", data);

        setFormData({
          title: data.title || "",
          description: data.description || "",
          imageUrl: data.imageUrl || "",
          is_trending: data.is_trending || false,
          categoryIds: data.categoryIds || [],
          variants: data.variants
            ? data.variants.map((v) => ({
                id: v.variant_id || "",
                color: v.color || "",
                size: v.size || "",
                price: v.price?.toString() || "",
                quantity: v.quantity?.toString() || "",
                available_quantity: v.available_quantity?.toString() || "",
              }))
            : [],
          discount: {
            discount_percentage: data.discount_percentage?.toString() || "",
            start_date: data.discount_start_date || "",
            end_date: data.discount_end_date || "",
          },
        });
      })
      .catch((err) => console.error("Failed to load product", err));
  }, [id, color, size]);
  const handleChange = (e, variantIndex = null) => {
    const { name, value, type, checked, options } = e.target;

    if (name === "categoryIds") {
      const selected = Array.from(options)
        .filter((o) => o.selected)
        .map((o) => o.value);
      setFormData({ ...formData, categoryIds: selected });
    } else if (
      ["color", "size", "price", "quantity", "available_quantity"].includes(
        name
      )
    ) {
      const updatedVariants = [...formData.variants];
      updatedVariants[variantIndex][name] = value;
      setFormData({ ...formData, variants: updatedVariants });
    } else if (
      ["discount_percentage", "start_date", "end_date"].includes(name)
    ) {
      setFormData({
        ...formData,
        discount: { ...formData.discount, [name]: value },
      });
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

        <div className="col-span-2">
          <label className="font-medium block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

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

        {formData.variants.map((v, idx) => (
          <React.Fragment key={idx}>
            <div>
              <label className="font-medium block mb-1">Color</label>
              <input
                type="text"
                name="color"
                value={v.color}
                onChange={(e) => handleChange(e, idx)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="font-medium block mb-1">Size</label>
              <input
                type="text"
                name="size"
                value={v.size}
                onChange={(e) => handleChange(e, idx)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="font-medium block mb-1">Price *</label>
              <input
                type="text"
                name="price"
                value={v.price}
                onChange={(e) => handleChange(e, idx)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="font-medium block mb-1">Quantity *</label>
              <input
                type="text"
                name="quantity"
                value={v.quantity}
                onChange={(e) => handleChange(e, idx)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="font-medium block mb-1">
                Available Quantity *
              </label>
              <input
                type="text"
                name="available_quantity"
                value={v.available_quantity}
                onChange={(e) => handleChange(e, idx)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </React.Fragment>
        ))}

        <div>
          <label className="font-medium block mb-1">Discount %</label>
          <input
            type="text"
            name="discount_percentage"
            value={formData.discount.discount_percentage}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="font-medium block mb-1">Discount Start Date</label>
          <input
            type="date"
            name="start_date"
            value={formData.discount.start_date}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="font-medium block mb-1">Discount End Date</label>
          <input
            type="date"
            name="end_date"
            value={formData.discount.end_date}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

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
