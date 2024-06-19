import { mongooseConnectUserPayments } from "@/lib/mongoose";
import OrderPaymentDetails from "@/models/orderPayment";
import Razorpay from "razorpay";
import crypto from "crypto";

var razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const generateSignature = (razorpayOrderId, razorpayPaymentId) => {
  const keySecret = process.env.RAZORPAY_KEY_SECRET; // Ensure the correct environment variable is used
  if (!keySecret) {
    throw new Error(
      "Razorpay key secret is not defined in environment variables."
    );
  }
  const sig = crypto
    .createHmac("sha256", keySecret)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");
  return sig;
};

export const POST = async (req) => {
  await mongooseConnectUserPayments();

  let body;
  try {
    body = await req.json();
  } catch (error) {
    console.error("Invalid JSON payload:", error);
    return new Response(JSON.stringify({ error: "Invalid JSON payload" }), {
      status: 400,
    });
  }

  const {
    orderCreationId,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
  } = body;

  if (!razorpayPaymentId || !razorpayOrderId || !razorpaySignature) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
    });
  }
  console.log(body);

  try {
    const signature = generateSignature(orderCreationId, razorpayPaymentId);
    const isValid = signature === razorpaySignature;
    if (isValid) {
      await OrderPaymentDetails.findOneAndUpdate(
        { orderId: razorpayOrderId },
        {
          $set: {
            razorpay_payment_id: razorpayPaymentId,
            razorpay_order_id: razorpayOrderId,
            razorpay_signature: razorpaySignature,
          },
        }
      );
      return new Response(
        JSON.stringify({
          message: "Payment verified successfully",
          isOk: true,
        }),
        {
          status: 200,
        }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Invalid payment signature", isOk: false }),
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying the payment:", error);
    return new Response(
      JSON.stringify({
        error: "Error verifying the payment",
        details: error.message,
      }),
      {
        status: 500,
      }
    );
  }
};
