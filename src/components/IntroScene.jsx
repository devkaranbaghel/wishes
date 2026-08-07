import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarField from './StarField';
import landingImg from '../assets/landing-page.png';

export default function IntroScene({ onComplete }) {
  const [fading, setFading] = useState(false);

  const handleStart = () => {
    setFading(true);
    setTimeout(onComplete, 1200);
  };

  return (
    <AnimatePresence>
      {!fading && (
        <motion.div
          className="intro-scene"
          key="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          onClick={handleStart}
          style={{ cursor: 'pointer', position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}
        >
          <StarField visible />

          <motion.img
            src={landingImg}
            alt="Welcome"
            style={{ 
              position: 'absolute',
              inset: 0,
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              zIndex: 10
            }}
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
          
          <div style={{ position: 'absolute', inset: 0, zIndex: 11, background: 'linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.8) 100%)' }} />

          <motion.p
            className="blow-hint"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', zIndex: 12, margin: 0 }}
          >
            Tap to Begin Journey
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
