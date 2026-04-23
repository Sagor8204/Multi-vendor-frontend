'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';

export const VendorCTA = () => {
  return (
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
  );
};
