'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function VendorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuthStore();
  
  const menuItems = [
    { label: 'Overview', href: '/vendor', icon: '📊' },
    { label: 'My Products', href: '/vendor/products', icon: '📦' },
    { label: 'Add New Product', href: '/vendor/products/create', icon: '➕' },
    { label: 'Orders', href: '/vendor/orders', icon: '📜' },
    { label: 'Store Settings', href: '/vendor/settings', icon: '⚙️' },
  ];

  const userInitials = user ? `${user.first_name[0]}${user.last_name[0]}` : '??';

  return (
    <div className="flex min-h-screen bg-background-subtle">
      {/* Sidebar */}
      <aside className="w-64 bg-main text-on-dark flex flex-col fixed h-screen top-0 left-0 z-50">
        <div className="p-6 border-b border-white/5 flex items-center space-x-3">
          <div className="w-9 h-9 bg-secondary rounded-xl flex items-center justify-center font-bold text-secondary-foreground shadow-sm">V</div>
          <span className="font-bold text-xl tracking-tight">Vendor<span className="text-secondary">Hub</span></span>
        </div>
        
        <nav className="flex-grow p-4 mt-6 space-y-1.5">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.label} 
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                  isActive 
                    ? 'bg-secondary text-secondary-foreground shadow-md' 
                    : 'text-white/60 hover:text-on-dark hover:bg-white/5'
                }`}
              >
                <span className={`text-lg ${isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <Link href="/" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-xs font-semibold text-white/40 hover:text-on-dark hover:bg-white/5 transition-all">
             <span>🏠</span>
             <span>Back to Marketplace</span>
          </Link>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <div className="flex-grow ml-64 min-h-screen flex flex-col">
        <header className="h-16 bg-background border-b border-border flex items-center justify-between px-8 sticky top-0 z-40 shadow-sm/5">
          <div>
             <h2 className="text-sm font-bold text-main">Vendor Control Center</h2>
             <p className="text-[10px] text-muted font-bold uppercase tracking-widest">Store Management</p>
          </div>
          
          <div className="flex items-center space-x-6">
             <div className="relative cursor-pointer group p-2 hover:bg-background-subtle rounded-full transition-colors">
                <span className="text-lg">🔔</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full border-2 border-background"></span>
             </div>
             
             <div className="flex items-center space-x-3 cursor-pointer group">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-main group-hover:text-secondary transition-colors">{user?.first_name} {user?.last_name}</p>
                  <p className="text-[9px] text-muted font-bold uppercase tracking-tighter">Verified Merchant</p>
                </div>
                <div className="h-9 w-9 bg-secondary/10 border border-secondary/20 rounded-full flex items-center justify-center text-secondary text-xs font-bold group-hover:bg-secondary group-hover:text-secondary-foreground transition-all">
                  {userInitials}
                </div>
             </div>
          </div>
        </header>
        
        <main className="p-8 flex-grow max-w-[1400px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
