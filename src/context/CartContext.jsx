import React, { createContext, useState, useContext } from "react";
import { useWishlist } from "./WishlistContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { removeFromWishlist } = useWishlist();

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const cartKey = product.selectedSize
        ? `${product._id}-${product.selectedSize}`
        : `${product._id}`;
      const isProductInCart = prevCart.find(
        (item) =>
          (item.selectedSize
            ? `${item._id}-${item.selectedSize}`
            : `${item._id}`) === cartKey,
      );

      if (isProductInCart) {
        return prevCart.map((item) =>
          (item.selectedSize
            ? `${item._id}-${item.selectedSize}`
            : `${item._id}`) === cartKey
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...prevCart, { ...product, quantity: 1, cartKey }];
      }
    });

    // Remove from wishlist when added to cart
    removeFromWishlist(product._id);

    setMessage("Item added to cart!");
    setIsSidebarOpen(true);
    setTimeout(() => setMessage(""), 2000);
  };

  const removeFromCart = (id, selectedSize) => {
    setCart(
      cart.filter((item) => {
        const itemKey = item.selectedSize
          ? `${item._id}-${item.selectedSize}`
          : `${item._id}`;
        const targetKey = selectedSize ? `${id}-${selectedSize}` : `${id}`;
        return itemKey !== targetKey;
      }),
    );
  };

  const updateQuantity = (id, type, selectedSize) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        const itemKey = item.selectedSize
          ? `${item._id}-${item.selectedSize}`
          : `${item._id}`;
        const targetKey = selectedSize ? `${id}-${selectedSize}` : `${id}`;
        return itemKey === targetKey
          ? {
              ...item,
              quantity:
                type === "increase"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item;
      }),
    );
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalCartItems,
        isSidebarOpen,
        toggleSidebar,
      }}
    >
      {message && (
        <div className="fixed top-[18%] left-1/2 -translate-x-1/2 bg-green-500 text-white px-5 py-3.5 rounded-md text-base font-bold text-center shadow-lg z-[1000] transition-opacity duration-500">
          {message}
        </div>
      )}
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
