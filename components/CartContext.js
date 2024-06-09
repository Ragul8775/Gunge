"use client";
import CryptoJS from "crypto-js";
import { createContext, useEffect, useState } from "react";
export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  const [promocode, setPromocode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
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
  function encryptAndStore(key, value) {
    const passphrase = "Grunge";
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      passphrase
    ).toString();
    ls.setItem(key, encrypted);
  }
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
  const promoCodes = {
    SAVE10: 10,
    GRUNGE20: 15,
    EXTRA30: 20,
  };

  function applyPromoCode(code) {
    if (code in promoCodes) {
      setDiscount(promoCodes[code]);
      setPromocode(code);
      ls.setItem(
        "Discount",
        JSON.stringify({ code, discount: promoCodes[code] })
      );
    } else {
      alert("Invalid PromoCode");
    }
  }
  function removePromoCode() {
    setDiscount(0);
    setPromocode("");
  }
  const updateTotal = (newTotal) => {
    console.log("Updating total to:", newTotal);
    setTotal(newTotal);
    encryptAndStore("Clear", newTotal);
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
