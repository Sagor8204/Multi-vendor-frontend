'use client';

import React, { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isVendorRoute = pathname?.startsWith('/vendor');

  if (isVendorRoute) {
    return (
      <div className="min-h-screen bg-[#f1f5f9]">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Suspense fallback={<div className="h-20 bg-white border-b border-border" />}>
        <Header />
      </Suspense>
      <main className="flex-grow pt-8 pb-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
