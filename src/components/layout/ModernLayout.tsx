import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const ModernLayout = () => {
  return (
    <div className="relative min-h-screen w-full bg-background text-foreground">
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};
