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
  variant?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  id,
  slug,
  name, 
  price, 
  image, 
  category, 
  vendor,
  variant = 'grid'
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

  if (variant === 'list') {
    return (
      <Card noPadding className="group flex flex-row h-48 bg-white transition-all duration-300 border-transparent hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative rounded-2xl overflow-hidden">
        <Link href={`/products/${productIdentifier}`} className="relative w-48 h-full shrink-0 overflow-hidden bg-background-subtle block">
          {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop" alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        )}
          
          <button
            onClick={handleWishlistToggle}
            className="absolute top-3 left-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white hover:scale-110 transition-all z-10"
          >
            <Heart className={`w-4 h-4 ${mounted && isInWishlist(id) ? 'fill-error text-error' : 'text-main'}`} />
          </button>
        </Link>

        <div className="flex flex-col flex-grow p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              {category && (
                <span className="text-[10px] font-bold text-primary/80 uppercase tracking-wider">
                  {category}
                </span>
              )}
              <Link href={`/products/${productIdentifier}`}>
                <h3 className="text-lg font-bold text-main group-hover:text-primary transition-colors line-clamp-1">
                  {name}
                </h3>
              </Link>
              {vendor && (
                <p className="text-xs text-muted flex items-center gap-1">
                  <span>Sold by</span>
                  <span className="font-semibold text-main hover:text-primary transition-colors cursor-pointer">{vendor}</span>
                </p>
              )}
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-main tracking-tighter">${price}</span>
              <p className="text-[10px] text-muted font-bold uppercase">USD</p>
            </div>
          </div>

          <div className="mt-auto flex items-center gap-4">
             <Button 
               onClick={handleAddToCart}
               className="px-8 py-2.5 text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/10"
             >
               Add to cart
             </Button>
             <Link href={`/products/${productIdentifier}`}>
               <Button variant="outline" className="px-8 py-2.5 text-xs font-bold uppercase tracking-widest border-2">
                 View Details
               </Button>
             </Link>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card noPadding className="group flex flex-col h-full bg-white transition-all duration-300 border-transparent hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] relative rounded-xl">
      <Link href={`/products/${productIdentifier}`} className="relative aspect-square overflow-hidden bg-background-subtle block">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop" alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        )}
        
        {/* Wishlist Toggle */}
        <button
           onClick={handleWishlistToggle}
           className="absolute top-3 right-3 cursor-pointer w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white hover:scale-110 transition-all z-10"
        >
           <Heart className={`w-4 h-4 ${mounted && isInWishlist(id) ? 'fill-error text-error' : 'text-main'}`} />
        </button>

        {/* Quick Add - Etsy Style */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10 hidden md:block">
           <Button 
             onClick={handleAddToCart}
             className="w-full bg-white/95 text-main! backdrop-blur-sm hover:bg-white hover:text-primary! py-2 shadow-lg border-none"
           >
             Add to cart
           </Button>
        </div>
      </Link>
      
      <div className="flex flex-col flex-grow p-4">
        {category && (
          <span className="text-[10px] font-bold text-primary/80 uppercase tracking-wider mb-1">
            {category}
          </span>
        )}
        
        <Link href={`/products/${productIdentifier}`}>
          <h3 className="text-sm font-medium text-main group-hover:underline decoration-primary/30 underline-offset-4 line-clamp-2 leading-relaxed h-10 mb-2">
            {name}
          </h3>
        </Link>

        {vendor && (
          <p className="text-xs text-muted mb-3 flex items-center gap-1">
            <span>Sold by</span>
            <span className="font-semibold text-main hover:text-primary transition-colors cursor-pointer">{vendor}</span>
          </p>
        )}
        
        <div className="mt-auto flex items-center justify-between">
           <div>
              <span className="text-lg font-bold text-main tracking-tight">${price}</span>
              <span className="ml-1 text-[10px] text-muted font-medium">USD</span>
           </div>
           
           {/* Mobile only Add Button */}
           <button 
             onClick={handleAddToCart}
             className="md:hidden w-8 h-8 bg-background-subtle rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
           >
             <Plus className="w-4 h-4" />
           </button>
        </div>
      </div>
    </Card>
  );
};
