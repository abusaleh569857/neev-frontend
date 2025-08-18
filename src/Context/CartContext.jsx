import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

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
        updatedItems[duplicateIndex].quantity +=
          updatedItems[existingIndex].quantity;
        updatedItems.splice(existingIndex, 1);
      } else {
        updatedItems[existingIndex].size = newSize;
      }

      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
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

export const useCart = () => useContext(CartContext);
