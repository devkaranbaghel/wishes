import { useRef } from 'react';
import { motion } from 'framer-motion';

export default function JournalCover() {
  return (
    <div className="cover-container">
      <motion.div
        className="cover-page"
        initial={{ scale: 0.85, opacity: 0, rotateY: -15 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        transition={{ duration: 1.1, type: 'spring', bounce: 0.25 }}
      >
        <div className="leather-texture" />

        {/* Compass */}
        <motion.div
          className="cover-compass"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          🧭
        </motion.div>

        <div className="cover-divider" />

        <motion.p
          className="cover-title-small"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          A Travel Journal for
        </motion.p>

        <motion.h1
          className="cover-title-main"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
        >
          Your Year Will<br />Look Like This…
        </motion.h1>

        <div className="cover-divider" />

        {/* Mountain sketch using SVG */}
        <motion.svg
          className="cover-mountain-sketch"
          viewBox="0 0 300 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ delay: 0.9 }}
        >
          <polyline
            points="0,100 60,30 100,60 150,10 200,55 240,25 300,100"
            stroke="#C9A84C"
            strokeWidth="2"
            fill="none"
          />
          <line x1="0" y1="100" x2="300" y2="100" stroke="#C9A84C" strokeWidth="1.5" />
        </motion.svg>

        <motion.p
          className="cover-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          Scroll to turn pages & begin your journey
        </motion.p>

        <motion.div
          className="cover-scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <span>📖 Scroll down</span>
          <span>▼</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
