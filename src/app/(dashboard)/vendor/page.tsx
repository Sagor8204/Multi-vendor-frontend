import React from 'react';

export default function VendorOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-main">Vendor Sales Overview</h1>
        <p className="text-text-muted mt-2">Monitor your store's performance and recent activities.</p>
      </div>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-lg border border-card-border shadow-sm">
          <div className="text-text-muted text-sm font-medium mb-1">Total Sales</div>
          <div className="text-2xl font-bold text-text-main">$12,450.00</div>
          <div className="mt-2 text-success text-xs font-semibold">+12.5% from last month</div>
        </div>
        <div className="bg-card p-6 rounded-lg border border-card-border shadow-sm">
          <div className="text-text-muted text-sm font-medium mb-1">Active Orders</div>
          <div className="text-2xl font-bold text-text-main">48</div>
          <div className="mt-2 text-info text-xs font-semibold">8 pending shipment</div>
        </div>
        <div className="bg-card p-6 rounded-lg border border-card-border shadow-sm">
          <div className="text-text-muted text-sm font-medium mb-1">Store Rating</div>
          <div className="text-2xl font-bold text-text-main">4.9 / 5.0</div>
          <div className="mt-2 text-warning text-xs font-semibold">124 reviews</div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg border border-border shadow-sm">
        <p className="text-text-muted italic">Vendor Sales Overview dummy content...</p>
      </div>
    </div>
  );
}
