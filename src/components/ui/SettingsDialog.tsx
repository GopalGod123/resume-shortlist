import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './Dialog';
import ThemeToggle from './ThemeToggle';
import { Settings, Moon, Sun, Palette } from 'lucide-react';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-white/20 dark:border-gray-700/50 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-2">
            <Settings className="w-5 h-5" />
            Settings
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-6 space-y-6">
          {/* Theme Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Appearance</h3>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Moon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Dark Mode</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Toggle between light and dark themes</p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Future Settings Sections */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">General</h3>
            </div>
            
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                More settings will be available soon...
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog; 