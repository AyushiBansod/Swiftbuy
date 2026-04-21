import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";

import { FiSearch, FiUser, FiHeart } from "react-icons/fi";

import { HiOutlineShoppingBag } from "react-icons/hi2";

const Navbar = () => {
  const { cart } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  return (
    <>
      <style>{`

        /* Hamburger button styles - keeping original */

        .hamburger-btn {

          box-sizing: border-box;

          height: 36px;

          cursor: pointer;

          z-index: 1001;

          background: none;

          border: none;

          padding: 0;

          display: flex;

          align-items: center;

          justify-content: center;

          position: relative;

        }



        .hamburger-btn svg {

          stroke: #fff;

          transition: 0.2s;

          width: 36px;

          height: 36px;

        }



        .hamburger-btn svg g:first-child {

          opacity: 1;

          transition: opacity 0.2s ease;

        }



        .hamburger-btn svg g:first-child line {

          transition: transform 0.2s ease;

          transform: translateY(0px);

        }



        .hamburger-btn svg g:last-child {

          opacity: 0;

          transition: opacity 0.2s ease;

        }



        .hamburger-btn svg g:last-child line {

          transition: transform 0.2s ease;

          transform: rotate(0deg);

          transform-origin: center;

        }



        .hamburger-btn.menu-open {

          opacity: 0;

          pointer-events: none;

          transition: opacity 0.3s ease;

        }



        .hamburger-btn.menu-open svg {

          stroke: #fff;

        }



        .hamburger-btn.menu-open svg g:first-child {

          opacity: 0;

          transition: opacity 0.2s ease 0.1s;

        }



        .hamburger-btn.menu-open svg g:first-child line:first-child {

          transform: translateY(7px);

        }



        .hamburger-btn.menu-open svg g:first-child line:last-child {

          transform: translateY(-7px);

        }



        .hamburger-btn.menu-open svg g:last-child {

          opacity: 1;

          transition: opacity 0.2s ease 0.1s;

        }



        .hamburger-btn.menu-open svg g:last-child line:first-child {

          transform: rotate(45deg);

        }



        .hamburger-btn.menu-open svg g:last-child line:last-child {

          transform: rotate(-45deg);

        }



        /* Logo icon CSS art - keeping original */

        .logo-icon {

          position: relative;

          width: 40px;

          height: 28px;

          margin-bottom: 4px;

        }



        .logo-icon::before {

          content: '';

          position: absolute;

          top: 0;

          left: 0;

          width: 0;

          height: 0;

          border-left: 18px solid transparent;

          border-right: 18px solid transparent;

          border-bottom: 12px solid #fff;

          transform: rotate(-15deg);

          transform-origin: left center;

        }



        .logo-icon::after {

          content: '';

          position: absolute;

          top: 6px;

          left: 8px;

          width: 22px;

          height: 2px;

          background: #1a1a1a;

          transform: rotate(-15deg);

          transform-origin: left center;

        }



        .logo-icon-inner {

          position: absolute;

          top: 10px;

          left: 2px;

          width: 0;

          height: 0;

          border-left: 12px solid transparent;

          border-right: 12px solid transparent;

          border-top: 10px solid #fff;

          transform: rotate(-15deg);

          transform-origin: left center;

        }



        /* Nav icon button - React Icons styling (outline icons) */

        .nav-icon-btn svg {

          fill: none;

          stroke: #fff;

          stroke-width: 1.5;

          color: #fff;

        }



        

        /* Close button styles - keeping original */

        .close-btn {

          background: none;

          border: none;

          color: #fff;

          cursor: pointer;

          padding: 0;

          width: 36px;

          height: 36px;

          display: flex;

          align-items: center;

          justify-content: center;

        }



        .close-btn svg {

          stroke: #fff;

          transition: 0.2s;

          width: 36px;

          height: 36px;

        }



        .close-btn svg g:first-child {

          opacity: 1;

          transition: opacity 0.2s ease;

        }



        .close-btn svg g:first-child line {

          transition: transform 0.2s ease;

          transform: translateY(0px);

        }



        .close-btn svg g:last-child {

          opacity: 0;

          transition: opacity 0.2s ease;

        }



        .close-btn svg g:last-child line {

          transition: transform 0.2s ease;

          transform: rotate(0deg);

          transform-origin: center;

        }



        .close-btn.menu-open svg g:first-child {

          opacity: 0;

          transition: opacity 0.2s ease 0.1s;

        }



        .close-btn.menu-open svg g:first-child line:first-child {

          transform: translateY(7px);

        }



        .close-btn.menu-open svg g:first-child line:last-child {

          transform: translateY(-7px);

        }



        .close-btn.menu-open svg g:last-child {

          opacity: 1;

          transition: opacity 0.2s ease 0.1s;

        }



        .close-btn.menu-open svg g:last-child line:first-child {

          transform: rotate(45deg);

        }



        .close-btn.menu-open svg g:last-child line:last-child {

          transform: rotate(-45deg);

        }



        /* Mobile menu icon */

        .menu-icon {

          stroke: #fff;

          stroke-width: 2;

          fill: none;

        }



        /* Responsive */

        @media (max-width: 768px) {

          .hamburger-btn {

            order: 2;

            margin-left: auto;

          }

          .hamburger-btn.menu-open {

            display: none !important;

          }



          .logo-icon {

            width: 32px;

            height: 22px;

          }



          .logo-icon::before {

            border-left: 14px solid transparent;

            border-right: 14px solid transparent;

            border-bottom: 10px solid #fff;

          }



          .logo-icon::after {

            width: 18px;

            top: 5px;

            left: 6px;

          }



          .logo-icon-inner {

            top: 8px;

            left: 1px;

            border-left: 10px solid transparent;

            border-right: 10px solid transparent;

            border-top: 8px solid #fff;

          }

        }



        @media (min-width: 769px) {

          .logo-icon {

            width: 48px;

            height: 34px;

          }



          .logo-icon::before {

            border-left: 22px solid transparent;

            border-right: 22px solid transparent;

            border-bottom: 15px solid #fff;

          }



          .logo-icon::after {

            width: 28px;

            top: 7px;

            left: 10px;

          }



          .logo-icon-inner {

            top: 13px;

            left: 3px;

            border-left: 16px solid transparent;

            border-right: 16px solid transparent;

            border-top: 12px solid #fff;

          }

        }

      `}</style>

      <nav className="bg-[#1a1a1a] py-4 relative">
        <div className="max-w-full mx-auto px-2 md:px-4 lg:px-8 flex items-center justify-between">
          <button
            className={`hamburger-btn z-[1002] max-md:flex ${menuOpen ? "menu-open" : ""} mr-4 hidden`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              width="36px"
              height="36px"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <line x1="0" y1="17" x2="48" y2="17" strokeWidth="2" />

                <line x1="0" y1="31" x2="48" y2="31" strokeWidth="2" />
              </g>

              <g>
                <line x1="0" y1="24" x2="48" y2="24" strokeWidth="2" />

                <line x1="0" y1="24" x2="48" y2="24" strokeWidth="2" />
              </g>
            </svg>
          </button>

          <div className="max-[768px]:static max-[768px]:order-1 max-[768px]:transform-none max-[768px]:ml-8 min-[769px]:absolute min-[769px]:left-1/2 min-[769px]:-translate-x-1/2 min-[769px]:order-1 min-[769px]:z-10">
            <Link
              to="/"
              className="flex flex-col items-center no-underline pt-2"
            >
              <img
                src="/images/logo.png"
                alt="SwiftBuy"
                className="h-8 w-auto min-[769px]:h-10"
              />
            </Link>
          </div>

          <div className="hidden min-[769px]:flex gap-5 items-center ml-auto">
            <button
              className="nav-icon-btn bg-transparent border-none p-1 cursor-pointer text-white flex items-center justify-center transition-colors duration-300 hover:text-yellow-400"
              aria-label="Search"
            >
              <FiSearch size={22} />
            </button>

            <button
              className="nav-icon-btn bg-transparent border-none p-1 cursor-pointer text-white flex items-center justify-center transition-colors duration-300 hover:text-yellow-400"
              aria-label="Profile"
            >
              <FiUser size={22} />
            </button>

            <Link
              to="/cart"
              className="nav-icon-btn bg-transparent border-none p-1 cursor-pointer text-white flex items-center justify-center transition-colors duration-300 hover:text-yellow-400 relative"
              aria-label="Cart"
            >
              <HiOutlineShoppingBag size={22} />

              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-[#1a1a1a] rounded-full w-[18px] h-[18px] flex items-center justify-center text-[11px] font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link
              to="/wishlist"
              className="nav-icon-btn bg-transparent border-none p-1 cursor-pointer text-white flex items-center justify-center transition-colors duration-300 hover:text-yellow-400"
              aria-label="Wishlist"
            >
              <FiHeart size={22} />
            </Link>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-black/50 z-[999] transition-opacity duration-300 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={toggleMenu}
      ></div>

      <div
        className={`fixed top-0 right-0 md:left-0 md:right-auto h-full bg-[#1a1a1a] z-[1000] overflow-y-auto transition-transform duration-300 ease-in-out w-80 md:w-[380px] ${menuOpen ? "translate-x-0" : "translate-x-full md:-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-5 border-b border-[#333]">
          <span className="text-white text-lg font-medium tracking-wide">
            Menu
          </span>

          <button
            className={`close-btn z-[1001] max-md:flex ${menuOpen ? "menu-open" : ""} hidden`}
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <svg
              width="36px"
              height="36px"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <line x1="0" y1="17" x2="48" y2="17" strokeWidth="2" />

                <line x1="0" y1="31" x2="48" y2="31" strokeWidth="2" />
              </g>

              <g>
                <line x1="0" y1="24" x2="48" y2="24" strokeWidth="2" />

                <line x1="0" y1="24" x2="48" y2="24" strokeWidth="2" />
              </g>
            </svg>
          </button>
        </div>

        <ul className="list-none p-0 m-0">
          <li className="border-b border-[#333]">
            <Link
              to="/"
              onClick={toggleMenu}
              className="text-white no-underline text-sm flex items-center justify-between px-5 py-4 transition-colors duration-300 hover:bg-[#333]"
            >
              <span>Home</span>
            </Link>
          </li>

          <li className="border-b border-[#333]">
            <Link
              to="/products"
              onClick={toggleMenu}
              className="text-white no-underline text-sm flex items-center justify-between px-5 py-4 transition-colors duration-300 hover:bg-[#333]"
            >
              <span>Shop all</span>
            </Link>
          </li>

          <li className="border-b border-[#333]">
            <Link
              to="/cart"
              onClick={toggleMenu}
              className="text-white no-underline text-sm flex items-center justify-between px-5 py-4 transition-colors duration-300 hover:bg-[#333]"
            >
              <span>
                Cart
                {totalItems > 0 && (
                  <span className="inline-flex items-center justify-center w-5 h-5 bg-yellow-400 text-[#1a1a1a] rounded-full text-xs font-bold ml-2">
                    {totalItems}
                  </span>
                )}
              </span>
            </Link>
          </li>

          <li className="border-b border-[#333]">
            <Link
              to="/wishlist"
              onClick={toggleMenu}
              className="text-white no-underline text-sm flex items-center justify-between px-5 py-4 transition-colors duration-300 hover:bg-[#333]"
            >
              <span>Wishlist</span>
            </Link>
          </li>

          <li className="border-b border-[#333]">
            <Link
              to="/about"
              onClick={toggleMenu}
              className="text-white no-underline text-sm flex items-center justify-between px-5 py-4 transition-colors duration-300 hover:bg-[#333]"
            >
              <span>About</span>
            </Link>
          </li>

          <li className="border-b border-[#333]">
            <Link
              to="/contact"
              onClick={toggleMenu}
              className="text-white no-underline text-sm flex items-center justify-between px-5 py-4 transition-colors duration-300 hover:bg-[#333]"
            >
              <span>Contact</span>
            </Link>
          </li>

          <li className="border-b border-[#333]">
            <Link
              to="/login"
              onClick={toggleMenu}
              className="text-white no-underline text-sm flex items-center justify-between px-5 py-4 transition-colors duration-300 hover:bg-[#333]"
            >
              <span className="flex items-center gap-2.5">
                <FiUser size={18} />
                Login
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
