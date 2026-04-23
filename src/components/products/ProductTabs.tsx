'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

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
    <div className="mt-32">
      <div className="flex overflow-x-auto space-x-12 border-b border-border mb-12 no-scrollbar">
        {['description', 'specifications', 'vendor info', 'reviews'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-xs font-black uppercase tracking-[0.2em] transition-all relative whitespace-nowrap ${
              activeTab === tab ? 'text-primary' : 'text-muted hover:text-main'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-full"></div>
            )}
          </button>
        ))}
      </div>

      <div className="max-w-3xl">
        {activeTab === 'description' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <p className="text-lg text-muted leading-relaxed font-medium">
                {product.description}
             </p>
             <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.features.map((f: string, i: number) => (
                  <li key={i} className="flex items-center space-x-3 text-sm font-bold text-main">
                     <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px]">✓</span>
                     <span>{f}</span>
                  </li>
                ))}
             </ul>
          </div>
        )}

        {activeTab === 'specifications' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
             {Object.entries(product.specs).map(([key, val]: any) => (
               <div key={key} className="flex justify-between py-4 border-b border-border/40">
                  <span className="text-xs font-black text-muted uppercase tracking-widest">{key}</span>
                  <span className="text-sm font-bold text-main">{val}</span>
               </div>
             ))}
          </div>
        )}

        {activeTab === 'vendor info' && (
          <Card className="p-8 border-secondary/20 bg-secondary/5 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-secondary text-white rounded-2xl flex items-center justify-center text-3xl font-black shadow-xl">
                  {product.vendor.logo}
                </div>
                <div className="space-y-2">
                   <h3 className="text-2xl font-black text-main tracking-tight">{product.vendor.name}</h3>
                   <div className="flex items-center space-x-4">
                      <span className="text-xs font-bold text-secondary uppercase tracking-widest">Verified Vendor</span>
                      <div className="h-1 w-1 bg-secondary/30 rounded-full"></div>
                      <span className="text-xs font-bold text-muted uppercase tracking-widest">{product.vendor.totalSales} Sales</span>
                   </div>
                </div>
             </div>
             <p className="mt-8 text-sm text-muted leading-relaxed font-medium">
                {product.vendor.name} is a premier vendor committed to excellence and quality.
             </p>
             <Button variant="outline" className="mt-8 border-secondary/40 text-secondary hover:bg-secondary hover:text-white uppercase text-[10px] font-black tracking-widest px-8">
                Visit Store Profile
             </Button>
          </Card>
        )}
        
        {activeTab === 'reviews' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="space-y-6">
                <h3 className="text-xl font-bold text-main">Customer Reviews</h3>
                {product.reviews.map((review: any) => (
                   <div key={review.id} className="border-b border-border pb-6">
                      <div className="flex justify-between items-start mb-2">
                         <div>
                            <div className="font-bold text-main">{review.user}</div>
                            <div className="text-warning text-sm mt-0.5">
                              {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                            </div>
                         </div>
                         <span className="text-xs text-muted font-bold tracking-widest">{review.date}</span>
                      </div>
                      <p className="text-sm text-muted mt-3 font-medium leading-relaxed">{review.comment}</p>
                   </div>
                ))}
             </div>
             
             <Card className="p-8 bg-background-subtle border-none">
                <h3 className="text-lg font-bold text-main mb-6">Write a Review</h3>
                <form onSubmit={submitReview} className="space-y-4">
                   <div>
                      <label className="text-xs font-black text-muted uppercase tracking-widest block mb-2">Rating</label>
                      <select 
                        className="w-full bg-white border border-border text-main rounded-md px-4 py-2 outline-none"
                        value={reviewForm.rating}
                        onChange={(e) => setReviewForm({...reviewForm, rating: Number(e.target.value)})}
                      >
                         <option value="5">5 Stars - Excellent</option>
                         <option value="4">4 Stars - Good</option>
                         <option value="3">3 Stars - Average</option>
                         <option value="2">2 Stars - Poor</option>
                         <option value="1">1 Star - Terrible</option>
                      </select>
                   </div>
                   <div>
                      <label className="text-xs font-black text-muted uppercase tracking-widest block mb-2">Your Review</label>
                      <textarea 
                         rows={4}
                         required
                         placeholder="Tell us what you thought about this product..."
                         className="w-full bg-white border border-border text-main rounded-md px-4 py-3 outline-none focus:border-primary"
                         value={reviewForm.comment}
                         onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                      ></textarea>
                   </div>
                   <Button type="submit" className="w-full py-4 text-sm font-black uppercase tracking-widest">
                      Submit Review
                   </Button>
                </form>
             </Card>
          </div>
        )}
      </div>
    </div>
  );
};
