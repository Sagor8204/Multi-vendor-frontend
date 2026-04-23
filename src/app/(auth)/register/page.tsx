'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { User, Store, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const { register, isRegistering } = useAuth();
  const [role, setRole] = useState<'customer' | 'vendor'>('customer');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
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
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Min 6 characters required';
    
    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    register({ ...formData, role });
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-main tracking-tight mb-2">Create Account.</h1>
        <p className="text-muted font-medium">Join the marketplace to start shopping or selling.</p>
      </div>

      <div className="space-y-4 mb-8">
        <label className="text-[10px] font-black text-muted uppercase tracking-[0.2em] block">I want to join as</label>
        <div className="grid grid-cols-2 gap-4">
            <div 
              onClick={() => setRole('customer')}
              className={`cursor-pointer p-4 rounded-2xl border-2 transition-all relative overflow-hidden group ${
                role === 'customer' 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border bg-white hover:border-primary/30'
              }`}
            >
              <User className={`w-5 h-5 mb-2 ${role === 'customer' ? 'text-primary' : 'text-muted'}`} />
              <div className={`text-sm font-black ${role === 'customer' ? 'text-primary' : 'text-main'}`}>Customer</div>
              <p className="text-[10px] text-muted font-medium leading-tight mt-1">Discover & Buy</p>
            </div>
            <div 
              onClick={() => setRole('vendor')}
              className={`cursor-pointer p-4 rounded-2xl border-2 transition-all relative overflow-hidden group ${
                role === 'vendor' 
                  ? 'border-secondary bg-secondary/5' 
                  : 'border-border bg-white hover:border-secondary/30'
              }`}
            >
              <Store className={`w-5 h-5 mb-2 ${role === 'vendor' ? 'text-secondary' : 'text-muted'}`} />
              <div className={`text-sm font-black ${role === 'vendor' ? 'text-secondary' : 'text-main'}`}>Vendor</div>
              <p className="text-[10px] text-muted font-medium leading-tight mt-1">List & Sell</p>
            </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input 
          id="username"
          label="Username" 
          placeholder="johndoe" 
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
          disabled={isRegistering}
          className="py-3.5 bg-background-subtle border-transparent focus:bg-white"
        />
        <Input 
          id="email"
          label="Email Address" 
          type="email"
          placeholder="name@company.com" 
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          disabled={isRegistering}
          className="py-3.5 bg-background-subtle border-transparent focus:bg-white"
        />
        <div className="grid grid-cols-2 gap-4">
           <Input 
             id="password"
             label="Password" 
             type="password"
             placeholder="••••••••" 
             value={formData.password}
             onChange={handleChange}
             error={errors.password}
             disabled={isRegistering}
             className="py-3.5 bg-background-subtle border-transparent focus:bg-white text-xs"
           />
           <Input 
             id="confirm_password"
             label="Confirm" 
             type="password"
             placeholder="••••••••" 
             value={formData.confirm_password}
             onChange={handleChange}
             error={errors.confirm_password}
             disabled={isRegistering}
             className="py-3.5 bg-background-subtle border-transparent focus:bg-white text-xs"
           />
        </div>
        
        <Button 
          type="submit" 
          variant={role === 'vendor' ? 'secondary' : 'primary'}
          className="w-full py-4 mt-6 text-sm font-black uppercase tracking-widest shadow-2xl shadow-primary/10 flex items-center justify-center space-x-2"
          disabled={isRegistering}
        >
          <span>{isRegistering ? 'Registering...' : `Join as ${role === 'vendor' ? 'Vendor' : 'Customer'}`}</span>
          {!isRegistering && <ArrowRight className="w-4 h-4" />}
        </Button>
      </form>

      <div className="mt-10 text-center text-sm font-medium text-muted border-t border-border pt-8">
        Already have an account? <Link href="/login" className="text-primary font-black hover:underline ml-1">Sign in here</Link>
      </div>
    </div>
  );
}
