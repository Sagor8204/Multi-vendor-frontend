'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { ProductCard } from '@/components/products/ProductCard';
import { CategoryHeader } from '@/components/categories/CategoryHeader';
import { CategorySidebar } from '@/components/categories/CategorySidebar';
import { Button } from '@/components/ui/Button';

const CATEGORY_PRODUCTS = [
  { id: 1, slug: 'premium-wireless-headphones', name: 'Premium Wireless Headphones', price: 299, category: 'Electronics', vendor: 'TechNova', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&auto=format&fit=crop' },
  { id: 4, slug: 'smart-home-hub', name: 'Smart Home Hub', price: 199, category: 'Electronics', vendor: 'TechNova', image: 'https://images.unsplash.com/photo-1558002038-103790319987?q=80&w=500&auto=format&fit=crop' },
];

export default function CategoryDetailPage() {
  const { slug } = useParams();
  const categoryName = (slug as string).split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <CategoryHeader 
        name={categoryName} 
        description={`Discover high-performance ${categoryName} items from our top-rated vendors. Expertly curated for quality and innovation.`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <CategorySidebar 
           subCategories={['New Arrivals', 'Best Sellers', 'Discounted', 'Refurbished']}
           filters={['Gold Verified', 'Top Rated', 'Free Shipping']}
        />

        <div className="lg:col-span-3">
           <div className="flex justify-between items-center mb-8 pb-4 border-b border-border/60">
              <span className="text-xs font-black text-muted uppercase tracking-widest">{CATEGORY_PRODUCTS.length} Results Found</span>
              <div className="flex items-center space-x-4">
                 <span className="text-[10px] font-black text-muted uppercase tracking-widest">Sort By:</span>
                 <select className="text-xs font-bold text-main bg-transparent outline-none cursor-pointer">
                    <option>Most Relevant</option>
                    <option>Newest First</option>
                    <option>Price: Low to High</option>
                 </select>
              </div>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {CATEGORY_PRODUCTS.map(product => (
                <ProductCard key={product.id} {...product} />
              ))}
           </div>

           {CATEGORY_PRODUCTS.length === 0 && (
             <div className="py-20 text-center bg-background-subtle rounded-3xl border-2 border-dashed border-border/40">
                <div className="text-5xl mb-4 opacity-20">🔍</div>
                <h3 className="text-xl font-bold text-main">No products found</h3>
                <p className="text-muted font-medium mt-1">Try adjusting your filters or search terms.</p>
                <Button variant="outline" className="mt-6">Clear All Filters</Button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
