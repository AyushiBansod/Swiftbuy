import React, { useEffect } from "react";
import { HiX } from "react-icons/hi";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartSidebar = ({ isOpen, onClose }) => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const shipping = 0;
  const total = subtotal + shipping;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        .sidebar-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .sidebar-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div
        className="fixed inset-0 bg-black/50 z-[1003] transition-opacity duration-300"
        onClick={onClose}
      ></div>
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[1005] transform transition-transform duration-300">
        <div className="flex h-full flex-col p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-xl font-bold text-black sm:text-2xl">
              Price Details
            </h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <HiX size={24} />
            </button>
          </div>

          {/* Price Details */}
          <div className="flex-1 overflow-y-auto sidebar-scroll">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between text-base sm:text-lg">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-black">
                  ₹{subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-base sm:text-lg">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-black">
                  {shipping === 0 ? "FREE" : `₹${shipping.toLocaleString()}`}
                </span>
              </div>
              <div className="border-t border-gray-300 pt-4 mt-4">
                <div className="flex justify-between text-lg sm:text-xl">
                  <span className="font-bold text-black">Total</span>
                  <span className="font-bold text-black">
                    ₹{total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Cart Items Summary */}
              <div className="mt-6 sm:mt-8">
                <h3 className="text-base font-semibold text-black mb-3 sm:text-lg sm:mb-4">
                  Cart Items ({cart.length})
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {cart.map((item) => (
                    <div
                      key={`${item._id}-${item.selectedSize}`}
                      className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-20 sm:w-16 sm:h-24 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-black text-xs sm:text-sm truncate">
                          {item.name}
                        </p>
                        <p className="text-gray-600 text-xs sm:text-sm">
                          ₹{item.price.toLocaleString()} x {item.quantity}
                        </p>
                        {item.selectedSize && (
                          <p className="text-xs text-gray-500">
                            Size: {item.selectedSize}
                          </p>
                        )}
                      </div>
                      <p className="font-semibold text-black text-xs sm:text-sm whitespace-nowrap">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-300">
            <button
              onClick={() => {
                onClose();
                navigate("/checkout");
              }}
              className="w-full rounded-full bg-black py-2.5 sm:py-3 text-sm sm:text-base text-white font-semibold hover:bg-gray-800 transition-colors"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
