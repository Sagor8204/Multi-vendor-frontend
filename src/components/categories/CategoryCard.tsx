'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  name: string;
  slug: string;
  description?: string;
  icon?: React.ReactNode;
  productCount?: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ 
  name, 
  slug, 
  description, 
  icon, 
  productCount 
}) => {
  return (
    <Link href={`/category/${slug}`} className="group h-full">
      <Card className="h-full border-none shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden bg-background-subtle group-hover:bg-white group-hover:-translate-y-2">
        <div className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-border/40 group-hover:bg-primary/5 group-hover:border-primary/20 transition-colors">
              <div className="text-main group-hover:text-primary transition-colors">
                {icon || '📁'}
              </div>
            </div>
            {productCount !== undefined && (
              <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em] group-hover:text-primary transition-colors">
                {productCount}+ Products
              </span>
            )}
          </div>
          
          <h2 className="text-2xl font-black text-main mb-3 group-hover:text-primary transition-colors tracking-tight">
            {name}
          </h2>
          {description && (
            <p className="text-muted font-medium leading-relaxed line-clamp-2">
              {description}
            </p>
          )}
          
          <div className="mt-8 flex items-center text-xs font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
            Explore Collection <ArrowRight className="ml-2 w-4 h-4" />
          </div>
        </div>
      </Card>
    </Link>
  );
};
