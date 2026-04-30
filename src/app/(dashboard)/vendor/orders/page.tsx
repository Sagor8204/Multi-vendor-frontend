'use client';

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { OrderService } from '@/services/order.service';
import { Card } from '@/components/ui/Card';
import { toast } from 'react-hot-toast';

export default function VendorOrdersPage() {
  const queryClient = useQueryClient();

  const { data: ordersRes, isLoading } = useQuery({
    queryKey: ['vendor-orders'],
    queryFn: () => OrderService.getVendorOrders(),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ itemId, status }: { itemId: number; status: string }) => 
      OrderService.updateOrderItemStatus(itemId, status as any),
    onSuccess: () => {
      toast.success('Status updated');
      queryClient.invalidateQueries({ queryKey: ['vendor-orders'] });
    },
    onError: () => {
      toast.error('Update failed');
    }
  });

  const orders = ordersRes?.data || [];

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-2xl font-bold text-main tracking-tight">Order Fulfillment</h1>
        <p className="text-sm text-muted mt-1 font-medium">Manage and ship your incoming customer orders.</p>
      </div>

      <div className="space-y-6">
        {isLoading ? (
          <div className="p-20 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-secondary mx-auto"></div>
            <p className="mt-4 text-xs font-bold text-muted uppercase tracking-widest">Loading Orders...</p>
          </div>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <Card key={order.id} className="overflow-hidden border-none shadow-sm/5 bg-background">
              <div className="bg-background-subtle px-6 py-4 border-b border-border flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Order ID</p>
                    <p className="text-sm font-bold text-main">#{order.id}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Placed On</p>
                    <p className="text-xs font-medium text-main">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Order Total</p>
                    <p className="text-sm font-bold text-main">${order.total_amount}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${
                    order.status === 'delivered' ? 'bg-success/5 text-success border-success/20' : 
                    order.status === 'pending' ? 'bg-warning/5 text-warning border-warning/20' : 
                    'bg-info/5 text-info border-info/20'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div className="p-0">
                <table className="w-full text-left">
                  <tbody className="divide-y divide-border">
                    {order.items.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/30 transition-colors">
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-background-subtle rounded-xl overflow-hidden flex-shrink-0 border border-border">
                               {item.product.images[0]?.image ? (
                                 <img src={item.product.images[0].image} alt={item.product.name} className="w-full h-full object-cover" />
                               ) : (
                                 <div className="w-full h-full flex items-center justify-center text-xl">📦</div>
                               )}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-main">{item.product.name}</p>
                              <p className="text-[10px] text-muted font-bold mt-1 uppercase tracking-tight">Quantity: {item.quantity} × ${item.price}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-6 text-right">
                          <div className="inline-flex flex-col items-start gap-1.5">
                            <label className="text-[9px] font-bold text-muted uppercase tracking-widest">Item Status</label>
                            <select 
                              value={item.status}
                              onChange={(e) => updateStatusMutation.mutate({ itemId: item.id, status: e.target.value })}
                              disabled={updateStatusMutation.isPending}
                              className="text-[11px] font-bold bg-white border border-border rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-secondary/10 outline-none cursor-pointer transition-all text-main"
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-20 text-center border-none shadow-sm/5 bg-background">
            <div className="text-5xl mb-6">📜</div>
            <h3 className="text-lg font-bold text-main mb-1">No orders found</h3>
            <p className="text-sm text-muted max-w-xs mx-auto font-medium">When customers purchase your products, they will appear here for fulfillment.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
