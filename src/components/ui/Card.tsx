import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  title, 
  description, 
  action,
  className = '', 
  noPadding = false 
}) => {
  return (
    <div className={`bg-card border border-card-border rounded-lg shadow-sm overflow-hidden ${className}`}>
      {(title || description || action) && (
        <div className="p-6 border-b border-card-border flex items-center justify-between gap-4">
          <div>
            {title && <h3 className="text-lg font-bold text-main">{title}</h3>}
            {description && <p className="text-sm text-muted mt-1">{description}</p>}
          </div>
          {action && (
            <div className="shrink-0">
              {action}
            </div>
          )}
        </div>
      )}
      <div className={noPadding ? '' : 'p-6'}>
        {children}
      </div>
    </div>
  );
};
