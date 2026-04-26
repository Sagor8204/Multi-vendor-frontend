'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { HomeHero } from '@/components/home/HomeHero';
import { HomeCategories } from '@/components/home/HomeCategories';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { VendorCTA } from '@/components/home/VendorCTA';
import { FeaturedVendors } from '@/components/home/FeaturedVendors';
import { TrustFeatures } from '@/components/home/TrustFeatures';
import { ProductService } from '@/services/product.service';

export default function StoreHome() {
  // Fetch Trending Products
  const { data: trendingRes, isLoading: trendingLoading } = useQuery({
    queryKey: ['trending-products'],
    queryFn: () => ProductService.listProducts({ trending: true }),
  });

  // Fetch On Sale Products
  const { data: saleRes, isLoading: saleLoading } = useQuery({
    queryKey: ['sale-products'],
    queryFn: () => ProductService.listProducts({ on_sale: true }),
  });

  const trendingProducts = trendingRes?.data?.slice(0, 4).map(p => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: p.price,
    category: p.category.name,
    vendor: p.vendor.store_name,
    image: p.images.find(img => img.is_main)?.image || p.images[0]?.image
  })) || [];

  const saleProducts = saleRes?.data?.slice(0, 4).map(p => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: p.price,
    category: p.category.name,
    vendor: p.vendor.store_name,
    image: p.images.find(img => img.is_main)?.image || p.images[0]?.image
  })) || [];

  return (
    <div className="pb-20">
      <HomeHero />
      <TrustFeatures />
      
      {/* Home Categories */}
      <HomeCategories />
      
      {/* Trending Section */}
      <section className="mt-24 md:mt-32">
        {trendingLoading ? (
          <div className="max-w-7xl mx-auto px-6 h-64 bg-background-subtle animate-pulse rounded-3xl" />
        ) : trendingProducts.length > 0 && (
          <FeaturedProducts 
            products={trendingProducts} 
            title="Trending Now"
            subtitle="The most popular items from our community this week."
          />
        )}
      </section>

      {/* Featured Vendors */}
      <div className="mt-32">
        <FeaturedVendors />
      </div>

      {/* Flash Sales Section */}
      <section className="mt-32">
        {saleLoading ? (
          <div className="max-w-7xl mx-auto px-6 h-64 bg-background-subtle animate-pulse rounded-3xl" />
        ) : saleProducts.length > 0 && (
          <div className="bg-background-subtle py-24">
            <FeaturedProducts 
              products={saleProducts} 
              title="Flash Sales"
              subtitle="Limited time offers from our verified partners."
            />
          </div>
        )}
      </section>

      <div className="mt-10">
        <VendorCTA />
      </div>
    </div>
  );
}



