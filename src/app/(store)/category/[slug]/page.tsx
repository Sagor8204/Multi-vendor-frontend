'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ProductCard } from '@/components/products/ProductCard';
import { CategoryHeader } from '@/components/categories/CategoryHeader';
import { CategorySidebar } from '@/components/categories/CategorySidebar';
import { Button } from '@/components/ui/Button';
import { ProductService } from '@/services/product.service';

export default function CategoryDetailPage() {
  const { slug } = useParams();
  
  const categoryName = (slug as string).split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const { data: response, isLoading } = useQuery({
    queryKey: ['category-products', slug],
    queryFn: () => ProductService.listProducts({ category_slug: slug as string }),
    enabled: !!slug,
  });

  const products = response?.data || [];

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
              <span className="text-xs font-black text-muted uppercase tracking-widest">
                {isLoading ? 'Searching...' : `${products.length} Results Found`}
              </span>
              <div className="flex items-center space-x-4">
                 <span className="text-[10px] font-black text-muted uppercase tracking-widest">Sort By:</span>
                 <select className="text-xs font-bold text-main bg-transparent outline-none cursor-pointer">
                    <option>Most Relevant</option>
                    <option>Newest First</option>
                    <option>Price: Low to High</option>
                 </select>
              </div>
           </div>

           {isLoading ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => (
                  <div key={i} className="aspect-[4/5] bg-background-subtle animate-pulse rounded-xl" />
                ))}
             </div>
           ) : products.length > 0 ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {products.map(product => (
                  <ProductCard 
                    key={product.id} 
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    slug={product.slug}
                    image={product?.images?.find(img => img.is_main)?.image || "/images/product1.png" }
                    category={product.category.name}
                    vendor={product.vendor.store_name}
                  />
                ))}
             </div>
           ) : (
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


