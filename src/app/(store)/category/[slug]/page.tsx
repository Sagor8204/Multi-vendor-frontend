'use client';

import React, { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { ProductCard } from '@/components/products/ProductCard';
import { CategoryHeader } from '@/components/categories/CategoryHeader';
import { CategorySidebar } from '@/components/categories/CategorySidebar';
import { Button } from '@/components/ui/Button';
import { ProductService, ProductListParams } from '@/services/product.service';
import { CategoryService } from '@/services/category.service';
import { LayoutGrid, List, ChevronDown, Search, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export default function CategoryDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [ordering, setOrdering] = useState<ProductListParams['ordering']>('-created_at');

  // Fetch all categories to find current and parent/children
  const { data: allCatsRes } = useQuery({
    queryKey: ['categories'],
    queryFn: () => CategoryService.listCategories(),
  });

  const allCategories = allCatsRes?.data || [];
  
  const currentCategory = useMemo(() => 
    allCategories.find(c => c.slug === slug), 
  [allCategories, slug]);

  const parentCategory = useMemo(() => 
    currentCategory?.parent ? allCategories.find(c => c.id === currentCategory.parent) : undefined,
  [allCategories, currentCategory]);

  const subcategories = useMemo(() => 
    allCategories.filter(c => c.parent === currentCategory?.id),
  [allCategories, currentCategory]);

  // Fetch products for this category
  const { data: response, isLoading: productsLoading } = useQuery({
    queryKey: ['category-products', slug, ordering],
    queryFn: () => ProductService.listProducts({ 
      category_slug: slug as string,
      ordering 
    }),
    enabled: !!slug,
  });

  const products = response?.data || [];

  return (
    <div className="bg-background-subtle/30 min-h-screen">
      {/* Premium Breadcrumbs */}
      <div className="bg-white border-b border-border/40">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-muted/60">
           <Link href="/" className="hover:text-primary transition-colors">Home</Link>
           <ChevronDown className="w-3 h-3 -rotate-90" />
           <Link href="/categories" className="hover:text-primary transition-colors">All Departments</Link>
           {parentCategory && (
             <>
               <ChevronDown className="w-3 h-3 -rotate-90" />
               <Link href={`/category/${parentCategory.slug}`} className="hover:text-primary transition-colors">{parentCategory.name}</Link>
             </>
           )}
           <ChevronDown className="w-3 h-3 -rotate-90" />
           <span className="text-main">{currentCategory?.name || 'Loading...'}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Dynamic Category Header */}
        <CategoryHeader 
          name={currentCategory?.name || '...'} 
          description={currentCategory?.description || `Discover the best selection of products in our ${currentCategory?.name} department.`}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Enhanced Sidebar */}
          <div className="lg:col-span-3">
             <CategorySidebar 
               currentCategory={currentCategory}
               subcategories={subcategories}
               parentCategory={parentCategory}
             />
          </div>

          {/* Main Grid Area */}
          <div className="lg:col-span-9">
             {/* Toolbar */}
             <div className="flex flex-col sm:flex-row justify-between items-center mb-10 pb-6 border-b border-border/60 gap-6">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                   <h2 className="text-xl font-black text-main tracking-tight">
                      {currentCategory?.name} <span className="text-muted/40 font-bold ml-1">({products.length})</span>
                   </h2>
                </div>

                <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                   {/* View Mode Toggle */}
                   <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-border/60 shadow-sm">
                      <button 
                        onClick={() => setViewMode('grid')}
                        className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-primary text-white shadow-md' : 'text-muted hover:text-main'}`}
                      >
                        <LayoutGrid className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setViewMode('list')}
                        className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-primary text-white shadow-md' : 'text-muted hover:text-main'}`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                   </div>

                   {/* Sorting Dropdown */}
                   <div className="relative group">
                      <button className="flex items-center gap-3 px-5 py-2.5 bg-white border border-border/60 rounded-xl shadow-sm hover:shadow-md transition-all">
                         <span className="text-[10px] font-black text-muted uppercase tracking-widest">Sort:</span>
                         <span className="text-xs font-bold text-main flex items-center gap-2">
                            {ordering === '-created_at' ? 'Newest' : 
                             ordering === 'price' ? 'Price: Low' : 
                             ordering === '-price' ? 'Price: High' : 'Featured'}
                            <ChevronDown className="w-3 h-3 text-muted group-hover:rotate-180 transition-transform duration-300" />
                         </span>
                      </button>
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-border rounded-2xl shadow-2xl z-20 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                         {[
                           { label: 'Newest Arrivals', val: '-created_at' },
                           { label: 'Price: Low to High', val: 'price' },
                           { label: 'Price: High to Low', val: '-price' },
                         ].map((opt) => (
                           <button 
                             key={opt.val}
                             onClick={() => setOrdering(opt.val as any)}
                             className="w-full text-left px-6 py-2.5 text-xs font-bold text-muted hover:text-primary hover:bg-primary/5 transition-all"
                           >
                             {opt.label}
                           </button>
                         ))}
                      </div>
                   </div>
                </div>
             </div>

             {/* Product Loop */}
             {productsLoading ? (
               <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className={`bg-white animate-pulse rounded-3xl border border-border/40 ${viewMode === 'grid' ? 'aspect-[4/5]' : 'h-48'}`} />
                  ))}
               </div>
             ) : products.length > 0 ? (
               <div className={`grid gap-6 md:gap-8 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                  {products.map(product => (
                    <ProductCard 
                      key={product.id} 
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      slug={product.slug}
                      image={product.images.find(img => img.is_main)?.image || product.images[0]?.image}
                      category={product.category.name}
                      vendor={product.vendor.store_name}
                      variant={viewMode}
                    />
                  ))}
               </div>
             ) : (
               <div className="py-24 text-center bg-white rounded-[3rem] border border-border/60 shadow-sm">
                  <div className="w-20 h-20 bg-background-subtle rounded-3xl flex items-center justify-center mx-auto mb-6">
                     <Search className="w-8 h-8 text-muted/30" />
                  </div>
                  <h3 className="text-2xl font-black text-main tracking-tight italic">No products found in this category</h3>
                  <p className="text-muted font-semibold mt-2 max-w-xs mx-auto text-sm leading-relaxed">
                     Try exploring our other departments or check back later for new arrivals.
                  </p>
                  <Link href="/categories">
                    <Button variant="outline" className="mt-8 border-2 px-10 py-4 h-auto text-[10px] font-black uppercase tracking-widest">
                       All Departments
                    </Button>
                  </Link>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
