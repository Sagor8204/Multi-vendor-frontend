import React from 'react';
import Link from 'next/link';

export default function VendorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = [
    { label: 'Overview', href: '/vendor', icon: '📊' },
    { label: 'My Products', href: '/vendor/products', icon: '📦' },
    { label: 'Add New Product', href: '/vendor/products/create', icon: '➕' },
    { label: 'Orders', href: '/vendor/orders', icon: '📜' },
    { label: 'Store Settings', href: '/vendor/settings', icon: '⚙️' },
  ];

  return (
    <div className="flex min-h-screen bg-[#f1f5f9]">
      {/* Sidebar */}
      <aside className="w-64 bg-text-main text-white flex flex-col fixed h-screen top-0 left-0 z-50">
        <div className="p-8 border-b border-white/10 flex items-center space-x-3">
          <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center font-bold">V</div>
          <span className="font-extrabold text-lg tracking-tight">Vendor<span className="text-secondary">Hub</span></span>
        </div>
        
        <nav className="flex-grow p-4 mt-4 space-y-1">
          {menuItems.map((item) => (
            <Link 
              key={item.label} 
              href={item.href}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all group"
            >
              <span className="text-lg opacity-70 group-hover:opacity-100">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link href="/" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all">
             <span>🏠</span>
             <span>Back to Store</span>
          </Link>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <div className="flex-grow ml-64 min-h-screen flex flex-col">
        <header className="h-20 bg-white border-b border-border flex items-center justify-between px-10 sticky top-0 z-40">
          <div>
             <h2 className="text-lg font-bold text-main">Vendor Control Center</h2>
             <p className="text-[10px] text-muted font-bold uppercase tracking-widest mt-0.5">Automated Sales & Inventory</p>
          </div>
          
          <div className="flex items-center space-x-6">
             <div className="relative cursor-pointer">
                <span className="text-xl">🔔</span>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">3</span>
             </div>
             <div className="h-10 w-10 bg-secondary/10 border border-secondary/20 rounded-full flex items-center justify-center text-secondary font-bold cursor-pointer hover:bg-secondary/20 transition-colors">
                JD
             </div>
          </div>
        </header>
        
        <main className="p-10 flex-grow max-w-[1600px] mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
