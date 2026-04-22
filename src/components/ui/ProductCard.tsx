'use client';

import React from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  id: string | number;
  name: string;
  price: number;
  image?: string;
  category?: string;
  vendor?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  id,
  name, 
  price, 
  image, 
  category, 
  vendor 
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ id, name, price, image, vendor });
    // Optional: Add a toast or small notification here
  };

  return (
    <Card className="group flex flex-col h-full hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/20">
      <div className="relative aspect-[4/5] overflow-hidden bg-background-subtle rounded-xl">
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

        {/* Quick Add Button */}
        <button 
          onClick={handleAddToCart}
          className="absolute bottom-4 cursor-pointer right-4 bg-white text-main w-10 h-10 rounded-full flex items-center justify-center shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white font-bold text-xl"
        >
          +
        </button>
      </div>
      
      <div className="flex flex-col flex-grow mt-5 space-y-3 px-1">
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-bold text-main group-hover:text-primary transition-colors line-clamp-2 leading-snug">
            {name}
          </h3>
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
           <Button variant="outline" className="flex-grow text-[10px] font-extrabold uppercase tracking-widest py-2.5 border-border/60 hover:border-primary/40">
              Details
           </Button>
           <Button 
             onClick={handleAddToCart}
             className="px-4 py-2.5"
           >
             🛒
           </Button>
        </div>
      </div>
    </Card>
  );
};
