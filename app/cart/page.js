'use client'
import { CartContext } from '../../components/CartContext'
import Image from 'next/image'
import axios from 'axios'
import  { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '../../components/Navbar'

const Cart = () => {

  const [products , setProducts] = useState([])
  const { cartProducts, addProduct, removeProduct } = useContext(CartContext);
  const moreOfThisProduct = (id) => {
    addProduct(id);
  };
  const minusOfThisProduct = (id) => {
    removeProduct(id);
  };
  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }
  useEffect(() => {
    if (cartProducts.length > 0) {
      
     
      axios.post('/api/cart', { ids:cartProducts }) // Ensure to send an object with ids
      .then(response => {
       console.log(response.data)
        setProducts(response.data)
       
      })
      .catch(error => console.error('Error posting cart data:', error));
    }
  }, [cartProducts]);
  return (
    <>
    <Navbar/>
    <div className='pt-20  min-h-screen bg-cream py-6 '>   
    <div className="container mx-auto max-w-[1200px] px-[20px]">
    <div className="grid grid-cols-2 gap-10" style={{ gridTemplateColumns: '1.3fr 0.7fr' }}>
      <div className="bg-creamLight rounded-lg p-4"> {/* Replace with your content or components */}
        {/* Content for the first column */}
        <h1 className='font-bold font-grunge text-2xl'>Cart</h1>
        {!cartProducts?.length && (
          <div className='text-xl font-bold font-oswald text-center text-red-700'>Your Cart is Empty</div>  
        )}
{products?.length>0 &&(
         <table className="w-full text-sm text-center rtl:text-right">
         <thead className="text-md uppercase bg-brown text-cream">
           <tr>
             <th className="px-6 py-3 rounded-s-lg">Product</th>
             <th className="px-6 py-3">Quantity</th>
             <th className="px-6 py-3 rounded-e-lg">Price</th>
           </tr>
         </thead>
         <tbody>
           {products.map((prod) => (
             <tr key={prod._id} className="bg-gray-200 shadow">
               <td className="px-6 py-4 text-left max-w-48">
                 <div className="flex gap-2  items-center rounded-lg overflow-hidden flex-col sm:flex-row">
                   <Image
                     src={prod.images[0]}
                     height={80}
                     width={80}
                     alt="prod-img"
                     className="max-w-full"
                   />
                   <h1 className="text-wrap">{prod.title}</h1>
                 </div>
               </td>
               <td className="px-6 py-4 text-center flex justify-center my-4">
                 <button
                   className="bg-brown text-cream text-2xl px-2 py-1 rounded-l-md"
                   onClick={() => minusOfThisProduct(prod._id)}
                 >
                   <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke-width="1.5"
                     stroke="currentColor"
                     class="w-4 h-4"
                   >
                     <path
                       stroke-linecap="round"
                       stroke-linejoin="round"
                       d="M5 12h14"
                     />
                   </svg>
                 </button>
                 <p className="px-3 bg-cream py-1 font-bold">
                   {cartProducts.filter((id) => id === prod._id).length}
                 </p>
                 <button
                   className="bg-brown text-cream text-2xl px-2 rounded-r-md"
                   onClick={() => moreOfThisProduct(prod._id)}
                 >
                   <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke-width="1.5"
                     stroke="currentColor"
                     class="w-4 h-4"
                   >
                     <path
                       stroke-linecap="round"
                       stroke-linejoin="round"
                       d="M12 4.5v15m7.5-7.5h-15"
                     />
                   </svg>
                 </button>
               </td>
               <td className="px-6 py-4 font-bold">
                 ₹{" "}
                 {cartProducts.filter((id) => id === prod._id).length * prod.price}
               </td>
             </tr>
           ))}
           <tr className="bg-gray-200 shadow">
             <td></td>
             <td className="px-6 py-4 font-bold text-lg">Total:</td>
             <td className="px-6 py-4 font-bold text-lg">₹{total}</td>
           </tr>
         </tbody>
       </table>
          )}
      </div>
      {!!cartProducts?.length && (
        <div className="bg-brown text-creamLight rounded-lg p-4"> {/* Replace with your content or components */}
        <h1 className='font-bold font-grunge text-2xl text-center'>Order Summary</h1>
        <hr className="w-54 h-1 mx-auto my-2 bg-gray-700 border-0 rounded "></hr>

        <div>
        <Link href={'/checkout'}>
        <button className='block w-full rounded-lg text-brown bg-cream py-1 font-bold font-oswald hover:bg-creamLight'>Continue to Payment</button></Link>
        </div>
      </div>
      )}
    </div>
  </div></div>
  </>
  )
}

export default Cart