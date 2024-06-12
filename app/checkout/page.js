"use client";
import { CartContext } from "@/components/CartContext";
import Navbar from "@/components/Navbar";
import React, { useContext, useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import ProgressBar from "@/components/checkOut/ProgressBar";
import AddresForm from "@/components/checkOut/AddresForm";
import Payment from "@/components/checkOut/Payment";

const Checkout = () => {
  const [amount, setAmount] = useState("");
  const { cartProducts } = useContext(CartContext);
  const [addressDetails, setAddressDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pinCode: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const total = localStorage.getItem("Clear");
    if (total) {
      setAmount(decrytoionOfTotal(total));
    }
  }, []);

  function decrytoionOfTotal(value) {
    const passphrase = "Grunge";
    const encrypted = value;
    if (!encrypted) return null;
    const bytes = CryptoJS.AES.decrypt(encrypted, passphrase);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const stepTitles = ["Address", "Payment", "Confirmation"];

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    setError(""); // Reset error message on input change
  };

  const validateAddressDetails = () => {
    const {
      firstName,
      lastName,
      email,
      phone,
      addressLine1,
      city,
      state,
      pinCode,
    } = addressDetails;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !addressLine1 ||
      !city ||
      !state ||
      !pinCode
    ) {
      setError("Please fill in all required fields.");
      return false;
    }

    return true;
  };

  const goToNextStep = () => {
    if (currentStep === 1 && !validateAddressDetails()) {
      return; // Prevent step progression if validation fails
    }
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  return (
    <>
      <Navbar />
      <div className="pt-20  min-h-screen pattern-4 py-6 ">
        <div className="container mx-auto max-w-[1200px] px-[20px]">
          <div className="grid grid-cols-1  gap-6 my-12 md:grid-cols-[1.4fr_0.6fr]">
            <div className="bg-brown py-4 px-3 rounded-l-lg shadow-lg ">
              <ProgressBar
                currentStep={currentStep}
                totalSteps={totalSteps}
                titles={stepTitles}
              />
              {currentStep === 1 && (
                <AddresForm
                  onNext={() => setCurrentStep(2)}
                  addressDetails={addressDetails}
                  onAddressChange={handleAddressChange}
                />
              )}
              {currentStep === 2 && (
                <Payment
                  onNext={() => setCurrentStep()}
                  amount={amount}
                  name={
                    addressDetails.firstName + " " + addressDetails.lastName
                  }
                />
              )}
              <div className="text-center mt-4 w-full flex justify-between">
                <button
                  className="text-cream bg-light hover:bg-productBg font-bold py-2 px-4 rounded"
                  onClick={goToPreviousStep}
                >
                  Previous
                </button>
                {error && <p className="text-red-500">{error}</p>}
                <button
                  className="text-cream bg-light hover:bg-productBg font-bold py-2 px-4 rounded"
                  onClick={goToNextStep}
                >
                  Next
                </button>
              </div>
            </div>
            <div className="bg-darkCream py-4 px-3 rounded-r-lg shadow-lg">
              <h1 className="font-bold font-grunge text-2xl text-center">
                Order Summary
              </h1>
              <hr className="w-54 h-1 mx-auto my-2 bg-gray-700 border-0 rounded " />
              <div className="flex flex-col justify-around border-dashed border-2 bg-light border-productBg  rounded-lg px-2 py-2">
                <div className="flex justify-between gap-3">
                  <h1 className="font-sans font-bold">Total Products:</h1>
                  <h1 className="font-sans font-bold ">
                    {cartProducts.length}
                  </h1>
                </div>
                <div className="flex justify-between ">
                  <h1 className="font-sans font-bold">Total Price:</h1>
                  <h1 className="font-sans font-bold">₹ {amount}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
