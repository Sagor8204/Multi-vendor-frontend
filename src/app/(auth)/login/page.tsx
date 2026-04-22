import React from 'react';

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-text-main">Welcome Back</h1>
        <p className="text-text-muted text-sm mt-1">Please enter your details to login.</p>
      </div>
      
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-main mb-1.5">Email Address</label>
          <input 
            type="email" 
            placeholder="email@example.com" 
            className="w-full bg-input border border-border px-4 py-2 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-main mb-1.5">Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            className="w-full bg-input border border-border px-4 py-2 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          />
        </div>
        <button className="w-full bg-primary text-primary-foreground py-2.5 rounded-md font-bold hover:bg-primary-hover transition-colors shadow-sm mt-2">
          Sign In
        </button>
      </form>
      
      <div className="text-center text-sm text-text-muted mt-6">
        Don't have an account? <span className="text-primary font-bold cursor-pointer">Register now</span>
      </div>
    </div>
  );
}
