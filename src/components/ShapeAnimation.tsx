import React from 'react';
import { motion } from 'framer-motion';

interface ShapeAnimationProps {
  loading: boolean;
}

const ShapeAnimation: React.FC<ShapeAnimationProps> = ({ loading }) => {
  return (
    <motion.div
      style={{
        width: '80px',
        height: '80px',
        backgroundColor: '#3498db',
      }}
      initial={{ borderRadius: '0%', rotate: 0 }}
      animate={
        loading
          ? { borderRadius: '50%', rotate: 360 }
          : { borderRadius: '0%', rotate: 0 }
      }
      transition={{
        borderRadius: { duration: 0.5, ease: 'easeInOut' },
        rotate: loading
          ? { repeat: Infinity, duration: 1, ease: 'linear' }
          : { duration: 0.5 },
      }}
    />
  );
};

export default ShapeAnimation;
