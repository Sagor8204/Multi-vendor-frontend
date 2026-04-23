'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface CategorySidebarProps {
  subCategories: string[];
  filters: string[];
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({ subCategories, filters }) => {
  return (
    <aside className="space-y-10">
      <div>
        <h3 className="text-xs font-black text-main uppercase tracking-widest mb-6">Sub-Categories</h3>
        <div className="space-y-3">
          {subCategories.map((sub) => (
            <Link key={sub} href="#" className="flex items-center justify-between text-sm font-bold text-muted hover:text-primary transition-all group">
              <span>{sub}</span>
              <span className="w-5 h-5 bg-background-subtle rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                <ArrowRight className="w-2.5 h-2.5 text-muted-foreground group-hover:text-white" />
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-black text-main uppercase tracking-widest mb-6">Vendor Quality</h3>
        <div className="space-y-3">
          {filters.map((filter) => (
            <label key={filter} className="flex items-center space-x-3 cursor-pointer group">
              <div className="w-5 h-5 border-2 border-border rounded-lg group-hover:border-primary transition-colors flex items-center justify-center">
                 <CheckCircle2 className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-sm font-bold text-muted group-hover:text-main transition-colors">{filter}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};
