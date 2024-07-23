"use client";
import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);
  console.log("Orders", products);
  return (
    <>
      <Navbar />
      <div className="pattern-2 h-screen mt-14">
        <div className="max-w-[1200px] p-4 flex flex-col justify-center items-center mx-auto">
          <h1 className=" text-center font-bold font-grunge text-3xl sm:my-4 sm:mx-2">
            All Products
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 font-oswald justify-center mx-auto">
            {products.map((product, index) => (
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
