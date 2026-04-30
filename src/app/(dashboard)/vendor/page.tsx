'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { VendorService } from '@/services/vendor.service';
import { ProductService } from '@/services/product.service';
import { OrderService } from '@/services/order.service';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function VendorOverview() {
  // Fetch Vendor Profile
  const { data: vendorRes } = useQuery({
    queryKey: ['my-vendor-profile'],
    queryFn: () => VendorService.getMyStore(),
  });

  // Fetch Vendor Products
  const { data: productsRes } = useQuery({
    queryKey: ['vendor-products'],
    queryFn: () => ProductService.listProducts({ vendor: vendorRes?.data?.id }),
    enabled: !!vendorRes?.data?.id,
  });

  // Fetch Vendor Orders
  const { data: ordersRes } = useQuery({
    queryKey: ['vendor-orders'],
    queryFn: () => OrderService.getVendorOrders(),
  });

  const vendor = vendorRes?.data;
  const productsCount = vendor?.product_count || productsRes?.data?.length || 0;
  const rating = vendor?.vendor_rating || 0;
  const recentOrders = ordersRes?.data?.slice(0, 5) || [];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-main">Welcome back, {vendor?.store_name || 'Vendor'}</h1>
          <p className="text-sm text-muted mt-1">Review your store's performance and manage your latest orders.</p>
        </div>
        <Link href="/vendor/products/create">
          <Button variant="secondary" className="px-6 py-2.5 shadow-sm text-sm font-bold">
            Add New Product
          </Button>
        </Link>
      </div>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 border-none shadow-sm/5 bg-background">
          <p className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Total Sales</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-main">$0.00</h3>
            <span className="text-[10px] font-bold text-success">+0%</span>
          </div>
        </Card>
        
        <Card className="p-6 border-none shadow-sm/5 bg-background">
          <p className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Active Products</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-main">{productsCount}</h3>
            <span className="text-[10px] font-bold text-info">Live</span>
          </div>
        </Card>

        <Card className="p-6 border-none shadow-sm/5 bg-background">
          <p className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Store Rating</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-main">{rating} / 5.0</h3>
            <span className="text-[10px] font-bold text-warning">{vendor?.total_reviews || 0} reviews</span>
          </div>
        </Card>

        <Card className="p-6 border-none shadow-sm/5 bg-background">
          <p className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Pending Orders</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-main">{ordersRes?.data?.filter(o => o.status === 'pending').length || 0}</h3>
            <span className="text-[10px] font-bold text-error">Requires Action</span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <Card className="border-none shadow-sm/5 bg-background overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-white">
              <h3 className="font-bold text-main">Recent Orders</h3>
              <Link href="/vendor/orders" className="text-xs font-bold text-secondary hover:underline">View All</Link>
            </div>
            <div className="overflow-x-auto">
              {recentOrders.length > 0 ? (
                <table className="w-full">
                  <thead className="bg-background-subtle border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left text-[10px] font-bold text-muted uppercase tracking-widest">Order</th>
                      <th className="px-6 py-3 text-left text-[10px] font-bold text-muted uppercase tracking-widest">Date</th>
                      <th className="px-6 py-3 text-left text-[10px] font-bold text-muted uppercase tracking-widest">Total</th>
                      <th className="px-6 py-3 text-left text-[10px] font-bold text-muted uppercase tracking-widest">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-background-subtle/30 transition-colors">
                        <td className="px-6 py-4 text-sm font-bold text-main">#{order.id}</td>
                        <td className="px-6 py-4 text-xs text-muted font-medium">{new Date(order.created_at).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-sm font-bold text-main">${order.total_amount}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 text-[9px] font-bold rounded-full uppercase tracking-tighter ${
                            order.status === 'delivered' ? 'bg-success/10 text-success border border-success/20' : 
                            order.status === 'pending' ? 'bg-warning/10 text-warning border border-warning/20' : 
                            'bg-info/10 text-info border border-info/20'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-12 text-center">
                   <p className="text-sm font-medium text-muted">No recent orders found.</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Quick Actions & Tips */}
        <div className="space-y-6">
          <Card className="p-6 border-none shadow-sm/5 bg-background">
            <h3 className="font-bold text-main mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="/vendor/products/create" className="flex items-center justify-between p-3 rounded-xl bg-background-subtle hover:bg-secondary/5 border border-transparent hover:border-secondary/20 transition-all group">
                <div className="flex items-center gap-3">
                   <span className="text-lg">📦</span>
                   <span className="text-sm font-bold text-main group-hover:text-secondary">New Product</span>
                </div>
                <span className="text-xs text-muted">→</span>
              </Link>
              <Link href="/vendor/settings" className="flex items-center justify-between p-3 rounded-xl bg-background-subtle hover:bg-secondary/5 border border-transparent hover:border-secondary/20 transition-all group">
                <div className="flex items-center gap-3">
                   <span className="text-lg">⚙️</span>
                   <span className="text-sm font-bold text-main group-hover:text-secondary">Shop Settings</span>
                </div>
                <span className="text-xs text-muted">→</span>
              </Link>
            </div>
          </Card>

          <Card className="p-6 border-none bg-secondary/10 relative overflow-hidden">
             <div className="relative z-10">
               <h3 className="font-bold text-secondary text-lg mb-2">Pro Tip</h3>
               <p className="text-xs text-secondary/80 font-medium leading-relaxed">
                 Add high-quality photos to your products to increase visibility by up to 30%.
               </p>
             </div>
             <div className="absolute -right-4 -bottom-4 text-6xl opacity-10">💡</div>
          </Card>
        </div>
      </div>
    </div>
  );
}
