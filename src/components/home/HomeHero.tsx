'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight, ShoppingBag, ShieldCheck, Sparkles } from 'lucide-react';

export const HomeHero = () => {
  return (
    <section className="relative bg-white overflow-hidden border-b border-border/40">
      {/* Abstract Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full w-fit mb-6">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Premium Marketplace</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-main mb-6 tracking-tight leading-[1.05]">
              Handcrafted items from <span className="text-primary">verified</span> vendors.
            </h1>
            
            <p className="text-lg text-muted mb-10 max-w-xl leading-relaxed font-medium">
              Discover unique products, supporting independent creators and global brands. 
              Quality and trust, delivered to your doorstep.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button className="px-8 py-4 h-auto text-sm font-bold uppercase tracking-widest flex items-center gap-2 group">
                  Shop All Products <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/vendors">
                <Button variant="outline" className="px-8 py-4 h-auto text-sm font-bold uppercase tracking-widest border-2">
                  View Stores
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-8 pt-8 border-t border-border/60">
               <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-background-subtle flex items-center justify-center text-[10px] font-bold text-muted">
                      {i}
                    </div>
                  ))}
               </div>
               <p className="text-sm font-medium text-muted">
                 <span className="text-main font-bold">10k+</span> products from trusted partners.
               </p>
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-8 duration-1000">
             <div className="space-y-4">
                <div className="aspect-[4/5] rounded-3xl bg-background-subtle overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                   <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop" alt="hero" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square rounded-3xl bg-primary/10 flex flex-col items-center justify-center p-8 text-center border border-primary/20">
                   <ShieldCheck className="w-12 h-12 text-primary mb-4" />
                   <h3 className="font-bold text-main">Buyer Protection</h3>
                   <p className="text-xs text-muted mt-2">Your purchases are always safe with us.</p>
                </div>
             </div>
             <div className="space-y-4 pt-12">
                <div className="aspect-square rounded-3xl bg-secondary/10 flex flex-col items-center justify-center p-8 text-center border border-secondary/20">
                   <ShoppingBag className="w-12 h-12 text-secondary mb-4" />
                   <h3 className="font-bold text-main">Fast Delivery</h3>
                   <p className="text-xs text-muted mt-2">Global shipping with local speed.</p>
                </div>
                <div className="aspect-[4/5] rounded-3xl bg-background-subtle overflow-hidden shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-700">
                   <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop" alt="hero" className="w-full h-full object-cover" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

