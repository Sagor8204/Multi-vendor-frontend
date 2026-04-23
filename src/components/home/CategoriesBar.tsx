'use client';

import React from 'react';

export const CategoriesBar = () => {
  const categories = ['All', 'Electronics', 'Fashion', 'Home & Living', 'Furniture', 'Accessories', 'Beauty'];
  
  return (
    <section className="bg-white border-b border-border py-6 px-6 sticky top-20 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto gap-8 no-scrollbar">
         {categories.map((cat) => (
           <span key={cat} className="text-sm font-bold text-muted hover:text-primary cursor-pointer whitespace-nowrap transition-colors">
             {cat}
           </span>
         ))}
      </div>
    </section>
  );
};
