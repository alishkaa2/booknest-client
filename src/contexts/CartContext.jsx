import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (book) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === book.id); // исправлено
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === book.id // исправлено
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...book, quantity: 1 }]; // исправлено
      }
    });
  };

  const removeFromCart = (book) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== book.id) // исправлено
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const increaseQuantity = (book) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === book.id // исправлено
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (book) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === book.id // исправлено
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
