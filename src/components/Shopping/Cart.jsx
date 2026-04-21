import React from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { HiOutlineShoppingBag, HiTrash } from "react-icons/hi2";
import CartSidebar from "./CartSidebar";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, isSidebarOpen, toggleSidebar } =
    useCart();
  const navigate = useNavigate();

  return (
    <>
      {cart.length === 0 ? (
        <div className="min-h-screen bg-black py-12 px-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-orbitron mb-8 text-center text-4xl font-black text-white md:text-5xl">
              My Cart
            </h2>
            <div className="flex flex-col items-center justify-center py-20">
              <HiOutlineShoppingBag size={64} className="mb-4 text-white" />
              <p className="text-xl text-gray-300">Your cart is empty</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-black py-12 px-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-orbitron mb-8 text-center text-4xl font-black text-white md:text-5xl">
              My Cart
            </h2>

            <div className="mb-6 flex justify-center sm:justify-end">
              <button
                onClick={toggleSidebar}
                className="rounded-full bg-white px-6 py-3 font-semibold text-black hover:bg-gray-200 transition-colors"
              >
                View Price Details
              </button>
            </div>

            <div className="flex-2 rounded-xl bg-[#1a1a1a] p-5">
              <ul className="m-0 list-none p-0">
                {cart.map((item) => (
                  <li
                    key={`${item._id}-${item.selectedSize}`}
                    className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 border-b border-gray-700 p-3 sm:p-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      width="50"
                      className="h-16 w-16 sm:h-12 sm:w-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 w-full text-center sm:text-left">
                      <h3 className="mb-1 text-sm font-bold text-white sm:text-base">
                        {item.name}
                      </h3>
                      <p className="m-0 text-sm text-gray-300">
                        ₹{item.price.toLocaleString()} x {item.quantity}
                      </p>
                      {item.selectedSize && (
                        <p className="text-xs text-gray-400">
                          Size: {item.selectedSize}
                        </p>
                      )}
                    </div>
                    <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:w-auto sm:flex-nowrap sm:justify-start">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            "increase",
                            item.selectedSize,
                          )
                        }
                        className="bg-white px-3 py-1 text-sm font-bold text-black hover:bg-gray-200 rounded-md cursor-pointer border-none"
                      >
                        +
                      </button>
                      <span className="font-bold text-white text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            "decrease",
                            item.selectedSize,
                          )
                        }
                        className="bg-white px-3 py-1 text-sm font-bold text-black hover:bg-gray-200 rounded-md cursor-pointer border-none"
                      >
                        -
                      </button>
                      <button
                        onClick={() =>
                          removeFromCart(item._id, item.selectedSize)
                        }
                        className="flex cursor-pointer items-center justify-center rounded-md border-none bg-transparent p-1 hover:bg-transparent"
                        aria-label="Remove item"
                      >
                        <HiTrash size={20} className="text-red-500" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <CartSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
