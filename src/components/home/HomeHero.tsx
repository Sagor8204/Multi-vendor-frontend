'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Search } from 'lucide-react';

export const HomeHero = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/products?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <section className="relative h-[600px] flex items-center justify-center bg-background-subtle border-b border-border overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(var(--primary)_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block animate-in fade-in slide-in-from-top-4 duration-700">Multi-Vendor Marketplace</span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-main mb-6 tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
           Shop The Best <span className="text-primary underline decoration-secondary/30 underline-offset-8 italic">Vendors</span> Globally
        </h1>
        <p className="text-lg md:text-xl text-muted mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in duration-1000">
          Discover a curated collection of premium products from thousands of verified sellers. Experience quality, speed, and trust in one place.
        </p>

        <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative mb-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <input 
            type="text" 
            placeholder="Search for products, stores, or categories..." 
            className="w-full h-16 pl-14 pr-32 rounded-2xl bg-white border border-border shadow-2xl shadow-black/5 outline-none focus:border-primary transition-all text-main font-medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted w-6 h-6" />
          <Button type="submit" className="absolute right-2 top-2 bottom-2 px-8 rounded-xl">
            Search
          </Button>
        </form>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <Link href="/products">
            <Button variant="outline" className="px-10 py-4 text-lg bg-white shadow-xl shadow-black/5">Explore All Products</Button>
          </Link>
          <Link href="/vendors">
            <Button variant="secondary" className="px-10 py-4 text-lg shadow-xl shadow-secondary/20">View Verified Stores</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

