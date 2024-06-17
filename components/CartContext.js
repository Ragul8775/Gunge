"use client";
import CryptoJS from "crypto-js";
import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  const [total, setTotal] = useState({ amount: 0, products: [] });
  const [promocode, setPromocode] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const storedCart = ls?.getItem("cart");
    if (storedCart) {
      setCartProducts(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (cartProducts.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    } else {
      ls?.removeItem("cart");
    }
  }, [cartProducts]);

  const addProduct = (product) => {
    setCartProducts((prev) => [...prev, product]);
  };

  const removeProduct = (productId) => {
    setCartProducts((prev) =>
      prev.filter((item) => item.product !== productId)
    );
  };

  const updateTotal = (products) => {
    const newTotal = products.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    setTotal({ amount: newTotal, products });
    ls?.setItem(
      "Total",
      JSON.stringify({
        amount: newTotal,
        products,
      })
    );
  };
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
  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addProduct,
        removeProduct,
        total,
        updateTotal,
        discount,
        applyPromoCode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
