'use client';

import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProductCard } from '@/components/products/ProductCard';
import { Input } from '@/components/ui/Input';
import { ProductService, ProductListParams } from '@/services/product.service';
import { CategoryService } from '@/services/category.service';

export default function ProductsPage() {
  const [filters, setFilters] = useState<ProductListParams>({});
  const [searchTerm, setSearchTerm] = useState('');

  const { data: categoriesRes } = useQuery({
    queryKey: ['categories'],
    queryFn: () => CategoryService.listCategories(),
  });

  const { data: productsRes, isLoading: productsLoading } = useQuery({
    queryKey: ['products', filters, searchTerm],
    queryFn: () => ProductService.listProducts({
      ...filters,
      search: searchTerm || undefined
    }),
    placeholderData: (previousData) => previousData,
  });

  const categories = categoriesRes?.data || [];
  const products = productsRes?.data || [];

  const handleCategoryToggle = (categoryId?: number) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category === categoryId ? undefined : categoryId
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div>
           <h1 className="text-4xl font-extrabold text-main tracking-tight">Explore Products</h1>
           <p className="text-muted mt-2 font-medium">Find exactly what you're looking for from our curated catalog.</p>
        </div>
        <div className="w-full md:w-96">
           <Input 
             placeholder="Search products..." 
             className="bg-white shadow-sm" 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Sidebar Filters */}
        <aside className="space-y-8">
           <div>
              <h3 className="font-bold text-main uppercase tracking-widest text-[10px] mb-4">Categories</h3>
              <div className="space-y-2">
                 <div 
                   onClick={() => handleCategoryToggle(undefined)}
                   className="flex items-center gap-3 cursor-pointer group"
                 >
                    <div className={`w-4 h-4 border-2 rounded transition-colors ${!filters.category ? 'border-primary bg-primary' : 'border-border group-hover:border-primary'}`}></div>
                    <span className={`text-sm font-semibold transition-colors ${!filters.category ? 'text-main' : 'text-muted group-hover:text-main'}`}>All Products</span>
                 </div>
                 {categories.map(cat => (
                   <div 
                     key={cat.id} 
                     onClick={() => handleCategoryToggle(cat.id)}
                     className="flex items-center gap-3 cursor-pointer group"
                   >
                      <div className={`w-4 h-4 border-2 rounded transition-colors ${filters.category === cat.id ? 'border-primary bg-primary' : 'border-border group-hover:border-primary'}`}></div>
                      <span className={`text-sm font-semibold transition-colors ${filters.category === cat.id ? 'text-main' : 'text-muted group-hover:text-main'}`}>{cat.name}</span>
                   </div>
                 ))}
              </div>
           </div>
           
           <div>
              <h3 className="font-bold text-main uppercase tracking-widest text-[10px] mb-4">Price Range</h3>
              <div className="space-y-4">
                 <input type="range" className="w-full accent-primary" />
                 <div className="flex justify-between text-xs font-bold text-muted">
                    <span>$0</span>
                    <span>$1000+</span>
                 </div>
              </div>
           </div>
        </aside>

        {/* Product Grid */}
        <div className="md:col-span-3">
          {productsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="aspect-[4/5] bg-background-subtle animate-pulse rounded-xl" />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
               {products.map(product => (
                 <ProductCard 
                   key={product.id} 
                   id={product.id}
                   name={product.name}
                   price={product.price}
                   slug={product.slug}
                   image={product.images.find(img => img.is_main)?.image || product.images[0]?.image}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


