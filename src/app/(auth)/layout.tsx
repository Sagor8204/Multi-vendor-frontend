import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-subtle p-6">
      <div className="w-full max-w-md bg-card border border-card-border p-8 rounded-lg shadow-md">
        <div className="mb-8 text-center">
           <div className="text-3xl font-extrabold text-primary mb-2">Marketplace</div>
           <p className="text-text-muted">Account Access</p>
        </div>
        {children}
      </div>
    </div>
  );
}
