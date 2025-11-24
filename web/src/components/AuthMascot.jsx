import React from 'react';
import { motion } from 'framer-motion';

const AuthMascot = ({ mood = 'idle' }) => {
  // mood: 'idle' | 'focused' | 'blind' (for password)

  const variants = {
    idle: { y: 0, rotate: 0 },
    focused: { y: 5, rotate: -5 },
    blind: { y: 10, rotate: 0 }
  };

  const eyeVariants = {
    idle: { scaleY: 1, transition: { repeat: Infinity, repeatDelay: 3, duration: 0.2 } }, // Blink
    focused: { scaleY: 1.2, scaleX: 1.1 },
    blind: { scaleY: 0.1 }
  };

  const handsVariants = {
    idle: { y: 100, opacity: 0 },
    focused: { y: 100, opacity: 0 },
    blind: { y: -50, x: 0, opacity: 1, transition: { type: "spring", bounce: 0.5 } }
  };

  return (
    <div className="w-40 h-40 mx-auto relative flex justify-center items-center">
      <motion.svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-2xl"
        animate={mood}
        variants={variants}
      >
        {/* Body/Head */}
        <defs>
          <linearGradient id="robotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        
        {/* Antenna */}
        <motion.path 
          d="M100 40 L100 20" 
          stroke="#a78bfa" 
          strokeWidth="4" 
          strokeLinecap="round"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        />
        <circle cx="100" cy="15" r="5" fill="#f472b6" className="animate-pulse" />

        {/* Head Shape */}
        <rect x="40" y="40" width="120" height="100" rx="25" fill="url(#robotGradient)" />
        
        {/* Screen/Face Area */}
        <rect x="55" y="60" width="90" height="60" rx="15" fill="#0f172a" />
        
        {/* Eyes Container */}
        <g transform="translate(0, 0)">
          {/* Left Eye */}
          <motion.ellipse 
            cx="80" cy="90" rx="12" ry="12" 
            fill="#22d3ee"
            variants={eyeVariants}
            animate={mood === 'idle' ? "idle" : mood}
            className="glow-eye"
          />
          
          {/* Right Eye */}
          <motion.ellipse 
            cx="120" cy="90" rx="12" ry="12" 
            fill="#22d3ee"
            variants={eyeVariants}
            animate={mood === 'idle' ? "idle" : mood}
            className="glow-eye"
          />
        </g>

        {/* Mouth */}
        <motion.path
          d="M85 105 Q100 115 115 105"
          stroke="#22d3ee"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          animate={{ 
            d: mood === 'focused' ? "M90 105 Q100 100 110 105" : "M85 105 Q100 115 115 105"
          }}
        />

        {/* Hands (Hidden by default, appear to cover eyes) */}
        <motion.g variants={handsVariants}>
           <circle cx="70" cy="140" r="20" fill="url(#robotGradient)" stroke="#fff" strokeWidth="2"/>
           <circle cx="130" cy="140" r="20" fill="url(#robotGradient)" stroke="#fff" strokeWidth="2"/>
        </motion.g>

      </motion.svg>
      
      {/* CSS Glow effect for eyes */}
      <style jsx>{`
        .glow-eye {
          filter: drop-shadow(0 0 5px #22d3ee);
        }
      `}</style>
    </div>
  );
};

export default AuthMascot;
