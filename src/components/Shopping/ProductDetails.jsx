import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import productsData from "../../data/Products.json";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const foundProduct = productsData.find((p) => p._id === parseInt(id));
    setProduct(foundProduct);
    if (foundProduct && foundProduct.sizes && foundProduct.sizes.length > 0) {
      setSelectedSize(foundProduct.sizes[0]);
    }
    // Scroll to top when product details page loads
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-xl">Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    const productWithSize = { ...product, selectedSize };
    for (let i = 0; i < quantity; i++) {
      addToCart(productWithSize);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">
          ★
        </span>,
      );
    }
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">
          ★
        </span>,
      );
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-600">
          ★
        </span>,
      );
    }
    return stars;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');

        .font-orbitron {
          font-family: 'Orbitron', sans-serif;
        }

        @keyframes shine {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .btn-shine {
          background: linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 100%);
          background-size: 200% auto;
          animation: shine 2s linear infinite;
        }

        .btn-shine:hover {
          background: linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.2) 100%);
          background-size: 200% auto;
          animation: shine 2s linear infinite;
        }
      `}</style>

      <div className="min-h-screen bg-black py-12 px-4 md:px-8 lg:px-16">
        <button
          onClick={() => navigate("/products")}
          className="mb-8 text-white hover:text-gray-300 transition-colors"
        >
          ← Back to Products
        </button>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="flex items-center justify-center">
              <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-lg max-w-sm md:max-w-md">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full rounded-2xl object-cover aspect-3/4 md:rounded-3xl"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-center">
              <h1 className="font-orbitron text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex">{renderStars(product.rating)}</div>
                <span className="text-gray-400">({product.rating})</span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-400">{product.reviews} reviews</span>
              </div>

              <p className="text-white text-3xl md:text-4xl font-bold mb-6">
                ₹{product.price.toLocaleString()}
              </p>

              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="mb-6">
                <span className="text-white font-semibold block mb-3">
                  Size:
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes &&
                    product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border-2 rounded-lg font-semibold transition-all duration-300 ${
                          selectedSize === size
                            ? "border-white bg-white text-black"
                            : "border-gray-600 text-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-white font-semibold">Quantity:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-white text-black font-bold text-xl hover:bg-gray-200 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-white text-xl font-semibold w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-white text-black font-bold text-xl hover:bg-gray-200 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="btn-shine inline-flex items-center justify-center rounded-full border-2 border-white/80 bg-transparent px-6 md:px-8 lg:px-10 py-3 md:py-4 text-base md:text-lg font-semibold tracking-normal text-white transition-all duration-300 hover:border-white hover:bg-white/10 w-full sm:w-[70%] md:w-[60%] lg:w-[45%] xl:w-[30%]"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
