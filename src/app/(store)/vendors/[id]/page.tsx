"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { VendorService } from "@/services/vendor.service";
import { ProductService } from "@/services/product.service";
import { ProductCard } from "@/components/products/ProductCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Image from "next/image";
import {
  Store,
  Star,
  MapPin,
  Calendar,
  MessageSquare,
  Share2,
  ShieldCheck,
  Search,
  LayoutGrid,
  List,
  ChevronDown,
} from "lucide-react";

export default function VendorStorePage() {
  const { id } = useParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Fetch Vendor Details
  const { data: vendorRes, isLoading: vendorLoading } = useQuery({
    queryKey: ["vendor", id],
    queryFn: () => VendorService.getVendorDetail(Number(id)),
    enabled: !!id,
  });

  // Fetch Vendor's Products
  const { data: productsRes, isLoading: productsLoading } = useQuery({
    queryKey: ["vendor-products", id],
    queryFn: () => ProductService.vendorProductsList(Number(id)),
    enabled: !!id,
  });

  const vendor = vendorRes?.data;
  const products = productsRes?.data || [];

  if (vendorLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 animate-pulse">
        <div className="h-64 bg-background-subtle rounded-[3rem] mb-12" />
        <div className="h-10 w-48 bg-background-subtle rounded mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 bg-background-subtle rounded-3xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <Store className="w-16 h-16 text-muted/20 mx-auto mb-6" />
        <h2 className="text-3xl font-black text-main">Store not found</h2>
        <p className="text-muted mt-2">
          The vendor you are looking for might have closed or moved.
        </p>
        <Button className="mt-8 px-10">Back to Marketplace</Button>
      </div>
    );
  }

  return (
    <div className="bg-background-subtle/30 min-h-screen">
      {/* Premium Store Header */}
      <div className="relative bg-white border-b border-border/60">
        {/* Cover Image Placeholder */}
        <div className="h-48 md:h-72 bg-main relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-60"></div>
          <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex flex-col md:flex-row gap-8 items-end -translate-y-1/2 md:-translate-y-12">
            {/* Store Logo */}
            <div className="w-32 h-32 md:w-44 md:h-44 bg-white rounded-[2.5rem] p-1.5 shadow-2xl border border-border/40 shrink-0 relative z-10">
              <div className="w-full h-full rounded-[2rem] overflow-hidden relative">
                <Image
                  src={vendor.store_logo || "/images/store_logo.jpg"}
                  alt={vendor.store_name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Store Info */}
            <div className="flex-grow pb-2 md:pb-0">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h1 className="text-3xl md:text-5xl font-black text-main tracking-tighter">
                  {vendor.store_name}
                </h1>
                {vendor.is_verified && (
                  <Badge variant="secondary" className="px-3 py-1">
                    Verified Partner
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-muted">
                <div className="flex items-center gap-1.5 text-warning">
                  <Star className="w-4 h-4 fill-warning" />
                  <span className="text-main font-black">
                    {vendor.vendor_rating || "New"}
                  </span>
                  <span className="text-[10px] uppercase opacity-60">
                    (Reviews coming soon)
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>Global Shipping</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>Member since 2024</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 relative z-10">
              <Button className="px-8 h-12 text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20">
                Follow Store
              </Button>
              <button className="w-12 h-12 bg-background-subtle rounded-2xl flex items-center justify-center text-muted hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-border/40">
                <MessageSquare className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 bg-background-subtle rounded-2xl flex items-center justify-center text-muted hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-border/40">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Sidebar: About Vendor */}
          <aside className="lg:col-span-4 space-y-10">
            <div className="space-y-6">
              <h3 className="text-[10px] font-black text-main uppercase tracking-[0.2em]">
                About the Store
              </h3>
              <p className="text-base text-muted font-medium leading-relaxed">
                {vendor.store_description ||
                  "Welcome to our premium store. We are dedicated to providing the highest quality products and exceptional customer service to our global community."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card
                noPadding
                className="p-6 bg-white border-border/40 shadow-sm"
              >
                <div className="text-2xl font-black text-main tracking-tighter">
                  {vendor.product_count || products.length}
                </div>
                <div className="text-[10px] font-bold text-muted uppercase tracking-widest mt-1">
                  Total Products
                </div>
              </Card>
              <Card
                noPadding
                className="p-6 bg-white border-border/40 shadow-sm"
              >
                <div className="text-2xl font-black text-secondary tracking-tighter">
                  100%
                </div>
                <div className="text-[10px] font-bold text-muted uppercase tracking-widest mt-1">
                  Response Rate
                </div>
              </Card>
            </div>

            <div className="p-8 bg-main rounded-[2rem] text-white relative overflow-hidden group">
              <ShieldCheck className="w-12 h-12 text-secondary mb-6 relative z-10" />
              <h4 className="text-xl font-black mb-2 relative z-10">
                MarketPro Guarantee
              </h4>
              <p className="text-white/60 text-sm font-medium leading-relaxed relative z-10">
                Every purchase from this verified vendor is protected by our
                global safety program.
              </p>
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/40 transition-colors"></div>
            </div>
          </aside>

          {/* Main: Products Grid */}
          <div className="lg:col-span-8">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-10 pb-6 border-b border-border/60 gap-6">
              <div>
                <h2 className="text-xl font-black text-main tracking-tight italic">
                  Store Collection
                </h2>
                <p className="text-xs font-semibold text-muted mt-1">
                  Showing {products.length} exclusive items
                </p>
              </div>

              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                {/* Search within store */}
                <div className="relative group hidden md:block">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" />
                  <input
                    type="text"
                    placeholder="Search in this store..."
                    className="h-10 pl-10 pr-4 bg-white border border-border/60 rounded-xl text-xs font-medium outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all w-48"
                  />
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-border/60 shadow-sm">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 cursor-pointer rounded-lg transition-all ${viewMode === "grid" ? "bg-white text-primary shadow-sm" : "text-muted hover:text-main"}`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 cursor-pointer rounded-lg transition-all ${viewMode === "list" ? "bg-white text-primary shadow-sm" : "text-muted hover:text-main"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            {productsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-[4/5] bg-white animate-pulse rounded-3xl border border-border/40"
                  />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div
                className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}
              >
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    slug={product.slug}
                    image={
                      product.images.find((img) => img.is_main)?.image ||
                      product.images[0]?.image
                    }
                    category={product.category.name}
                    vendor={vendor.store_name}
                    variant={viewMode}
                  />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center bg-white rounded-[3rem] border border-border/60 shadow-sm">
                <div className="w-20 h-20 bg-background-subtle rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-muted/30" />
                </div>
                <h3 className="text-2xl font-black text-main tracking-tight">
                  No products found
                </h3>
                <p className="text-muted font-semibold mt-2">
                  This store hasn't listed any products yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
