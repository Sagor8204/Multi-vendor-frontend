'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { CategoryCard } from '@/components/categories/CategoryCard';
import { Laptop, Shirt, Home, Sparkles, Trophy, BookOpen, Package } from 'lucide-react';
import { CategoryService } from '@/services/category.service';

// Icon mapping based on slug or name
const getIconForCategory = (slug: string) => {
  const icons: Record<string, React.ReactNode> = {
    'electronics': <Laptop className="w-8 h-8" />,
    'fashion': <Shirt className="w-8 h-8" />,
    'home-living': <Home className="w-8 h-8" />,
    'beauty': <Sparkles className="w-8 h-8" />,
    'sports': <Trophy className="w-8 h-8" />,
    'books': <BookOpen className="w-8 h-8" />,
  };
  return icons[slug] || <Package className="w-8 h-8" />;
};

export default function CategoriesListingPage() {
  const { data: response, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => CategoryService.listCategories(),
  });

  const categories = response?.data || [];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
         <h1 className="text-5xl font-black text-main tracking-tight">Shop by Department</h1>
         <p className="text-lg text-muted font-medium">Explore our curated collections from thousands of verified independent vendors.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 rounded-3xl bg-background-subtle animate-pulse" />
          ))}
        </div>
      ) : categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <CategoryCard 
              key={cat.id}
              name={cat.name}
              slug={cat.slug}
              description={`${cat.name} products curated for quality.`}
              icon={getIconForCategory(cat.slug)}
              productCount={cat.product_count}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-muted text-xl font-bold">No categories found.</p>
        </div>
      )}

      <div className="mt-32 p-12 rounded-[2rem] bg-text-main relative overflow-hidden">
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


