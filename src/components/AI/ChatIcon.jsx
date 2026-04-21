import React, { useState, useEffect } from "react";
import { FaComments, FaTimes } from "react-icons/fa";
import { HiChatAlt2 } from "react-icons/hi";

const ChatIcon = ({ onClick, isOpen }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {showTooltip && !isOpen && (
        <div className="absolute bottom-16 right-0 mb-2 animate-fadeIn">
          <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
            Need help? Chat with me!
            <div className="absolute bottom-0 right-4 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
          </div>
        </div>
      )}

      {/* Pulse animation ring */}
      <div
        className="absolute inset-0 rounded-full bg-black opacity-75 animate-ping"
        style={{
          animationDuration: "1.5s",
          animationIterationCount: "infinite",
        }}
      ></div>

      {/* Main button */}
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-r from-gray-900 to-black text-white shadow-2xl transition-all duration-300 ${
          isHovered ? "scale-110 rotate-12" : "scale-100"
        } ${isOpen ? "rotate-90" : "rotate-0"}`}
      >
        {isOpen ? (
          <FaTimes size={24} className="transition-all duration-300" />
        ) : (
          <HiChatAlt2 size={26} className="transition-all duration-300" />
        )}

        {/* Notification badge */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold animate-bounce">
            1
          </span>
        )}
      </button>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ChatIcon;
