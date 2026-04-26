import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'outline';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'primary', 
  className = '' 
}) => {
  const variants = {
    primary: 'bg-primary/10 text-primary border-primary/10',
    secondary: 'bg-secondary/10 text-secondary border-secondary/10',
    success: 'bg-success/10 text-success border-success/10',
    error: 'bg-error/10 text-error border-error/10',
    warning: 'bg-warning/10 text-warning border-warning/10',
    outline: 'bg-transparent border-border text-muted'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
