'use client';

import React from 'react';

interface CategoryHeaderProps {
  name: string;
  description?: string;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({ name, description }) => {
  return (
    <div className="mb-16 relative overflow-hidden rounded-[2.5rem] bg-background-subtle border border-border/40 p-12 md:p-20">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="relative z-10 max-w-2xl">
        <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4 block">Viewing Category</span>
        <h1 className="text-5xl md:text-7xl font-black text-main tracking-tight mb-6">{name}</h1>
        {description && (
          <p className="text-lg text-muted font-medium leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
