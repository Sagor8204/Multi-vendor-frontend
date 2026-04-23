'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ShoppingBag, Trash2, Plus, Minus, Lock } from 'lucide-react';

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const cartTotal = useCartStore((state) => state.cartTotal());
  const cartCount = useCartStore((state) => state.cartCount());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (cartCount === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
         <div className="flex justify-center mb-6">
            <ShoppingBag className="w-16 h-16 text-muted opacity-20" />
         </div>
         <h1 className="text-3xl font-extrabold text-main">Your cart is empty</h1>
         <p className="text-muted mt-2 font-medium">Looks like you haven't added anything yet.</p>
         <Link href="/products">
           <Button className="mt-8 px-10 py-4">Start Shopping</Button>
         </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold text-main mb-12 tracking-tight">Shopping Cart ({cartCount})</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center bg-white border border-border p-6 rounded-2xl gap-6 hover:shadow-sm transition-shadow">
               <div className="w-24 h-24 bg-background-subtle rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
               </div>
               
               <div className="flex-grow text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                     <div>
                        <h3 className="font-bold text-lg text-main leading-tight">{item.name}</h3>
                        <p className="text-xs text-muted mt-1 font-bold uppercase tracking-wider">Sold by <span className="text-secondary">{item.vendor}</span></p>
                     </div>
                     <span className="text-xl font-extrabold text-primary">${item.price}</span>
                  </div>
                  
                  <div className="flex items-center justify-center sm:justify-between mt-6">
                     <div className="flex items-center border border-border rounded-lg bg-background-subtle overflow-hidden">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 cursor-pointer hover:bg-white transition-colors"
                        >
                           <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-4 py-1 font-bold text-sm min-w-[40px] text-center border-x border-border">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 cursor-pointer hover:bg-white transition-colors"
                        >
                           <Plus className="w-3 h-3" />
                        </button>
                     </div>
                     <button 
                       onClick={() => removeFromCart(item.id)}
                       className="text-xs cursor-pointer font-bold text-error hover:underline ml-6 flex items-center gap-1.5"
                     >
                        <Trash2 className="w-3 h-3" />
                        Remove Item
                     </button>
                  </div>
               </div>
            </div>
          ))}
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
           <Card className="sticky top-32 bg-background-subtle border-2 border-primary/5">
              <h2 className="text-xl font-extrabold text-main mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                 <div className="flex justify-between text-sm font-semibold text-muted">
                    <span>Subtotal</span>
                    <span className="text-main">${cartTotal.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between text-sm font-semibold text-muted">
                    <span>Shipping</span>
                    <span className="text-success uppercase tracking-widest text-[10px] font-bold">Free</span>
                 </div>
                 <div className="flex justify-between text-sm font-semibold text-muted">
                    <span>Estimated Tax</span>
                    <span className="text-main">$0.00</span>
                 </div>
                 
                 <div className="h-[1px] bg-border my-6"></div>
                 
                 <div className="flex justify-between items-center mb-8">
                    <span className="text-lg font-extrabold text-main">Total Amount</span>
                    <span className="text-2xl font-extrabold text-primary">${cartTotal.toFixed(2)}</span>
                 </div>
                 
                 <Link href="/checkout" className="block">
                   <Button className="w-full py-4 text-base font-bold shadow-xl shadow-primary/20">
                      Proceed to Checkout
                   </Button>
                 </Link>
                 
                 <div className="pt-6 text-center flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-2">
                       <Lock className="w-3 h-3 text-muted" />
                       <span className="text-[10px] text-muted font-bold uppercase tracking-widest">Secure SSL Encryption</span>
                    </div>
                    <p className="text-[9px] text-muted/60 font-medium leading-relaxed uppercase tracking-tighter">
                       All major credit cards accepted
                    </p>
                 </div>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
