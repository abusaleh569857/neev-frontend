// // pages/OrderReviewPage.jsx
// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";

// const OrderReviewPage = () => {
//   const { cartItems } = useCart();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { name, phone, address, deliveryArea } = location.state || {};

//   const getTotal = () =>
//     cartItems.reduce(
//       (acc, item) => acc + item.discountedPrice * item.quantity,
//       0
//     );

//   const deliveryCharge = deliveryArea === "ঢাকার বাইরে" ? 120 : 80;
//   const total = getTotal();
//   const grandTotal = total + deliveryCharge;

//   return (
//     <div className="bg-gray-100 min-h-screen px-4 py-6 font-sans mb-16 md:mb-2">
//       <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
//         <h1 className="text-xl font-bold text-center mb-4 text-red-600">
//           📋 অর্ডার কনফার্ম করার আগে নিচের তথ্যগুলো ভালোভাবে দেখে নিন
//         </h1>

//         {/* কাস্টমার ইনফো */}
//         <div className="mb-4 border-b pb-3">
//           <p>
//             <strong>📞 মোবাইল নাম্বার:</strong> {phone}
//           </p>
//           <p>
//             <strong>🏠 ডেলিভারি ঠিকানা:</strong> {address}
//           </p>
//           <p>
//             <strong>🚚 ডেলিভারি এরিয়া:</strong> {deliveryArea}
//           </p>
//         </div>

//         {/* পণ্য তালিকা */}
//         <div>
//           <h2 className="font-bold mb-2">🛍 আপনার পণ্যসমূহ:</h2>
//           <table className="w-full text-sm border">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="p-2 text-left">পণ্য</th>
//                 <th className="p-2">রং</th>
//                 <th className="p-2">সাইজ</th>
//                 <th className="p-2">পরিমাণ</th>
//                 <th className="p-2">মূল্য</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartItems.map((item, i) => (
//                 <tr key={i} className="border-t">
//                   <td className="p-2">{item.title}</td>
//                   <td className="p-2">{item.color || "N/A"}</td>
//                   <td className="p-2">{item.size}</td>
//                   <td className="p-2 text-center">{item.quantity}</td>
//                   <td className="p-2 text-right">
//                     ৳ {item.discountedPrice * item.quantity}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* মোট দাম */}
//         <div className="mt-4 border-t pt-3 space-y-1 text-right">
//           <div>মোট: ৳ {total}</div>
//           <div>ডেলিভারি চার্জ: ৳ {deliveryCharge}</div>
//           <div className="font-bold text-lg">সর্বমোট: ৳ {grandTotal}</div>
//         </div>

//         {/* বাটন */}
//         <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
//           <button
//             onClick={() => navigate("/cart")}
//             className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded"
//           >
//             🔙 ফিরে যান
//           </button>
//           <button
//             onClick={() => alert("✅ আপনার অর্ডার কনফার্ম হয়েছে!")}
//             className="bg-[#ff003c] hover:bg-[#e60036] text-white px-6 py-2 rounded font-bold"
//           >
//             ✅ অর্ডার কনফার্ম করুন
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderReviewPage;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Swal from "sweetalert2"; // Optional: nicer alert

const OrderReviewPage = () => {
  const { cartItems, clearCart } = useCart(); // ✅ clearCart added here
  const location = useLocation();
  const navigate = useNavigate();

  const { name, phone, address, deliveryArea } = location.state || {};

  const getTotal = () =>
    cartItems.reduce(
      (acc, item) => acc + item.discountedPrice * item.quantity,
      0
    );

  const deliveryCharge = deliveryArea === "ঢাকার বাইরে" ? 120 : 80;
  const total = getTotal();
  const grandTotal = total + deliveryCharge;

  const handleConfirmOrder = () => {
    // ✅ Optional: You could also send cartItems to your backend here

    clearCart(); // ✅ Clear cart from context and localStorage

    // ✅ Show success message
    Swal.fire({
      icon: "success",
      title: "অর্ডার কনফার্ম হয়েছে!",
      text: "আমরা খুব শীঘ্রই আপনার সাথে যোগাযোগ করবো।",
      confirmButtonText: "ঠিক আছে",
    }).then(() => {
      navigate("/"); // ✅ Redirect to home or order-success page
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen px-4 py-6 font-sans mb-16 md:mb-2">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-xl font-bold text-center mb-4 text-red-600">
          📋 অর্ডার কনফার্ম করার আগে নিচের তথ্যগুলো ভালোভাবে দেখে নিন
        </h1>

        {/* কাস্টমার ইনফো */}
        <div className="mb-4 border-b pb-3">
          <p>
            <strong>📞 মোবাইল নাম্বার:</strong> {phone}
          </p>
          <p>
            <strong>🏠 ডেলিভারি ঠিকানা:</strong> {address}
          </p>
          <p>
            <strong>🚚 ডেলিভারি এরিয়া:</strong> {deliveryArea}
          </p>
        </div>

        {/* পণ্য তালিকা */}
        <div>
          <h2 className="font-bold mb-2">🛍 আপনার পণ্যসমূহ:</h2>
          <table className="w-full text-sm border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">পণ্য</th>
                <th className="p-2">রং</th>
                <th className="p-2">সাইজ</th>
                <th className="p-2">পরিমাণ</th>
                <th className="p-2">মূল্য</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{item.title}</td>
                  <td className="p-2">{item.color || "N/A"}</td>
                  <td className="p-2">{item.size}</td>
                  <td className="p-2 text-center">{item.quantity}</td>
                  <td className="p-2 text-right">
                    ৳ {item.discountedPrice * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* মোট দাম */}
        <div className="mt-4 border-t pt-3 space-y-1 text-right">
          <div>মোট: ৳ {total}</div>
          <div>ডেলিভারি চার্জ: ৳ {deliveryCharge}</div>
          <div className="font-bold text-lg">সর্বমোট: ৳ {grandTotal}</div>
        </div>

        {/* বাটন */}
        <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/cart")}
            className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded"
          >
            🔙 ফিরে যান
          </button>
          <button
            onClick={handleConfirmOrder} // ✅ used here
            className="bg-[#ff003c] hover:bg-[#e60036] text-white px-6 py-2 rounded font-bold"
          >
            ✅ অর্ডার কনফার্ম করুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderReviewPage;
