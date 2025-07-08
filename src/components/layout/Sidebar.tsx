import React from 'react';
import { Rocket, LayoutGrid, Settings, BrainCircuit } from 'lucide-react';
import Button from '../ui/Button';

export interface SidebarProps {
  onShortlist: () => void;
  onReset: () => void;
  isShortlistDisabled: boolean;
  showReset: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ onShortlist, onReset, isShortlistDisabled, showReset }) => {
  return (
    <aside className="hidden md:flex w-72 flex-shrink-0 bg-card border-r border-border flex-col p-4">
      <div className="flex items-center gap-3 px-2 py-4">
        <BrainCircuit className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">AI Shortlister</h1>
      </div>

      <nav className="flex-1 mt-8 space-y-1">
        <a href="#" className="flex items-center gap-3 rounded-lg bg-secondary text-primary-foreground-dark font-semibold px-3 py-2.5 transition-all">
          <LayoutGrid className="h-5 w-5 text-primary" />
          <span className="text-foreground">Dashboard</span>
        </a>
        <a href="#" className="flex items-center gap-3 rounded-lg text-muted-foreground hover:text-foreground px-3 py-2.5 transition-all">
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </a>
      </nav>

      <div className="mt-auto space-y-3 p-2">
        {showReset ? (
           <Button onClick={onReset} variant="secondary" size="lg" className="w-full">
             Start Over
           </Button>
        ) : (
           <Button onClick={onShortlist} disabled={isShortlistDisabled} size="lg" className="w-full">
             <Rocket className="h-5 w-5 mr-2" />
             Shortlist Resumes
           </Button>
        )}
         <p className="text-xs text-center text-muted-foreground">v1.0.0 - Gemini Powered</p>
      </div>
    </aside>
  );
};

export default Sidebar;
