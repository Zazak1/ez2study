import React, { useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const MouseSpotlight = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 300); 
      mouseY.set(e.clientY - 300);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <motion.div
        style={{ x, y }}
        // Lighter, pastel colors for the white theme
        className="absolute h-[600px] w-[600px] rounded-full bg-gradient-to-r from-blue-200/40 to-purple-200/40 blur-[80px] mix-blend-multiply"
      />
    </motion.div>
  );
};

export default MouseSpotlight;
