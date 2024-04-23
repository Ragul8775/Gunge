import { mongooseConnect } from "@/lib/mongoose";
import ProductDetails from "@/models/productDetails";

export const GET = async (req, { params }) => {
  await mongooseConnect();
  try {
    const product = await ProductDetails.findOne({ _id: params.id });
    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.error("Error Getting product:", error);
    return new Response(JSON.stringify("failed to fetch product:", error), {
      status: 500,
    });
  }
};
