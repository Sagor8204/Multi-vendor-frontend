'use client';

import React from 'react';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface FeaturedProductsProps {
  products: any[];
  title?: string;
  subtitle?: string;
  viewAllHref?: string;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ 
  products, 
  title = "Featured Products",
  subtitle = "Curated selection of this week's top-performing items.",
  viewAllHref = "/products"
}) => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-black text-main tracking-tight leading-none">{title}</h2>
          <p className="text-muted mt-3 text-sm font-semibold">{subtitle}</p>
        </div>
        <Link href={viewAllHref}>
          <Button variant="outline" className="hidden sm:block text-[10px] font-bold uppercase tracking-widest border-2 px-6">
            See everything
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
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
    </div>
  );
};
