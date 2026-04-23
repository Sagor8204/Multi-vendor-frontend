'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const Footer = () => {
  return (
    <footer className="bg-background-subtle border-t border-border pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="space-y-6">
          <div className="font-extrabold text-2xl text-primary tracking-tighter">MarketPlace</div>
          <p className="text-sm text-muted leading-relaxed font-medium">
            Curating the world's most exceptional products from verified independent vendors. Experience a new standard of online shopping.
          </p>
          <div className="flex space-x-4">
             {['FB', 'TW', 'IG', 'LI'].map(social => (
               <div key={social} className="w-8 h-8 rounded-full bg-border flex items-center justify-center text-[10px] font-bold text-muted hover:bg-primary hover:text-white cursor-pointer transition-all">{social}</div>
             ))}
          </div>
        </div>
        <div className="space-y-6">
          <h4 className="font-bold text-main uppercase tracking-widest text-xs">Marketplace</h4>
          <ul className="text-sm text-muted space-y-3 font-semibold">
            <li className="hover:text-primary cursor-pointer transition-colors">Best Sellers</li>
            <li className="hover:text-primary cursor-pointer transition-colors">New Arrivals</li>
            <li className="hover:text-primary cursor-pointer transition-colors">Sale & Offers</li>
            <li className="hover:text-primary cursor-pointer transition-colors">Category Index</li>
          </ul>
        </div>
        <div className="space-y-6">
          <h4 className="font-bold text-main uppercase tracking-widest text-xs">Support</h4>
          <ul className="text-sm text-muted space-y-3 font-semibold">
            <li className="hover:text-primary cursor-pointer transition-colors">Order Tracking</li>
            <li className="hover:text-primary cursor-pointer transition-colors">Return Policy</li>
            <li className="hover:text-primary cursor-pointer transition-colors">Contact Us</li>
            <li className="hover:text-primary cursor-pointer transition-colors">FAQ</li>
          </ul>
        </div>
        <div className="bg-primary/5 p-8 rounded-2xl space-y-4 border border-primary/10">
           <h4 className="font-bold text-primary text-sm">Become a Seller</h4>
           <p className="text-xs text-muted leading-relaxed font-medium">Reach millions of customers and scale your business with our premium tools.</p>
           <Link href="/register" className="block">
             <Button variant="primary" className="w-full text-xs py-3">Open Your Store</Button>
           </Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-[10px] text-muted font-bold uppercase tracking-widest">
          &copy; 2026 MARKETPLACE. POWERED BY NEXTJS.
        </div>
        <div className="flex space-x-6 text-[10px] font-bold text-muted uppercase tracking-widest">
           <span className="hover:text-primary cursor-pointer">Privacy</span>
           <span className="hover:text-primary cursor-pointer">Terms</span>
           <span className="hover:text-primary cursor-pointer">Cookies</span>
        </div>
      </div>
    </footer>
  );
};
