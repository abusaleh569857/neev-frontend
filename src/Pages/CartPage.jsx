import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CartPage = () => {
  const { cartItems, incrementItem, decrementItem, removeItem } = useCart();
  const navigate = useNavigate();

  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [deliveryArea, setDeliveryArea] = useState("ঢাকার ভিতরে");

  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    address: false,
  });

  const getTotal = () =>
    cartItems.reduce(
      (acc, item) => acc + item.discountedPrice * item.quantity,
      0
    );

  const deliveryCharge = deliveryArea === "ঢাকার বাইরে" ? 120 : 80;
  const total = getTotal();
  const grandTotal = total + deliveryCharge;

  const handleOrderClick = () => {
    const newErrors = {
      name: !formName.trim(),
      phone: !/^01[0-9]{9}$/.test(formPhone),
      address: !formAddress.trim(),
    };

    setErrors(newErrors);

    if (newErrors.name || newErrors.phone || newErrors.address) {
      Swal.fire({
        icon: "warning",
        title: "সতর্কতা!",
        text: "অনুগ্রহ করে সকল তথ্য সঠিকভাবে পূরণ করুন।",
        confirmButtonText: "ঠিক আছে",
      });
      return;
    }

    navigate("/order-review", {
      state: {
        name: formName,
        phone: formPhone,
        address: formAddress,
        deliveryArea: deliveryArea,
      },
    });
  };

  return (
    <div className="bg-[#f5f5f5] py-10 px-4 min-h-screen font-sans mb-16 md:mb-2">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="order-1 md:order-2 bg-white p-6 rounded shadow">
          <h2 className="text-lg font-bold mb-4">অর্ডারের তথ্য</h2>

          <table className="w-full text-sm border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">ডিলিট</th>
                <th className="p-2">প্রোডাক্ট</th>
                <th className="p-2">পরিমাণ</th>
                <th className="p-2">মূল্য</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, i) => (
                <tr key={`${item.id}-${item.size}`} className="border-t">
                  <td className="p-2 text-center">
                    <button
                      onClick={() => removeItem(item.id, item.size)}
                      className="text-red-600 text-xl"
                    >
                      🗑
                    </button>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded border"
                      />
                      <div>
                        <p>{item.title}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Selected Size: {item.size}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center border rounded w-max">
                      <button
                        onClick={() =>
                          item.quantity > 1 && decrementItem(item.id, item.size)
                        }
                        className="px-2 text-lg font-bold"
                      >
                        -
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() =>
                          item.quantity < 5 && incrementItem(item.id, item.size)
                        }
                        className="px-2 text-lg font-bold"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="p-2 font-semibold">
                    ৳ {item.discountedPrice * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 space-y-2 text-right">
            <div className="flex justify-between">
              <span>মোট</span>
              <span>৳ {total}</span>
            </div>
            <div className="flex justify-between">
              <span>ডেলিভারি চার্জ</span>
              <span>৳ {deliveryCharge}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>সর্বমোট</span>
              <span>৳ {grandTotal}</span>
            </div>
          </div>
        </div>

        <div className="order-2 md:order-1 bg-white p-6 rounded shadow">
          <h2 className="text-lg font-bold text-center text-black mb-4">
            আপনার অর্ডারটি কনফার্ম করতে তথ্যগুলো পূরণ করে{" "}
            <span className="text-red-600">"অর্ডার করুন"</span> বাটনে ক্লিক করুন
            অথবা ফোনে অর্ডার করতে এই নাম্বারে{" "}
            <a
              href="https://wa.me/8801837569857"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600"
            >
              01837569857
            </a>{" "}
            এ ক্লিক করুন।
          </h2>

          <form className="space-y-4">
            <div>
              <label className="font-semibold block mb-1">
                আপনার নাম লিখুন *
              </label>
              <input
                type="text"
                className={`w-full border px-3 py-2 rounded ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="আপনার নাম"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
            </div>
            <div>
              <label className="font-semibold block mb-1">
                আপনার নাম্বার লিখুন *
              </label>
              <input
                type="text"
                className={`w-full border px-3 py-2 rounded ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="01XXXXXXXXX"
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  সঠিক ১১ ডিজিটের ফোন নাম্বার দিন (01XXXXXXXXX)
                </p>
              )}
            </div>
            <div>
              <label className="font-semibold block mb-1">ঠিকানা লিখুন *</label>
              <textarea
                className={`w-full border px-3 py-2 rounded ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="আপনার ঠিকানা"
                value={formAddress}
                onChange={(e) => setFormAddress(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label className="font-semibold block mb-1">
                ডেলিভারি এরিয়া *
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                value={deliveryArea}
                onChange={(e) => setDeliveryArea(e.target.value)}
              >
                <option>ঢাকার ভিতরে</option>
                <option>ঢাকার বাইরে</option>
              </select>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-blue-300 text-center text-gray-800 text-sm font-medium py-2 mt-6 rounded">
        💰 পেমেন্ট মেথড: <strong>ক্যাশ অন ডেলিভারি</strong>
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:gap-6 justify-center mt-3 md:mt-6 ">
        <button
          onClick={handleOrderClick}
          className="bg-[#ff003c] hover:bg-[#e60036] text-white px-8 py-2 md:py-3 rounded font-bold text-lg"
        >
          ✅ অর্ডার করুন
        </button>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-400 hover:bg-gray-500 text-white px-8 py-2 md:py-3 rounded font-bold text-lg"
        >
          🔙 আগের পেইজে ফিরে যান
        </button>
      </div>
    </div>
  );
};

export default CartPage;
