'use client';

import React, { useState } from 'react';
import { Badge } from '../ui/Badge';

interface ProductImageGalleryProps {
  images: string[];
  name: string;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images, name }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-20 shrink-0">
        {images.map((img, idx) => (
          <button 
            key={idx}
            onClick={() => setSelectedImage(idx)}
            className={`aspect-square w-16 md:w-full rounded-xl overflow-hidden border-2 transition-all duration-300 shrink-0 ${
              selectedImage === idx 
                ? 'border-primary shadow-sm' 
                : 'border-transparent hover:border-primary/20 bg-background-subtle'
            }`}
          >
            <img src={img || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop"} alt={`${name} thumbnail ${idx}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-grow aspect-square md:aspect-[4/5] lg:aspect-square bg-background-subtle rounded-2xl overflow-hidden border border-border/50 relative group cursor-zoom-in">
        <img 
          src={images[selectedImage]} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
           <Badge variant="primary" className="bg-white/90 backdrop-blur-md shadow-sm border-none">
             Premium Quality
           </Badge>
        </div>
      </div>
    </div>
  );
};
