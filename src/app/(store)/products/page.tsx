'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductSkeleton } from '@/components/products/ProductSkeleton';
import { ProductService, ProductListParams } from '@/services/product.service';
import { CategoryService } from '@/services/category.service';
import { Search, SlidersHorizontal, ChevronDown, LayoutGrid, List, X } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Initialize filters from search params
  const [filters, setFilters] = useState<ProductListParams>(() => {
    const params: ProductListParams = {
      ordering: (searchParams.get('ordering') as any) || '-created_at'
    };
    
    if (searchParams.get('trending') === 'true') {
      params.trending = true;
    }
    
    if (searchParams.get('on_sale') === 'true') {
      params.on_sale = true;
    }

    const categorySlug = searchParams.get('category');
    if (categorySlug) {
      params.category_slug = categorySlug;
    }
    
    return params;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [expandedParents, setExpandedParents] = useState<number[]>([]);

  // Sync URL with filters
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.trending) params.set('trending', 'true');
    if (filters.on_sale) params.set('on_sale', 'true');
    if (filters.category_slug) params.set('category', filters.category_slug);
    if (filters.ordering && filters.ordering !== '-created_at') {
      params.set('ordering', filters.ordering);
    }
    
    const queryString = params.toString();
    const newUrl = queryString ? `/products?${queryString}` : '/products';
    
    const currentUrl = window.location.pathname + window.location.search;
    if (currentUrl !== newUrl) {
      router.push(newUrl, { scroll: false });
    }
  }, [filters, router]);

  // Update filters if searchParams change externally
  useEffect(() => {
    const newTrending = searchParams.get('trending') === 'true' || undefined;
    const newOnSale = searchParams.get('on_sale') === 'true' || undefined;
    const newCategorySlug = searchParams.get('category') || undefined;
    const newOrdering = (searchParams.get('ordering') as any) || '-created_at';

    setFilters(prev => {
      if (prev.trending === newTrending && 
          prev.on_sale === newOnSale && 
          prev.category_slug === newCategorySlug &&
          prev.ordering === newOrdering) {
        return prev;
      }

      return {
        ...prev,
        trending: newTrending,
        on_sale: newOnSale,
        category_slug: newCategorySlug,
        ordering: newOrdering
      };
    });
  }, [searchParams]);

  const { data: categoriesRes } = useQuery({
    queryKey: ['categories'],
    queryFn: () => CategoryService.listCategories(),
  });

  const { data: productsRes, isLoading: productsLoading } = useQuery({
    queryKey: ['products', filters, searchTerm],
    queryFn: () => ProductService.listProducts({
      ...filters,
      search: searchTerm || undefined
    }),
    placeholderData: (previousData) => previousData,
  });

  const categories = categoriesRes?.data || [];
  const products = productsRes?.data || [];

  // Organize categories into a tree (Parent -> Children)
  const categoryTree = useMemo(() => {
    const parents = categories.filter(c => !c.parent);
    return parents.map(parent => ({
      ...parent,
      subcategories: categories.filter(c => c.parent === parent.id)
    }));
  }, [categories]);

  const toggleParent = (parentId: number) => {
    setExpandedParents(prev => 
      prev.includes(parentId) 
        ? prev.filter(id => id !== parentId) 
        : [...prev, parentId]
    );
  };

  const handleCategoryToggle = (categorySlug?: string) => {
    setFilters(prev => ({
      ...prev,
      category_slug: prev.category_slug === categorySlug ? undefined : categorySlug
    }));
  };

  const handleSortChange = (ordering: ProductListParams['ordering']) => {
    setFilters(prev => ({ ...prev, ordering }));
  };

  const activeCategoryName = useMemo(() => {
    if (filters.trending) return 'Trending Products';
    if (filters.on_sale) return 'Flash Sales';
    return categories.find(c => c.slug === filters.category_slug)?.name || 'All Products';
  }, [filters, categories]);

  return (
    <div className="bg-background-subtle/30 min-h-screen">
      {/* Search Header Area */}
      <div className="bg-white border-b border-border/60 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-8">
             <div>
                <h1 className="text-3xl font-black text-main tracking-tight">{activeCategoryName}</h1>
                <p className="text-sm font-semibold text-muted mt-2">{products.length} items found</p>
             </div>
             
             <div className="relative w-full md:w-112.5">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full h-12 pl-11 pr-4 bg-white border border-border/50 shadow-sm focus:border-primary focus:ring-4 focus:ring-primary/5 rounded-2xl text-sm font-medium transition-all outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
          </div>

          <div className="flex items-center justify-between py-4 border-t border-border/40">
             <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-background-subtle rounded-xl text-xs font-bold text-main border border-border/40 hover:bg-white transition-colors">
                   <SlidersHorizontal className="w-3.5 h-3.5" />
                   Filters
                </button>
                <div className="hidden md:flex items-center gap-2">
                   {filters.trending && (
                     <Badge variant="primary" className="pl-3 pr-1 py-1 gap-1 normal-case font-bold">
                        Trending
                        <button 
                          onClick={() => setFilters(prev => ({ ...prev, trending: undefined }))} 
                          className="p-0.5 cursor-pointer hover:bg-primary/20 rounded-full transition-colors"
                        >
                           <X className="w-3 h-3" />
                        </button>
                     </Badge>
                   )}
                   {filters.on_sale && (
                     <Badge variant="primary" className="pl-3 pr-1 py-1 gap-1 normal-case font-bold">
                        Flash Sales
                        <button 
                          onClick={() => setFilters(prev => ({ ...prev, on_sale: undefined }))} 
                          className="p-0.5 cursor-pointer hover:bg-primary/20 rounded-full transition-colors"
                        >
                           <X className="w-3 h-3" />
                        </button>
                     </Badge>
                   )}
                   {filters.category_slug && (
                     <Badge variant="primary" className="pl-3 pr-1 py-1 gap-1 normal-case font-bold">
                        {categories.find(c => c.slug === filters.category_slug)?.name || 'Category'}
                        <button 
                          onClick={() => setFilters(prev => ({ ...prev, category_slug: undefined }))} 
                          className="p-0.5 cursor-pointer hover:bg-primary/20 rounded-full transition-colors"
                        >
                           <X className="w-3 h-3" />
                        </button>
                     </Badge>
                   )}
                </div>
             </div>

             <div className="flex items-center gap-6">
                <div className="flex items-center gap-1 p-1 bg-background-subtle rounded-xl border border-border/40">
                   <button 
                     onClick={() => setViewMode('grid')}
                     className={`p-1.5 cursor-pointer rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-primary shadow-sm' : 'text-muted hover:text-main'}`}
                   >
                     <LayoutGrid className="w-4 h-4" />
                   </button>
                   <button 
                     onClick={() => setViewMode('list')}
                     className={`p-1.5 cursor-pointer rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-primary shadow-sm' : 'text-muted hover:text-main'}`}
                   >
                     <List className="w-4 h-4" />
                   </button>
                </div>
                
                <div className="relative group">
                   <button className="flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-background-subtle rounded-xl transition-colors">
                      <span className="text-xs font-bold text-muted uppercase tracking-wider">Sort by:</span>
                      <span className="text-xs font-black text-main uppercase tracking-widest flex items-center gap-2">
                         {filters.ordering === 'price' ? 'Lowest Price' : 
                          filters.ordering === '-price' ? 'Highest Price' : 
                          filters.ordering === '-created_at' ? 'Newest' : 'Oldest'}
                         <ChevronDown className="w-3 h-3" />
                      </span>
                   </button>
                   <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-border/60 rounded-2xl shadow-2xl z-20 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      {[
                        { label: 'Newest Arrivals', val: '-created_at' },
                        { label: 'Price: Low to High', val: 'price' },
                        { label: 'Price: High to Low', val: '-price' },
                        { label: 'Oldest First', val: 'created_at' },
                      ].map((opt) => (
                        <button 
                          key={opt.val}
                          onClick={() => handleSortChange(opt.val as any)}
                          className="w-full cursor-pointer text-left px-6 py-2.5 text-xs font-bold text-muted hover:text-primary hover:bg-primary/5 transition-all"
                        >
                          {opt.label}
                        </button>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-3 space-y-10">
             <div>
                <h3 className="text-[10px] font-black text-main uppercase tracking-[0.2em] mb-6 flex items-center justify-between">
                  Departments
                  {filters.category_slug && <button onClick={() => handleCategoryToggle(undefined)} className="text-primary hover:underline lowercase tracking-normal font-bold cursor-pointer">Clear</button>}
                </h3>
                <div className="space-y-2">
                   {categoryTree.map(parent => {
                     const isExpanded = expandedParents.includes(parent.id);
                     const isParentSelected = filters.category_slug === parent.slug;

                     return (
                       <div key={parent.id} className="space-y-1">
                          <div className="flex items-center group">
                            <button 
                              onClick={() => handleCategoryToggle(parent.slug)}
                              className={`grow flex items-center justify-between px-4 py-2.5 rounded-xl transition-all ${
                                isParentSelected 
                                  ? 'bg-primary text-white shadow-md font-bold' 
                                  : 'text-muted font-semibold hover:bg-white hover:text-main'
                              }`}
                            >
                               <span className="text-sm cursor-pointer">{parent.name}</span>
                               <span className={`text-[10px] ${isParentSelected ? 'text-white/60' : 'text-muted/40'}`}>
                                  {parent.product_count}
                               </span>
                            </button>
                            {parent.subcategories.length > 0 && (
                              <button 
                                onClick={() => toggleParent(parent.id)}
                                className={`p-2 rounded-lg transition-colors ${isExpanded ? 'text-primary' : 'text-muted hover:text-main cursor-pointer'}`}
                              >
                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                              </button>
                            )}
                          </div>
                          
                          {isExpanded && parent.subcategories.length > 0 && (
                            <div className="ml-6 space-y-1 pl-4 border-l border-border/60 mt-1 animate-in slide-in-from-top-2 duration-300">
                               {parent.subcategories.map(sub => {
                                 const isSubSelected = filters.category_slug === sub.slug;
                                 return (
                                   <button 
                                     key={sub.id} 
                                     onClick={() => handleCategoryToggle(sub.slug)}
                                     className={`w-full flex items-center justify-between px-4 py-2 rounded-lg text-xs transition-all cursor-pointer ${
                                       isSubSelected 
                                         ? 'text-primary font-bold bg-primary/5' 
                                         : 'text-muted font-medium hover:text-primary'
                                     }`}
                                   >
                                      <span>{sub.name}</span>
                                      <span className="text-[9px] opacity-40">{sub.product_count}</span>
                                   </button>
                                 );
                               })}
                            </div>
                          )}
                       </div>
                     );
                   })}
                </div>
             </div>
             
             <div className="p-6 bg-white rounded-3xl border border-border/60 shadow-sm">
                <h3 className="text-[10px] font-black text-main uppercase tracking-[0.2em] mb-6">Price Range</h3>
                <div className="space-y-6">
                   <div className="h-1.5 bg-background-subtle rounded-full relative">
                      <div className="absolute inset-y-0 left-0 right-1/4 bg-primary rounded-full"></div>
                      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-sm cursor-pointer"></div>
                      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-sm cursor-pointer"></div>
                   </div>
                   <div className="flex items-center justify-between gap-4">
                      <div className="grow">
                         <label className="text-[8px] font-black text-muted uppercase tracking-widest block mb-1">Min Price</label>
                         <div className="text-sm font-bold text-main">$0</div>
                      </div>
                      <div className="grow text-right">
                         <label className="text-[8px] font-black text-muted uppercase tracking-widest block mb-1">Max Price</label>
                         <div className="text-sm font-bold text-main">$750</div>
                      </div>
                   </div>
                   <Button variant="outline" className="w-full text-[10px] font-bold uppercase tracking-widest border-2 py-2">Apply</Button>
                </div>
             </div>

             <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10">
                <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-2">Need Help?</h4>
                <p className="text-[11px] text-primary/60 font-bold leading-relaxed mb-4">
                   Can't find what you're looking for? Our support team is here 24/7.
                </p>
                <button className="text-xs font-black text-primary hover:underline cursor-pointer">Contact Support</button>
             </div>
          </aside>

          {/* Product Grid/List */}
          <div className="lg:col-span-9">
            {productsLoading ? (
              <div className={`grid gap-6 md:gap-8 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <ProductSkeleton key={i} variant={viewMode} />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className={`grid gap-4 md:gap-8 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
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
                  <h3 className="text-2xl font-black text-main tracking-tight italic">No products matched your search</h3>
                  <p className="text-muted font-semibold mt-2 max-w-xs mx-auto text-sm leading-relaxed">
                     Try adjusting your filters or search for something more general.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-8 border-2"
                    onClick={() => {setSearchTerm(''); setFilters({ordering: '-created_at', trending: undefined, on_sale: undefined, category_slug: undefined})}}
                  >
                    Clear all filters
                  </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background-subtle/30 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
