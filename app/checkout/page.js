"use client";
import { CartContext } from "@/components/CartContext";
import React, { useContext } from "react";

const checkout = () => {
  console.log(useContext(CartContext)); // This should log a defined value

  return <div>Checkout Amount: ₹</div>;
};

export default checkout;
