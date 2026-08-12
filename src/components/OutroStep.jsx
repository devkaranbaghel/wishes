import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OutroStep({ onComplete }) {
  const [phase, setPhase] = useState('black'); // black | message | scroll

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('message'), 1400);
    const t2 = setTimeout(() => setPhase('scroll'), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Listen for scroll to complete
  useEffect(() => {
    if (phase !== 'scroll') return;
    const handleScroll = () => onComplete();
    window.addEventListener('wheel', handleScroll, { once: true });
    window.addEventListener('touchmove', handleScroll, { once: true });
    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [phase, onComplete]);

  return (
    <motion.div
      className="outro-step"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      <AnimatePresence mode="wait">
        {phase === 'message' && (
          <motion.div
            key="message"
            className="outro-message"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1 }}
          >
            <p className="outro-text">Your year is about to begin…</p>
            <div className="outro-dot-row">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="outro-dot"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {phase === 'scroll' && (
          <motion.div
            key="scroll"
            className="outro-scroll"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <motion.p
              className="outro-scroll-text"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              Scroll down ↓
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
