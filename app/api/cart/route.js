import { mongooseConnect } from "../../../lib/mongoose";
import ProductDetails from "../../../models/productDetails";

export const POST= async (req)=>{
        
    await mongooseConnect();
    
    const { ids } =await req.json()
    
   console.log(ids)
        try {
            const products = await ProductDetails.find({
                _id: { $in: ids }
              });
           
          return new Response(JSON.stringify(products), { status: 200});
        } catch (error) {
            console.error('Error Getting product:', error);
            return new Response(JSON.stringify("Internal Server Error:",error),{
                status:500
            })
          
        
    }

}