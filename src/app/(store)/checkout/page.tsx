'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    fullName: '',
    addressLine: '',
    city: '',
    postalCode: '',
    country: 'United States',
  });

  const handlePlaceOrder = () => {
    // API logic will go here: POST /orders/create/
    alert('Order Placed Successfully! (API integration next)');
    clearCart();
    window.location.href = '/';
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-center space-x-4 mb-12">
         <h1 className="text-4xl font-extrabold text-text-main tracking-tight">Checkout</h1>
         <div className="h-2 w-2 bg-text-muted rounded-full"></div>
         <span className="text-text-muted font-bold uppercase tracking-widest text-xs">Secure Transaction</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Forms */}
        <div className="lg:col-span-2 space-y-8">
           {/* Step 1: Shipping Address */}
           <Card title="1. Shipping Information" description="Where should we send your items?">
              <div className="space-y-6">
                 <Input 
                   label="Full Name" 
                   placeholder="John Doe" 
                   value={address.fullName}
                   onChange={(e) => setAddress({...address, fullName: e.target.value})}
                 />
                 <Input 
                   label="Address Line" 
                   placeholder="123 Marketplace Ave" 
                   value={address.addressLine}
                   onChange={(e) => setAddress({...address, addressLine: e.target.value})}
                 />
                 <div className="grid grid-cols-2 gap-6">
                    <Input 
                      label="City" 
                      placeholder="New York" 
                      value={address.city}
                      onChange={(e) => setAddress({...address, city: e.target.value})}
                    />
                    <Input 
                      label="Postal Code" 
                      placeholder="10001" 
                      value={address.postalCode}
                      onChange={(e) => setAddress({...address, postalCode: e.target.value})}
                    />
                 </div>
              </div>
           </Card>

           {/* Step 2: Payment (Placeholder) */}
           <Card title="2. Payment Method" description="How would you like to pay?">
              <div className="border-2 border-primary/20 bg-primary/5 p-6 rounded-xl flex items-center justify-between">
                 <div className="flex items-center space-x-4">
                    <div className="text-2xl">💳</div>
                    <div>
                       <div className="font-bold text-text-main">Credit or Debit Card</div>
                       <div className="text-xs text-text-muted font-medium">Encrypted & Secure SSL Checkout</div>
                    </div>
                 </div>
                 <div className="text-primary font-bold text-xs uppercase tracking-widest">Active</div>
              </div>
           </Card>
        </div>

        {/* Right Column: Order Review */}
        <div className="lg:col-span-1">
           <div className="sticky top-32 space-y-6">
              <Card className="bg-text-main text-white border-none shadow-2xl">
                 <h2 className="text-xl font-bold mb-6 text-secondary tracking-tight">Review Order</h2>
                 
                 <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {cart.map((item) => (
                       <div key={item.id} className="flex justify-between items-center gap-4">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-white/10 rounded overflow-hidden flex-shrink-0">
                                <img src={item.image} className="w-full h-full object-cover" />
                             </div>
                             <div>
                                <div className="text-xs font-bold line-clamp-1">{item.name}</div>
                                <div className="text-[10px] text-white/50 font-medium">Qty: {item.quantity}</div>
                             </div>
                          </div>
                          <span className="text-sm font-bold text-secondary">${(item.price * item.quantity).toFixed(2)}</span>
                       </div>
                    ))}
                 </div>
                 
                 <div className="h-[1px] bg-white/10 my-6"></div>
                 
                 <div className="space-y-3">
                    <div className="flex justify-between text-xs font-bold text-white/60 uppercase tracking-widest">
                       <span>Subtotal</span>
                       <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-white/60 uppercase tracking-widest">
                       <span>Shipping</span>
                       <span className="text-secondary">FREE</span>
                    </div>
                    <div className="flex justify-between items-center pt-4">
                       <span className="text-lg font-extrabold uppercase tracking-tight">Order Total</span>
                       <span className="text-3xl font-extrabold text-secondary tracking-tighter">${cartTotal.toFixed(2)}</span>
                    </div>
                 </div>
                 
                 <Button 
                    onClick={handlePlaceOrder}
                    variant="secondary" 
                    className="w-full mt-8 py-4 text-base font-extrabold shadow-lg shadow-secondary/30 tracking-wide uppercase group"
                 >
                    Confirm & Place Order
                 </Button>
              </Card>
              
              <div className="p-4 bg-background-subtle rounded-xl border border-border text-center">
                 <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">
                    Guaranteed Safe Checkout
                 </p>
                 <div className="flex justify-center gap-2 mt-2 opacity-30 grayscale font-bold text-xs">
                    <span>VISA</span> <span>MC</span> <span>AMEX</span> <span>PAYPAL</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
