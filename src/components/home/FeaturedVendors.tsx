'use client';

import React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { VendorService } from '@/services/vendor.service';
import { BadgeCheck } from 'lucide-react';

export const FeaturedVendors = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ['vendors'],
    queryFn: () => VendorService.listVendors(),
  });

  const vendors = response?.data?.slice(0, 6) || [];

  return (
    <section className="max-w-7xl mx-auto px-6 mt-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-extrabold text-main tracking-tight">Verified Stores</h2>
        <p className="text-muted mt-2 text-sm font-medium">Buy directly from your favorite verified independent sellers.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {isLoading ? (
          [1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="flex flex-col items-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-background-subtle animate-pulse" />
              <div className="h-4 w-20 bg-background-subtle animate-pulse rounded" />
            </div>
          ))
        ) : (
          vendors.map((vendor) => (
            <Link 
              key={vendor.id} 
              href={`/vendors/${vendor.id}`}
              className="group flex flex-col items-center space-y-4 text-center"
            >
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-white border border-border flex items-center justify-center text-3xl font-black text-primary shadow-sm group-hover:shadow-xl group-hover:scale-110 group-hover:border-primary/20 transition-all duration-500 overflow-hidden">
                  {vendor.store_logo ? (
                    <img src={vendor.store_logo} alt={vendor.store_name} className="w-full h-full object-cover" />
                  ) : (
                    vendor.store_name.charAt(0).toUpperCase()
                  )}
                </div>
                {vendor.is_verified && (
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
                    <BadgeCheck className="w-5 h-5 text-secondary fill-secondary/10" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-main group-hover:text-primary transition-colors">{vendor.store_name}</h3>
                <p className="text-[10px] text-muted font-black uppercase tracking-widest mt-1">Verified Store</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
};
