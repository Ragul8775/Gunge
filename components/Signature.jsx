"use client";
import Image from "next/image";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import axios from "axios";
import { CartContext } from "./CartContext";
const Signature = () => {
  const [products, setProducts] = useState([]);
  console.log(products);
  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  const { addProduct } = useContext(CartContext);
  const addFeaturedToCart = (product) => {
    console.log(product._id);
    addProduct(product._id);
  };
  return (
    <div className="pattern-1">
      <div className="max-w-[1200px] flex flex-col items-center justify-around mx-auto">
        <h2 className="text-4xl font-bold text-center p-6 font-grunge">
          Signature Selects: Grunge Elite
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 font-oswald">
          {products.map(
            (product, index) =>
              index < 4 && (
                <div
                  key={product.id}
                  className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-cream text-black m-auto p-2"
                >
                  {" "}
                  <Link href={`/products/id?id=${product._id}`}>
                    <Image
                      src={product.images[0]}
                      alt="products"
                      width={500}
                      height={300}
                      className="rounded-xl"
                    />
                  </Link>
                  <div className="px-6 py-4">
                    <div className="font-bold text-2xl mb-2">
                      <Link href={`/products/id?id=${product._id}`}>
                        {product.title}
                      </Link>
                    </div>
                    <div className="flex gap-2">
                      <p className="text-gray-900 text-xl">
                        ₹ {product.price}.00
                      </p>
                      <p className="text-gray-600 text-xl line-through ">
                        ₹ {product.mrp}.00
                      </p>
                    </div>
                    <div className="flex mt-2">
                      {Array(4)
                        .fill("")
                        .map((_, i) => (
                          <svg
                            key={i}
                            fill="currentColor"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 text-brown-500 ml-1"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 .587l3.475 7.05 7.525 1.092-5.45 5.305 1.45 6.251-7.5-3.947-7.5 3.947 1.45-6.251-5.45-5.305 7.525-1.092z"></path>
                          </svg>
                        ))}
                    </div>
                    <div className="flex item-center justify-between mt-3">
                      <button
                        className="bg-darkCream border-2 border-brown text-brown font-grunge hover:bg-red-700  font-bold py-2 px-5 rounded-3xl shadow-lg"
                        onClick={() => addFeaturedToCart(product)}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Signature;
