// src/components/FeedbackAnimation.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ComputerIcon from '@mui/icons-material/Computer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

interface FeedbackAnimationProps {
  status: 'initial' | 'loading' | 'success' | 'failure';
}

const FeedbackAnimation: React.FC<FeedbackAnimationProps> = ({ status }) => {
  return (
    <div style={{ position: 'relative', width: '80px', height: '80px' }}>
      <AnimatePresence mode="wait">
        {status === 'initial' && (
          <motion.div
            key="initial"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{
              width: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ComputerIcon sx={{ fontSize: 80, color: '#3498db' }} />
          </motion.div>
        )}

        {status === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8, y: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{
              opacity: { duration: 0.1, ease: 'easeInOut' },
              scale: { duration: 0.1, ease: 'easeInOut' },
            }}
            style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#3498db',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        )}

        {(status === 'success' || status === 'failure') && (
          <motion.div
            key={status}
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.1, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '80px',
              height: '80px',
              backgroundColor: status === 'success' ? '#2ecc71' : '#e74c3c',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {status === 'success' ? (
              <CheckCircleIcon sx={{ fontSize: 50, color: 'white' }} />
            ) : (
              <CancelIcon sx={{ fontSize: 50, color: 'white' }} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeedbackAnimation;
