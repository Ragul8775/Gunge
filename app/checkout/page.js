"use client";
import { CartContext } from "@/components/CartContext";
import Navbar from "@/components/Navbar";
import React, { useContext, useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import ProgressBar from "@/components/checkOut/ProgressBar";
import AddresForm from "@/components/checkOut/AddresForm";
import Payment from "@/components/checkOut/Payment";
import axios from "axios";
import Script from "next/script";
import { useSession } from "next-auth/react";
import Confirmation from "@/components/checkOut/Confirmation";
import { SyncLoader } from "react-spinners";
const Checkout = () => {
  const { data: session } = useSession();

  const [total, setTotal] = useState();
  const { cartProducts } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [paymentId, setPaymentId] = useState("");
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
  const { clearCart } = useContext(CartContext);
  useEffect(() => {
    const totalsString = localStorage.getItem("Total");
    if (totalsString) {
      const totals = JSON.parse(totalsString); // Convert the string back to an object
      setTotal(totals);
    }
  }, []);

  console.log("Amount", total);
  const checkOutHandler = async () => {
    try {
      const response = await axios.post("/api/payments", {
        name: addressDetails.firstName,
        amount: total?.amount,
        products: total?.products,
        address: addressDetails,
        email: session?.user.email,
      });
      console.log("Response:", response.data);

      return response.data.id;
    } catch (error) {
      console.error(
        "Error during checkout:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const processPayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const orderId = await checkOutHandler();
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        amount: total?.amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Grunge", //your business name
        description: "Test Transaction",
        image: "/public/assets/Grunge_logo.jpg",
        order_id: orderId,
        handler: async function (response) {
          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await fetch("/api/payments/verification", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
          });
          const res = await result.json();

          if (res.isOk) {
            alert("Payment succeeded");
            setCurrentStep(3);
            setOrderId(orderId);
            clearCart();
          } else {
            alert(res.message);
          }
        },
        prefill: {
          //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          name: addressDetails.firstName + " " + addressDetails.lastName, //your customer's name
          email: addressDetails.email,
          contact: addressDetails.phone,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#1a120b",
        },
      };

      console.log("Payment options:", options);
      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response) {
        alert(response.error.description);
      });
      paymentObject.open();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

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
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
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
                  amount={total.amount}
                  addressDetails={addressDetails}
                  products={total?.products}
                />
              )}
              {currentStep === 3 && (
                <Confirmation orderId={orderId} email={addressDetails?.email} />
              )}
              <div className="text-center mt-4 w-full flex justify-between">
                {currentStep == 2 && (
                  <button
                    className="text-cream bg-light hover:bg-productBg font-bold py-2 px-4 rounded"
                    onClick={goToPreviousStep}
                  >
                    Previous
                  </button>
                )}
                {error && <p className="text-red-500">{error}</p>}
                {currentStep <= 1 && (
                  <button
                    className="text-cream bg-light hover:bg-productBg font-bold py-2 px-4 rounded"
                    onClick={goToNextStep}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
            {currentStep <= 2 && (
              <div className="bg-darkCream py-4 px-3 rounded-r-lg shadow-lg">
                <h1 className="font-bold font-grunge text-2xl text-center">
                  Order Summary
                </h1>
                <hr className="w-54 h-1 mx-auto my-2 bg-gray-700 border-0 rounded " />
                <div className="flex flex-col justify-between h-full">
                  <div className="flex flex-col justify-around border-dashed border-2 bg-light border-productBg  rounded-lg px-2 py-2">
                    <div className="flex justify-between gap-3">
                      <h1 className="font-sans font-bold">Total Products:</h1>
                      <h1 className="font-sans font-bold ">
                        {cartProducts.length}
                      </h1>
                    </div>
                    <div className="flex justify-between ">
                      <h1 className="font-sans font-bold">Total Price:</h1>
                      <h1 className="font-sans font-bold">₹ {total?.amount}</h1>
                    </div>
                  </div>
                  {currentStep == 2 && (
                    <button
                      className=" w-full rounded-lg text-brown bg-cream py-1 mb-14 font-bold font-oswald hover:bg-creamLight flex justify-center items-center"
                      onClick={processPayment}
                      disabled={loading}
                    >
                      {loading ? (
                        <SyncLoader
                          color="#1a120b"
                          loading={loading}
                          size={8}
                          speedMultiplier={1}
                          className="my-2"
                        />
                      ) : (
                        "Continue to Payment"
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
