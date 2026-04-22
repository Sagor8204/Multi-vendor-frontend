import React from 'react';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-border py-4 px-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="font-bold text-xl text-primary">Marketplace</div>
          <nav className="space-x-4">
            <span className="text-text-muted hover:text-text-main cursor-pointer transition-colors">Public Navbar</span>
          </nav>
        </div>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-background-subtle border-t border-border py-8 px-6">
        <div className="max-w-7xl mx-auto text-center text-text-muted">
          &copy; 2024 Multi-Vendor Marketplace
        </div>
      </footer>
    </div>
  );
}
