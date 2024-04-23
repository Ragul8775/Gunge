import React from "react";
import Image from "next/image";
const Categories = () => {
  return (
    <div className="bg-brown">
      <div className="w-full bg-cream">
        <div className="container mx-auto py-8 bg-cream max-w-[1200px]">
          <div className="md:grid md:grid-cols-2 md:gap-4 items-center mx-auto">
            <div className="md:order-2 w-64 mx-auto ">
              <Image
                src="/assets/images/Men.png"
                height={120}
                width={120}
                alt=""
                className="w-full h-auto object-cover "
              />
            </div>

            <div className="p-8 text-center md:text-left md:order-1">
              <h1 className="text-3xl md:text-6xl font-extrabold uppercase mt-4 md:mt-0 font-oswald text-brown">
                Latest Premier Mode <br />
                Mens Collection
              </h1>
              <p className="mt-4 text-base font-oswald">
                Upgrade your style with trendy and timeless mens clothing. From
                suits to casual wear, find quality pieces for every occasion
                from our mens collection.
              </p>
              <button className="mt-8 bg-brown text-cream rounded-lg font-oswald py-2 px-4 uppercase">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Women */}
      <div className="container mx-auto py-8 bg-brown max-w-[1200px]">
        <div className="md:grid md:grid-cols-2 md:gap-4 items-center mx-auto ">
          <div className="md:order-1 w-64 mx-auto ">
            <Image
              src="/assets/images/women.png"
              height={120}
              width={120}
              alt=""
              className="w-full h-auto object-cover "
            />
          </div>

          <div className="p-8 text-center md:text-left md:order-2">
            <h1 className="text-3xl md:text-6xl font-extrabold uppercase mt-4 md:mt-0 font-oswald text-cream">
              Latest Premier Mode <br />
              Womens Collection
            </h1>
            <p className="mt-4 text-base font-oswald text-cream">
              Step into a world of effortless sophistication with our exclusive
              womens collection, where style meets individuality in every
              stitch and detail.
            </p>
            <button className="mt-8 bg-cream text-brown rounded-lg font-oswald py-2 px-4 uppercase">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      {/* Accessories */}
      <div className="w-full bg-cream">
        <div className="container mx-auto py-8 bg-cream max-w-[1200px] ">
          <div className="md:grid md:grid-cols-2 md:gap-4 items-center mx-auto ">
            <div className="md:order-2 w-64 mx-auto ">
              <Image
                src="/assets/images/accessories.png"
                height={120}
                width={120}
                alt=""
                className="w-full h-auto object-cover "
              />
            </div>

            <div className="p-8 text-center md:text-left md:order-1">
              <h1 className="text-3xl md:text-6xl font-extrabold uppercase mt-4 md:mt-0 font-oswald text-brown">
                Latest Premier Mode <br />
                Accouterments Collections
              </h1>
              <p className="mt-4 text-base font-oswald">
                Accessorize your life with our curated collection. From
                statement pieces to everyday essentials, find the perfect touch
                for every moment
              </p>
              <button className="mt-8 bg-brown text-cream rounded-lg font-oswald py-2 px-4 uppercase">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
