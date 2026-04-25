'use client';

import React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { CategoryCard } from '@/components/categories/CategoryCard';
import { Laptop, Shirt, Home, Sparkles, ArrowRight, Package } from 'lucide-react';
import { CategoryService } from '@/services/category.service';

const getIconForCategory = (slug: string) => {
  const icons: Record<string, React.ReactNode> = {
    'electronics': <Laptop className="w-8 h-8" />,
    'fashion': <Shirt className="w-8 h-8" />,
    'home-living': <Home className="w-8 h-8" />,
    'beauty': <Sparkles className="w-8 h-8" />,
  };
  return icons[slug] || <Package className="w-8 h-8" />;
};

export const HomeCategories = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => CategoryService.listCategories(),
  });

  const categories = response?.data?.slice(0, 4) || [];

  return (
    <section className="max-w-7xl mx-auto px-6 mt-20">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-extrabold text-main tracking-tight">Shop by Category</h2>
          <p className="text-muted mt-2 text-sm font-medium">Find specifically what you need in our curated departments.</p>
        </div>
        <Link href="/categories" className="text-xs font-bold text-primary hover:underline uppercase tracking-widest flex items-center">
          All Departments <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          [1, 2, 3, 4].map((i) => (
            <div key={i} className="h-64 rounded-3xl bg-background-subtle animate-pulse" />
          ))
        ) : (
          categories.map((cat) => (
            <CategoryCard 
              key={cat.id}
              name={cat.name}
              slug={cat.slug}
              icon={getIconForCategory(cat.slug)}
              productCount={0}
            />
          ))
        )}
      </div>
    </section>
  );
};


