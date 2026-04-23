import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ShieldCheck, Zap } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Side: Brand & Visuals */}
      <div className="hidden md:flex md:w-1/2 bg-text-main relative overflow-hidden flex-col justify-between p-16">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary opacity-20 blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary opacity-10 blur-[100px] translate-y-1/2 -translate-x-1/4"></div>

        <Link href="/" className="relative z-10 font-black text-3xl tracking-tighter">
          Market<span className="text-secondary">Place</span>
        </Link>

        <div className="relative z-10 space-y-12">
           <h2 className="text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
             The most trusted platform for <span className="text-secondary italic underline decoration-white/20 underline-offset-8">global</span> commerce.
           </h2>
           
           <div className="space-y-6 max-w-md">
              <div className="flex items-start space-x-4">
                 <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-secondary" />
                 </div>
                 <div>
                    <h4 className="font-bold text-lg">Instant Connectivity</h4>
                    <p className="text-muted text-sm font-medium leading-relaxed">Connect with thousands of verified vendors and customers worldwide in seconds.</p>
                 </div>
              </div>
              <div className="flex items-start space-x-4">
                 <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5 text-secondary" />
                 </div>
                 <div>
                    <h4 className="font-bold text-lg">Secure Transactions</h4>
                    <p className="text-muted text-sm font-medium leading-relaxed">Every purchase is protected by our industry-leading SSL encryption and dispute resolution.</p>
                 </div>
              </div>
           </div>
        </div>

        <div className="relative z-10 flex items-center justify-between pt-12 border-t border-white/10">
           <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-muted bg-white/10 flex items-center justify-center font-bold text-[10px]">
                  U{i}
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-muted text-white bg-primary flex items-center justify-center font-bold text-[10px]">
                +12k
              </div>
           </div>
           <p className="text-xs font-bold uppercase tracking-widest">Joined this month</p>
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="flex-grow flex items-center justify-center p-8 md:p-16 lg:p-24 bg-white overflow-y-auto">
        <div className="w-full max-w-md">
           <div className="md:hidden mb-12 text-center">
              <Link href="/" className="font-black text-3xl text-primary tracking-tighter inline-block">
                Market<span className="text-secondary">Place</span>
              </Link>
           </div>
           {children}
        </div>
      </div>
    </div>
  );
}
