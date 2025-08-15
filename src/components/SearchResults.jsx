// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const SearchResults = () => {
//   const [products, setProducts] = useState([]);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const query = new URLSearchParams(location.search).get("query");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:5000/api/products/search?query=${encodeURIComponent(
//             query
//           )}`
//         );
//         if (!res.ok) throw new Error("Network response was not ok");
//         const data = await res.json();
//         setProducts(data);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setProducts([]); // reset if error
//       }
//     };

//     if (query) fetchProducts();
//   }, [query]);

//   const handleOrder = (id) => {
//     navigate(`/product/${id}`); // ProductDetails page এ redirect
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h2 className="text-2xl font-bold mb-6">
//         Search results for: <span className="text-[#ff003c]">{query}</span>
//       </h2>

//       {products.length === 0 ? (
//         <p className="text-gray-700 text-lg">No products found 😢</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {products.map((product) => (
//             <div
//               key={product.product_id || product.id} // ✅ unique key
//               className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300"
//             >
//               <img
//                 src={product.imageUrl}
//                 alt={product.title}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
//                 <p className="text-[#ff003c] font-bold mb-3">
//                   ৳ {product.price || product.variants?.[0]?.price}
//                 </p>
//                 <button
//                   onClick={() => handleOrder(product.product_id || product.id)}
//                   className="w-full bg-[#ff003c] hover:bg-[#e60036] text-white py-2 rounded-md"
//                 >
//                   Order করুন
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchResults;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/products/search?query=${encodeURIComponent(
            query
          )}`
        );
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]); // reset if error
      }
    };

    if (query) fetchProducts();
  }, [query]);

  const handleOrder = (id) => {
    navigate(`/product/${id}`);
  };

  const calculateDiscountedPrice = (price, discount) => {
    if (!discount) return price;
    return Math.round(price - (price * discount) / 100);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">
        Search results for: <span className="text-[#ff003c]">{query}</span>
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-700 text-lg">No products found 😢</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const variant = product.variants?.[0] || {}; // take first variant for demo
            const originalPrice = variant.price || product.price || 0;
            const discount = variant.discount_percentage || 0;
            const discountedPrice = calculateDiscountedPrice(
              originalPrice,
              discount
            );

            return (
              <div
                key={product.product_id || product.id}
                className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 relative"
              >
                {/* Discount badge */}
                {discount > 0 && (
                  <div className="absolute top-2 right-2 bg-[#ff003c] text-white text-sm font-bold px-2 py-1 rounded-full z-10">
                    {discount}% ছাড়
                  </div>
                )}

                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">
                    {product.title}
                  </h3>

                  {/* Color & Size */}
                  <p className="text-gray-600 text-sm mb-1">
                    Color:{" "}
                    <span className="text-[#ff003c]">
                      {variant.color || "N/A"}
                    </span>
                  </p>
                  <p className="text-gray-600 text-sm mb-3">
                    Size:{" "}
                    <span className="text-blue-600">
                      {variant.size || "N/A"}
                    </span>
                  </p>

                  {/* Price */}
                  <p className="font-bold text-lg mb-3">
                    {discount > 0 ? (
                      <>
                        <span className="line-through text-blue-600 mr-2">
                          ৳ {originalPrice}
                        </span>
                        <span className="text-[#ff003c]">
                          ৳ {discountedPrice}
                        </span>
                      </>
                    ) : (
                      <span className="text-[#ff003c]">৳ {originalPrice}</span>
                    )}
                  </p>

                  <button
                    onClick={() =>
                      handleOrder(product.product_id || product.id)
                    }
                    className="w-full bg-[#ff003c] hover:bg-[#e60036] text-white py-2 rounded-md"
                  >
                    অর্ডার করুন
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
