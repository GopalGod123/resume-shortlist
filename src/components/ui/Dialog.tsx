import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import Button from './Button';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  return (
    <AnimatePresence>
      {open && (
        <div className="relative z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 dark:bg-black/80"
            onClick={() => onOpenChange(false)}
          />
          {React.Children.map(children, (child) =>
            React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<any>, { onOpenChange })
              : child
          )}
        </div>
      )}
    </AnimatePresence>
  );
};

interface DialogContentProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ onOpenChange, children, className }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed inset-4 sm:inset-6 md:inset-8 lg:top-4 lg:left-1/2 lg:-translate-x-1/2 lg:translate-y-0 lg:w-[90vw] lg:max-w-md lg:max-h-[calc(100vh-2rem)] lg:inset-auto max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)] md:max-h-[calc(100vh-4rem)] overflow-y-auto bg-card dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg z-50 border dark:border-gray-700 transition-colors duration-300 ${className || ''}`}
    >
      {children}
      {onOpenChange && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 sm:top-3 sm:right-3 h-8 w-8 rounded-full"
          onClick={() => onOpenChange(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      )}
    </motion.div>
  )
);

const DialogHeader: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <div className={`text-center sm:text-left ${className || ''}`}>{children}</div>
);

const DialogTitle: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <h2 className={`text-lg font-semibold text-foreground dark:text-gray-100 ${className || ''}`}>{children}</h2>
);


export { Dialog, DialogContent, DialogHeader, DialogTitle };