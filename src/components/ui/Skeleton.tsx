'use client';

import React from 'react';

export const CategorySkeleton = () => {
  return (
    <div className="bg-background-subtle rounded-3xl border border-transparent overflow-hidden h-64 p-8 space-y-8 animate-pulse">
      <div className="flex justify-between items-start">
        <div className="w-16 h-16 bg-slate-200 rounded-2xl" />
        <div className="w-20 h-3 bg-slate-200 rounded" />
      </div>
      <div className="space-y-3">
        <div className="w-3/4 h-8 bg-slate-200 rounded-lg" />
        <div className="w-full h-4 bg-slate-100 rounded" />
      </div>
    </div>
  );
};

export const VendorSkeleton = () => {
  return (
    <div className="flex flex-col items-center space-y-4 animate-pulse">
      <div className="w-24 h-24 rounded-full bg-slate-200" />
      <div className="space-y-2 flex flex-col items-center">
        <div className="h-4 w-24 bg-slate-200 rounded" />
        <div className="h-2 w-16 bg-slate-100 rounded" />
      </div>
    </div>
  );
};

export const CategoryPageSkeleton = () => {
  return (
    <div className="bg-white rounded-[2.5rem] border border-border/40 overflow-hidden flex flex-col h-full animate-pulse">
      <div className="p-10 pb-6">
        <div className="flex justify-between items-start mb-6">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl" />
          <div className="w-16 h-5 bg-slate-100 rounded-full" />
        </div>
        <div className="w-3/4 h-8 bg-slate-100 rounded-lg mb-2" />
        <div className="w-full h-4 bg-slate-50 rounded mb-1" />
        <div className="w-2/3 h-4 bg-slate-50 rounded" />
      </div>
      <div className="px-10 py-6 bg-slate-50 grow border-t border-border/40 space-y-4">
        <div className="w-24 h-2 bg-slate-200 rounded mb-4" />
        {[1, 2, 3].map(i => (
          <div key={i} className="flex justify-between items-center py-1">
            <div className="w-1/2 h-4 bg-slate-100 rounded" />
            <div className="w-4 h-4 bg-slate-50 rounded" />
          </div>
        ))}
      </div>
      <div className="p-10 pt-4">
        <div className="w-full h-12 bg-slate-100 rounded-xl" />
      </div>
    </div>
  );
};
