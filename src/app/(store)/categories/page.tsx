'use client';

import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { 
  Laptop, 
  Shirt, 
  Home, 
  Sparkles, 
  Trophy, 
  BookOpen, 
  Package, 
  ChevronRight, 
  ArrowRight,
  Zap
} from 'lucide-react';
import { CategoryService } from '@/services/category.service';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const getIconForCategory = (slug: string) => {
  const icons: Record<string, React.ReactNode> = {
    'electronics': <Laptop className="w-6 h-6" />,
    'fashion': <Shirt className="w-6 h-6" />,
    'home-living': <Home className="w-6 h-6" />,
    'beauty': <Sparkles className="w-6 h-6" />,
    'sports': <Trophy className="w-6 h-6" />,
    'books': <BookOpen className="w-6 h-6" />,
  };
  return icons[slug] || <Package className="w-6 h-6" />;
};

export default function CategoriesListingPage() {
  const { data: response, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => CategoryService.listCategories(),
  });

  const allCategories = response?.data || [];

  // Group categories hierarchically
  const nestedCategories = useMemo(() => {
    const parents = allCategories.filter(c => !c.parent);
    return parents.map(parent => ({
      ...parent,
      subcategories: allCategories.filter(c => c.parent === parent.id)
    }));
  }, [allCategories]);

  return (
    <div className="bg-background-subtle/30 min-h-screen pb-24">
      {/* Page Header / Hero */}
      <div className="bg-white border-b border-border/40 mb-16 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full w-fit mb-6">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Explore Departments</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-main tracking-tighter leading-none mb-6">
            Shop by <span className="text-primary italic">Department</span>
          </h1>
          <p className="text-xl text-muted font-medium max-w-2xl leading-relaxed">
            Discover a world of unique products organized into curated categories from our community of verified vendors.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 rounded-[2.5rem] bg-white animate-pulse border border-border/40" />
            ))}
          </div>
        ) : nestedCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {nestedCategories.map((parent) => (
              <Card key={parent.id} noPadding className="group bg-white rounded-[2.5rem] border-transparent hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden flex flex-col h-full">
                {/* Card Header: Parent Info */}
                <div className="p-10 pb-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 bg-background-subtle rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:scale-110 shadow-sm group-hover:shadow-lg group-hover:shadow-primary/20">
                      {getIconForCategory(parent.slug)}
                    </div>
                    <span className="text-[10px] font-black text-muted/40 uppercase tracking-widest bg-background-subtle px-3 py-1 rounded-full">
                      {parent.product_count} Items
                    </span>
                  </div>
                  
                  <Link href={`/category/${parent.slug}`} className="block group/title">
                    <h2 className="text-2xl font-black text-main tracking-tight group-hover/title:text-primary transition-colors mb-2">
                      {parent.name}
                    </h2>
                    <p className="text-sm text-muted font-medium line-clamp-2 leading-relaxed h-10">
                      {parent.description || `High-quality ${parent.name.toLowerCase()} products from verified stores.`}
                    </p>
                  </Link>
                </div>

                {/* Card Body: Subcategories */}
                <div className="px-10 py-6 bg-background-subtle/30 flex-grow border-t border-border/40">
                  <p className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-4">Top Subcategories</p>
                  <div className="grid grid-cols-1 gap-1">
                    {parent.subcategories.slice(0, 5).map(sub => (
                      <Link 
                        key={sub.id}
                        href={`/category/${sub.slug}`}
                        className="flex items-center justify-between py-2 group/sub"
                      >
                        <span className="text-sm font-bold text-muted group-hover/sub:text-primary transition-colors">{sub.name}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-muted/20 group-hover/sub:text-primary/40 group-hover/sub:translate-x-1 transition-all" />
                      </Link>
                    ))}
                    {parent.subcategories.length > 5 && (
                      <Link href={`/category/${parent.slug}`} className="mt-2 text-[10px] font-black text-primary uppercase tracking-widest hover:underline">
                        + {parent.subcategories.length - 5} more categories
                      </Link>
                    )}
                    {parent.subcategories.length === 0 && (
                      <p className="text-xs text-muted/40 italic py-2">Explore the full collection</p>
                    )}
                  </div>
                </div>

                {/* Card Footer: CTA */}
                <div className="p-10 pt-4">
                  <Link href={`/category/${parent.slug}`}>
                    <Button variant="outline" className="w-full h-12 text-[10px] font-black uppercase tracking-[0.2em] border-2 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                      Browse Department
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center bg-white rounded-[3rem] border border-border/60 shadow-sm">
             <div className="w-20 h-20 bg-background-subtle rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Package className="w-8 h-8 text-muted/30" />
             </div>
             <h3 className="text-2xl font-black text-main tracking-tight">No departments found</h3>
             <p className="text-muted font-semibold mt-2">Our curators are busy adding new collections. Check back soon!</p>
          </div>
        )}

        {/* Feature Section: Quality Promise */}
        <div className="mt-32 relative group">
           <div className="absolute inset-0 bg-main rounded-[3rem] overflow-hidden">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary opacity-10 blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:opacity-20 transition-opacity duration-1000"></div>
           </div>
           
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center p-12 md:p-20">
              <div className="lg:col-span-7">
                 <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight mb-6">
                    Every department is <span className="text-secondary italic">quality-verified.</span>
                 </h3>
                 <p className="text-white/60 text-lg font-medium leading-relaxed mb-10 max-w-xl">
                    We don't just host vendors; we partner with them. Every category on MarketPro is monitored for shipping speed, product accuracy, and seller integrity.
                 </p>
                 <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-secondary">✓</div>
                       <span className="text-xs font-bold text-white uppercase tracking-widest">Handpicked Sellers</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-secondary">✓</div>
                       <span className="text-xs font-bold text-white uppercase tracking-widest">Secure Payments</span>
                    </div>
                 </div>
              </div>
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                 <div className="p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 text-center">
                    <div className="text-3xl font-black text-white mb-1">100%</div>
                    <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Vetted</div>
                 </div>
                 <div className="p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 text-center">
                    <div className="text-3xl font-black text-white mb-1">24h</div>
                    <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Support</div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
