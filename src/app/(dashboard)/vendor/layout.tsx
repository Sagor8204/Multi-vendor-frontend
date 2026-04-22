import React from 'react';

export default function VendorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background-subtle">
      {/* Sidebar Placeholder */}
      <aside className="w-64 bg-card border-r border-card-border flex flex-col fixed h-screen top-0 left-0">
        <div className="p-6 border-b border-card-border font-bold text-xl text-secondary">
          Vendor Center
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md font-medium">Dashboard</div>
          <div className="text-text-muted hover:text-text-main px-4 py-2 rounded-md cursor-pointer transition-colors">Products</div>
          <div className="text-text-muted hover:text-text-main px-4 py-2 rounded-md cursor-pointer transition-colors">Orders</div>
          <div className="text-text-muted hover:text-text-main px-4 py-2 rounded-md cursor-pointer transition-colors">Earnings</div>
        </nav>
        <div className="p-4 border-t border-card-border mt-auto font-semibold text-text-muted">
          Vendor Sidebar
        </div>
      </aside>
      
      {/* Main Content Area */}
      <div className="flex-grow ml-64 min-h-screen flex flex-col">
        <header className="h-16 bg-card border-b border-card-border flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="text-text-muted font-medium">Vendor Dashboard Overview</div>
          <div className="flex items-center space-x-4">
             <div className="h-8 w-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground text-xs font-bold">V</div>
          </div>
        </header>
        <main className="p-8 flex-grow">
          {children}
        </main>
      </div>
    </div>
  );
}
