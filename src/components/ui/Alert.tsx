
import React from 'react';

interface AlertProps {
  variant?: 'default' | 'destructive';
  children: React.ReactNode;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({ variant = 'default', children, className }) => {
  const variantClasses = {
    default: "bg-background text-foreground dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700",
    destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
  };
  
  return (
    <div role="alert" className={`relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground dark:[&>svg]:text-gray-100 transition-colors duration-300 ${variantClasses[variant]} ${className || ''}`}>
      {children}
    </div>
  );
};

const AlertTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h5 className="mb-1 font-medium leading-none tracking-tight">{children}</h5>
);

const AlertDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="text-sm [&_p]:leading-relaxed">{children}</div>
);

export { Alert, AlertTitle, AlertDescription };
