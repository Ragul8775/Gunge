import React from "react";

const Payment = ({ amount, name, products }) => {
  return (
    <div className="my-4">
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
  );
};

export default Payment;
