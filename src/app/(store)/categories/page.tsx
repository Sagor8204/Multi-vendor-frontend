'use client';

import React from 'react';
import { CategoryCard } from '@/components/categories/CategoryCard';
import { Laptop, Shirt, Home, Sparkles, Trophy, BookOpen } from 'lucide-react';

const ROOT_CATEGORIES = [
  { id: 1, name: 'Electronics', slug: 'electronics', description: 'Latest gadgets and tech innovation.', icon: <Laptop className="w-8 h-8" />, count: 1240 },
  { id: 2, name: 'Fashion', slug: 'fashion', description: 'Premium apparel and accessories.', icon: <Shirt className="w-8 h-8" />, count: 3500 },
  { id: 3, name: 'Home & Living', slug: 'home-living', description: 'Modern furniture and decor.', icon: <Home className="w-8 h-8" />, count: 850 },
  { id: 4, name: 'Beauty', slug: 'beauty', description: 'Skincare and beauty essentials.', icon: <Sparkles className="w-8 h-8" />, count: 420 },
  { id: 5, name: 'Sports', slug: 'sports', description: 'High performance gear and equipment.', icon: <Trophy className="w-8 h-8" />, count: 210 },
  { id: 6, name: 'Books', slug: 'books', description: 'Curated collection for every reader.', icon: <BookOpen className="w-8 h-8" />, count: 150 },
];

export default function CategoriesListingPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
         <h1 className="text-5xl font-black text-main tracking-tight">Shop by Department</h1>
         <p className="text-lg text-muted font-medium">Explore our curated collections from thousands of verified independent vendors.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {ROOT_CATEGORIES.map((cat) => (
          <CategoryCard 
            key={cat.id}
            name={cat.name}
            slug={cat.slug}
            description={cat.description}
            icon={cat.icon as any}
            productCount={cat.count}
          />
        ))}
      </div>

      <div className="mt-32 p-12 rounded-[2rem] bg-text-main text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-20 blur-[120px]"></div>
         <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
               <h3 className="text-3xl font-black mb-4 tracking-tight">Quality Verified Categories</h3>
               <p className="text-muted-foreground text-lg opacity-80 leading-relaxed">
                  Every category on our marketplace features vendors who have been strictly vetted for product quality and customer service excellence.
               </p>
            </div>
            <div className="flex justify-end gap-4">
               <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                  <div className="text-2xl font-black text-primary">100%</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">Verified</div>
               </div>
               <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                  <div className="text-2xl font-black text-secondary">4.8/5</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">Avg Rating</div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
