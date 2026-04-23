'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useIsMounted } from '@/hooks/useIsMounted';
import { Heart, Truck, ShieldCheck, RotateCcw, Star } from 'lucide-react';

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
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
    } else {
        addToWishlist({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            vendor: product.vendor.name,
            slug: slug
        });
    }
  };

  const trustBadges = [
    { icon: <Truck className="w-6 h-6 text-primary" />, title: 'Free Delivery', sub: 'Orders over $100' },
    { icon: <ShieldCheck className="w-6 h-6 text-primary" />, title: '2 Year Warranty', sub: 'Full coverage' },
    { icon: <RotateCcw className="w-6 h-6 text-primary" />, title: '30 Day Return', sub: 'Hassle free' },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
           <Link href={`/vendors/${product.vendor.id}`} className="group flex items-center space-x-2">
              <div className="w-6 h-6 bg-secondary/10 rounded-lg flex items-center justify-center text-[10px] font-bold text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                 {product.vendor.logo}
              </div>
              <span className="text-xs font-bold text-muted group-hover:text-secondary transition-colors uppercase tracking-widest">
                 {product.vendor.name}
              </span>
           </Link>
           <div className="h-1 w-1 bg-border rounded-full"></div>
           <div className="flex items-center text-warning text-xs font-bold">
              <Star className="w-3 h-3 fill-warning mr-1" />
              <span>{product.vendor.rating}</span>
              <span className="text-muted ml-1">({product.reviewsCount} Reviews)</span>
           </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-main tracking-tight leading-tight">
          {product.name}
        </h1>
        
        <div className="flex items-end space-x-4">
          <span className="text-4xl font-black text-primary tracking-tighter">${product.price}</span>
          {product.originalPrice && (
            <span className="text-xl text-muted line-through font-bold mb-1 opacity-50">${product.originalPrice}</span>
          )}
          <span className="bg-success/10 text-success text-[10px] font-black px-2 py-1 rounded mb-1.5 uppercase tracking-widest">
            Save {Math.round((1 - product.price/product.originalPrice) * 100)}%
          </span>
        </div>
      </div>

      <p className="text-muted leading-relaxed font-medium">
        {product.description}
      </p>

      <div className="space-y-6 pt-6 border-t border-border/60">
         <div className="flex items-center space-x-8">
            <div className="space-y-2">
               <label className="text-[10px] font-black text-muted uppercase tracking-widest">Quantity</label>
               <div className="flex items-center border border-border rounded-xl bg-background-subtle p-1">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center font-bold text-lg hover:text-primary transition-colors"
                  >-</button>
                  <span className="w-12 text-center font-black text-main">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center font-bold text-lg hover:text-primary transition-colors"
                  >+</button>
               </div>
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black text-muted uppercase tracking-widest">Availability</label>
               <div className="h-12 flex items-center">
                  <span className="flex items-center text-xs font-bold text-success">
                     <span className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></span>
                     {product.stock} Units In Stock
                  </span>
               </div>
            </div>
         </div>

         <div className="flex gap-4">
           <Button 
             onClick={handleAddToCart}
             className="flex-grow py-5 text-base font-black uppercase tracking-widest shadow-2xl shadow-primary/20"
           >
             Add To Shopping Bag
           </Button>
           <Button 
             variant="outline" 
             className={`px-6 py-5 transition-colors ${mounted && isInWishlist(product.id) ? 'bg-secondary/10 border-secondary/50 text-secondary' : ''}`}
             onClick={handleWishlistToggle}
           >
             <Heart className={`w-6 h-6 ${mounted && isInWishlist(product.id) ? 'fill-secondary text-secondary' : 'text-main'}`} />
           </Button>
         </div>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border/60">
         {trustBadges.map((item, i) => (
           <div key={i} className="text-center space-y-1">
              <div className="flex justify-center mb-2">{item.icon}</div>
              <div className="text-[10px] font-black text-main uppercase tracking-tighter">{item.title}</div>
              <div className="text-[9px] font-bold text-muted uppercase tracking-tighter">{item.sub}</div>
           </div>
         ))}
      </div>
    </div>
  );
};
