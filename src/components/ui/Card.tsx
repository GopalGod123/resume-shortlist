import React from 'react';

const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-md ${className || ''}`}>
    {children}
  </div>
);

const CardHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className || ''}`}>{children}</div>
);

const CardTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <h3 className={`text-xl font-semibold leading-none tracking-tight ${className || ''}`}>{children}</h3>
);

const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <div className={`p-6 pt-0 ${className || ''}`}>{children}</div>
);

export { Card, CardHeader, CardTitle, CardContent };
