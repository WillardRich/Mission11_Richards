import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Book } from "../types/Book";

export type CartItem = {
  project: Book;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (project: Book) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // ✅ ADD TO CART
  const addToCart = (project: Book) => {
    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) => item.project.bookID === project.bookID
      );

      if (existing) {
        return prevCart.map((item) =>
          item.project.bookID === project.bookID
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { project, quantity: 1 }];
    });
  };

  // ❌ REMOVE ITEM
  const removeFromCart = (id: number) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.project.bookID !== id)
    );
  };

  // 🧹 CLEAR CART
  const clearCart = () => {
    setCart([]);
  };

  // 💰 TOTAL PRICE
  const getTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.project.price * item.quantity;
    }, 0);
  };

  // 🔢 TOTAL ITEM COUNT
  const getItemCount = () => {
    return cart.reduce((count, item) => {
      return count + item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ CUSTOM HOOK
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};