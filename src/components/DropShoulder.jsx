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
      <h2 className="text-xl font-medium mb-4 font-sans pb-2 border-b-2 border-gray-200">
        Exclusive DropShoulder
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
        {products.map((product) => {
          const price = parseFloat(product.price) || 0;
          const discount = parseFloat(product.discount_percentage) || 0;
          const discountedPrice = parseFloat(product.discountedPrice) || price;

          const isClicked =
            clicked === product.id ? "border-[#ff003c]" : "border-gray-200";

          return (
            <div
              key={product.id}
              onClick={() => setClicked(product.id)} // Set clicked product
              className={`relative bg-white rounded-lg shadow-md p-3 md:p-4 transition-all duration-300 border hover:border-[#ff003c] ${isClicked}`}
            >
              {/* Discount Badge */}
              {discount > 0 && (
                <div className="absolute top-2 right-2 w-16 h-16 bg-[#ff003c] text-white text-center flex flex-col items-center justify-center rounded-full text-xs font-semibold leading-tight z-10">
                  <span className="text-sm pl-[5px]">{discount}%</span>
                  <span className="text-sm">ছাড়</span>
                </div>
              )}

              {/* Product Image */}
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-48 md:h-60 object-cover rounded-md mb-3 transform hover:scale-110 transition-transform duration-300 ease-in-out"
              />

              {/* Product Title */}
              <h2 className="text-lg font-semibold text-center">
                {product.title}
              </h2>

              {/* Price Section */}
              <div className="text-center mt-2">
                <p className="text-blue-600 font-bold line-through inline-block mr-2">
                  ৳ {price}
                </p>
                <p className="text-[#ff003c] font-bold inline-block">
                  ৳ {discountedPrice}
                </p>
              </div>

              {/* Button */}
              <button
                onClick={() => navigate(`/product/${product.id}`)}
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

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const DropShoulder = () => {
//   const [products, setProducts] = useState([]);
//   const [clicked, setClicked] = useState(null); // To track which product is clicked

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/products/dropshoulder")
//       .then((response) => {
//         setProducts(response.data);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the products!", error);
//       });
//   }, []);

//   return (
//     <div className="container mx-auto p-4 font-sans">
//       <h2 className="text-xl font-medium mb-4 ml-4 font-sans pb-2 border-b-2 border-gray-200">
//         Exclusive DropShoulder
//       </h2>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//         {products.map((product) => {
//           const price = parseFloat(product.price) || 0;
//           const discount = parseFloat(product.discount_percentage) || 0;
//           const discountedPrice = parseFloat(product.discountedPrice) || price;

//           const isClicked =
//             clicked === product.id ? "border-[#ff003c]" : "border-gray-200";

//           return (
//             <div
//               key={product.id}
//               onClick={() => setClicked(product.id)} // Set clicked product
//               className={`relative bg-white rounded-lg shadow-md p-4 transition-all duration-300 border hover:border-[#ff003c] ${isClicked}`}
//             >
//               {/* Discount Badge */}
//               {discount > 0 && (
//                 <div className="absolute top-2 right-2 w-16 h-16 bg-[#ff003c] text-white text-center flex flex-col items-center justify-center rounded-full text-xs font-semibold leading-tight z-10">
//                   <span className="text-sm pl-[5px]">{discount}%</span>
//                   <span className="text-sm">ছাড়</span>
//                 </div>
//               )}

//               {/* Product Image */}
//               <div className="overflow-hidden">
//                 <img
//                   src={product.imageUrl}
//                   alt={product.title}
//                   className="w-full h-60 object-cover rounded-md mb-3 transform transition-transform duration-300 ease-in-out hover:scale-110"
//                 />
//               </div>

//               {/* Product Title */}
//               <h2 className="text-lg font-semibold text-center">
//                 {product.title}
//               </h2>

//               {/* Price Section */}
//               <div className="text-center mt-2">
//                 <p className="text-blue-600 font-bold line-through inline-block mr-2">
//                   ৳ {price}
//                 </p>
//                 <p className="text-[#ff003c] font-bold inline-block">
//                   ৳ {discountedPrice}
//                 </p>
//               </div>

//               {/* Button */}
//               <button className="bg-[#ff003c] hover:bg-blue-600 text-white font-semibold mt-4 w-full py-2 rounded-full">
//                 অর্ডার করুন
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default DropShoulder;
