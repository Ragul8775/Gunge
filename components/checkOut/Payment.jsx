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
      <div className="bg-cream rounded-lg py-2 px-3">
        <div className="">
          <h1 className="text-lg font-grunge text-brown ">Delivery Address</h1>
          <hr />
        </div>
        <div>
          <p className="font-bold">
            Name:
            <span className="font-md">
              {addressDetails.firstName + " " + addressDetails.lastName}
            </span>
          </p>
        </div>
        <div>
          <p className="font-bold">
            Address:
            <span className="font-md">
              {addressDetails.addressLine1}
              {addressDetails.addressLine2}
              {addressDetails.city},{addressDetails.state}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
