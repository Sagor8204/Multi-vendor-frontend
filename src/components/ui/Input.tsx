import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', id, ...props }) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-text-main">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full bg-input border ${
          error ? 'border-error ring-1 ring-error' : 'border-border'
        } text-text-main rounded-md px-4 py-2.5 focus:ring-2 ${
          error ? 'focus:ring-error' : 'focus:ring-primary'
        } focus:border-transparent outline-none transition-all placeholder:text-text-muted/50 ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs font-medium text-error mt-1">{error}</p>
      )}
    </div>
  );
};
