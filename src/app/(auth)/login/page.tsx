'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

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
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-main">Welcome Back</h1>
        <p className="text-muted text-sm mt-1">Please enter your credentials.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input 
          id="email"
          label="Email Address" 
          type="email"
          placeholder="email@example.com" 
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          disabled={isLoggingIn}
        />
        <Input 
          id="password"
          label="Password" 
          type="password"
          placeholder="••••••••" 
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          disabled={isLoggingIn}
        />
        
        <div className="flex items-center justify-end">
          <span className="text-xs font-semibold text-primary cursor-pointer hover:underline">
            Forgot password?
          </span>
        </div>

        <Button 
          type="submit" 
          className="w-full py-3 mt-2 text-base tracking-wide"
          disabled={isLoggingIn}
        >
          {isLoggingIn ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>
      
      <div className="text-center text-sm text-muted pt-6 border-t border-border">
        Don't have an account? <Link href="/register" className="text-primary font-bold hover:underline">Create Account</Link>
      </div>
    </div>
  );
}
