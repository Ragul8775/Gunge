"use client";
import { CartContext } from "../../components/CartContext";
import Image from "next/image";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { FaArrowRightLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Cart = () => {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [promoInput, setPromoInput] = useState("");
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const [discountTotal, setDiscountTotal] = useState(0);
  const {
    cartProducts,
    addProduct,
    removeProduct,
    applyPromoCode,
    discount,
    updateTotal,
  } = useContext(CartContext);
  console.log(products);
  console.log(cartProducts);
  const moreOfThisProduct = (id) => {
    addProduct(id);
  };
  const minusOfThisProduct = (id) => {
    removeProduct(id);
  };
  const aggregateCartItems = () => {
    const aggregation = {};

    cartProducts.forEach((item) => {
      const key = `${item.product}-${item.size}`;
      if (!aggregation[key]) {
        aggregation[key] = { ...item, quantity: 0 };
      }
      aggregation[key].quantity += 1;
    });

    return Object.values(aggregation);
  };

  const aggregatedCartProducts = aggregateCartItems();
  console.log(aggregatedCartProducts);
  useEffect(() => {
    const newTotal = aggregatedCartProducts.reduce((total, item) => {
      const product = products.find((prod) => prod._id === item.product);
      return product ? total + product.price * item.quantity : total;
    }, 0);

    setTotal(newTotal);

    const newDiscountTotal = Math.round(newTotal - (newTotal * discount) / 100);
    setDiscountTotal(newDiscountTotal);
  }, [aggregatedCartProducts, products, discount]);

  const handleApplyPromocode = () => {
    applyPromoCode(promoInput);
    setPromoInput("");
  };
  useEffect(() => {
    if (cartProducts.length > 0) {
      const productIds = cartProducts.map((item) => item.product);
      axios
        .post("/api/cart", { ids: productIds })
        .then((response) => setProducts(response.data))
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [cartProducts]);

  useEffect(() => {
    if (products.length > 0) {
      const aggregatedProducts = products
        .map((prod) => {
          // Calculate the quantity of each product based on its ID
          const quantity = cartProducts.filter(
            (item) => item.product === prod._id
          ).length;

          // Extract only necessary details to send to the context
          return {
            id: prod._id,
            title: prod.title,
            price: prod.price,
            quantity: quantity,
            size: cartProducts.find((item) => item.product === prod._id)?.size, // Ensure size is taken from cartProducts
          };
        })
        .filter((prod) => prod.quantity > 0); // Filter out products with no quantity to avoid sending them unnecessarily

      updateTotal(aggregatedProducts);
    }
  }, [products, cartProducts, discount]);
  const handleCheckOut = (e) => {
    e.preventDefault();

    const redirectUrl = session?.user
      ? "/checkout"
      : `/login?callbackUrl=${encodeURIComponent(window.location.href)}`;
    router.push(redirectUrl);
  };

  return (
    <>
      <Navbar />
      <div className="pt-20  min-h-screen bg-cream py-6 ">
        <div className="container mx-auto max-w-[1200px] px-[20px]">
          <div className="grid grid-cols-1  gap-6 my-12 md:grid-cols-[1.3fr_0.7fr]">
            <div className="bg-creamLight rounded-lg p-4">
              {" "}
              {/* Replace with your content or components */}
              {/* Content for the first column */}
              <h1 className="font-bold font-grunge text-3xl">Cart</h1>
              {!cartProducts?.length && (
                <div className="text-xl font-bold font-oswald text-center text-red-700">
                  Your Cart is Empty
                </div>
              )}
              {products?.length > 0 && (
                <table className="w-full text-sm text-center rtl:text-right">
                  <thead className="text-md uppercase bg-brown text-cream">
                    <tr>
                      <th className="px-6 py-3 rounded-s-lg">Product</th>
                      <th className="px-6 py-3">Size</th>
                      <th className="px-6 py-3">Quantity</th>
                      <th className="px-6 py-3 rounded-e-lg">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aggregatedCartProducts.map((item) => {
                      const prod = products.find((p) => p._id === item.product);
                      if (!prod) return null; // Skip rendering if product details are not found

                      return (
                        <tr
                          key={item.product + item.size}
                          className="bg-gray-200 shadow"
                        >
                          <td className="px-6 py-4 text-left max-w-48">
                            <div className="flex gap-2 items-center rounded-lg overflow-hidden flex-col sm:flex-row">
                              <Image
                                src={prod.images[0]}
                                height={80}
                                width={80}
                                alt="Product image"
                                className="max-w-full"
                              />
                              <h1 className="text-wrap">{prod.title}</h1>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-bold">{item.size}</td>
                          <td className="px-6 py-4 text-center flex justify-center my-4 gap-3">
                            <p className="px-3 bg-cream py-1 font-bold">
                              {item.quantity}
                            </p>
                            <button
                              className=" underline text-red-600 rounded-md italic hover:text-red-400"
                              onClick={() => minusOfThisProduct(item.product)}
                            >
                              Remove
                            </button>
                          </td>
                          <td className="px-6 py-4 font-bold">
                            ₹ {item.quantity * prod.price}
                          </td>
                        </tr>
                      );
                    })}
                    <tr className="bg-gray-200 shadow">
                      <td></td>
                      <td></td>
                      <td className="px-6 py-4 font-bold text-lg">Total:</td>
                      <td className="px-6 py-4 font-bold text-lg">₹{total}</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
            {!!cartProducts?.length && (
              <div className="bg-brown text-creamLight rounded-lg p-4 ">
                {" "}
                {/* Replace with your content or components */}
                <h1 className="font-bold font-grunge text-2xl text-center">
                  Order Summary
                </h1>
                <hr className="w-54 h-1 mx-auto my-2 bg-gray-700 border-0 rounded "></hr>
                <div className="flex flex-col px-4 justify-evenly gap-10  h-full">
                  <div className="flex flex-col gap-1 ">
                    <label className="text-lg text-cream font-bold">
                      Promocode
                    </label>
                    <div className="flex items-center gap-2 ">
                      <input
                        type="text"
                        className="rounded-lg bg-cream text-brown focus:outline-none font-grunge px-2 py-1 uppercase"
                        value={promoInput}
                        placeholder="Enter promo code"
                        onChange={(e) => setPromoInput(e.target.value)}
                      />
                      <button
                        className="bg-cream py-2 px-2 rounded-lg text-brown hover:bg-creamLight"
                        onClick={handleApplyPromocode}
                        type="button"
                      >
                        <FaArrowRightLong />
                      </button>
                    </div>
                  </div>
                  <div className="py-4">
                    <div className="my-4">
                      {discountTotal && (
                        <div className=" text-cream font-md font-bold font-sans">
                          Total: ₹{discountTotal}{" "}
                          {discountTotal < total && (
                            <span className="font-sans font-medium opacity-60 text-lightCream line-through">
                              {total}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <button
                      className="block w-full rounded-lg text-brown bg-cream py-1 mb-3 font-bold font-oswald hover:bg-creamLight"
                      onClick={handleCheckOut}
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
