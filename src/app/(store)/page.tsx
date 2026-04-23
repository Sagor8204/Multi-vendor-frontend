import React from 'react';
import { HomeHero } from '@/components/home/HomeHero';
import { CategoriesBar } from '@/components/home/CategoriesBar';
import { HomeCategories } from '@/components/home/HomeCategories';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { VendorCTA } from '@/components/home/VendorCTA';

// Dummy data for initial UI - will be replaced by API fetch later
const DUMMY_PRODUCTS = [
  { id: 1, slug: 'premium-wireless-headphones', name: 'Premium Wireless Headphones', price: 299, category: 'Electronics', vendor: 'TechNova', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&auto=format&fit=crop' },
  { id: 2, slug: 'minimalist-leather-watch', name: 'Minimalist Leather Watch', price: 150, category: 'Accessories', vendor: 'Timeless', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500&auto=format&fit=crop' },
  { id: 3, slug: 'organic-cotton-tee', name: 'Organic Cotton Tee', price: 45, category: 'Fashion', vendor: 'EcoStyle', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=500&auto=format&fit=crop' },
  { id: 4, slug: 'smart-home-hub', name: 'Smart Home Hub', price: 199, category: 'Electronics', vendor: 'TechNova', image: 'https://images.unsplash.com/photo-1558002038-103790319987?q=80&w=500&auto=format&fit=crop' },
  { id: 5, slug: 'ergonomic-desk-chair', name: 'Ergonomic Desk Chair', price: 350, category: 'Furniture', vendor: 'OfficePro', image: 'https://images.unsplash.com/photo-1505797149-43b0000ee20e?q=80&w=500&auto=format&fit=crop' },
  { id: 6, slug: 'artisan-coffee-maker', name: 'Artisan Coffee Maker', price: 120, category: 'Kitchen', vendor: 'BrewMaster', image: 'https://images.unsplash.com/photo-1544145945-f904253d0c7b?q=80&w=500&auto=format&fit=crop' },
];

export default function StoreHome() {
  return (
    <div className="pb-20">
      <HomeHero />
      <CategoriesBar />
      <HomeCategories />
      <FeaturedProducts products={DUMMY_PRODUCTS} />
      <VendorCTA />
    </div>
  );
}
