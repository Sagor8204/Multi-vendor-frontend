'use client';

import React from 'react';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProductService } from '@/services/product.service';
import { VendorService } from '@/services/vendor.service';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { toast } from 'react-hot-toast';

export default function VendorProductsPage() {
  const queryClient = useQueryClient();

  const { data: vendorRes } = useQuery({
    queryKey: ['my-vendor-profile'],
    queryFn: () => VendorService.getMyStore(),
  });

  const { data: productsRes, isLoading } = useQuery({
    queryKey: ['vendor-products', vendorRes?.data?.id],
    queryFn: () => ProductService.listProducts({ vendor: vendorRes?.data?.id }),
    enabled: !!vendorRes?.data?.id,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => ProductService.deleteProduct(id),
    onSuccess: () => {
      toast.success('Product deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['vendor-products'] });
    },
    onError: () => {
      toast.error('Failed to delete product');
    }
  });

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteMutation.mutate(id);
    }
  };

  const products = productsRes?.data || [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold text-main tracking-tight">My Products</h1>
           <p className="text-sm text-muted mt-1 font-medium">Manage your shop's inventory and product visibility.</p>
        </div>
        <Link href="/vendor/products/create">
          <Button variant="secondary" className="px-8 py-2.5 text-sm font-bold shadow-sm">+ Add Product</Button>
        </Link>
      </div>

      <Card className="overflow-hidden border-none shadow-sm/5 bg-background">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-20 text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-secondary mx-auto"></div>
              <p className="mt-4 text-xs font-bold text-muted uppercase tracking-widest">Loading Catalog...</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-background-subtle border-b border-border">
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted">Product</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted">Category</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted">Price</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted">Stock</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.length > 0 ? products.map((product) => {
                  const mainImage = product.images.find(img => img.is_main)?.image || product.images[0]?.image;
                  
                  return (
                    <tr key={product.id} className="hover:bg-background-subtle/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-background-subtle rounded-xl overflow-hidden flex-shrink-0 border border-border">
                              {mainImage ? (
                                <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-xl">📦</div>
                              )}
                           </div>
                           <span className="font-bold text-sm text-main group-hover:text-secondary transition-colors">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-bold text-muted uppercase tracking-wider">{product.category.name}</span>
                      </td>
                      <td className="px-6 py-4 font-bold text-sm text-main">
                        ${product.price}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                           <span className={`w-1.5 h-1.5 rounded-full ${product.stock > 10 ? 'bg-success' : product.stock > 0 ? 'bg-warning' : 'bg-error'}`}></span>
                           <span className="text-xs font-bold text-main">{product.stock} units</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <div className="flex justify-end gap-4">
                            <Link href={`/vendor/products/edit/${product.id}`} className="text-[11px] font-bold text-muted hover:text-secondary uppercase tracking-widest transition-colors">Edit</Link>
                            <button 
                              onClick={() => handleDelete(product.id)}
                              disabled={deleteMutation.isPending}
                              className="text-[11px] font-bold text-muted hover:text-error uppercase tracking-widest transition-colors disabled:opacity-50"
                            >
                              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                            </button>
                         </div>
                      </td>
                    </tr>
                  );
                }) : (
                  <tr>
                    <td colSpan={5} className="p-20 text-center">
                      <div className="text-4xl mb-4">📦</div>
                      <p className="text-sm font-medium text-muted">No products found. Start by adding one!</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}
