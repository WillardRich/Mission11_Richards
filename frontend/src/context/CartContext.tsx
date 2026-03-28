import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // ✅ ADD TO CART
  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prevCart) => {
      const existing = prevCart.find((c) => c.id === item.id);

      if (existing) {
        // 🔁 increase quantity
        return prevCart.map((c) =>
          c.id === item.id
            ? { ...c, quantity: c.quantity + 1 }
            : c
        );
      }

      // ➕ new item
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // ❌ REMOVE ITEM COMPLETELY
  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((c) => c.id !== id));
  };

  // 🧹 CLEAR CART
  const clearCart = () => {
    setCart([]);
  };

  // 💰 TOTAL PRICE
  const getTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
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