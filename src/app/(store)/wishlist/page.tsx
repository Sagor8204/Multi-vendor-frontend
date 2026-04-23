'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/Button';

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addToCart);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
         <div className="text-6xl mb-6 opacity-20 text-secondary">♥</div>
         <h1 className="text-3xl font-extrabold text-main">Your wishlist is empty</h1>
         <p className="text-muted mt-2 font-medium">Save items you love and come back to them later.</p>
         <Link href="/products">
           <Button className="mt-8 px-10 py-4">Explore Products</Button>
         </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold text-main mb-12 tracking-tight">My Wishlist ({items.length})</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <ProductCard 
              key={item.id}
              id={item.id}
              slug={item.slug}
              name={item.name}
              price={item.price}
              image={item.image}
              vendor={item.vendor}
            />
          ))}
      </div>
    </div>
  );
}
