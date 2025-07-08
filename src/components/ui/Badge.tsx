import React from 'react';

interface BadgeProps {
  variant?: 'default' | 'success' | 'destructive';
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ variant = 'default', children, className }) => {
  const baseClasses = "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  
  const variantClasses = {
    default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
    success: "border-transparent bg-green-100 text-green-800 font-medium dark:bg-green-900 dark:text-green-100",
    destructive: "border-transparent bg-red-100 text-red-800 font-medium dark:bg-red-900 dark:text-red-100",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className || ''}`}>
      {children}
    </div>
  );
};

export default Badge;
