'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuth } from '@/hooks/useAuth';
import { useIsMounted } from '@/hooks/useIsMounted';
import { useQuery } from '@tanstack/react-query';
import { CategoryService } from '@/services/category.service';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  LogOut, 
  LayoutDashboard, 
  ChevronDown, 
  Search, 
  Menu,
  Store,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import Image from 'next/image';

export const Header = () => {
  const cartCount = useCartStore((state) => state.cartCount());
  const wishlistCount = useWishlistStore((state) => state.wishlistCount());
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const mounted = useIsMounted();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDepsOpen, setIsDepsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  
  // Dynamic Mega Menu State
  const [activeParentId, setActiveParentId] = useState<number | null>(null);

  const { data: catRes } = useQuery({
    queryKey: ['categories'],
    queryFn: () => CategoryService.listCategories(),
  });

  const allCategories = catRes?.data || [];
  
  // Organize categories into a tree (Parent -> Children)
  const categoryTree = useMemo(() => {
    const parents = allCategories.filter(c => !c.parent);
    return parents.map(parent => ({
      ...parent,
      subcategories: allCategories.filter(c => c.parent === parent.id)
    }));
  }, [allCategories]);

  // Set initial active parent when data loads
  useEffect(() => {
    if (categoryTree.length > 0 && activeParentId === null) {
      setActiveParentId(categoryTree[0].id);
    }
  }, [categoryTree, activeParentId]);

  const activeParent = useMemo(() => 
    categoryTree.find(p => p.id === activeParentId) || categoryTree[0], 
  [categoryTree, activeParentId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/products');
    }
  };

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-main text-white py-1.5 px-6 text-center text-[10px] font-bold uppercase tracking-[0.2em]">
        Free shipping on all orders over $50 • 24/7 Support
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center gap-4 md:gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <Store className="w-5 h-5" />
          </div>
          <span className="font-black text-xl tracking-tighter text-main hidden sm:block">
            MARKET<span className="text-primary">PRO</span>
          </span>
        </Link>
        
        {/* Categories Toggle - Nested Mega-Menu with Hover Logic */}
        <div className="relative hidden lg:block">
          <button 
            onClick={() => setIsDepsOpen(!isDepsOpen)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all cursor-pointer group ${isDepsOpen ? 'bg-primary text-white' : 'hover:bg-background-subtle text-main'}`}
          >
            <Menu className={`w-5 h-5 ${isDepsOpen ? 'text-white' : 'text-main'}`} />
            <span className="text-sm font-bold">Departments</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDepsOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDepsOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsDepsOpen(false)}></div>
              <div className="absolute left-0 mt-3 w-[700px] bg-white border border-border rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="grid grid-cols-12 h-[450px]">
                  {/* Left Column: Parents (4/12 width) */}
                  <div className="col-span-5 bg-background-subtle/50 border-r border-border/50 p-4 space-y-1 overflow-y-auto no-scrollbar">
                    <p className="px-4 text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-4">Main Categories</p>
                    {categoryTree.map((parent) => (
                      <button 
                        key={parent.id}
                        onMouseEnter={() => setActiveParentId(parent.id)}
                        onClick={() => {
                          router.push(`/category/${parent.slug}`);
                          setIsDepsOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all group/item cursor-pointer text-left ${
                          activeParentId === parent.id 
                            ? 'bg-white text-primary shadow-sm border border-border/50 translate-x-1' 
                            : 'text-muted hover:bg-white/50 hover:text-main'
                        }`}
                      >
                        <span className={`text-sm font-bold ${activeParentId === parent.id ? 'text-primary' : ''}`}>
                          {parent.name}
                        </span>
                        <ChevronRight className={`w-4 h-4 transition-all ${
                          activeParentId === parent.id ? 'text-primary opacity-100 translate-x-1' : 'text-muted/20 opacity-0 group-hover/item:opacity-40'
                        }`} />
                      </button>
                    ))}
                  </div>

                  {/* Right Column: Dynamic Subcategories (7/12 width) */}
                  <div className="col-span-7 p-8 overflow-y-auto no-scrollbar bg-white">
                    {activeParent ? (
                      <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                         <div className="flex items-center justify-between mb-8">
                            <h4 className="text-lg font-black text-main tracking-tight italic">
                               {activeParent.name}
                            </h4>
                            <Link 
                               href={`/category/${activeParent.slug}`}
                               onClick={() => setIsDepsOpen(false)}
                               className="text-[10px] font-bold text-primary uppercase hover:underline"
                            >
                               Shop All
                            </Link>
                         </div>

                         {activeParent.subcategories.length > 0 ? (
                           <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                              {activeParent.subcategories.map(sub => (
                                <Link 
                                  key={sub.id}
                                  href={`/category/${sub.slug}`}
                                  onClick={() => setIsDepsOpen(false)}
                                  className="group/sub flex flex-col space-y-1"
                                >
                                  <span className="text-sm font-bold text-muted group-hover/sub:text-primary transition-colors">
                                    {sub.name}
                                  </span>
                                  <span className="text-[9px] font-black text-muted/30 uppercase tracking-widest">
                                    {sub.product_count} Products
                                  </span>
                                </Link>
                              ))}
                           </div>
                         ) : (
                           <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-12">
                              <div className="w-12 h-12 bg-background-subtle rounded-full flex items-center justify-center mb-4">
                                 <Store className="w-6 h-6" />
                              </div>
                              <p className="text-xs font-bold uppercase tracking-widest text-muted">No subcategories yet</p>
                           </div>
                         )}
                         
                         <div className="mt-12 pt-8 border-t border-border/50">
                            <div className="p-4 bg-background-subtle/50 rounded-2xl border border-border/40">
                               <p className="text-[10px] font-black text-main uppercase tracking-widest mb-1">Weekly Featured</p>
                               <p className="text-xs text-muted font-medium mb-3">Discover the best items in {activeParent.name} category.</p>
                               <Link href="/products" onClick={() => setIsDepsOpen(false)} className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-1 group/btn">
                                  Learn More <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                         </div>
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-muted font-bold animate-pulse uppercase tracking-widest text-xs">
                        Select a category
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Search Bar */}
        <form 
          onSubmit={handleSearch}
          className="flex-grow max-w-2xl relative group hidden md:block"
        >
          <input 
            type="text" 
            placeholder="Search for anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-border/50 shadow-sm focus:border-primary focus:ring-4 focus:ring-primary/5 h-11 pl-5 pr-12 rounded-full text-sm font-medium transition-all outline-none"
          />
          <button 
            type="submit"
            className="absolute right-1 top-1 h-9 w-9 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-hover transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4 ml-auto">
          {/* Mobile Search Icon */}
          <button className="md:hidden p-2 text-main hover:bg-background-subtle rounded-full transition-colors">
            <Search className="w-6 h-6" />
          </button>

          {mounted && isAuthenticated && user ? (
            <div className="relative">
               <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1 md:p-1.5 hover:bg-background-subtle rounded-full transition-all cursor-pointer group"
               >
                 <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm overflow-hidden relative">
                    {user?.profile?.profile_image ? (
                      <Image 
                        src={user.profile.profile_image} 
                        alt="profile" 
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <span className="font-bold text-[10px] uppercase">
                        {user.username.substring(0, 2)}
                      </span>
                    )}
                 </div>
                 <div className="hidden lg:block text-left pr-1">
                    <div className="flex items-center gap-1">
                       <span className="text-xs font-bold text-main leading-none">{user.username}</span>
                       <ChevronDown className={`w-3 h-3 text-muted transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </div>
                 </div>
               </button>

               {/* Dropdown Menu */}
               {isProfileOpen && (
                 <>
                   <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
                   <div className="absolute right-0 mt-3 w-64 bg-white border border-border rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-20 py-3 animate-in fade-in zoom-in-95 duration-200">
                      <div className="px-6 py-3 border-b border-border/60 mb-2">
                         <p className="text-[10px] font-black text-muted uppercase tracking-widest">{user.role}</p>
                         <p className="text-sm font-bold text-main truncate">{user.email}</p>
                      </div>

                      <Link href="/profile" className="flex items-center gap-3 px-6 py-2.5 text-sm font-semibold text-muted hover:text-primary hover:bg-primary/5 transition-all">
                         <User className="w-4 h-4" />
                         <span>My Profile</span>
                      </Link>

                      {user.role === 'vendor' ? (
                        <Link href="/vendor" className="flex items-center gap-3 px-6 py-2.5 text-sm font-semibold text-secondary hover:bg-secondary/5 transition-all">
                           <LayoutDashboard className="w-4 h-4" />
                           <span>Vendor Dashboard</span>
                        </Link>
                      ) : (
                        <Link href="/profile" className="flex items-center gap-3 px-6 py-2.5 text-sm font-semibold text-muted hover:text-primary hover:bg-primary/5 transition-all">
                           <ShoppingBag className="w-4 h-4" />
                           <span>My Orders</span>
                        </Link>
                      )}

                      <Link href="/wishlist" className="flex items-center gap-3 px-6 py-2.5 text-sm font-semibold text-muted hover:text-primary hover:bg-primary/5 transition-all">
                         <Heart className="w-4 h-4" />
                         <span>Wishlist ({wishlistCount})</span>
                      </Link>

                      <div className="h-[1px] bg-border/60 my-2 mx-4"></div>

                      <button 
                        onClick={() => { logout(); setIsProfileOpen(false); }}
                        className="w-full cursor-pointer flex items-center gap-3 px-6 py-2.5 text-sm font-semibold text-error hover:bg-error/5 transition-all"
                      >
                         <LogOut className="w-4 h-4" />
                         <span>Sign Out</span>
                      </button>
                   </div>
                 </>
               )}
            </div>
          ) : (
            <Link href="/login" className="flex items-center gap-2 p-2 hover:bg-background-subtle rounded-full transition-colors group">
              <User className="w-6 h-6 text-main group-hover:text-primary transition-colors" />
              <div className="hidden lg:block text-left leading-none">
                <p className="text-[10px] font-bold text-muted uppercase tracking-tighter">Sign In</p>
                <p className="text-xs font-bold text-main mt-0.5">Account</p>
              </div>
            </Link>
          )}

          <Link href="/cart" className="relative p-2 hover:bg-background-subtle rounded-full transition-colors group">
             <ShoppingBag className="w-6 h-6 text-main group-hover:text-primary transition-colors" />
             {mounted && cartCount > 0 && (
               <span className="absolute top-1 right-1 bg-primary text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-white">
                 {cartCount}
               </span>
             )}
          </Link>
        </div>
      </div>

      {/* Main Navigation - Categories Bar */}
      <nav className="hidden md:flex border-t border-border/50 h-10 items-center justify-center gap-8 bg-white/50">
        {[
          { label: 'All Products', href: '/products' },
          { label: 'Featured Vendors', href: '/vendors' },
          { label: 'New Arrivals', href: '/products?ordering=-created_at' },
          { label: 'Special Offers', href: '/products?on_sale=true' },
          { label: 'Gift Ideas', href: '/categories' },
        ].map((link) => (
          <Link 
            key={link.label}
            href={link.href} 
            className="text-[11px] font-bold text-muted hover:text-primary uppercase tracking-widest transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};
