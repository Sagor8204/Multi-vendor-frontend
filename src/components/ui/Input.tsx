import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', id, ...props }) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-text-main">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full bg-input border border-border text-text-main rounded-md px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${className}`}
        {...props}
      />
    </div>
  );
};
