import React from "react";

const Confirmation = ({ orderId, email }) => {
  return (
    <div className=" flex flex-col items-center justify-center  my-8 py-2">
      <div className="bg-white p-10 rounded shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
        <p className="mb-2">
          Your order ID is <strong>{orderId}</strong>.
        </p>
        <p className="mb-4">
          A confirmation email has been sent to <strong>{email}</strong>.
        </p>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-productBg mx-auto"></div>
        <p className="mt-4">Your package will arrive soon.</p>
      </div>
    </div>
  );
};

export default Confirmation;
