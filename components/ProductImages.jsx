"use client";
import React, { useState } from "react";

const ProductImages = ({ images }) => {
  const [activeImage, setActiveImage] = useState(
    images?.[0] || "../public/images/tshirt-1.jpg"
  );
  return (
    <>
      <div>
        <img
          src={activeImage}
          className="rounded-lg "
          alt="Describe the image"
        />
      </div>
      <div className="flex h-28 gap-2 mt-3">
        {images?.map((image) => (
          <div key={image} onClick={() => setActiveImage(image)}>
            <img
              src={image}
              className={`rounded-lg cursor-pointer ${
                activeImage === image
                  ? "opacity-50 border-2 border-brown"
                  : "border-none"
              }`}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductImages;
