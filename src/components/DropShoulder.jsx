import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DropShoulder = () => {
  const [products, setProducts] = useState([]);
  const [clicked, setClicked] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/dropshoulder")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4 font-sans">
      <h2 className="text-xl font-medium mb-4 pb-2 border-b-2 border-gray-200">
        Exclusive DropShoulder
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
        {products.map((product, index) => {
          const price = parseFloat(product.price) || 0;
          const discount = parseFloat(product.discount_percentage) || 0;
          const discountedPrice = Math.round(price - (price * discount) / 100);

          const isClicked =
            clicked === product.variant_id
              ? "border-[#ff003c]"
              : "border-gray-200";

          return (
            <div
              key={product.variant_id}
              onClick={() => setClicked(product.variant_id)}
              className={`relative bg-white rounded-lg shadow-md p-3 md:p-4 border hover:border-[#ff003c] opacity-0 transform translate-y-8 animate-card ${isClicked}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {discount > 0 && (
                <div className="absolute top-2 right-2 w-16 h-16 bg-[#ff003c] text-white text-center flex flex-col items-center justify-center rounded-full text-xs font-semibold leading-tight z-10">
                  <span className="text-sm pl-[5px]">{discount}%</span>
                  <span className="text-sm">ছাড়</span>
                </div>
              )}

              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-48 md:h-60 object-cover rounded-md mb-3 transform hover:scale-105 transition-transform duration-300 ease-in-out"
              />

              <h2 className="text-lg font-semibold text-center">
                {product.title}
              </h2>

              <p className="text-center text-md mt-2 font-medium">
                <span className="text-gray-600 mr-1">Color:</span>
                <span className="text-[#ff003c] font-semibold">
                  {product.color}
                </span>
              </p>

              <p className="text-center text-md mt-1 font-medium">
                <span className="text-gray-600 mr-1">Size:</span>
                <span className="text-blue-600 font-semibold">
                  {product.size}
                </span>
              </p>

              <div className="text-center mt-2">
                <p className="text-blue-600 font-bold line-through inline-block mr-2">
                  ৳ {price}
                </p>
                <p className="text-[#ff003c] font-bold inline-block">
                  ৳ {discountedPrice}
                </p>
              </div>

              <button
                onClick={() => navigate(`/product/${product.product_id}`)}
                className="bg-[#ff003c] hover:bg-blue-600 text-white font-semibold mt-4 w-full py-2 rounded-sm"
              >
                অর্ডার করুন
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DropShoulder;
