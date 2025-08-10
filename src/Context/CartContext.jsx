// // CartContext.js
// import { createContext, useState, useContext } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   // ✅ Add to Cart
//   const addToCart = (product, quantity = 1) => {
//     const existingItem = cartItems.find((item) => item.id === product.id);
//     if (existingItem) {
//       setCartItems((prev) =>
//         prev.map((item) =>
//           item.id === product.id
//             ? {
//                 ...item,
//                 quantity: Math.min(item.quantity + quantity, 5), // max 5
//               }
//             : item
//         )
//       );
//     } else {
//       setCartItems((prev) => [
//         ...prev,
//         { ...product, quantity, size: "L" }, // default size
//       ]);
//     }
//   };

//   // ✅ Increment quantity (max 5)
//   const incrementItem = (itemId) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === itemId && item.quantity < 5
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       )
//     );
//   };

//   // ✅ Decrement quantity (min 1)
//   const decrementItem = (itemId) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === itemId && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   };

//   // ✅ Remove item from cart
//   const removeItem = (itemId) => {
//     setCartItems((prev) => prev.filter((item) => item.id !== itemId));
//   };

//   // ✅ Update size (M / L / XL)
//   const updateSize = (itemId, newSize) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === itemId ? { ...item, size: newSize } : item
//       )
//     );
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         incrementItem,
//         decrementItem,
//         removeItem,
//         updateSize,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// // ✅ Custom Hook
// export const useCart = () => useContext(CartContext);

import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity) => {
    const existingIndex = cartItems.findIndex(
      (item) => item.id === product.id && item.size === product.size
    );

    if (existingIndex !== -1) {
      const updatedItems = [...cartItems];
      updatedItems[existingIndex].quantity += quantity;
      setCartItems(updatedItems);
    } else {
      setCartItems((prev) => [
        ...prev,
        { ...product, quantity: quantity || 1 },
      ]);
    }
  };

  const incrementItem = (id, size) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementItem = (id, size) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id, size) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size))
    );
  };

  const updateSize = (id, oldSize, newSize) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === id && item.size === oldSize
      );

      if (existingIndex === -1) return prev;

      const duplicateIndex = prev.findIndex(
        (item) => item.id === id && item.size === newSize
      );

      const updatedItems = [...prev];

      if (duplicateIndex !== -1) {
        // Same product with new size already exists, so combine quantities
        updatedItems[duplicateIndex].quantity +=
          updatedItems[existingIndex].quantity;
        updatedItems.splice(existingIndex, 1); // remove old one
      } else {
        updatedItems[existingIndex].size = newSize;
      }

      return updatedItems;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        incrementItem,
        decrementItem,
        removeItem,
        updateSize,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
