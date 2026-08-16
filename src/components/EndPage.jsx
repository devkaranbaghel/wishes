import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import endpageImg from '../assets/images/endpage.png';
import Letter from './Letter';
import EndReview from './EndReview';

const FIREFLIES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: `${5 + Math.random() * 90}%`,
  y: `${10 + Math.random() * 80}%`,
  dur: 5 + Math.random() * 5,
  delay: Math.random() * 4,
  dx1: `${(Math.random() - 0.5) * 60}px`,
  dy1: `${(Math.random() - 0.5) * 40}px`,
  dx2: `${(Math.random() - 0.5) * 80}px`,
  dy2: `${(Math.random() - 0.5) * 60}px`,
  dx3: `${(Math.random() - 0.5) * 50}px`,
  dy3: `${(Math.random() - 0.5) * 40}px`,
}));

export default function EndPage({ interactive = true }) {
  const [closing, setClosing] = useState(false);
  const [showEnding, setShowEnding] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => setShowEnding(true), 900);
  };

  return (
    
    <>
      {/* Fireflies */}
      {FIREFLIES.map((f) => (
        <div
          key={f.id}
          className="firefly"
          style={{
            left: f.x,
            top: f.y,
            '--fly-dur': `${f.dur}s`,
            '--dx1': f.dx1,
            '--dy1': f.dy1,
            '--dx2': f.dx2,
            '--dy2': f.dy2,
            '--dx3': f.dx3,
            '--dy3': f.dy3,
            animationDelay: `${f.delay}s`,
          }}
        />
      ))}

      <div className="end-container" style={{ width: '100%', height: '100%' }}>
        <div className="end-page" style={{ width: '100%', height: '100%', position: 'relative' }}>
          <img
            src={endpageImg}
            alt="End of journey"
            className="end-image-full"
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          />

          <div className="end-content">
            {/* Text overlay removed as the new image has baked-in text */}

            {interactive && (
              <motion.button
                    id="end-journey-btn"
                    className="end-button"
                    onClick={handleClose}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.3, type: 'spring', bounce: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    ✨ End of this Journey
                  </motion.button>
                )}
              </div>
            </div>
          </div>

      {/* Ending screen */}
      <AnimatePresence>
        {showEnding && !showReview && (
          <Letter key="letter" onContinueReview={() => setShowReview(true)} />
        )}
        {showReview && (
          <EndReview key="review" />
        )}
      </AnimatePresence>
    </>
  );
}
