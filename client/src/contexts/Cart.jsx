import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within an CartProvider");
  }

  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || {};
    setCart(localCart);
  }, []);

  const addToCart = async (product, quantity = 1) => {
    const bag = { ...cart };
    bag[product._id] = {
      ...product,
      ordered: bag[product._id]?.ordered + quantity || quantity,
    };
    localStorage.setItem("cart", JSON.stringify(bag));
    setCart(bag);
  };

  const removeFromCart = async (productId, quantity = 1) => {
    const bag = { ...cart };
    bag[productId].ordered -= quantity;
    if (bag[productId].ordered < 1) {
      delete bag[productId];
    }
    setCart(bag);
    localStorage.setItem("cart", JSON.stringify(bag));
  };

  const clearFromCart = async (productId) => {
    const bag = { ...cart };
    delete bag[productId];
    setCart(bag);
    localStorage.setItem("cart", JSON.stringify(bag));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
