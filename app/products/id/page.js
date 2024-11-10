"use client";
import Navbar from "@/components/Navbar";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { IoBagCheckOutline, IoCartOutline } from "react-icons/io5";
import { CartContext } from "@/components/CartContext";
import Link from "next/link";
import Image from "next/image";
import { Ring } from "@uiball/loaders"; // Add any loader you prefer
import { useRouter } from "next/navigation";

const SingleProduct = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const [activeImage, setActiveImage] = useState(null);
  const [quantity, setQuantity] = useState(1); // Local state for quantity
  const [selectedSize, setSelecteSize] = useState(""); // Local state for quantity

  const { addProduct, cartProducts, removeProduct, clearCart } =
    useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    // Fetch the product data
    axios
      .get(`/api/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
        if (response.data.images && response.data.images.length > 0) {
          setActiveImage(response.data.images[0]);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch product:", error);
        setLoading(false); // Set loading to false on error
      });
  }, [productId]);
  const handleBuy = () => {
    if (!selectedSize) {
      alert("Please Select the size");
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addProduct({ product: productId, size: selectedSize });
    }
    router.push("/cart");
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please Select the size");
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addProduct({ product: productId, size: selectedSize });
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-14 pattern-3 min-h-screen">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center justify-center p-4">
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <Ring size={40} lineWeight={5} speed={2} color="black" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 my-12 md:grid-cols-[0.7fr_1.0fr]">
              <div className="bg-productBg p-4 rounded-lg">
                <div className="relative z-10">
                  {activeImage ? (
                    <>
                      <Image
                        src={activeImage}
                        className="rounded-lg"
                        alt={product.title}
                        width={600}
                        height={600}
                        priority
                      />
                      <div
                        className="absolute top-[25%] right-2  p-1 glassmorphism bg-opacity-60 rounded-lg py-2 px-1
                      text-white text-sm shadow-2xl"
                      >
                        {product?.sizes?.map((size) => (
                          <div
                            key={size._id}
                            className="flex flex-col gap-4 my-2"
                          >
                            <div
                              onClick={() => setSelecteSize(size.sizeLabel)}
                              className={`py-[2px] px-1 border-2 font-grunge bg-black/60  rounded-full flex items-center justify-center cursor-pointer
              ${
                selectedSize === size.sizeLabel
                  ? " border-brown shadow-lg"
                  : "border-cream"
              }`}
                            >
                              {size.sizeLabel}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="absolute top-[25%] right-2  p-1 glassmorphism bg-opacity-60 rounded-lg py-2 px-1
                      text-white text-sm shadow-2xl"
                      >
                        {product.sizes.map((size) => (
                          <div
                            key={size._id}
                            className="flex flex-col gap-4 my-2 "
                          >
                            <div
                              key={size._id}
                              onClick={() => setSelecteSize(size.sizeLabel)}
                              className="py-[2px] px-1 border-2 font-grunge bg-black/60 border-cream rounded-full flex item justify-center "
                            >
                              {size.sizeLabel}
                            </div>
                          </div>
                        ))}
                      </div>
                      <Image
                        src={product?.images?.[0]}
                        className="rounded-lg"
                        alt={product.title}
                        width={600}
                        height={600}
                        priority
                      />
                    </>
                  )}
                </div>
                <div className="flex h-28 gap-2 mt-3">
                  {product?.images?.map((image) => (
                    <div key={image} onClick={() => setActiveImage(image)}>
                      <Image
                        src={image}
                        className={`rounded-lg cursor-pointer ${
                          activeImage === image
                            ? "opacity-50 border-3 border-brown"
                            : "border-none"
                        }`}
                        alt={`Thumbnail ${image}`}
                        width={100}
                        height={100}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#403934] p-5 px-8 flex flex-col gap-4">
                <h1 className="text-xl font-grunge text-brown">
                  Grunge Clothing
                </h1>
                <h1 className="text-5xl text-bold font-oswald text-darkCream">
                  {product.title}
                </h1>
                <div className="max-w-md my-3">
                  <p className="text-balance text-darkCream opacity-50 font-oswald text-lg font-light">
                    {product.description}
                  </p>
                </div>
                <div className="flex justify-start gap-12 w-full items-center">
                  <div className="flex flex-col justify-center">
                    <p className="font-grunge text-3xl text-darkCream">
                      <span className="text-xl">₹</span>
                      {product.price}
                    </p>
                    <p className="font-grunge text-2xl text-cream opacity-50 -mt-2">
                      <span className="text-lg">₹</span>
                      <span className="line-through">{product.mrp}</span>
                    </p>
                  </div>
                  <div className="flex">
                    <div className="flex items-center justify-between bg-gray-200 text-black font-semibold h-8 rounded">
                      <button
                        className="bg-productBg text-gray-800 rounded-l-sm px-2 py-1"
                        onClick={() =>
                          setQuantity(quantity > 0 ? quantity - 1 : 0)
                        }
                      >
                        -
                      </button>
                      <span className="px-4">{quantity}</span>
                      <button
                        className="bg-productBg text-gray-800 rounded-r-sm px-2 py-1"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex gap-8 items-center">
                  <button
                    className="flex items-center justify-around px-8 text-cream bg-brown shadow-xl py-3 gap-2 text-xl font-grunge font-bold rounded-lg"
                    onClick={handleBuy}
                  >
                    <IoBagCheckOutline />
                    <h1>Buy </h1>
                  </button>
                  <button
                    className="flex items-center justify-around px-8 text-cream bg-productBg shadow-xl py-3 gap-2 text-xl font-grunge font-bold rounded-lg"
                    onClick={handleAddToCart}
                  >
                    <IoCartOutline />
                    <h1>Cart</h1>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
