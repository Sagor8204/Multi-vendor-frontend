'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const HomeHero = () => {
  return (
    <section className="relative h-[500px] flex items-center justify-center bg-background-subtle border-b border-border overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(var(--primary)_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block animate-in fade-in slide-in-from-top-4 duration-700">New Season Arrival</span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-main mb-6 tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
           Shop The Best <span className="text-primary underline decoration-secondary/30 underline-offset-8 italic">Vendors</span> Globally
        </h1>
        <p className="text-lg md:text-xl text-muted mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in duration-1000">
          Discover a curated collection of premium products from thousands of verified sellers. Experience quality, speed, and trust in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <Link href="/products">
            <Button className="px-10 py-4 text-lg shadow-xl shadow-primary/20">Explore All Products</Button>
          </Link>
          <Link href="/categories">
            <Button variant="outline" className="px-10 py-4 text-lg bg-white">Browse Categories</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
