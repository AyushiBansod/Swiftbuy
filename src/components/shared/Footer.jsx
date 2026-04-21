import React from "react";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaArrowRight,
} from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');

        .font-orbitron {
          font-family: 'Orbitron', sans-serif;
        }

        .footer {
          width: 100%;
          background-color: #1a1a1a;
          color: #fff;
        }

        .footer-link {
          color: #fff;
          transition: all 0.3s ease;
        }

        .footer-link:hover {
          color: rgba(255, 255, 255, 0.7);
          padding-left: 5px;
        }

        .social-icon {
          color: #fff;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          padding: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .social-icon:hover {
          color: rgba(255, 255, 255, 0.7);
          transform: translateY(-3px);
        }

        .border-line {
          height: 1px;
          width: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.8),
            #fff,
            rgba(255, 255, 255, 0.8),
            transparent
          );
        }
      `}</style>

      <footer className="bg-black border-l-4 border-black text-center py-3.5 text-xl font-bold text-white shadow-[4px_0_4px_rgba(0,0,0,0.1)] max-[768px]:py-2.5 max-[768px]:text-base max-[480px]:py-2 max-[480px]:text-sm">
        <div className="mx-auto max-w-7xl px-6 py-8">
          {/* Centered SwiftBuy Text */}
          <div className="mb-8 text-center">
            <h3 className="font-orbitron text-3xl font-black tracking-wider text-white md:text-4xl lg:text-5xl">
              SWIFTBUY
            </h3>
          </div>

          {/* Shiny Border Line */}
          <div className="border-line"></div>

          {/* Social Icons */}
          <div className="mt-8 flex justify-center gap-8">
            <a href="#" className="social-icon">
              <FaFacebookF size={24} />
            </a>
            <a href="#" className="social-icon">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="social-icon">
              <FaTwitter size={24} />
            </a>
          </div>

          {/* Quick Links */}
          <div className="mt-8">
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              <a href="/" className="footer-link text-sm">
                Home
              </a>
              <a href="/products" className="footer-link text-sm">
                Shop All
              </a>
              <a href="/cart" className="footer-link text-sm">
                Cart
              </a>
              <a href="/wishlist" className="footer-link text-sm">
                Wishlist
              </a>
              <a href="/about" className="footer-link text-sm">
                About
              </a>
              <a href="/contact" className="footer-link text-sm">
                Contact
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-white">&copy; 2026 SWIFTBUY</p>
            <p className="text-sm text-white font-bold">All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
