'use client';

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { VendorService } from '@/services/vendor.service';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'react-hot-toast';

export default function VendorSettingsPage() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    store_name: '',
    store_description: '',
  });

  const { data: vendorRes, isLoading } = useQuery({
    queryKey: ['my-vendor-profile'],
    queryFn: () => VendorService.getMyStore(),
  });

  useEffect(() => {
    if (vendorRes?.data) {
      setFormData({
        store_name: vendorRes.data.store_name,
        store_description: vendorRes.data.store_description,
      });
    }
  }, [vendorRes]);

  const updateMutation = useMutation({
    mutationFn: (data: typeof formData) => VendorService.updateMyStore(data),
    onSuccess: () => {
      toast.success('Store profile updated');
      queryClient.invalidateQueries({ queryKey: ['my-vendor-profile'] });
    },
    onError: () => {
      toast.error('Failed to update profile');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  if (isLoading) return <div className="p-20 text-center animate-pulse text-xs font-bold text-muted uppercase tracking-widest">Loading Settings...</div>;

  return (
    <div className="max-w-4xl space-y-10 pb-16">
      <div>
        <h1 className="text-2xl font-bold text-main tracking-tight">Store Settings</h1>
        <p className="text-sm text-muted mt-1 font-medium">Manage your shop's public identity and preferences.</p>
      </div>

      <Card className="p-8 border-none shadow-sm/5 bg-background">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="flex flex-col sm:flex-row items-center gap-8 pb-8 border-b border-border">
             <div className="w-24 h-24 bg-background-subtle rounded-3xl flex items-center justify-center text-secondary text-4xl border-2 border-dashed border-secondary/20 overflow-hidden shadow-inner">
               {vendorRes?.data?.store_logo ? (
                 <img src={vendorRes.data.store_logo} alt="Logo" className="w-full h-full object-cover" />
               ) : '🏬'}
             </div>
             <div className="text-center sm:text-left">
               <h3 className="text-sm font-bold text-main uppercase tracking-tight">Store Branding</h3>
               <p className="text-[11px] text-muted mt-1 font-medium uppercase tracking-tighter">Recommended: Square PNG/JPG, max 2MB.</p>
               <Button type="button" variant="outline" className="mt-4 text-[10px] font-bold uppercase tracking-widest py-2 px-4 border-secondary/30 text-secondary hover:bg-secondary/5 transition-all">Change Logo</Button>
             </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-muted uppercase tracking-widest ml-1">Shop Name</label>
              <Input 
                value={formData.store_name}
                onChange={(e) => setFormData({...formData, store_name: e.target.value})}
                placeholder="Enter your store name"
                className="bg-background-subtle border-none font-bold text-main focus:ring-secondary/20"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-muted uppercase tracking-widest ml-1">Shop Description</label>
              <textarea 
                value={formData.store_description}
                onChange={(e) => setFormData({...formData, store_description: e.target.value})}
                rows={6}
                className="w-full px-4 py-3 bg-background-subtle border-none rounded-xl focus:ring-2 focus:ring-secondary/10 outline-none transition-all text-sm font-medium text-main placeholder:text-muted/40"
                placeholder="Tell customers what makes your store special..."
                required
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
             <Button 
               type="submit" 
               variant="secondary" 
               className="px-12 py-3 shadow-md shadow-secondary/10 text-sm font-bold"
               disabled={updateMutation.isPending}
             >
               {updateMutation.isPending ? 'Saving...' : 'Save Profile'}
             </Button>
          </div>
        </form>
      </Card>

      <Card className="p-8 border border-error/10 bg-error/[0.02]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-error font-bold text-sm uppercase tracking-widest mb-1">Danger Zone</h3>
            <p className="text-[11px] text-muted font-bold leading-relaxed uppercase tracking-tighter max-w-md">Deactivating your store will hide all products and stop new orders. This action can be undone later.</p>
          </div>
          <Button variant="outline" className="border-error/30 text-error hover:bg-error hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest px-6 py-2">Deactivate Store</Button>
        </div>
      </Card>
    </div>
  );
}
