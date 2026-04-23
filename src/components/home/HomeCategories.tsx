'use client';

import React from 'react';
import Link from 'next/link';
import { CategoryCard } from '@/components/categories/CategoryCard';
import { Laptop, Shirt, Home, Sparkles, ArrowRight } from 'lucide-react';

const TOP_CATEGORIES = [
  { id: 1, name: 'Electronics', slug: 'electronics', icon: <Laptop className="w-8 h-8" />, count: 1240 },
  { id: 2, name: 'Fashion', slug: 'fashion', icon: <Shirt className="w-8 h-8" />, count: 3500 },
  { id: 3, name: 'Home & Living', slug: 'home-living', icon: <Home className="w-8 h-8" />, count: 850 },
  { id: 4, name: 'Beauty', slug: 'beauty', icon: <Sparkles className="w-8 h-8" />, count: 420 },
];

export const HomeCategories = () => {
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
        {TOP_CATEGORIES.map((cat) => (
          <CategoryCard 
            key={cat.id}
            name={cat.name}
            slug={cat.slug}
            icon={cat.icon}
            productCount={cat.count}
          />
        ))}
      </div>
    </section>
  );
};
