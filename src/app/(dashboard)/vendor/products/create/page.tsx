'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import { ProductService } from '@/services/product.service';
import { CategoryService } from '@/services/category.service';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function CreateProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
  });

  // Fetch Categories
  const { data: categoriesRes } = useQuery({
    queryKey: ['categories'],
    queryFn: () => CategoryService.listCategories(),
  });

  // Create Product Mutation
  const createMutation = useMutation({
    mutationFn: (data: any) => ProductService.createProduct(data),
    onSuccess: () => {
      toast.success('Product published!');
      router.push('/vendor/products');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to publish';
      toast.error(message);
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category) return toast.error('Select a category');

    createMutation.mutate({
      ...formData,
      category: parseInt(formData.category),
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold text-main tracking-tight">Add New Product</h1>
           <p className="text-sm text-muted mt-1 font-medium">Fill in the details to list your product on the marketplace.</p>
        </div>
        <Button variant="outline" className="text-xs font-bold uppercase tracking-widest px-6" onClick={() => router.back()}>Cancel</Button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-8 border-none shadow-sm/5 bg-background">
            <h3 className="text-sm font-bold text-main uppercase tracking-widest mb-6 border-b border-border pb-4">Product Details</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-muted uppercase tracking-widest ml-1">Product Name</label>
                <Input 
                  id="name"
                  placeholder="e.g. Handmade Ceramic Vase"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-background-subtle border-none font-bold text-main"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-muted uppercase tracking-widest ml-1">Description</label>
                <textarea 
                  id="description"
                  rows={8}
                  className="w-full bg-background-subtle border-none text-main rounded-xl px-4 py-3 focus:ring-2 focus:ring-secondary/10 outline-none transition-all placeholder:text-muted/40 text-sm font-medium"
                  placeholder="Tell customers about the materials, process, and features..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>
          </Card>

          <Card className="p-8 border-none shadow-sm/5 bg-background">
            <h3 className="text-sm font-bold text-main uppercase tracking-widest mb-6 border-b border-border pb-4">Inventory & Pricing</h3>
            
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-muted uppercase tracking-widest ml-1">Price ($)</label>
                  <Input 
                    id="price"
                    type="number" 
                    step="0.01" 
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleChange}
                    className="bg-background-subtle border-none font-bold text-main"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-muted uppercase tracking-widest ml-1">Available Stock</label>
                  <Input 
                    id="stock"
                    type="number" 
                    placeholder="0"
                    value={formData.stock}
                    onChange={handleChange}
                    className="bg-background-subtle border-none font-bold text-main"
                    required
                  />
                </div>
             </div>
          </Card>
        </div>

        <div className="space-y-8">
           <Card className="p-8 border-none shadow-sm/5 bg-background">
              <h3 className="text-sm font-bold text-main uppercase tracking-widest mb-6 border-b border-border pb-4">Category</h3>
              
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-muted uppercase tracking-widest ml-1">Store Category</label>
                <select 
                  id="category"
                  className="w-full bg-background-subtle border-none text-main rounded-xl px-4 py-3 focus:ring-2 focus:ring-secondary/10 outline-none transition-all text-xs font-bold uppercase tracking-widest cursor-pointer"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categoriesRes?.data?.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
           </Card>

           <Card className="p-8 border-none shadow-sm/5 bg-background text-center">
              <h3 className="text-sm font-bold text-main uppercase tracking-widest mb-6 border-b border-border pb-4 text-left">Media</h3>
              
              <div className="border-2 border-dashed border-secondary/20 rounded-2xl p-10 hover:bg-secondary/[0.02] transition-all cursor-pointer group">
                 <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📸</div>
                 <p className="text-[11px] font-bold text-muted group-hover:text-secondary uppercase tracking-widest">Add Product Photos</p>
              </div>
              <p className="text-[10px] text-muted italic mt-4 font-medium leading-relaxed">Images can be added after initial product details are saved.</p>
           </Card>

           <Button 
             type="submit" 
             variant="secondary"
             className="w-full py-5 text-sm font-bold uppercase tracking-widest shadow-lg shadow-secondary/10 transition-all active:scale-[0.98]"
             disabled={createMutation.isPending}
           >
              {createMutation.isPending ? 'Publishing...' : 'Publish to Store'}
           </Button>
        </div>
      </form>
    </div>
  );
}
