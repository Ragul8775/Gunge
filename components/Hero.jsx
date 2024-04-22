"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <>
      <div className="hidden sm:flex max-h-screen min-h-[640px] relative font-grunge">
        <div className="sm:w-1/2 w-full bg-brown text-cream flex flex-col items-center py-4 text-xl ">
          <h1 className="sm:text-8xl text-5xl order-1 sm:order-none">New</h1>
          <div className="text-content p-4 text-sm sm:text-xl bottom-0 relative flex flex-col just">
            <p className="text-description max-w-[300px]">
              Embrace the raw intensity of rebellion with threads that speak
              volumes. Our collection isn’t just apparel—it’s a tribute to the
              undying echoes of grunge, crafted for the contemporary maverick
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="py-2   text-brown bg-cream rounded-3xl mt-12"
            >
              Explore
            </motion.button>
          </div>
        </div>

        <Image
          src="/assets/icons/Hero1.png"
          width={540}
          height={50}
          alt="hero"
          className="absolute right-0 left-0  mx-auto bottom-0 sm:block hidden"
        />
        <div className="sm:w-1/2 w-full bg-cream text-brown flex  flex-col  items-center py-4 text-xl ">
          <h1 className="sm:text-8xl  ">
            {" "}
            <TypeAnimation
              sequence={[
                "Fashion",
                2000,
                "Style",
                2000,
                "Attire",
                2000,
                "Trend",
                2000,
                "Wear",
                2000,
                // Repeat:
                "Fashion",
                2000,
              ]}
              wrapper="span"
              repeat={Infinity}
            />
          </h1>
          <div className="border-2 max-w-[380px] gap-4 border-brown p-4 rounded-lg shadow-lg sm:flex hidden mt-12">
            <div className="w-1/3">
              <Image
                src="/assets/images/tshirt-1.jpg"
                width={120}
                height={120}
                alt=""
                className="rounded-lg h-32"
              />
            </div>
            <div className="w-2/3 flex flex-col">
              <h1 className="text-md text-balance">
                Drop Shoulder T-Shirt :unholy
              </h1>
              <p>Rs.799.00</p>
              <p className="text-3xl">*****</p>
              <button className="border-brown border-2  rounded-lg mx-5 bg-cream shadow-lg">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:hidden  min-h-screen font-grunge mobile-hero text-xl">
        <div className="flex flex-col  justify-around min-h-screen w-full bg-gray-600 bg-opacity-50 px-6 ">
          <div className="h-1/2 text-left mt-32">
            <h1 className="text-7xl text-cream ">New</h1>
            <h1 className="text-7xl text-cream ">
              <TypeAnimation
                sequence={[
                  "Fashion",
                  2000,
                  "Style",
                  2000,
                  "Attire",
                  2000,
                  "Trend",
                  2000,
                  "Wear",
                  2000,
                  // Repeat:
                  "Fashion",
                  2000,
                ]}
                wrapper="span"
                repeat={Infinity}
              />
            </h1>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-wrap [text-shadow:_0_1px_0_rgb(229_229_203_/_50%)] font-grunge text-2xl">
              Embrace the raw intensity of rebellion with threads that speak
              volumes. Our collection isn’t just apparel—it’s a tribute to the
              undying echoes of grunge, crafted for the contemporary maverick
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="py-2  px-4 mt-6 mb-6 text-brown bg-cream rounded-3xl sm:mt-32"
            >
              Explore
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
