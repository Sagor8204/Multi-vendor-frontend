'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useIsMounted } from '@/hooks/useIsMounted';

export const Header = () => {
  const cartCount = useCartStore((state) => state.cartCount());
  const wishlistCount = useWishlistStore((state) => state.wishlistCount());
  const pathname = usePathname();
  const mounted = useIsMounted();

  const navLinks = [
    { label: 'Home', href: '/' },
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
             <span className="text-2xl group-hover:scale-110 transition-transform block">♥</span>
             {mounted && wishlistCount > 0 && (
               <span className="absolute -top-1 -right-2 bg-secondary text-white text-[10px] font-extrabold h-4 w-4 rounded-full flex items-center justify-center border border-white">
                 {wishlistCount}
               </span>
             )}
          </Link>

          <Link href="/cart" className="relative group">
             <span className="text-2xl group-hover:scale-110 transition-transform block">🛒</span>
             {mounted && cartCount > 0 && (
               <span className="absolute -top-1 -right-2 bg-primary text-white text-[10px] font-extrabold h-4 w-4 rounded-full flex items-center justify-center border border-white">
                 {cartCount}
               </span>
             )}
          </Link>

          <div className="h-6 w-[1px] bg-border hidden sm:block"></div>

          <div className="flex items-center space-x-3">
            <Link href="/login" className="hidden sm:block">
              <Button variant="outline" className="text-xs font-bold border-none hover:bg-transparent hover:text-primary">Log In</Button>
            </Link>
            <Link href="/register">
              <Button className="text-xs px-6 py-2.5 font-bold tracking-wide">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
