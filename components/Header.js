'use client'
import Link from "next/link";
import React, { useContext } from "react";
import Image from "next/image";
import "../styles/nav.css";
import { Example } from "./mobNav/Example";
import { CartContext } from "./CartContext";

const Header = () => {
  const {cartProducts}= useContext(CartContext)
  return (
    <nav className=" fixed top-0 left-0 w-full z-50 bg-gray-300 bg-opacity-60 sm:bg-opacity-100 font-grunge h-14 flex items-center">
      <div className="absolute sm:hidden">
        <Example/>
      </div>
      <div className="w-1/2 sm:bg-brown text-cream flex justify-evenly py-4 text-xl ">
        <Link
          href={"/"}
          className="hover:underline cursor-pointer hidden sm:block"
        >
          <h1>Home</h1>
        </Link>
        <Link
          href={"/"}
          className="hover:underline cursor-pointer hidden sm:block"
        >
          <h1>Category</h1>
        </Link>
      </div>
      <Image
        src="/assets/icons/logo-home.png"
        width={140}
        height={140}
        alt="grunge"
        className="hidden sm:block absolute top-4 left-0 right-0 mx-auto"
      />
      <Image
        src="/assets/icons/logo-white.png"
        width={140}
        height={140}
        alt="grunge"
        className="absolute sm:hidden top-4 left-0 right-0 mx-auto"
      />
      <div className="w-1/2 sm:bg-cream text-brown flex justify-evenly py-4 text-xl">
        <Link
          href={"/cart"}
          className="hover:underline cursor-pointer hidden sm:block"
        >
          <h1>Cart({cartProducts.length})</h1>
        </Link>
        <Link
          href={"/"}
          className="hover:underline cursor-pointer hidden sm:block"
        >
          <h1>Login</h1>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
