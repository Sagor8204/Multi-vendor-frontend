import React from 'react';

export default function StoreHome() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <div className="bg-white p-12 rounded-lg border border-border shadow-sm text-center">
        <h1 className="text-4xl font-extrabold text-text-main mb-4 tracking-tight">Public Marketplace Home</h1>
        <p className="text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
          Welcome to our multi-vendor marketplace. Browse products from thousands of vendors worldwide.
        </p>
        <div className="mt-10 flex gap-4 justify-center">
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-semibold hover:bg-primary-hover transition-colors shadow-sm">
            Shop Now
          </button>
          <button className="bg-secondary text-secondary-foreground px-8 py-3 rounded-md font-semibold hover:bg-secondary-hover transition-colors shadow-sm">
            Become a Vendor
          </button>
        </div>
      </div>
    </div>
  );
}
