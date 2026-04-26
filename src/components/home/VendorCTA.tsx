'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';

import { ArrowRight, Globe, Zap, Users, ShieldCheck } from 'lucide-react';

export const VendorCTA = () => {
  return (
    <section className="max-w-7xl mx-auto px-6">
      <div className="relative bg-main rounded-[2.5rem] p-8 md:p-16 overflow-hidden group">
        {/* Sophisticated Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary opacity-10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-20 transition-opacity duration-1000"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary opacity-10 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2 group-hover:opacity-20 transition-opacity duration-1000"></div>
        
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
           <div className="lg:col-span-7">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full mb-6 border border-white/10">
                <Zap className="w-3.5 h-3.5 text-secondary" />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Global Vendor Program</span>
             </div>
             
             <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[1.1] mb-6">
                Turn your passion into a <span className="text-secondary">global</span> business.
             </h2>
             
             <p className="text-white/60 text-lg mb-10 max-w-xl leading-relaxed font-medium">
               Join thousands of independent brands and verified sellers. We provide the tools, the audience, and the trust—you provide the craft.
             </p>
             
             <div className="flex flex-wrap gap-4">
                <Button variant="secondary" className="px-10 py-5 h-auto text-sm font-bold uppercase tracking-widest shadow-2xl shadow-secondary/20 flex items-center gap-3 group">
                   Get Started Today <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <div className="flex items-center gap-3 px-6 py-4 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                   <ShieldCheck className="w-4 h-4 text-secondary" />
                   No setup fees • No credit card
                </div>
             </div>
           </div>

           <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {[
                { icon: <Users />, value: '2M+', label: 'Monthly Active Shoppers' },
                { icon: <Globe />, value: '150+', label: 'Countries Supported' },
                { icon: <ShieldCheck />, value: '0%', label: 'Listing Fees' },
                { icon: <Zap />, value: '24h', label: 'Fast Payout System' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors duration-500 group/item">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-secondary mb-4 group-hover/item:scale-110 transition-transform">
                    {React.cloneElement(stat.icon as React.ReactElement, { className: 'w-5 h-5' })}
                  </div>
                  <div className="text-3xl font-black text-white mb-1 tracking-tighter">{stat.value}</div>
                  <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-tight">{stat.label}</div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};
