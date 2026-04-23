'use client';

import React, { useState } from 'react';

interface ProductImageGalleryProps {
  images: string[];
  name: string;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images, name }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-6">
      <div className="aspect-[4/3] bg-background-subtle rounded-3xl overflow-hidden border border-border/40 shadow-sm relative group">
        <img 
          src={images[selectedImage]} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-6 left-6">
           <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter text-primary shadow-sm border border-primary/10">
             Premium Selection
           </span>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <button 
            key={idx}
            onClick={() => setSelectedImage(idx)}
            className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
              selectedImage === idx ? 'border-primary shadow-md' : 'border-transparent hover:border-primary/30'
            }`}
          >
            <img src={img} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};
