'use client';

import React from 'react';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/Button';

interface FeaturedProductsProps {
  products: any[];
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-24">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-extrabold text-main tracking-tight">Featured Products</h2>
          <p className="text-muted mt-2 text-sm font-medium">Curated selection of this week's top-performing items.</p>
        </div>
        <Button variant="outline" className="text-xs">View All</Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard 
            key={product.id}
            id={product.id}
            slug={product.slug}
            name={product.name}
            price={product.price}
            category={product.category}
            vendor={product.vendor}
            image={product.image}
          />
        ))}
      </div>
    </section>
  );
};
