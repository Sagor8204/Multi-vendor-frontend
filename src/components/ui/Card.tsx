import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, title, description, className = '' }) => {
  return (
    <div className={`bg-card border border-card-border rounded-lg shadow-sm overflow-hidden ${className}`}>
      {(title || description) && (
        <div className="p-6 border-b border-card-border">
          {title && <h3 className="text-lg font-bold text-main">{title}</h3>}
          {description && <p className="text-sm text-muted mt-1">{description}</p>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};
