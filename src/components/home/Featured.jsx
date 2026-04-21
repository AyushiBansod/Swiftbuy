import { useState, useMemo } from "react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { FiHeart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import productsData from "../../data/Products.json";

const ProductCard = ({ product, addToCart }) => {
  const isLongName = product.name.length > 25;
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleViewDetails = () => {
    navigate(`/product/${product._id}`);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="rounded-2xl bg-white p-4 md:p-6 shadow-lg md:rounded-3xl">
      <div className="relative mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-2xl object-cover aspect-3/4 md:rounded-3xl"
        />
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 shadow-md transition-all duration-300 hover:bg-white hover:scale-110"
          aria-label="Add to wishlist"
        >
          <FiHeart
            size={20}
            className={
              isInWishlist(product._id)
                ? "text-pink-500 fill-pink-500"
                : "text-gray-700"
            }
          />
        </button>
        <h3
          className={`absolute bottom-4 left-4 font-bold text-white bg-black/80 px-3 py-1 rounded-md leading-tight ${isLongName ? "text-sm md:text-base" : "text-sm md:text-lg"}`}
        >
          {product.name}
        </h3>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-base font-bold text-gray-900 md:text-lg">
          ₹ {product.price.toLocaleString()}
        </p>
        <button
          onClick={handleViewDetails}
          className="rounded-full px-4 py-2 text-xs font-semibold text-white transition-all duration-300 btn-shine md:px-6 md:text-sm"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

const Featured = () => {
  const { addToCart } = useCart();
  // Get 3 random products
  const featuredProducts = useMemo(() => {
    const shuffled = [...productsData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, []);

  return (
    <>
      <style>{`
        @keyframes shine {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .btn-shine {
          background: linear-gradient(90deg, #000 0%, #333 50%, #000 100%);
          background-size: 200% auto;
          animation: shine 2s linear infinite;
        }

        .btn-shine:hover {
          background: linear-gradient(90deg, #333 0%, #555 50%, #333 100%);
          background-size: 200% auto;
          animation: shine 2s linear infinite;
        }
      `}</style>

      <div className="w-full bg-black py-20 px-6">
        <h2 className="font-orbitron mb-12 text-center text-4xl font-black tracking-wider text-white md:text-5xl">
          Featured Products
        </h2>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Featured;
