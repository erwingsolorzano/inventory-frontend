import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ComputerToCircleProps {
  loading: boolean;
}

// Definimos dos rutas: una para la "computadora" y otra para el "círculo".
const computerPath = "M20,20H80V60H20Z M35,60H65V80H35Z";
const circlePath   = "M50,20A30,30 0 1,1 49.999,20Z";

const ComputerToCircle: React.FC<ComputerToCircleProps> = ({ loading }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      width="80"
      height="80"
      style={{ overflow: 'visible' }}
    >
      {/* 1) Computadora: se muestra cuando loading es false */}
      <AnimatePresence>
        {!loading && (
          <motion.path
            key="computer"
            d={computerPath}
            fill="#3498db"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* 2) Círculo: se muestra cuando loading es true y rota de forma infinita */}
      <AnimatePresence>
        {loading && (
          <motion.path
            key="circle"
            d={circlePath}
            fill="#3498db"
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.5 },
              rotate: {
                repeat: Infinity,
                duration: 1,
                ease: "linear",
              },
            }}
            style={{
              // Ajusta el centro de rotación al centro del viewBox
              originX: "50%",
              originY: "50%",
            }}
          />
        )}
      </AnimatePresence>
    </svg>
  );
};

export default ComputerToCircle;
