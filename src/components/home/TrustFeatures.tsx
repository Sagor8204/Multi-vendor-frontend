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
    <section className="max-w-7xl mx-auto px-6 mt-32">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {FEATURES.map((f, i) => (
          <div key={i} className="flex gap-6 items-start group">
            <div className="shrink-0 w-16 h-16 bg-background-subtle rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:shadow-xl transition-all duration-500">
              {f.icon}
            </div>
            <div>
              <h3 className="font-extrabold text-main mb-2 tracking-tight">{f.title}</h3>
              <p className="text-sm text-muted font-medium leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
