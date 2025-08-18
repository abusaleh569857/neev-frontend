import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus, FaCheck, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const loadProducts = () => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products:", err));
  };
  console.log("data : ", products);

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff003c",
      cancelButtonColor: "#888",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/api/products/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "The product has been deleted.", "success");
            loadProducts();
          })
          .catch((err) => {
            console.error("Delete failed:", err);
            Swal.fire("Error", "Failed to delete product", "error");
          });
      }
    });
  };

  const handleEdit = (productId, color, size) => {
    navigate(
      `/admin/products/edit/${productId}?color=${encodeURIComponent(
        color || ""
      )}&size=${encodeURIComponent(size || "")}`
    );
  };

  return (
    <div className="p-4 mb-20 md:mb-2">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">All Products</h1>
        <button
          onClick={() => navigate("/admin/products/add")}
          className="bg-[#ff003c] text-white px-4 py-2 rounded flex items-center hover:bg-red-600"
        >
          <FaPlus className="mr-2" />
          Add Product
        </button>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Color</th>
              <th className="p-3 text-left">Size</th>
              <th className="p-3 text-left">Trending</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Available</th>
              <th className="p-3 text-left">Discount</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) =>
              p.variants.length > 0 ? (
                p.variants.map((v) => (
                  <tr
                    key={`${p.product_id}-${v.variant_id}`}
                    className="border-t text-sm"
                  >
                    <td className="p-3">
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="p-3">{p.title}</td>
                    <td className="p-3">{v.color || "—"}</td>
                    <td className="p-3">{v.size || "—"}</td>
                    <td className="p-3">
                      {p.is_trending ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </td>
                    <td className="p-3">৳{v.price || "—"}</td>
                    <td className="p-3">{v.quantity || "—"}</td>
                    <td className="p-3">{v.available_quantity || "—"}</td>
                    <td className="p-3">
                      {v.discount_percentage
                        ? `${v.discount_percentage}%`
                        : "—"}
                    </td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() =>
                          handleEdit(p.product_id, v.color, v.size)
                        }
                        className="text-blue-600 text-xl hover:text-[#ff003c]"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(p.product_id)}
                        className="text-red-500 text-xl hover:text-red-600"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr key={p.product_id} className="border-t text-sm">
                  <td className="p-3" colSpan={10}>
                    No variants
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {products.map((p) =>
          p.variants.length > 0 ? (
            p.variants.map((v) => (
              <div
                key={`${p.product_id}-${v.variant_id}`}
                className="bg-white shadow rounded p-4 flex flex-col space-y-2"
              >
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="w-full h-48 object-cover rounded"
                />
                <p className="font-bold">{p.title}</p>
                <p>Color: {v.color || "—"}</p>
                <p>Size: {v.size || "—"}</p>
                <p>
                  Trending:{" "}
                  {p.is_trending ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-red-600 font-semibold">No</span>
                  )}
                </p>
                <p>Price: ৳{v.price || "—"}</p>
                <p>Stock: {v.quantity || "—"}</p>
                <p>Available: {v.available_quantity || "—"}</p>
                <p>
                  Discount:{" "}
                  {v.discount_percentage ? `${v.discount_percentage}%` : "—"}
                </p>

                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleEdit(p.product_id, v.color, v.size)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded"
                  >
                    <FaEdit className="inline mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.product_id)}
                    className="flex-1 bg-red-600 text-white py-2 rounded"
                  >
                    <FaTrash className="inline mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div key={p.product_id} className="bg-white shadow rounded p-4">
              <p>No variants available</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ProductList;
