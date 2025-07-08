import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/Dialog';
import Button from '../ui/Button';
import { Sparkles, Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  isMenuOpen: boolean;
  onMenuToggle: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, isMenuOpen, onMenuToggle }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Top Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  AI Resume Shortlister
                </h1>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Button variant="outline" disabled className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={onMenuToggle}
                className="text-gray-600 hover:text-gray-900"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative">
        {children}
      </main>

      {/* Mobile Dialog */}
      <Dialog open={isMenuOpen} onOpenChange={onMenuToggle}>
        <DialogContent className="bg-white/95 backdrop-blur-md border border-white/20">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold text-gray-900">
              Menu
            </DialogTitle>
          </DialogHeader>
          <div className="mt-6 space-y-4">
            <Button variant="outline" size="lg" className="w-full flex items-center gap-2" disabled>
              <Settings className="h-5 w-5" />
              Settings
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Layout;