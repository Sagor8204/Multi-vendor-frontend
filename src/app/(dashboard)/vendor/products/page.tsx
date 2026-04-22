'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

// Dummy data for initial UI - will be replaced by API fetch later
const MY_PRODUCTS = [
  { id: 101, name: 'Eco-Friendly Yoga Mat', price: 49.99, stock: 125, sales: 42, status: 'active', category: 'Fitness', image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=200&auto=format&fit=crop' },
  { id: 102, name: 'Bamboo Water Bottle', price: 24.50, stock: 0, sales: 89, status: 'out_of_stock', category: 'Accessories', image: 'https://images.unsplash.com/photo-1602143399827-bd95968c471c?q=80&w=200&auto=format&fit=crop' },
  { id: 103, name: 'Recycled Paper Journal', price: 18.00, stock: 350, sales: 12, status: 'active', category: 'Stationery', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=200&auto=format&fit=crop' },
];

export default function VendorProductsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-3xl font-extrabold text-text-main tracking-tight">My Products</h1>
           <p className="text-text-muted mt-1 font-medium">Manage your inventory and track product performance.</p>
        </div>
        <Link href="/vendor/products/create">
          <Button className="px-8 py-3 text-sm font-bold shadow-lg shadow-primary/20">+ Add Product</Button>
        </Link>
      </div>

      <Card className="overflow-hidden border-none shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-background-subtle border-b border-border">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">Product</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">Category</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">Price</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">Stock</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">Sales</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MY_PRODUCTS.map((product) => (
                <tr key={product.id} className="hover:bg-background-subtle/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-border/20 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={product.image} className="w-full h-full object-cover" />
                       </div>
                       <span className="font-bold text-text-main group-hover:text-primary transition-colors">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-text-muted uppercase tracking-wider">{product.category}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-text-main">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <span className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-success' : product.stock > 0 ? 'bg-warning' : 'bg-error'}`}></span>
                       <span className="text-sm font-bold text-text-main">{product.stock}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-text-main">{product.sales}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-widest ${
                      product.status === 'active' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                    }`}>
                      {product.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                     <div className="flex justify-end gap-3">
                        <button className="text-xs font-bold text-text-muted hover:text-primary transition-colors">Edit</button>
                        <button className="text-xs font-bold text-text-muted hover:text-error transition-colors">Delete</button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Pagination Placeholder */}
      <div className="flex justify-center mt-8 gap-2">
         {[1, 2, 3].map(page => (
           <div key={page} className={`w-10 h-10 rounded-lg border border-border flex items-center justify-center text-xs font-bold cursor-pointer transition-all ${page === 1 ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white hover:bg-background-subtle'}`}>
             {page}
           </div>
         ))}
      </div>
    </div>
  );
}
