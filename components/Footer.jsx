import Image from "next/image";
import React from "react";
import { IoLogoInstagram } from "react-icons/io";
import { IoLogoFacebook } from "react-icons/io";
import { IoLogoTwitter } from "react-icons/io";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white  px-10 w-full z-50">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 justify-evenly">
        {/* Feedback Section */}
        <div className="flex flex-col-reverse sm:flex-col my-10">
          <div className="flex flex-col items-start">
            <h2 className="text-2xl font-bold mb-4">Feedback</h2>
            <textarea
              className="w-full h-24 p-2 rounded-lg text-black"
              placeholder="Write your feedback here..."
            ></textarea>
            <button className="mt-4 px-4 py-2 bg-black text-white rounded-lg">
              SEND
            </button>
          </div>
          <div className="flex flex-col items-start text-lg">
            <h2 className="text-4xl font-bold mb-4 font-grunge">GRUNGE</h2>
            <p className="max-w-sm">
              Embrace the raw intensity of rebellion with threads that speak
              volumes. Our collection isn't just apparel—it's a tribute to the
              undying echoes of grunge, crafted for the contemporary maverick.
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-start text-lg justify-center sm:mx-auto mb-10 sm:mb-0">
          <h2 className="text-2xl font-bold mb-4">Navigation</h2>
          <a href="/" className="mb-2">
            Home
          </a>
          <a href="/categories" className="mb-2">
            Categories
          </a>
          <a href="/cart" className="mb-2">
            Cart
          </a>
          <div className="flex mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-4"
            >
              <IoLogoFacebook size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-4"
            >
              <IoLogoInstagram size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-4"
            >
              <IoLogoTwitter size={24} />
            </a>
          </div>
        </div>

        {/* Branding and Description */}
        <div className="hidden sm:flex items-end">
          <Image
            src={"/assets/images/footer.png"}
            height={547}
            width={620}
            alt="Footer"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
