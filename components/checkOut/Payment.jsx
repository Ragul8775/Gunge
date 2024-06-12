import React from "react";

const Payment = ({ amount, name }) => {
  return (
    <h1 className="text-oswald text-cream font-xl">
      Payment Page: {name}, Rs.{amount}
    </h1>
  );
};

export default Payment;
