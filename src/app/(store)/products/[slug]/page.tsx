'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { ProductImageGallery } from '@/components/products/ProductImageGallery';
import { ProductInfo } from '@/components/products/ProductInfo';
import { ProductTabs } from '@/components/products/ProductTabs';
import { ProductService } from '@/services/product.service';

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const router = useRouter();

  const { data: productRes, isLoading: productLoading } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => ProductService.getProductDetail(slug as string),
    enabled: !!slug,
  });

  const product = productRes?.data;

  const { data: reviewsRes, isLoading: reviewsLoading } = useQuery({
    queryKey: ['product-reviews', product?.id],
    queryFn: () => ProductService.getProductReviews(product!.id),
    enabled: !!product?.id,
  });

  if (productLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 aspect-[4/3] bg-background-subtle rounded-3xl" />
          <div className="lg:col-span-5 space-y-8">
            <div className="h-12 bg-background-subtle rounded-xl w-3/4" />
            <div className="h-8 bg-background-subtle rounded-xl w-1/4" />
            <div className="h-32 bg-background-subtle rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const reviews = reviewsRes?.data || [];

  // Adapt API data for existing UI components
  const adaptedProduct = {
    ...product,
    originalPrice: product.price * 1.2, // Simulated original price for UI
    features: [
      'Genuine Product from Verified Vendor',
      'High Quality Material',
      'Secure Packaging',
      'Standard Manufacturer Warranty'
    ],
    specs: {
      'Category': product.category.name,
      'Stock Status': product.stock > 0 ? 'In Stock' : 'Out of Stock',
      'Quantity Available': product.stock,
      'Vendor': product.vendor.store_name,
    },
    vendor: {
      id: product.vendor.id,
      name: product.vendor.store_name,
      rating: product.vendor.average_rating || 4.5,
      totalSales: '100+',
      logo: product.vendor.store_name.charAt(0).toUpperCase()
    },
    images: product.images.map(img => img.image),
    averageRating: product.average_rating || 0,
    totalReviews: product.total_review || 0,
    reviews: reviews.map(r => ({
      id: r.id,
      user: r.user.username,
      rating: r.rating,
      date: new Date(r.created_at).toLocaleDateString(),
      comment: r.comment
    }))
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-muted">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
        <span>/</span>
        <span className="text-main">{product.category.name}</span>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7">
            <ProductImageGallery images={adaptedProduct.images} name={product.name} />
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="lg:col-span-5">
            <ProductInfo product={adaptedProduct} slug={slug as string} />
          </div>
        </div>

        {/* Bottom Section: Tabs */}
        <ProductTabs product={adaptedProduct} />
      </main>
    </div>
  );
}


