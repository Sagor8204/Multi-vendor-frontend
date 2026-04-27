'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useIsMounted } from '@/hooks/useIsMounted';
import toast from 'react-hot-toast';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Heart, Truck, ShieldCheck, Star, Minus, Plus, Share2, Info } from 'lucide-react';

interface ProductInfoProps {
  product: any;
  slug: string;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product, slug }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const [quantity, setQuantity] = useState(1);
  const mounted = useIsMounted();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      vendor: product.vendor.name
    }, quantity);
    toast.success(`${product.name} added to cart!`, {
      icon: '🛒',
    });
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
        toast.success('Removed from wishlist');
    } else {
        addToWishlist({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            vendor: product.vendor.name,
            slug: slug
        });
        toast.success('Added to wishlist', {
          icon: '❤️',
        });
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header Info */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between">
           <Link href={`/vendors/${product.vendor.id}`} className="group flex items-center gap-2">
              <div className="w-5 h-5 bg-primary/5 rounded flex items-center justify-center text-[8px] font-bold text-primary group-hover:bg-primary group-hover:text-white transition-all">
                 {product.vendor.logo}
              </div>
              <span className="text-[11px] font-bold text-muted group-hover:text-primary transition-colors uppercase tracking-[0.15em]">
                 {product.vendor.name}
              </span>
           </Link>
           <button className="p-2 hover:bg-background-subtle rounded-full transition-colors">
              <Share2 className="w-4 h-4 text-muted" />
           </button>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-main tracking-tight leading-tight">
          {product.name}
        </h1>
        
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-1.5 bg-warning/10 px-2.5 py-1 rounded-lg">
              <div className="flex text-warning">
                 {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3.5 h-3.5 ${i < Math.floor(product.averageRating) ? 'fill-warning' : 'text-warning/30'}`} 
                    />
                 ))}
              </div>
              <span className="text-sm font-bold text-warning-hover">
                {typeof product.averageRating === 'number' ? product.averageRating.toFixed(1) : product.averageRating}
              </span>
           </div>
           <span className="text-xs font-semibold text-muted underline underline-offset-4 cursor-pointer hover:text-primary transition-colors">
             {product.totalReviews} verified reviews
           </span>
        </div>
      </div>

      {/* Pricing and Quick Actions Card */}
      <Card noPadding className="border-border/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8">
         <div className="p-6 space-y-6">
            <div className="flex items-baseline gap-3">
               <span className="text-4xl font-black text-main tracking-tighter">${product.price}</span>
               {product.originalPrice && (
                 <span className="text-lg text-muted line-through font-bold opacity-40">${product.originalPrice}</span>
               )}
               <Badge variant="success" className="ml-auto">Best Price</Badge>
            </div>

            <div className="space-y-4">
               <div>
                  <label className="text-[10px] font-black text-muted uppercase tracking-widest block mb-3">Select Quantity</label>
                  <div className="flex items-center w-fit border border-border rounded-xl p-1 bg-background-subtle/50">
                     <button 
                       onClick={() => setQuantity(Math.max(1, quantity - 1))}
                       className="w-9 h-9 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-lg transition-all"
                     ><Minus className="w-4 h-4" /></button>
                     <span className="w-12 text-center font-bold text-sm text-main">{quantity}</span>
                     <button 
                       onClick={() => setQuantity(quantity + 1)}
                       className="w-9 h-9 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-lg transition-all"
                     ><Plus className="w-4 h-4" /></button>
                  </div>
               </div>

               <div className="flex gap-3 pt-2">
                  <Button 
                    onClick={handleAddToCart}
                    className="flex-grow py-4 text-sm font-bold uppercase tracking-widest"
                  >
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    className={`px-4 py-4 border-2 ${mounted && isInWishlist(product.id) ? 'bg-error/5 border-error/20 text-error' : ''}`}
                    onClick={handleWishlistToggle}
                  >
                    <Heart className={`w-5 h-5 ${mounted && isInWishlist(product.id) ? 'fill-error text-error' : 'text-main'}`} />
                  </Button>
               </div>
            </div>

            <div className="pt-6 border-t border-border/60 flex items-center justify-between">
               <div className="flex items-center gap-2 text-xs font-bold text-success">
                  <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
                  In Stock & Ready to ship
               </div>
               <div className="text-[10px] font-bold text-muted flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  Secure checkout
               </div>
            </div>
         </div>
      </Card>

      {/* Trust Features Bar */}
      <div className="grid grid-cols-1 gap-4">
         {[
           { icon: <Truck className="w-4 h-4" />, title: 'Free Global Shipping', sub: 'On all orders above $50.00' },
           { icon: <ShieldCheck className="w-4 h-4" />, title: 'Buyer Protection', sub: '30-day money-back guarantee' },
         ].map((item, i) => (
           <div key={i} className="flex gap-4 p-4 rounded-2xl bg-background-subtle/50 border border-border/40 group hover:border-primary/20 transition-colors">
              <div className="shrink-0 w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm border border-border/40 group-hover:scale-110 transition-transform">
                 {item.icon}
              </div>
              <div className="flex flex-col justify-center">
                 <div className="text-xs font-black text-main uppercase tracking-tight">{item.title}</div>
                 <div className="text-[10px] font-semibold text-muted">{item.sub}</div>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};
