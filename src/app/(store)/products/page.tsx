'use client';

import React from 'react';
import { ProductCard } from '@/components/products/ProductCard';
import { Input } from '@/components/ui/Input';

const ALL_PRODUCTS = [
  { id: 1, slug: 'premium-wireless-headphones', name: 'Premium Wireless Headphones', price: 299, category: 'Electronics', vendor: 'TechNova', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&auto=format&fit=crop' },
  { id: 2, slug: 'minimalist-leather-watch', name: 'Minimalist Leather Watch', price: 150, category: 'Accessories', vendor: 'Timeless', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500&auto=format&fit=crop' },
  { id: 3, slug: 'organic-cotton-tee', name: 'Organic Cotton Tee', price: 45, category: 'Fashion', vendor: 'EcoStyle', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=500&auto=format&fit=crop' },
  { id: 4, slug: 'smart-home-hub', name: 'Smart Home Hub', price: 199, category: 'Electronics', vendor: 'TechNova', image: 'https://images.unsplash.com/photo-1558002038-103790319987?q=80&w=500&auto=format&fit=crop' },
  { id: 5, slug: 'ergonomic-desk-chair', name: 'Ergonomic Desk Chair', price: 350, category: 'Furniture', vendor: 'OfficePro', image: 'https://images.unsplash.com/photo-1505797149-43b0000ee20e?q=80&w=500&auto=format&fit=crop' },
  { id: 6, slug: 'artisan-coffee-maker', name: 'Artisan Coffee Maker', price: 120, category: 'Kitchen', vendor: 'BrewMaster', image: 'https://images.unsplash.com/photo-1544145945-f904253d0c7b?q=80&w=500&auto=format&fit=crop' },
];

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div>
           <h1 className="text-4xl font-extrabold text-main tracking-tight">Explore Products</h1>
           <p className="text-muted mt-2 font-medium">Find exactly what you're looking for from our curated catalog.</p>
        </div>
        <div className="w-full md:w-96">
           <Input placeholder="Search products..." className="bg-white shadow-sm" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Sidebar Filters */}
        <aside className="space-y-8">
           <div>
              <h3 className="font-bold text-main uppercase tracking-widest text-[10px] mb-4">Categories</h3>
              <div className="space-y-2">
                 {['All Products', 'Electronics', 'Fashion', 'Home', 'Accessories'].map(cat => (
                   <div key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-4 h-4 border-2 border-border rounded group-hover:border-primary transition-colors"></div>
                      <span className="text-sm font-semibold text-muted group-hover:text-main transition-colors">{cat}</span>
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
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
           {ALL_PRODUCTS.map(product => (
             <ProductCard key={product.id} {...product} />
           ))}
        </div>
      </div>
    </div>
  );
}
