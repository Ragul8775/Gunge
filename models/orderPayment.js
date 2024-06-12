import mongoose, { Schema, model, models } from "mongoose";

const orderPayment = new Schema(
  {
    name: {
      type: String,
    },
    amount: {
      type: Number,
    },
    orderId: {
      type: String,
    },
    razorpay_payment_id: {
      type: String,
      default: null,
    },
    razorpay_order_id: {
      type: String,
      default: null,
    },
    razorpay_signature: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
const OrderPaymentDetails =
  models.OrderPaymentDetails || model("OrderPaymentDetails", orderPayment);
export default OrderPaymentDetails;
