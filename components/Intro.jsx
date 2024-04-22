import React from "react";
import Image from "next/image";
const Intro = () => {
  return (
    <div className="bg-brown">
      <div className=" bg-brown p-4 flex flex-col justify-between items-center gap-8 max-w-[1200px] sm:gap-0 sm:flex-row sm:px-8 mx-auto ">
        <div className="h-80 w-52 sm:h-fit sm:w-72 ">
          <Image
            src="/assets/images/intro-1.png"
            height={650}
            width={300}
            alt=""
          />
        </div>
        <div className="flex justify-center items-center my-auto gap-4">
          <Image src="/assets/images/the.png" height={160} width={160} alt="" />
          <Image
            src="/assets/images/real.png"
            height={160}
            width={160}
            alt=""
          />
        </div>
        <div className="sm:mt-16  h-80 w-52 sm:h-fit sm:w-72">
          <Image
            src="/assets/images/intro-3.png"
            height={650}
            width={300}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Intro;
