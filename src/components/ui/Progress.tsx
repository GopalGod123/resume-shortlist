
import React from 'react';

interface ProgressProps {
  value: number;
  colorClass?: string;
}

const Progress: React.FC<ProgressProps> = ({ value, colorClass = 'bg-primary' }) => {
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div className="relative h-4 w-full overflow-hidden rounded-full bg-secondary">
      <div
        className={`h-full w-full flex-1 ${colorClass} transition-all`}
        style={{ transform: `translateX(-${100 - clampedValue}%)` }}
      />
    </div>
  );
};

export default Progress;
