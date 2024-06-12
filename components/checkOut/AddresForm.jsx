import React from "react";

const AddresForm = ({ addressDetails, onAddressChange }) => {
  return (
    // component

    <div>
      <div className="flex justify-around gap-4">
        <div className="mt-5 bg-creamLight rounded-lg shadow">
          <div className="flex">
            <div className="flex-1 py-5 pl-5 overflow-hidden">
              <svg
                className="inline align-text-top"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g>
                  <path
                    d="m4.88889,2.07407l14.22222,0l0,20l-14.22222,0l0,-20z"
                    fill="none"
                    id="svg_1"
                    stroke="null"
                  ></path>
                  <path
                    d="m7.07935,0.05664c-3.87,0 -7,3.13 -7,7c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zm-5,7c0,-2.76 2.24,-5 5,-5s5,2.24 5,5c0,2.88 -2.88,7.19 -5,9.88c-2.08,-2.67 -5,-7.03 -5,-9.88z"
                    id="svg_2"
                  ></path>
                  <circle cx="7.04807" cy="6.97256" r="2.5" id="svg_3"></circle>
                </g>
              </svg>
              <h1 className="inline text-2xl font-semibold leading-none text-brown">
                Address
              </h1>
            </div>
          </div>
          <div className="px-5 pb-5">
            <div className="flex w-full">
              <div className="flex-grow w-1/2 pr-2">
                <input
                  placeholder="First Name"
                  className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent
                   rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 
                   ring-offset-current ring-offset-2 ring-gray-400"
                  type="text"
                  name="firstName"
                  value={addressDetails.firstName}
                  onChange={onAddressChange}
                />
              </div>
              <div className="flex-grow w-1/2">
                <input
                  placeholder="Last Name"
                  className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent 
                  rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 
                  ring-offset-current ring-offset-2 ring-gray-400"
                  type="text"
                  name="lastName"
                  value={addressDetails.lastName}
                  onChange={onAddressChange}
                />
              </div>
            </div>
            <div className="flex w-full">
              <div className="flex-grow w-1/2 pr-2">
                <input
                  placeholder="Email"
                  className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent
                   rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2
                    ring-offset-current ring-offset-2 ring-gray-400"
                  type="email"
                  name="email"
                  value={addressDetails.email}
                  onChange={onAddressChange}
                />
              </div>
              <div className="flex-grow">
                <input
                  placeholder="Phone.No"
                  className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent 
                  rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2
                   ring-offset-current ring-offset-2 ring-gray-400"
                  type="tel"
                  name="phone"
                  value={addressDetails.phone}
                  onChange={onAddressChange}
                />
              </div>
            </div>
            <input
              placeholder="Address Line-1"
              className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent
               rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2
                ring-offset-current ring-offset-2 ring-gray-400"
              type="text"
              name="addressLine1"
              value={addressDetails.addressLine1}
              onChange={onAddressChange}
            />
            <input
              placeholder="Address Line-2"
              className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out
               transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800
                focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
              type="text"
              name="addressLine2"
              value={addressDetails.addressLine2}
              onChange={onAddressChange}
            />
            <div className="flex">
              <div className="flex-grow  w-1/4 pr-1">
                <input
                  placeholder="Pincode"
                  className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out 
                  transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800
                   focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  name="pinCode"
                  value={addressDetails.pinCode}
                  onChange={onAddressChange}
                />
              </div>
              <div className="flex-grow  w-1/4 pr-1">
                <input
                  placeholder="City"
                  className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform
                   border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 
                   focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  type="text"
                  name="city"
                  value={addressDetails.city}
                  onChange={onAddressChange}
                />
              </div>
              <div className="flex-grow  w-1/4 pr-1">
                <input
                  placeholder="State"
                  className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform
                   border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 
                   focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  type="text"
                  name="state"
                  value={addressDetails.state}
                  onChange={onAddressChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddresForm;
