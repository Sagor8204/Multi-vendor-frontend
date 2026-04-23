'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import Link from 'next/link';
import { ShoppingCart, Heart, Plus } from 'lucide-react';

interface ProductCardProps {
  id: string | number;
  slug?: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
  vendor?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  id,
  slug,
  name, 
  price, 
  image, 
  category, 
  vendor 
}) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const [mounted, setMounted] = useState(false);
  const productIdentifier = slug || id;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, name, price, image, vendor });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(id)) {
        removeFromWishlist(id);
    } else {
        addToWishlist({ id, name, price, image, vendor, slug });
    }
  };

  return (
    <Card className="group flex flex-col h-full hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/20 relative">
      <Link href={`/products/${productIdentifier}`} className="relative aspect-[4/5] overflow-hidden bg-background-subtle rounded-xl block">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted/20 font-bold text-lg italic">
            MarketPlace
          </div>
        )}
        
        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {category && (
            <span className="bg-white/90 backdrop-blur-md text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full text-main shadow-sm border border-black/5">
              {category}
            </span>
          )}
        </div>

        {/* Wishlist Toggle Button */}
        <button
           onClick={handleWishlistToggle}
           className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform z-10"
        >
           <Heart className={`w-4 h-4 ${mounted && isInWishlist(id) ? 'fill-secondary text-secondary' : 'text-muted'}`} />
        </button>

        {/* Quick Add Button */}
        <button 
          onClick={handleAddToCart}
          className="absolute bottom-4 cursor-pointer right-4 bg-white text-main w-10 h-10 rounded-full flex items-center justify-center shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white z-10"
        >
          <Plus className="w-6 h-6" />
        </button>
      </Link>
      
      <div className="flex flex-col flex-grow mt-5 space-y-3 px-1">
        <div className="flex justify-between items-start gap-4">
          <Link href={`/products/${productIdentifier}`}>
            <h3 className="font-bold text-main group-hover:text-primary transition-colors line-clamp-2 leading-snug">
              {name}
            </h3>
          </Link>
          <div className="text-right">
             <span className="font-extrabold text-primary text-lg tracking-tighter">${price}</span>
          </div>
        </div>
        
        {vendor && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-secondary/10 rounded-full flex items-center justify-center text-[8px] font-bold text-secondary">V</div>
            <p className="text-[10px] text-muted font-bold uppercase tracking-wider">
              {vendor}
            </p>
          </div>
        )}
        
        <div className="mt-auto pt-4 flex gap-2">
           <Link href={`/products/${productIdentifier}`} className="flex-grow">
             <Button variant="outline" className="w-full text-[10px] font-extrabold uppercase tracking-widest py-2.5 border-border/60 hover:border-primary/40">
                Details
             </Button>
           </Link>
           <Button 
             onClick={handleAddToCart}
             className="px-4 py-2.5"
           >
             <ShoppingCart className="w-4 h-4" />
           </Button>
        </div>
      </div>
    </Card>
  );
};
