import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import endpageImg from '../assets/images/endpage.jpg';

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

      <AnimatePresence>
        {!closing && (
          <motion.div
            className="end-container"
            key="endpage"
            initial={{ scale: 0.88, opacity: 0, rotateY: -8 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.9, opacity: 0, rotateY: 10 }}
            transition={{ duration: 0.9, type: 'spring', bounce: 0.2 }}
          >
            <div className="end-page">
              <motion.img
                src={endpageImg}
                alt="Mountain viewpoint - arms open to the sky"
                className="end-image-full"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />

              {/* Stars over image */}
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(ellipse at 50% 0%, rgba(100,60,180,0.25) 0%, transparent 60%)',
                  pointerEvents: 'none',
                }}
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />

              <div className="end-overlay" />

              <div className="end-content">
                <motion.p
                  className="end-quote"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  "Life isn't measured by the miles you travel…<br />
                  but by the memories you bring back."
                </motion.p>

                <motion.h2
                  className="end-birthday"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75, duration: 0.8 }}
                >
                  Happy Birthday, Sheetal ❤️
                </motion.h2>

                <motion.p
                  className="end-message"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  May this year take you to places you've always dreamed of, bring unforgettable memories,
                  help you achieve your goals, and give you countless reasons to smile.
                </motion.p>

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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ending screen */}
      <AnimatePresence>
        {showEnding && (
          <motion.div
            className="ending-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.p
              className="ending-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              See you on your next adventure 🌄
            </motion.p>
            <motion.p
              style={{ fontFamily: 'Caveat, cursive', fontSize: '1.5rem', color: '#C9A84C' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              — With love ❤️
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
