'use client';

import React, { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={<div className="h-20 bg-white border-b border-border" />}>
        <Header />
      </Suspense>
      <main className="flex-grow bg-white">
        {children}
      </main>
      <Footer />
    </div>
  );
}
