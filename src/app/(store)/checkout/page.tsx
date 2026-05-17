'use client';

import React, { useEffect, useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';
import { OrderService } from '@/services/order.service';
import { AddressModal } from '@/components/profile/AddressModal';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Loader2, CheckCircle2, Plus, ShoppingCart, ShieldCheck, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { isAuthenticated, isLoadingProfile } = useAuth();
  const { addresses, isLoadingAddresses, addAddress, isAddingAddress } = useUser();
  const cart = useCartStore((state) => state.cart);
  const cartTotal = useCartStore((state) => state.cartTotal());
  const clearCart = useCartStore((state) => state.clearCart);
  
  const [mounted, setMounted] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync selected address and handle empty state
  useEffect(() => {
    if (addresses && addresses.length > 0 && !selectedAddressId) {
      const defaultAddr = addresses.find(a => a.is_default) || addresses[0];
      setSelectedAddressId(defaultAddr.id);
    } else if (addresses && addresses.length === 0 && mounted && isAuthenticated && !isLoadingAddresses) {
      setIsModalOpen(true);
    }
  }, [addresses, mounted, isAuthenticated, isLoadingAddresses, selectedAddressId]);

  if (!mounted || isLoadingProfile) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Loader2 className="w-10 h-10 text-primary animate-spin" />
    </div>
  );

  // Cart Empty State
  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-8">
          <ShoppingCart className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl font-black text-main mb-4 tracking-tight">Your cart is empty.</h1>
        <p className="text-muted max-w-md mb-10 font-bold uppercase tracking-widest text-[10px]">Add items to your cart before proceeding to checkout.</p>
        <Link href="/">
          <Button className="px-12 h-16 rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-primary/20">
            Return to Marketplace
          </Button>
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast.error('Please select or add a shipping address');
      setIsModalOpen(true);
      return;
    }

    try {
      setIsPlacingOrder(true);
      const response = await OrderService.placeOrder(selectedAddressId);
      if (response.success) {
        toast.success('Order Placed Successfully!', {
          icon: '🎉',
          duration: 5000,
        });
        clearCart();
        router.push('/profile');
      } else {
        toast.error(response.message || 'Failed to place order');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const handleAddAddress = (data: any) => {
    addAddress(data, {
      onSuccess: (res: any) => {
        if (res.success && res.data) {
          setSelectedAddressId(res.data.id);
          setIsModalOpen(false);
        }
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-center space-x-4 mb-12">
         <h1 className="text-4xl font-black text-main tracking-tighter">Checkout.</h1>
         <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
         <div className="flex items-center space-x-2 text-muted">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Secure SSL Checkout</span>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left Column: Forms */}
        <div className="lg:col-span-2 space-y-12">
           {/* Step 1: Shipping Address */}
           <Card 
            title="1. Shipping Information" 
            description="Manage your delivery destinations"
            className="p-4 border-none shadow-sm bg-background-subtle rounded-[40px]"
           >
              {isLoadingAddresses ? (
                <div className="py-20 flex flex-col items-center justify-center space-y-4">
                   <Loader2 className="w-8 h-8 text-primary animate-spin" />
                   <p className="text-[10px] font-black text-muted uppercase tracking-widest">Loading Addresses...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map((addr) => (
                    <div 
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`relative p-8 rounded-4xl border-2 transition-all cursor-pointer group ${
                        selectedAddressId === addr.id 
                        ? 'border-primary bg-white shadow-xl shadow-primary/5' 
                        : 'border-transparent bg-white/50 hover:border-primary/20'
                      }`}
                    >
                      {selectedAddressId === addr.id && (
                        <div className="absolute top-6 right-6 text-primary">
                          <CheckCircle2 className="w-6 h-6 fill-primary text-white" />
                        </div>
                      )}
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${selectedAddressId === addr.id ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-muted'}`}>
                           <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-black text-main text-sm uppercase tracking-tight mb-2">{addr.full_name}</div>
                          <div className="text-xs text-muted font-bold leading-relaxed space-y-0.5">
                            <p>{addr.address_line}</p>
                            <p>{addr.city}, {addr.postal_code}</p>
                            <p className="opacity-60">{addr.country}</p>
                          </div>
                          <div className="mt-4 text-[11px] font-black text-main opacity-40 uppercase tracking-widest group-hover:opacity-100 transition-opacity">
                            {addr.phone}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Specialized Add New Card */}
                  <div 
                    onClick={() => setIsModalOpen(true)}
                    className="flex flex-col items-center justify-center p-8 rounded-4xl border-2 border-dashed border-border/60 hover:border-primary/40 hover:bg-white transition-all cursor-pointer group min-h-[180px]"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm group-hover:bg-primary/10 flex items-center justify-center mb-4 transition-all group-hover:scale-110">
                       <Plus className="w-6 h-6 text-muted group-hover:text-primary" />
                    </div>
                    <span className="text-[10px] font-black text-muted group-hover:text-primary uppercase tracking-[0.2em]">Add New Destination</span>
                  </div>
                </div>
              )}
           </Card>

           {/* Step 2: Payment (Placeholder) */}
           <Card 
             title="2. Payment Method" 
             description="Securely finalize your transaction"
             className="p-4 border-none shadow-sm bg-background-subtle rounded-[40px]"
           >
              <div className="border-2 border-primary/20 bg-white p-8 rounded-4xl flex items-center justify-between shadow-sm">
                 <div className="flex items-center space-x-5">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-3xl">
                       💳
                    </div>
                    <div>
                       <div className="font-black text-main uppercase tracking-tight text-base mb-1">Credit or Debit Card</div>
                       <div className="text-[10px] text-muted font-black uppercase tracking-[0.2em]">Encrypted & Secure SSL Checkout</div>
                    </div>
                 </div>
                 <div className="bg-primary text-white font-black text-[10px] px-5 py-2 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-primary/20">
                    Selected
                 </div>
              </div>
           </Card>
        </div>

        {/* Right Column: Order Review */}
        <div className="lg:col-span-1">
           <div className="sticky top-32 space-y-8">
              <Card className="bg-text-main text-white border-none shadow-2xl relative overflow-hidden p-4 rounded-[48px]">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-10 blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                 <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary opacity-5 blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
                 
                 <h2 className="text-2xl font-black mb-10 text-secondary tracking-tighter relative z-10">Review Order.</h2>
                 
                 <div className="space-y-6 max-h-80 overflow-y-auto pr-4 custom-scrollbar relative z-10">
                    {cart.map((item) => (
                       <div key={item.id} className="flex justify-between items-center gap-6 group">
                          <div className="flex items-center gap-4">
                             <div className="w-16 h-16 bg-white/5 rounded-2xl overflow-hidden shrink-0 border border-white/10 group-hover:border-secondary/50 transition-all p-1">
                                <img 
                                   src={item.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop"} 
                                   className="w-full h-full object-cover rounded-xl" 
                                />
                             </div>
                             <div>
                                <div className="text-sm font-black line-clamp-1 text-muted group-hover:text-secondary transition-colors mb-1">{item.name}</div>
                                <div className="text-[10px] font-black uppercase text-muted tracking-widest">Quantity: {item.quantity}</div>
                             </div>
                          </div>
                          <span className="text-base font-black text-secondary">${(item.price * item.quantity).toFixed(2)}</span>
                       </div>
                    ))}
                 </div>
                 
                 <div className="h-px bg-white/10 my-10 relative z-10"></div>
                 
                 <div className="space-y-4 relative z-10">
                    <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.2em]">
                       <span className='text-muted'>Subtotal</span>
                       <span className="text-white/80">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.2em]">
                       <span className='text-muted'>Shipping</span>
                       <span className="text-secondary">FREE</span>
                    </div>
                    <div className="flex justify-between items-center pt-6 border-t border-white/5 mt-6">
                       <span className="text-xs font-black text-muted uppercase tracking-[0.3em]">Total Amount</span>
                       <span className="text-4xl font-black text-secondary tracking-tighter">${cartTotal.toFixed(2)}</span>
                    </div>
                 </div>
                 
                 <Button 
                    onClick={handlePlaceOrder}
                    disabled={isPlacingOrder || cart.length === 0}
                    variant="secondary" 
                    className="w-full mt-12 h-20 text-sm font-black shadow-xl shadow-secondary/20 tracking-[0.3em] uppercase relative z-10 rounded-3xl"
                 >
                    {isPlacingOrder ? (
                      <span className="flex items-center gap-3">
                        <Loader2 className="animate-spin w-5 h-5" />
                        Processing...
                      </span>
                    ) : (
                      'Place Your Order'
                    )}
                 </Button>
              </Card>
              
              <div className="p-8 bg-background-subtle rounded-4xl border border-border/40 text-center">
                 <p className="text-[10px] text-muted font-black uppercase tracking-[0.3em] mb-6">
                    Verified Security
                 </p>
                 <div className="flex justify-center gap-6 opacity-30 grayscale font-black text-[11px] tracking-tighter">
                    <span>VISA</span> <span>MASTERCARD</span> <span>AMEX</span> <span>PAYPAL</span>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <AddressModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddAddress}
        isLoading={isAddingAddress}
      />
    </div>
  );
}
