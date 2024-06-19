import React from "react";

const Payment = ({ amount, addressDetails, products }) => {
  return (
    <div className="my-4 flex flex-col sm:flex-row gap-2">
      <div>
        <table className="w-full text-sm text-center rtl:text-right">
          <thead className="text-md uppercase bg-cream text-brown">
            <tr>
              <td className="px-6 py-3 ">Product</td>
              <td className="px-6 py-3">Size</td>
              <td className="px-6 py-3 ">quantity</td>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, index) => (
              <tr key={index} className="bg-gray-200 text-brown shadow">
                <td className="px-6 py-4 font-bold text-wrap">{prod.title}</td>
                <td className="px-6 py-4 font-bold">{prod.size}</td>
                <td className="px-6 py-4 font-bold">{prod.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-cream rounded-lg py-2 px-3 font-oswald">
        <div className="">
          <h1 className="text-lg font-grunge text-brown ">Delivery Address</h1>
          <hr />
        </div>
        <div className="flex gap-6 items-start">
          <p className="font-bold">Name:</p>
          <p className="font-md">
            {addressDetails.firstName + " " + addressDetails.lastName}
          </p>
        </div>
        <div className="flex gap-2 items-start">
          <p className="font-bold">Address:</p>
          <div>
            <p className="font-md">{addressDetails.addressLine1}</p>
            <p className="font-md">{addressDetails.addressLine2}</p>
            <p className="font-md">
              {addressDetails.city}-{addressDetails.pinCode}
            </p>
            <p className="font-md">{addressDetails.state}</p>
          </div>
        </div>
        <div className="flex gap-6 items-start">
          <p className="font-bold">Phone:</p>
          <div>
            <p className="font-md">{addressDetails.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
