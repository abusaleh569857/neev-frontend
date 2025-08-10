import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useCart } from "../context/CartContext";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <div className="text-center py-10">লোড হচ্ছে...</div>;

  const price = parseFloat(product.price);
  const discount = parseFloat(product.discount_percentage || 0);
  const discountedPrice = parseFloat(product.discountedPrice || price);

  const increaseQuantity = () => {
    if (quantity < 5) {
      setQuantity((prev) => prev + 1);
    } else {
      setMessage(
        "আপনি ৫টির বেশি পণ্য একসাথে অর্ডার করতে চাইলে, আমাদের সাথে WhatsApp-এ যোগাযোগ করুন।"
      );
    }
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
    setMessage("");
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      Swal.fire({
        icon: "warning",
        title: "সাইজ নির্বাচন করুন",
        text: "আপনার নির্বাচিত পণ্যের সাইজটি নির্বাচন করুন (M , L , XL)",
        confirmButtonText: "ঠিক আছে",
      });
      return;
    }

    addToCart({ ...product, size: selectedSize }, quantity);
    navigate("/cart");
  };

  return (
    <div className="container mx-auto px-4 py-6 font-sans mb-16 md:mb-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Image */}
        <div>
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-[520px] object-cover rounded shadow"
          />
        </div>

        {/* Right Info */}
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>

          <div className="mb-4 flex items-center gap-3">
            <p className="line-through text-gray-500 text-lg">৳ {price}</p>
            <p className="text-2xl font-bold text-[#ff003c]">
              ৳ {discountedPrice}
            </p>
            {discount > 0 && (
              <div className="inline-block bg-[#ff003c] text-white text-sm rounded-full px-3 py-1">
                {discount}% ছাড়
              </div>
            )}
          </div>

          <p className="bg-[#ff003c] text-white px-3 py-2 rounded text-md mb-4">
            Note: আমাদের অফিস সকাল ৮টা থেকে রাত ১১টা পর্যন্ত খোলা থাকে।
          </p>

          {/* Sizes */}
          <div className="flex gap-2 mb-4">
            {["M", "L", "XL"].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`border px-3 py-1 rounded ${
                  selectedSize === size
                    ? "bg-blue-600 text-white"
                    : "border-gray-400 hover:bg-[#ff003c] hover:text-white"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <p className="text-sm mb-4">
            <strong>Brand:</strong> NEEV
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center mb-4">
            <button
              className="border px-4 py-2 text-md"
              onClick={decreaseQuantity}
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              readOnly
              className="w-12 text-center border-t border-b py-2 text-md"
            />
            <button
              className="border px-4 py-2 text-md"
              onClick={increaseQuantity}
            >
              +
            </button>
          </div>

          {/* Message if quantity > 5 */}
          {message && (
            <div className="bg-yellow-200 text-black p-3 rounded mb-4 text-center font-bold">
              {message}
            </div>
          )}

          {/* Order Buttons */}
          <div className="flex flex-col gap-3 mb-4">
            <div className="flex flex-col md:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                className="bg-[#ff003c] hover:bg-[#e60036] text-white font-medium py-2 rounded w-full"
              >
                কার্টে যোগ করুন
              </button>

              <button
                onClick={handleAddToCart}
                className="bg-[#ff003c] hover:bg-[#e60036] text-white font-medium py-2 rounded w-full"
              >
                অর্ডার করুন
              </button>
            </div>

            <div className="bg-gray-200 p-3 text-center rounded text-[#ff003c] font-bold text-md">
              অর্ডার করতে 'অর্ডার করুন' বাটনে ক্লিক করুন, অথবা কল দিন।
            </div>

            <a
              href="https://wa.me/8801837569857"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white font-bold py-2 rounded text-center"
            >
              📞 01837569857
            </a>
          </div>

          <div className="bg-blue-100 text-center text-gray-700 text-xl font-medium py-2 rounded">
            <div>ঢাকার ভিতরে ডেলিভারি চার্জ: ৮০ টাকা</div>
            <div>ঢাকার বাইরে ডেলিভারি চার্জ: ১২০ টাকা</div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-10 bg-gray-100 p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">বিস্তারিত</h3>
        <p className="text-sm whitespace-pre-line">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
