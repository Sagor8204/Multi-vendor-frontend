'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function CreateProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating product:', formData);
    toast.success('Product Draft Saved! API integration coming soon.', {
      icon: '💾',
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-3xl font-extrabold text-main">Add New Product</h1>
           <p className="text-muted mt-1">Ready to list something new? Fill in the details below.</p>
        </div>
        <Button variant="outline">Cancel</Button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card title="Product Information" description="Basic details of your item.">
            <div className="space-y-6">
              <Input 
                id="name"
                label="Product Name" 
                placeholder="e.g. Wireless Noise Cancelling Headphones"
                value={formData.name}
                onChange={handleChange}
              />
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-main">Description</label>
                <textarea 
                  id="description"
                  rows={6}
                  className="w-full bg-input border border-border text-main rounded-md px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-muted/50"
                  placeholder="Describe your product in detail..."
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </Card>

          <Card title="Pricing & Inventory" description="Set your price and stock levels.">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input 
                  id="price"
                  label="Price ($)" 
                  type="number" 
                  step="0.01" 
                  placeholder="0.00"
                  value={formData.price}
                  onChange={handleChange}
                />
                <Input 
                  id="stock"
                  label="Available Stock" 
                  type="number" 
                  placeholder="0"
                  value={formData.stock}
                  onChange={handleChange}
                />
             </div>
          </Card>
        </div>

        <div className="space-y-8">
           <Card title="Category" description="Organize your product.">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-main">Product Category</label>
                <select 
                  id="category"
                  className="w-full bg-input border border-border text-main rounded-md px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select a category</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="home">Home & Living</option>
                  <option value="furniture">Furniture</option>
                </select>
              </div>
           </Card>

           <Card title="Images" description="Upload product photos.">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer group">
                 <div className="text-4xl mb-2 opacity-50 group-hover:opacity-100 transition-opacity">📸</div>
                 <p className="text-xs font-bold text-muted group-hover:text-primary transition-colors">Click to Upload Images</p>
                 <p className="text-[10px] text-muted/50 mt-1 uppercase tracking-tighter font-bold">Max 5MB per image</p>
              </div>
           </Card>

           <div className="space-y-3 pt-4">
             <Button type="submit" className="w-full py-4 text-base font-bold shadow-xl shadow-primary/20">
                Publish Product
             </Button>
             <Button variant="outline" className="w-full py-4 text-base font-bold bg-white">
                Save as Draft
             </Button>
           </div>
        </div>
      </form>
    </div>
  );
}
