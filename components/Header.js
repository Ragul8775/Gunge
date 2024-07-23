"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import Image from "next/image";
import "../styles/nav.css";
import { Example } from "./mobNav/Example";
import { CartContext } from "./CartContext";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const { cartProducts } = useContext(CartContext);
  const { data: session } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const getCallbackUrl = () => {
    if (typeof window !== "undefined") {
      return encodeURIComponent(window.location.href);
    }
    return "";
  };
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-300 bg-opacity-60 sm:bg-opacity-100 font-grunge h-14 flex items-center">
      <div className="absolute sm:hidden">
        <Example />
      </div>
      <div className="w-1/2 sm:bg-brown text-cream flex justify-evenly py-4 text-xl ">
        <Link
          href={"/"}
          className="hover:underline cursor-pointer hidden sm:block"
        >
          <h1>Home</h1>
        </Link>
        <Link
          href={"/products"}
          className="hover:underline cursor-pointer hidden sm:block"
        >
          <h1>Products</h1>
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
      <div className="w-1/2 sm:bg-cream text-brown flex justify-evenly py-[13px] text-xl">
        <Link
          href={"/cart"}
          className="hover:underline cursor-pointer hidden sm:block mt-1"
        >
          <h1>Cart({cartProducts.length})</h1>
        </Link>

        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              alt="User Avatar"
              width={40}
              height={40}
              className="object-contain hidden sm:block rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="absolute right-0 top-full mt-3 w-12 p-5 rounded-lg bg-creamLight shadow-lg min-w-[210px] flex flex-col gap-2 justify-end items-end hidden sm:block">
                <Link
                  href="/"
                  className="font-grunge"
                  onClick={() => setToggleDropdown(false)}
                >
                  {session?.user.name}
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className=" bg-brown text-cream px-2 rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              href={`/login?callbackUrl=${getCallbackUrl()}`}
              className="hover:underline cursor-pointer hidden sm:block"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
