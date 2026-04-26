'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

import { Badge } from '../ui/Badge';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

interface ProductTabsProps {
  product: any;
}

export const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Review Submitted Successfully!');
    setReviewForm({ rating: 5, comment: '' });
  };

  return (
    <div className="mt-24 border-t border-border/60 pt-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Side: Tabs Content */}
        <div className="lg:col-span-8">
          <div className="flex overflow-x-auto space-x-10 border-b border-border/40 mb-10 no-scrollbar">
            {['description', 'specifications', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all relative whitespace-nowrap ${
                  activeTab === tab ? 'text-primary' : 'text-muted hover:text-main'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>
                )}
              </button>
            ))}
          </div>

          <div className="min-h-[300px]">
            {activeTab === 'description' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                 <p className="text-base text-muted leading-relaxed font-medium max-w-2xl">
                    {product.description}
                 </p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.features.map((f: string, i: number) => (
                      <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-border/40 bg-background-subtle/30">
                         <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center text-success text-[10px] font-bold">✓</div>
                         <span className="text-xs font-bold text-main">{f}</span>
                      </div>
                    ))}
                 </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="space-y-1 animate-in fade-in duration-500 max-w-xl">
                 {Object.entries(product.specs).map(([key, val]: any) => (
                   <div key={key} className="flex justify-between py-4 border-b border-border/40 last:border-none">
                      <span className="text-[10px] font-black text-muted uppercase tracking-widest">{key}</span>
                      <span className="text-sm font-bold text-main">{val}</span>
                   </div>
                 ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-12 animate-in fade-in duration-500">
                 <div className="space-y-8">
                    {product.reviews.length > 0 ? (
                      product.reviews.map((review: any) => (
                        <div key={review.id} className="flex gap-6 pb-8 border-b border-border/40 last:border-none">
                            <div className="w-12 h-12 rounded-full bg-background-subtle flex items-center justify-center text-xs font-bold shrink-0">
                                {review.user.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="flex-grow space-y-2">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-bold text-main text-sm">{review.user}</h4>
                                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{review.date}</span>
                                </div>
                                <div className="flex text-warning">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-warning' : 'text-border fill-none'}`} />
                                    ))}
                                </div>
                                <p className="text-sm text-muted font-medium leading-relaxed">{review.comment}</p>
                            </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-12 text-center bg-background-subtle/50 rounded-2xl border border-dashed border-border">
                         <p className="text-sm font-bold text-muted uppercase tracking-widest">No reviews yet for this product</p>
                      </div>
                    )}
                 </div>
                 
                 <Card noPadding className="border-border/60 bg-white overflow-hidden">
                    <div className="p-8">
                        <h3 className="text-sm font-black text-main uppercase tracking-widest mb-6">Write a Review</h3>
                        <form onSubmit={submitReview} className="space-y-6">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-[10px] font-black text-muted uppercase tracking-widest block mb-2">Rating</label>
                                    <div className="flex gap-2">
                                        {[1,2,3,4,5].map((star) => (
                                            <button 
                                                key={star}
                                                type="button"
                                                onClick={() => setReviewForm({...reviewForm, rating: star})}
                                                className={`p-2 rounded-lg border transition-all ${reviewForm.rating >= star ? 'bg-warning/10 border-warning text-warning' : 'border-border text-muted hover:border-warning/50'}`}
                                            >
                                                <Star className={`w-4 h-4 ${reviewForm.rating >= star ? 'fill-warning' : ''}`} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                           </div>
                           <div>
                              <label className="text-[10px] font-black text-muted uppercase tracking-widest block mb-2">Your Review</label>
                              <textarea 
                                 rows={4}
                                 required
                                 placeholder="Tell others what you think..."
                                 className="w-full bg-background-subtle/30 border border-border text-sm font-medium text-main rounded-xl px-4 py-3 outline-none focus:border-primary focus:bg-white transition-all"
                                 value={reviewForm.comment}
                                 onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                              ></textarea>
                           </div>
                           <Button type="submit" className="w-fit px-12 py-4 text-xs font-bold uppercase tracking-widest">
                              Post Review
                           </Button>
                        </form>
                    </div>
                 </Card>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Vendor Card */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            <h3 className="text-[10px] font-black text-muted uppercase tracking-widest">Sold & Shipped by</h3>
            <Card noPadding className="border-border/60 overflow-hidden hover:shadow-xl transition-all duration-500 group">
                <div className="p-6 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center text-xl font-black shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                            {product.vendor.logo}
                        </div>
                        <div>
                            <h4 className="text-lg font-black text-main tracking-tight group-hover:text-primary transition-colors">{product.vendor.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="px-1.5 py-0">Verified</Badge>
                                <span className="text-[10px] font-bold text-muted uppercase">{product.vendor.totalSales} Sales</span>
                            </div>
                        </div>
                    </div>
                    
                    <p className="text-xs text-muted font-medium leading-relaxed">
                        Dedicated vendor providing high-quality products and excellent customer service.
                    </p>

                    <div className="pt-4 flex flex-col gap-2">
                        <Link href={`/vendors/${product.vendor.id}`}>
                            <Button variant="outline" className="w-full text-[10px] font-bold uppercase tracking-widest border-2 py-3">
                                View Store Profile
                            </Button>
                        </Link>
                        <Button variant="outline" className="w-full text-[10px] font-bold uppercase tracking-widest border-transparent hover:border-transparent hover:bg-background-subtle py-2">
                            Contact Seller
                        </Button>
                    </div>
                </div>
            </Card>

            <Card noPadding className="bg-primary/5 border-primary/10 p-5">
                <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary shadow-sm border border-primary/10">
                        <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black text-main uppercase tracking-tight">Marketplace Guarantee</h4>
                        <p className="text-[10px] text-muted font-medium mt-1 leading-normal">
                            Get the item you ordered or your money back. 
                        </p>
                    </div>
                </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
