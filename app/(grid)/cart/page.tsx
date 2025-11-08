// app/cart/page.tsx
'use client';

import { useCart } from "../../store/cartStore";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";


export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  
  
  return (
    
      
    <div id="cart" className="p-6 bg-gray-600 rounded-2xl w-full mt-10">
      
      <h1 className="flex items-center gap-4 text-2xl font-bold mb-4 text-white mr-2">Shopping Cart <FaCartShopping /> </h1>
      
      {cart.length === 0 ? (
        <p className="text-gray-300 bg-black/10 p-4 rounded-2xl">There are no games in the shopping cart</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div id="distinct" key={item.id} className="flex justify-between items-center p-4 rounded-2xl overflow-y-auto">
              <div>
                <p className="text-white font-semibold">{item.name}</p>
                <p className="text-gray-300 text-sm mt-4 gap-4 font-semibold"> Quantity: {item.quantity}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-white font-bold">${(item.price/100 * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(item.id) }
                  className="text-yellow-500 text-sm hover:text-red-400 duration-150"
                >
                  Delete
                </button>
              </div>
            </div>
            
          ))}

          <div className="flex justify-between items-center mt-4 border-t border-gray-600 pt-4">
            <span className="text-white font-semibold">Total :</span>
            <span className="text-green-400 font-bold text-lg">${(totalPrice/100).toFixed(2)}</span>
          </div>

          <button id="empty"
            onClick={clearCart}
            className=" text-white px-4 py-2 rounded-2xl mt-4 duration-150"
          >
            Empty the shopping cart
          </button>
        </div>
        
      )}

      <Link href="/Home" className="text-yellow-500 decoration-0 hover:text-green-500 block mt-6 duration-150 w-36">
      Back To Home ⬅ 
      </Link>
    </div>
    
  );
}
