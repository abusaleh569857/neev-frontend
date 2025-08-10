import React, { useEffect, useState } from "react";
import axios from "axios";
import Marquee from "react-fast-marquee";

const ProductSlider = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="my-6">
      <h2 className="text-xl font-medium mb-4 ml-4 font-sans pb-2 border-b-2 border-gray-200">
        Trending Products
      </h2>
      <Marquee pauseOnHover speed={40} gradient={false}>
        {products.map((product, index) => (
          <div key={index} className="mx-4 flex flex-col items-center">
            <div className="w-32 h-32 border-2 border-[#ff003c] rounded-full overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-center mt-2 text-sm font-medium">
              {product.title}
            </p>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default ProductSlider;
