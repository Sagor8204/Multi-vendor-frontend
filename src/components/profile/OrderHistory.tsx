'use client';

import React from 'react';
import { Package } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const OrderHistory = () => {
    return (
        <div className="py-20 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-300">
             <div className="bg-primary/10 p-10 rounded-full mb-6 text-primary">
                <Package className="w-12 h-12" />
             </div>
             <h2 className="text-2xl font-black text-main">No Orders Found</h2>
             <p className="text-muted font-bold mt-2 max-w-sm px-6">You haven't placed any orders yet. Start exploring our marketplace to find something amazing!</p>
             <Button className="mt-8 rounded-2xl px-10 py-6 h-auto font-black shadow-lg shadow-primary/20" onClick={() => window.location.href = '/products'}>
                Shop Now
             </Button>
        </div>
    );
};
