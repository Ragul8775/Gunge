import ProductDetails from "../../../models/productDetails";
import { mongooseConnect } from "../../../lib/mongoose";

export const GET = async (req)=>{
        await mongooseConnect()
        console.log("Connection done")
   

        try {
           const products = await ProductDetails.find();
           
          return new Response(JSON.stringify(products), { status: 200});
        } catch (error) {
            console.error('Error Getting product:', error);
            return new Response(JSON.stringify("Internal Server Error:",error),{
                status:500
            })
          
        
    }

}