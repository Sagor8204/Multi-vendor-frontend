'use client';

import React from 'react';
import { Truck, ShieldCheck, CreditCard, Headphones } from 'lucide-react';

const FEATURES = [
  {
    icon: <Truck className="w-8 h-8 text-primary" />,
    title: "Global Shipping",
    desc: "From verified international vendors to your doorstep."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-secondary" />,
    title: "Buyer Protection",
    desc: "Your purchases are secure with our dispute resolution."
  },
  {
    icon: <CreditCard className="w-8 h-8 text-primary" />,
    title: "Secure Payments",
    desc: "Industry-standard encryption for all transactions."
  },
  {
    icon: <Headphones className="w-8 h-8 text-secondary" />,
    title: "24/7 Support",
    desc: "Dedicated marketplace experts available at any time."
  }
];

export const TrustFeatures = () => {
  return (
    <section className="bg-background-subtle border-y border-border/50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((f, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-4 items-center md:items-start text-center md:text-left group cursor-default">
              <div className="shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                {React.cloneElement(f.icon as React.ReactElement, { className: 'w-6 h-6' })}
              </div>
              <div>
                <h3 className="text-xs font-black text-main uppercase tracking-widest mb-1">{f.title}</h3>
                <p className="text-[11px] text-muted font-bold leading-tight">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
