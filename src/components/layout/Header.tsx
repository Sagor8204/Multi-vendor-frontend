'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuth } from '@/hooks/useAuth';
import { useIsMounted } from '@/hooks/useIsMounted';
import { ShoppingBag, Heart, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import Image from 'next/image';

export const Header = () => {
  const cartCount = useCartStore((state) => state.cartCount());
  const wishlistCount = useWishlistStore((state) => state.wishlistCount());
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const mounted = useIsMounted();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Categories', href: '/categories' },
    { label: 'Products', href: '/products' },
    { label: 'Vendors', href: '/vendors' },
  ];

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link href="/" className="font-extrabold text-2xl text-primary tracking-tight">
          Market<span className="text-secondary">Place</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`text-sm font-bold transition-colors hover:text-primary ${pathname === link.href ? "text-primary" : "text-muted"}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-6">
          <Link href="/wishlist" className="relative group">
             <Heart className={`w-6 h-6 transition-transform group-hover:scale-110 ${mounted && wishlistCount > 0 ? 'fill-secondary text-secondary' : 'text-main'}`} />
             {mounted && wishlistCount > 0 && (
               <span className="absolute -top-1.5 -right-2 bg-secondary text-white text-[10px] font-extrabold h-4 w-4 rounded-full flex items-center justify-center border border-white">
                 {wishlistCount}
               </span>
             )}
          </Link>

          <Link href="/cart" className="relative group">
             <ShoppingBag className="w-6 h-6 text-main group-hover:scale-110 transition-transform" />
             {mounted && cartCount > 0 && (
               <span className="absolute -top-1.5 -right-2 bg-primary text-white text-[10px] font-extrabold h-4 w-4 rounded-full flex items-center justify-center border border-white">
                 {cartCount}
               </span>
             )}
          </Link>

          <div className="h-6 w-[1px] bg-border hidden sm:block"></div>

          {mounted && isAuthenticated && user ? (
            <div className="relative">
               <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 group focus:outline-none cursor-pointer"
               >
                 <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm overflow-hidden relative">
                    {/* If user has profile image, show it, otherwise show initial */}
                    {user?.profile?.profile_image ? (
                      <Image 
                        src={user.profile.profile_image} 
                        alt="profile" 
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <span className="font-black text-xs uppercase tracking-tighter">
                        {user.username.substring(0, 2)}
                      </span>
                    )}
                 </div>
                 <div className="hidden lg:block text-left">
                    <p className="text-[10px] font-black text-muted uppercase tracking-widest leading-none mb-1">Welcome</p>
                    <div className="flex items-center">
                       <span className="text-sm font-bold text-main leading-none">{user.username}</span>
                       <ChevronDown className={`ml-1 w-3 h-3 text-muted transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </div>
                 </div>
               </button>

               {/* Dropdown Menu */}
               {isProfileOpen && (
                 <>
                   <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
                   <div className="absolute right-0 mt-3 w-64 bg-white border border-border rounded-2xl shadow-2xl z-20 py-3 animate-in fade-in zoom-in-95 duration-200">
                      <div className="px-6 py-3 border-b border-border/60 mb-2">
                         <p className="text-xs font-black text-muted uppercase tracking-widest">{user.role}</p>
                         <p className="text-sm font-bold text-main truncate">{user.email}</p>
                      </div>

                      <Link href="/profile" className="flex items-center space-x-3 px-6 py-2.5 text-sm font-bold text-muted hover:text-primary hover:bg-primary/5 transition-all">
                         <User className="w-4 h-4" />
                         <span>Account Settings</span>
                      </Link>

                      {user.role === 'vendor' ? (
                        <Link href="/vendor" className="flex items-center space-x-3 px-6 py-2.5 text-sm font-bold text-muted hover:text-secondary hover:bg-secondary/5 transition-all text-secondary">
                           <LayoutDashboard className="w-4 h-4" />
                           <span>Vendor Dashboard</span>
                        </Link>
                      ) : (
                        <Link href="/profile" className="flex items-center space-x-3 px-6 py-2.5 text-sm font-bold text-muted hover:text-primary hover:bg-primary/5 transition-all">
                           <ShoppingBag className="w-4 h-4" />
                           <span>My Orders</span>
                        </Link>
                      )}

                      <div className="h-[1px] bg-border/60 my-2 mx-4"></div>

                      <button 
                        onClick={() => { logout(); setIsProfileOpen(false); }}
                        className="w-full cursor-pointer flex items-center space-x-3 px-6 py-2.5 text-sm font-bold text-error hover:bg-error/5 transition-all"
                      >
                         <LogOut className="w-4 h-4" />
                         <span>Sign Out</span>
                      </button>
                   </div>
                 </>
               )}
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link href="/login" className="hidden sm:block">
                <Button variant="outline" className="text-xs font-bold border-none hover:bg-transparent hover:text-primary">Log In</Button>
              </Link>
              <Link href="/register">
                <Button className="text-xs px-6 py-2.5 font-bold tracking-wide">Get Started</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
