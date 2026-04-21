import React, { createContext, useState, useContext } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState("");

  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const isProductInWishlist = prevWishlist.find(
        (item) => item._id === product._id,
      );

      if (isProductInWishlist) {
        return prevWishlist;
      } else {
        setMessage("Item added to wishlist!");
        setTimeout(() => setMessage(""), 2000);
        return [...prevWishlist, { ...product }];
      }
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item._id !== id));
  };

  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const isProductInWishlist = prevWishlist.find(
        (item) => item._id === product._id,
      );

      if (isProductInWishlist) {
        setMessage("Item removed from wishlist!");
        setTimeout(() => setMessage(""), 2000);
        return prevWishlist.filter((item) => item._id !== product._id);
      } else {
        setMessage("Item added to wishlist!");
        setTimeout(() => setMessage(""), 2000);
        return [...prevWishlist, { ...product }];
      }
    });
  };

  const isInWishlist = (id) => {
    return wishlist.some((item) => item._id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {message && (
        <div className="fixed top-[15%] md:top-[18%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-pink-500 text-white px-2 py-2 md:px-5 md:py-4 rounded-[5px] shadow-[0px_4px_10px_rgba(0,0,0,0.2)] text-xs md:text-base font-bold text-center transition-opacity duration-500 ease-in-out">
          {message}
        </div>
      )}
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
