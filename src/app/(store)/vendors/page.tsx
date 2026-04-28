'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useQuery } from '@tanstack/react-query';
import { VendorService } from '@/services/vendor.service';
import { useAuth } from '@/hooks/useAuth';
import { useIsMounted } from '@/hooks/useIsMounted';
import Image from 'next/image';
import Link from 'next/link';
import { Store, Star, ArrowRight, ShieldCheck, Zap, Users } from 'lucide-react';

export default function VendorsPage() {
  const { user, isAuthenticated } = useAuth();
  const mounted = useIsMounted();
  
  const { data: response, isLoading } = useQuery({
    queryKey: ['vendors'],
    queryFn: () => VendorService.listVendors(),
  });

  const vendors = response?.data || [];

  return (
    <div className="bg-background-subtle/30 min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b border-border/60 mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
           <div className="flex items-center gap-2 px-3 py-1 bg-secondary/10 rounded-full w-fit mb-6">
              <Store className="w-3.5 h-3.5 text-secondary" />
              <span className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">Verified Partners</span>
           </div>
           <h1 className="text-5xl md:text-7xl font-black text-main tracking-tighter leading-none mb-6">
              Our Curated <span className="text-secondary italic">Stores</span>
           </h1>
           <p className="text-xl text-muted font-medium max-w-2xl leading-relaxed">
              Support independent creators and global brands. Every vendor on our platform is hand-vetted for quality and reliability.
           </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        {/* Statistics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
           {[
             { label: 'Active Stores', value: '500+', icon: <Store /> },
             { label: 'Verified Status', value: '100%', icon: <ShieldCheck /> },
             { label: 'Global Creators', value: '150+', icon: <Users /> },
             { label: 'Fast Payouts', value: '24h', icon: <Zap /> },
           ].map((stat, i) => (
             <div key={i} className="bg-white p-6 rounded-3xl border border-border/40 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 bg-background-subtle rounded-xl flex items-center justify-center text-muted">
                   {React.cloneElement(stat.icon as React.ReactElement, { className: 'w-5 h-5' })}
                </div>
                <div>
                   <div className="text-lg font-black text-main leading-none">{stat.value}</div>
                   <div className="text-[10px] font-bold text-muted uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
             </div>
           ))}
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            [1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-[400px] rounded-[2.5rem] bg-white animate-pulse border border-border/40" />
            ))
          ) : vendors.length > 0 ? (
            vendors.map((vendor) => (
              <Card key={vendor.id} noPadding className="group bg-white rounded-[2.5rem] border-transparent hover:border-secondary/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden flex flex-col h-full">
                {/* Visual Header / Cover Placeholder */}
                <div className="h-32 bg-background-subtle relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-primary/5 opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
                   <div className="absolute top-4 right-4">
                      {vendor.is_verified && (
                        <Badge variant="secondary" className="bg-white/90 backdrop-blur-md shadow-sm border-none">
                           Verified Store
                        </Badge>
                      )}
                   </div>
                </div>

                {/* Profile Section */}
                <div className="px-8 pb-10 flex-grow relative pt-12">
                   {/* Logo Overlay */}
                   <div className="absolute -top-10 left-8 w-20 h-20 bg-white rounded-3xl p-1 shadow-xl border border-border/40 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                      <Image 
                        src={vendor.store_logo || "/images/store_logo.jpg"} 
                        alt={vendor.store_name} 
                        fill
                        className="object-cover rounded-[1.25rem]"
                      />
                   </div>

                   <div className="space-y-4">
                      <div className="flex justify-between items-end">
                         <div>
                            <h3 className="text-2xl font-black text-main group-hover:text-secondary transition-colors tracking-tight">
                               {vendor.store_name}
                            </h3>
                            <div className="flex items-center gap-1 text-warning mt-1">
                               <Star className="w-3.5 h-3.5 fill-warning" />
                               <span className="text-xs font-black">{vendor.vendor_rating || 'N/A'}</span>
                            </div>
                         </div>
                         <div className="text-right">
                            <span className="text-xs font-black text-muted uppercase tracking-widest block">{vendor.product_count || 0}</span>
                            <span className="text-[10px] font-bold text-muted/40 uppercase tracking-widest">Products</span>
                         </div>
                      </div>

                      <p className="text-sm text-muted font-medium line-clamp-3 leading-relaxed">
                         {vendor.store_description || "This store hasn't provided a description yet. Explore their unique collection of products below."}
                      </p>
                   </div>

                   {/* Quick Preview Links */}
                   <div className="mt-8 flex items-center gap-4">
                      <Link href={`/vendors/${vendor.id}`} className="flex-grow">
                         <Button variant="secondary" className="w-full h-12 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-secondary/20">
                            Visit Store
                         </Button>
                      </Link>
                      <button className="w-12 h-12 bg-background-subtle rounded-2xl flex items-center justify-center text-muted hover:bg-main hover:text-white transition-all">
                         <ArrowRight className="w-5 h-5" />
                      </button>
                   </div>
                </div>
              </Card>
            ))
          ) : (
             <div className="col-span-full py-24 text-center bg-white rounded-[3rem] border border-border/60 shadow-sm">
                <Store className="w-16 h-16 text-muted/20 mx-auto mb-6" />
                <h3 className="text-2xl font-black text-main tracking-tight italic">No vendors found</h3>
                <p className="text-muted font-semibold mt-2">Try checking back later for new stores.</p>
             </div>
          )}
        </div>

        {/* Dynamic Personalized CTA */}
        {mounted && (
          <div className="mt-32 relative group overflow-hidden rounded-[3rem]">
             <div className="absolute inset-0 bg-main">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary opacity-10 blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary opacity-10 blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
             </div>

             <div className="relative z-10 p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="max-w-2xl text-center md:text-left">
                   {isAuthenticated && user?.role === 'vendor' ? (
                     <>
                       <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-6">
                          Manage your <span className="text-secondary italic">Empire.</span>
                       </h2>
                       <p className="text-white/60 text-lg font-medium leading-relaxed">
                          Your dashboard is waiting. Update products, check sales, and connect with your customers.
                       </p>
                     </>
                   ) : (
                     <>
                       <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-6">
                          Ready to grow <span className="text-secondary italic">bigger?</span>
                       </h2>
                       <p className="text-white/60 text-lg font-medium leading-relaxed">
                          Join 50,000+ creators who sell their products on MarketPro. Reach millions of customers with professional tools.
                       </p>
                     </>
                   )}
                </div>

                <div>
                   {isAuthenticated && user?.role === 'vendor' ? (
                     <Link href="/vendor">
                       <Button variant="secondary" className="px-12 py-5 h-auto text-sm font-black uppercase tracking-widest shadow-2xl shadow-secondary/40 flex items-center gap-3">
                          Go to Dashboard <ArrowRight className="w-5 h-5" />
                       </Button>
                     </Link>
                   ) : (
                     <Link href="/register?role=vendor">
                        <Button variant="secondary" className="px-12 py-5 h-auto text-sm font-black uppercase tracking-widest shadow-2xl shadow-secondary/40 flex items-center gap-3">
                           Open Your Store <ArrowRight className="w-5 h-5" />
                        </Button>
                     </Link>
                   )}
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
