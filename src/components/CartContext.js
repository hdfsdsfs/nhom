import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Thêm xe vào giỏ hàng
  const addToCart = (car) => {
    setCartItems((prev) => {
      const existingCarIndex = prev.findIndex((item) => item.id === car.id);
      if (existingCarIndex !== -1) {
        const updatedCart = [...prev];
        updatedCart[existingCarIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prev, { ...car, quantity: 1 }];
      }
    });
  };

  // Xóa xe khỏi giỏ hàng
  const removeFromCart = (carId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== carId));
  };

  // Xóa tất cả xe khỏi giỏ hàng
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
