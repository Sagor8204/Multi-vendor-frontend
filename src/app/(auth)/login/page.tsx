'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { LogIn, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const { login, isLoggingIn } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    login(formData);
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-main tracking-tight mb-2">Welcome back.</h1>
        <p className="text-muted font-medium">Please enter your details to access your account.</p>
      </div>

      {/* Social Login Placeholder (Professional sites always have this) */}
      <div className="grid grid-cols-2 gap-4 mb-8">
         <button className="flex items-center justify-center space-x-2 py-3 border border-border rounded-xl hover:bg-background-subtle transition-all font-bold text-xs uppercase tracking-widest text-main">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" />
            <span>Google</span>
         </button>
         <button className="flex items-center justify-center space-x-2 py-3 border border-border rounded-xl hover:bg-background-subtle transition-all font-bold text-xs uppercase tracking-widest text-main">
            <img src="https://www.svgrepo.com/show/448234/linkedin.svg" className="w-4 h-4" />
            <span>LinkedIn</span>
         </button>
      </div>

      <div className="relative mb-8 text-center">
         <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
         </div>
         <span className="relative z-10 bg-white px-4 text-[10px] font-black text-muted uppercase tracking-[0.2em]">Or continue with email</span>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input 
          id="email"
          label="Email Address" 
          type="email"
          placeholder="name@company.com" 
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          disabled={isLoggingIn}
          className="py-3.5 bg-background-subtle border-transparent focus:bg-white"
        />
        <div className="space-y-1">
          <Input 
            id="password"
            label="Password" 
            type="password"
            placeholder="••••••••" 
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            disabled={isLoggingIn}
            className="py-3.5 bg-background-subtle border-transparent focus:bg-white"
          />
          <div className="flex justify-end">
             <span className="text-[10px] font-black text-primary cursor-pointer hover:underline uppercase tracking-widest">
               Forgot Password?
             </span>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full py-4 mt-4 text-sm font-black uppercase tracking-widest shadow-2xl shadow-primary/20 flex items-center justify-center space-x-2"
          disabled={isLoggingIn}
        >
          <span>{isLoggingIn ? 'Authenticating...' : 'Sign In to Account'}</span>
          {!isLoggingIn && <ArrowRight className="w-4 h-4" />}
        </Button>
      </form>
      
      <div className="mt-12 text-center text-sm font-medium text-muted">
        Don't have an account? <Link href="/register" className="text-primary font-black hover:underline ml-1">Create an account</Link>
      </div>
    </div>
  );
}
