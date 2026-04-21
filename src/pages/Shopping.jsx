import React from "react";
import { Routes, Route } from "react-router-dom";
import AllProducts from "../components/Shopping/AllProducts";
import ProductDetails from "../components/Shopping/ProductDetails";
import Cart from "../components/Shopping/Cart";
import Wishlist from "../components/Shopping/Wishlist";
import CheckoutLoader from "../components/Shopping/CheckoutLoader";

const Shopping = () => {
  return (
    <Routes>
      <Route path="/products" element={<AllProducts />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/checkout" element={<CheckoutLoader />} />
    </Routes>
  );
};

export default Shopping;
