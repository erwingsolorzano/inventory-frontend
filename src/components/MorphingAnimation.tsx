// src/components/MorphingAnimation.tsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import loginIcon from '../assets/login.png'; // Asegúrate de que la ruta sea correcta

interface MorphingAnimationProps {
  loading: boolean;
}

const MorphingAnimation: React.FC<MorphingAnimationProps> = ({ loading }) => {
  // Cuando loading es true se muestra la animación; cuando es false se muestra el cuadrado original
  const [transformed, setTransformed] = useState(false);

  useEffect(() => {
    if (loading) {
      // Activamos la transformación de inmediato
      setTransformed(true);
    } else {
      setTransformed(false);
    }
  }, [loading]);

  // Variantes para la animación de los 3 puntos (movimiento cíclico horizontal)
  const dotsVariants = {
    animate: {
      x: [0, 20, 0],
      transition: {
        repeat: Infinity,
        duration: 1,
        ease: 'linear',
      },
    },
  };

  return (
    <div style={{ position: 'relative', width: '80px', height: '80px' }}>
      <AnimatePresence>
        {!transformed && (
          <motion.img
            key="loginIcon"
            src={loginIcon}
            alt="Login Icon"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%' 
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {transformed && (
          <motion.div
            key="dots"
            initial={{ opacity: 0 }}
            animate={dotsVariants.animate}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#3498db' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#3498db' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#3498db' }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MorphingAnimation;
