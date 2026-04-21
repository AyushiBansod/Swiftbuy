import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider, useCart } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import CartSidebar from "./components/Shopping/CartSidebar";
import Navbar from "./components/shared/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Shopping from "./pages/Shopping";
import Footer from "./components/shared/Footer";
import AdminPanel from "./components/AdminPanel";
import Dashboard from "./components/Dashboard";
import ChatAssistant from "./components/AI/ChatAssistant";
import "./App.css";

const AppContent = () => {
  const { isSidebarOpen, toggleSidebar } = useCart();

  return (
    <Router>
      <CartSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/*" element={<Shopping />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
      <ChatAssistant />
    </Router>
  );
};

const App = () => {
  return (
    <WishlistProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </WishlistProvider>
  );
};

export default App;
