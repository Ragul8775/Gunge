import { mongooseConnectUserPayments } from "@/lib/mongoose";
import OrderPaymentDetails from "@/models/orderPayment";
import Razorpay from "razorpay";

var razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

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

  const { name, amount, products, address, email } = body;

  if (!name || !amount || !products || !address || !email) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
    });
  }

  try {
    const order = await razorpay.orders.create({
      amount: Number(amount * 100),
      currency: "INR",
    });

    await OrderPaymentDetails.create({
      orderId: order.id,
      email: email,
      name: name,
      amount: amount,
      products: products,
      address: JSON.stringify(address),
    });

    return new Response(JSON.stringify(order), { status: 200 });
  } catch (error) {
    console.error("Error creating the order:", error);
    return new Response(
      JSON.stringify({ error: "Error creating the order", details: error }),
      {
        status: 500,
      }
    );
  }
};
