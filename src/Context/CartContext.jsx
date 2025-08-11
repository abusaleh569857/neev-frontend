import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // ✅ Step 1: Load cart from localStorage on initial render
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // ✅ Step 2: Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

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

  // ✅ Clear cart completely
  const clearCart = () => {
    setCartItems([]); // Clear from state
    localStorage.removeItem("cart"); // Clear from localStorage
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
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Hook to access cart context
export const useCart = () => useContext(CartContext);
