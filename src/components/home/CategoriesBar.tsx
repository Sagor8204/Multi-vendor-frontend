'use client';

import React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { CategoryService } from '@/services/category.service';

export const CategoriesBar = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => CategoryService.listCategories(),
  });

  const categories = response?.data || [];
  
  return (
    <section className="bg-white border-b border-border py-6 px-6 sticky top-20 z-40">
      <div className="max-w-7xl mx-auto flex items-center overflow-x-auto gap-8 no-scrollbar">
         <Link 
           href="/products" 
           className="text-sm font-bold text-muted hover:text-primary cursor-pointer whitespace-nowrap transition-colors"
         >
           All Products
         </Link>

         {isLoading ? (
           [1, 2, 3, 4, 5, 6].map(i => (
             <div key={i} className="h-4 w-20 bg-background-subtle animate-pulse rounded" />
           ))
         ) : (
           categories.map((cat) => (
             <Link 
               key={cat.id} 
               href={`/category/${cat.slug}`}
               className="text-sm font-bold text-muted hover:text-primary cursor-pointer whitespace-nowrap transition-colors"
             >
               {cat.name}
             </Link>
           ))
         )}
      </div>
    </section>
  );
};


