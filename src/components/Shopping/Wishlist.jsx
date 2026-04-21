import React from "react";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { FiHeart } from "react-icons/fi";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');

        .font-orbitron {
          font-family: 'Orbitron', sans-serif;
        }

        .btn-shine-effect {
          position: relative;
          outline: none;
          border: none;
          border-radius: 15px;
          overflow: hidden;
          background: #000;
          color: white;
          font-weight: 600;
          cursor: pointer;
          will-change: transform;
          transition: 0.3s;
        }
        .btn-shine-effect:hover {
          background: #333;
          transform: scale(1.05);
        }
        .btn-shine-effect:active {
          transform: scale(0.95);
        }
        .btn-shine-effect > .shine {
          position: absolute;
          height: 250%;
          width: 40px;
          top: 0;
          left: -60px;
          background: linear-gradient(90deg, #ffffff00, #ffffff54, #ffffff00);
          transform: rotate(45deg) translateY(-35%);
          animation: shine 3s ease infinite;
        }
        @keyframes shine {
          0% {
            left: -80px;
          }
          40% {
            left: 150px;
          }
          100% {
            left: 150px;
          }
        }
      `}</style>

      <div className="min-h-screen bg-black py-12 px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-orbitron mb-8 text-center text-4xl font-black text-white md:text-5xl">
            My Wishlist
          </h2>

          {wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <FiHeart size={64} className="mb-4 text-white" />
              <p className="text-xl text-gray-300">Your wishlist is empty</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {wishlist.map((product) => (
                <div
                  key={product._id}
                  className="rounded-2xl bg-white p-4 md:p-6 shadow-lg md:rounded-3xl border border-gray-200"
                >
                  <div className="relative mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full rounded-2xl object-cover aspect-3/4 md:rounded-3xl"
                    />
                    <button
                      onClick={() => removeFromWishlist(product._id)}
                      className="absolute top-3 right-3 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md transition-all duration-300 hover:bg-gray-100 hover:scale-110 border border-gray-200"
                      aria-label="Remove from wishlist"
                    >
                      <FiHeart
                        size={20}
                        className="text-pink-500 fill-pink-500"
                      />
                    </button>
                    <h3 className="absolute bottom-4 left-4 font-bold text-white bg-black/90 px-3 py-1 rounded-md leading-tight text-sm md:text-lg">
                      {product.name}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-base font-bold text-gray-900 md:text-lg">
                      ₹ {product.price.toLocaleString()}
                    </p>
                    <button
                      onClick={() => addToCart(product)}
                      className="rounded-full btn-shine-effect px-4 py-2 text-xs font-semibold text-white md:px-6 md:text-sm"
                    >
                      <span>Add to Cart</span>
                      <div className="shine"></div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
