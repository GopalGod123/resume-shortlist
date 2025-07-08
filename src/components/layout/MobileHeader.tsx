import React from 'react';
import { BrainCircuit, Menu } from 'lucide-react';
import Button from '../ui/Button';

interface MobileHeaderProps {
  onMenuToggle: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onMenuToggle }) => {
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between h-16 px-4 border-b bg-card/80 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <BrainCircuit className="h-7 w-7 text-primary" />
        <h1 className="text-xl font-bold text-foreground">AI Shortlister</h1>
      </div>
      <Button onClick={onMenuToggle} variant="ghost" size="icon">
        <Menu className="h-6 w-6" />
        <span className="sr-only">Open menu</span>
      </Button>
    </header>
  );
};

export default MobileHeader;