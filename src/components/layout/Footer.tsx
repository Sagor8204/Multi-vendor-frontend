'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

// Custom SVG Brand Icons since they are removed from modern Lucide
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);

export const Footer = () => {
  const socialLinks = [
    { icon: <FacebookIcon />, label: 'Facebook' },
    { icon: <TwitterIcon />, label: 'Twitter' },
    { icon: <InstagramIcon />, label: 'Instagram' },
    { icon: <LinkedinIcon />, label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-background-subtle border-t border-border pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="space-y-6">
          <div className="font-extrabold text-2xl text-primary tracking-tighter">MarketPlace</div>
          <p className="text-sm text-muted leading-relaxed font-medium">
            Curating the world's most exceptional products from verified independent vendors. Experience a new standard of online shopping.
          </p>
          <div className="flex space-x-4">
             {socialLinks.map((social, index) => (
               <div 
                key={index} 
                className="w-9 h-9 rounded-full bg-white border border-border flex items-center justify-center text-muted hover:bg-primary hover:text-white hover:border-primary cursor-pointer transition-all duration-300 shadow-sm"
                aria-label={social.label}
               >
                {social.icon}
               </div>
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
             <Button variant="primary" className="w-full text-xs py-3 font-bold">Open Your Store</Button>
           </Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-[10px] text-muted font-bold uppercase tracking-widest">
          &copy; 2026 MARKETPLACE. POWERED BY NEXTJS.
        </div>
        <div className="flex space-x-6 text-[10px] font-bold text-muted uppercase tracking-widest">
           <span className="hover:text-primary cursor-pointer transition-colors">Privacy</span>
           <span className="hover:text-primary cursor-pointer transition-colors">Terms</span>
           <span className="hover:text-primary cursor-pointer transition-colors">Cookies</span>
        </div>
      </div>
    </footer>
  );
};
