'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ProductImageGallery } from '@/components/products/ProductImageGallery';
import { ProductInfo } from '@/components/products/ProductInfo';
import { ProductTabs } from '@/components/products/ProductTabs';

// Dummy data for the professional UI - this would normally come from an API
const PRODUCT_DATA = {
  id: '1',
  name: 'Premium Wireless Noise-Cancelling Headphones',
  price: 299.00,
  originalPrice: 399.00,
  description: 'Experience unparalleled sound quality with our flagship wireless headphones. Featuring industry-leading noise cancellation, 40-hour battery life, and ultra-comfortable protein leather ear pads, these headphones are designed for the modern audiophile.',
  features: [
    'Active Noise Cancellation (ANC)',
    '40-hour Battery Life with Fast Charge',
    'Bluetooth 5.2 with Multi-device Pairing',
    'Built-in Studio Quality Microphone',
    'Hard-shell Travel Case Included'
  ],
  specs: {
    'Driver Size': '40mm Dynamic',
    'Frequency Response': '20Hz - 20kHz',
    'Weight': '250g',
    'Charging Port': 'USB-C',
  },
  category: 'Electronics',
  vendor: {
    id: 'vn-101',
    name: 'TechNova Solutions',
    rating: 4.9,
    totalSales: '12k+',
    logo: 'TN'
  },
  images: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?q=80&w=800&auto=format&fit=crop'
  ],
  stock: 45,
  reviewsCount: 128,
  reviews: [
    { id: 1, user: 'Alex D.', rating: 5, date: 'October 12, 2025', comment: 'Best headphones I have ever owned. The noise cancellation is unreal.' },
    { id: 2, user: 'Sarah M.', rating: 4, date: 'September 28, 2025', comment: 'Great sound and very comfortable. Only giving 4 stars because the case is a bit bulky.' }
  ]
};

export default function ProductDetailsPage() {
  const { slug } = useParams();

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-muted">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
        <span>/</span>
        <span className="text-main">{PRODUCT_DATA.category}</span>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7">
            <ProductImageGallery images={PRODUCT_DATA.images} name={PRODUCT_DATA.name} />
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="lg:col-span-5">
            <ProductInfo product={PRODUCT_DATA} slug={slug as string} />
          </div>
        </div>

        {/* Bottom Section: Tabs */}
        <ProductTabs product={PRODUCT_DATA} />
      </main>
    </div>
  );
}
