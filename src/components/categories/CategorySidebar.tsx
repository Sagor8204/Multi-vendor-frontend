'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Filter } from 'lucide-react';
import { Category } from '@/types/api/product';

interface CategorySidebarProps {
  currentCategory?: Category;
  subcategories: Category[];
  parentCategory?: Category;
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({ 
  currentCategory, 
  subcategories,
  parentCategory
}) => {
  return (
    <aside className="space-y-12">
      {/* Dynamic Sub-Categories */}
      <div>
        <div className="flex items-center gap-2 mb-6 text-main">
            <Filter className="w-4 h-4" />
            <h3 className="text-xs font-black uppercase tracking-[0.2em]">Explore</h3>
        </div>
        
        <div className="space-y-1">
          {/* Link back to parent if we are in a subcategory */}
          {parentCategory && (
            <Link 
              href={`/category/${parentCategory.slug}`} 
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-primary bg-primary/5 rounded-xl mb-4 group"
            >
              <ChevronRight className="w-3 h-3 rotate-180" />
              <span>Back to {parentCategory.name}</span>
            </Link>
          )}

          {subcategories.length > 0 ? (
            subcategories.map((sub) => (
              <Link 
                key={sub.id} 
                href={`/category/${sub.slug}`} 
                className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-muted hover:bg-white hover:text-primary transition-all group border border-transparent hover:border-border/40 hover:shadow-sm"
              >
                <span>{sub.name}</span>
                <span className="text-[10px] opacity-40 group-hover:opacity-100">{sub.product_count}</span>
              </Link>
            ))
          ) : (
            <p className="px-4 text-xs font-medium text-muted/60 italic">No further subcategories</p>
          )}
        </div>
      </div>

      {/* Trust Filters - Styled */}
      <div>
        <h3 className="text-[10px] font-black text-main uppercase tracking-[0.2em] mb-6">Seller Rating</h3>
        <div className="space-y-3">
          {['Top Rated Sellers', 'Verified Vendors', 'Free Shipping'].map((filter) => (
            <label key={filter} className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-white border border-transparent hover:border-border/40 transition-all group">
              <span className="text-sm font-bold text-muted group-hover:text-main">{filter}</span>
              <div className="w-5 h-5 border-2 border-border rounded-lg group-hover:border-primary transition-colors flex items-center justify-center">
                 <div className="w-2.5 h-2.5 bg-primary rounded-sm scale-0 group-hover:scale-100 transition-transform" />
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Support Card */}
      <div className="p-6 bg-secondary/5 rounded-3xl border border-secondary/10">
        <h4 className="text-xs font-black text-secondary uppercase tracking-widest mb-2">Need advice?</h4>
        <p className="text-[11px] text-muted font-bold leading-relaxed mb-4">
           Our shopping experts can help you find the best {currentCategory?.name || 'items'}.
        </p>
        <button className="text-xs font-black text-secondary hover:underline cursor-pointer">Chat with Expert</button>
      </div>
    </aside>
  );
};
