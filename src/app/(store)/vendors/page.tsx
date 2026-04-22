'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const DUMMY_VENDORS = [
  { id: 1, name: 'TechNova', description: 'Cutting edge electronics and gadgets.', products: 124, rating: 4.9, logo: 'TN' },
  { id: 2, name: 'EcoStyle', description: 'Sustainable fashion for a better planet.', products: 56, rating: 4.8, logo: 'ES' },
  { id: 3, name: 'BrewMaster', description: 'Professional grade coffee equipment.', products: 32, rating: 5.0, logo: 'BM' },
  { id: 4, name: 'Timeless', description: 'Handcrafted luxury watches.', products: 18, rating: 4.7, logo: 'TL' },
  { id: 5, name: 'OfficePro', description: 'Ergonomic solutions for your workspace.', products: 45, rating: 4.6, logo: 'OP' },
  { id: 6, name: 'ArtisanHome', description: 'Unique handcrafted home decor.', products: 89, rating: 4.9, logo: 'AH' },
];

export default function VendorsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
         <h1 className="text-5xl font-extrabold text-main tracking-tight mb-4">Our Verified Vendors</h1>
         <p className="text-lg text-muted font-medium">Meet the passionate creators and brands that make our marketplace unique.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {DUMMY_VENDORS.map((vendor) => (
          <Card key={vendor.id} className="group hover:border-secondary/30 transition-all duration-300">
            <div className="flex items-start gap-6">
               <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-xl font-black text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500 shadow-sm">
                  {vendor.logo}
               </div>
               <div className="flex-grow">
                  <div className="flex justify-between items-center mb-1">
                     <h3 className="text-xl font-bold text-main group-hover:text-secondary transition-colors">{vendor.name}</h3>
                     <span className="text-xs font-bold text-warning">★ {vendor.rating}</span>
                  </div>
                  <p className="text-sm text-muted line-clamp-2 leading-relaxed font-medium">
                     {vendor.description}
                  </p>
                  
                  <div className="mt-6 flex items-center justify-between">
                     <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{vendor.products} Products</span>
                     <Button variant="outline" className="text-[10px] font-bold py-2 px-4 group-hover:bg-secondary group-hover:text-white group-hover:border-secondary transition-all">Visit Store</Button>
                  </div>
               </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Become a Vendor CTA */}
      <div className="mt-24 bg-background-subtle rounded-3xl p-12 border border-border text-center">
         <h2 className="text-3xl font-extrabold text-main mb-4">Want to see your brand here?</h2>
         <p className="text-muted max-w-xl mx-auto mb-8 font-medium italic">Join our community of world-class vendors and start reaching global customers today.</p>
         <Button className="px-12 py-4 shadow-xl shadow-primary/20">Apply to Sell</Button>
      </div>
    </div>
  );
}
