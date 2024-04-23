"use client";

import { createContext, useEffect, useState } from "react";
export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  const [promocode, setPromocode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  console.log("Total set to:", total);
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  function addProduct(productId) {
    console.log(productId);
    setCartProducts((prev) => [...prev, productId]);
  }
  function removeProduct(productId) {
    setCartProducts((prev) => {
      const newCart = prev.filter(
        (id, index) => id !== productId || index !== prev.lastIndexOf(productId)
      );
      if (newCart.length === 0) {
        ls?.removeItem("cart");
      }
      return newCart;
    });
  }

  function applyPromoCode(code) {
    if (code === "SAVE10" || "GRUNGE20") {
      setDiscount(10);
      setPromocode(code);
    } else {
      alert("Invalide PromoCode");
    }
  }
  function removePromoCode() {
    setDiscount(0);
    setPromocode("");
  }
  const updateTotal = (newTotal) => {
    console.log("Updating total to:", newTotal);
    setTotal(newTotal);
  };
  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        promocode,
        applyPromoCode,
        removePromoCode,
        discount,
        updateTotal,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
