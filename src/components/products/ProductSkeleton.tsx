'use client';

import React from 'react';

interface ProductSkeletonProps {
  variant?: 'grid' | 'list';
}

export const ProductSkeleton: React.FC<ProductSkeletonProps> = ({ variant = 'grid' }) => {
  return (
    <div className={`bg-white rounded-2xl border border-border/40 overflow-hidden flex ${variant === 'grid' ? 'flex-col' : 'flex-row h-48'}`}>
      {/* Image Placeholder */}
      <div className={`bg-slate-100 animate-pulse ${variant === 'grid' ? 'aspect-square' : 'w-48 h-full'}`} />
      
      {/* Content Placeholder */}
      <div className="p-4 flex flex-col flex-grow space-y-3">
         <div className="w-1/3 h-2 bg-slate-100 animate-pulse rounded" />
         <div className="w-full h-4 bg-slate-100 animate-pulse rounded" />
         <div className="w-2/3 h-3 bg-slate-50 animate-pulse rounded" />
         
         <div className="mt-auto flex justify-between items-center">
            <div className="w-1/4 h-5 bg-slate-100 animate-pulse rounded" />
            <div className="w-8 h-8 rounded-full bg-slate-100 animate-pulse" />
         </div>
      </div>
    </div>
  );
};
