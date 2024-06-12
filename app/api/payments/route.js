import { mongooseConnectUserPayments } from "@/lib/mongoose";
import OrderPaymentDetails from "@/models/orderPayment";
import Razorpay from "razorpay";

var razorpay = new Razorpay({
  key_id: process.env.razor_key_id,
  key_secret: process.env.razor_key_secret,
});
export const POST = async (req) => {
  await mongooseConnectUserPayments();
  const { name, amount } = req.json();
  try {
    const order = await razorpay.orders.create({
      amount: Number(amount * 100),
      currency: "INR",
    });
    await OrderPaymentDetails.create({
      orderId: order.id,
      name: name,
      amount: amount,
    });
    return new Response(JSON.stringify(order), { status: 200 });
  } catch (error) {
    console.error("Error creating the order:", error);
    return new Response(JSON.stringify("Error creating the order:", error), {
      status: 500,
    });
  }
};
