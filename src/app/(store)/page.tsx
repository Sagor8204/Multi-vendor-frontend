import React from 'react';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

// Dummy data for initial UI - will be replaced by API fetch later
const DUMMY_PRODUCTS = [
  { id: 1, slug: 'premium-wireless-headphones', name: 'Premium Wireless Headphones', price: 299, category: 'Electronics', vendor: 'TechNova', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&auto=format&fit=crop' },
  { id: 2, slug: 'minimalist-leather-watch', name: 'Minimalist Leather Watch', price: 150, category: 'Accessories', vendor: 'Timeless', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500&auto=format&fit=crop' },
  { id: 3, slug: 'organic-cotton-tee', name: 'Organic Cotton Tee', price: 45, category: 'Fashion', vendor: 'EcoStyle', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=500&auto=format&fit=crop' },
  { id: 4, slug: 'smart-home-hub', name: 'Smart Home Hub', price: 199, category: 'Electronics', vendor: 'TechNova', image: 'https://images.unsplash.com/photo-1558002038-103790319987?q=80&w=500&auto=format&fit=crop' },
  { id: 5, slug: 'ergonomic-desk-chair', name: 'Ergonomic Desk Chair', price: 350, category: 'Furniture', vendor: 'OfficePro', image: 'https://images.unsplash.com/photo-1505797149-43b0000ee20e?q=80&w=500&auto=format&fit=crop' },
  { id: 6, slug: 'artisan-coffee-maker', name: 'Artisan Coffee Maker', price: 120, category: 'Kitchen', vendor: 'BrewMaster', image: 'https://images.unsplash.com/photo-1544145945-f904253d0c7b?q=80&w=500&auto=format&fit=crop' },
];

export default function StoreHome() {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center bg-background-subtle border-b border-border overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(var(--primary)_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">New Season Arrival</span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-main mb-6 tracking-tight leading-tight">
             Shop The Best <span className="text-primary underline decoration-secondary/30 underline-offset-8 italic">Vendors</span> Globally
          </h1>
          <p className="text-lg md:text-xl text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover a curated collection of premium products from thousands of verified sellers. Experience quality, speed, and trust in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button className="px-10 py-4 text-lg shadow-xl shadow-primary/20">Explore All Products</Button>
            </Link>
            <Button variant="outline" className="px-10 py-4 text-lg">Browse Categories</Button>
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="bg-white border-b border-border py-6 px-6 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto gap-8 no-scrollbar">
           {['All', 'Electronics', 'Fashion', 'Home & Living', 'Furniture', 'Accessories', 'Beauty'].map((cat) => (
             <span key={cat} className="text-sm font-bold text-muted hover:text-primary cursor-pointer whitespace-nowrap transition-colors">
               {cat}
             </span>
           ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 mt-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-main tracking-tight">Featured Products</h2>
            <p className="text-muted mt-2 text-sm font-medium">Curated selection of this week's top-performing items.</p>
          </div>
          <Button variant="outline" className="text-xs">View All</Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {DUMMY_PRODUCTS.map((product) => (
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

      {/* Vendor CTA Section */}
      <section className="max-w-7xl mx-auto px-6 mt-32">
        <div className="bg-text-main rounded-2xl p-12 relative overflow-hidden text-white group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary opacity-20 blur-[100px] group-hover:opacity-40 transition-opacity"></div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
             <div>
               <h2 className="text-4xl font-extrabold tracking-tight mb-4">Start Selling Today</h2>
               <p className="text-muted/80 text-lg mb-8 max-w-lg leading-relaxed">
                 Join over 50,000 successful vendors on our platform. Access powerful tools, analytics, and a massive global customer base.
               </p>
               <Button variant="secondary" className="px-10 py-4 text-base font-bold shadow-lg shadow-secondary/20 hover:scale-105 transition-transform">
                 Apply as Vendor
               </Button>
             </div>
             <div className="hidden md:grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                  <div className="text-secondary text-2xl font-bold mb-1">2M+</div>
                  <div className="text-xs text-white/60 font-medium">Monthly Shoppers</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                  <div className="text-secondary text-2xl font-bold mb-1">150+</div>
                  <div className="text-xs text-white/60 font-medium">Countries Supported</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                  <div className="text-secondary text-2xl font-bold mb-1">24/7</div>
                  <div className="text-xs text-white/60 font-medium">Vendor Support</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                  <div className="text-secondary text-2xl font-bold mb-1">3.5%</div>
                  <div className="text-xs text-white/60 font-medium">Low Platform Fee</div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
