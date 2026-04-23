'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

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
    // Clear error when user types
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
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-main">Create Account</h1>
        <p className="text-muted text-sm mt-1">Join our marketplace today.</p>
      </div>

      {/* Role Selection UI */}
      <div className="grid grid-cols-2 gap-4 mb-2">
        <div 
          onClick={() => setRole('customer')}
          className={`cursor-pointer p-4 rounded-lg border-2 transition-all text-center ${
            role === 'customer' 
              ? 'border-primary bg-primary/5' 
              : 'border-border bg-white hover:border-primary/50'
          }`}
        >
          <div className={`text-sm font-bold ${role === 'customer' ? 'text-primary' : 'text-muted'}`}>Customer</div>
          <p className="text-[10px] text-muted mt-1 leading-tight">Buy products & review stores</p>
        </div>
        <div 
          onClick={() => setRole('vendor')}
          className={`cursor-pointer p-4 rounded-lg border-2 transition-all text-center ${
            role === 'vendor' 
              ? 'border-secondary bg-secondary/5' 
              : 'border-border bg-white hover:border-secondary/50'
          }`}
        >
          <div className={`text-sm font-bold ${role === 'vendor' ? 'text-secondary' : 'text-muted'}`}>Vendor</div>
          <p className="text-[10px] text-muted mt-1 leading-tight">Sell products & grow business</p>
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
        />
        <Input 
          id="email"
          label="Email Address" 
          type="email"
          placeholder="email@example.com" 
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          disabled={isRegistering}
        />
        <Input 
          id="password"
          label="Password" 
          type="password"
          placeholder="••••••••" 
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          disabled={isRegistering}
        />
        <Input 
          id="confirm_password"
          label="Confirm Password" 
          type="password"
          placeholder="••••••••" 
          value={formData.confirm_password}
          onChange={handleChange}
          error={errors.confirm_password}
          disabled={isRegistering}
        />
        
        <Button 
          type="submit" 
          variant={role === 'vendor' ? 'secondary' : 'primary'}
          className="w-full py-3 mt-4 text-base tracking-wide"
          disabled={isRegistering}
        >
          {isRegistering ? 'Creating Account...' : `Register as ${role === 'vendor' ? 'Vendor' : 'Customer'}`}
        </Button>
      </form>

      <div className="text-center text-sm text-muted pt-2 border-t border-border">
        Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Login</Link>
      </div>
    </div>
  );
}
