import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarField from './StarField';

export default function IntroScene({ onComplete }) {
  const [blown, setBlown] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);
  const [fading, setFading] = useState(false);
  const smokeTimer = useRef(null);

  const blowCandle = () => {
    if (blown) return;
    setBlown(true);
    setShowSmoke(true);
    smokeTimer.current = setTimeout(() => {
      setFading(true);
      setTimeout(onComplete, 1200);
    }, 1800);
  };

  useEffect(() => () => clearTimeout(smokeTimer.current), []);

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
        >
          <StarField visible />

          <motion.p
            className="intro-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            One Wish…
          </motion.p>

          {/* Cake */}
          <motion.div
            className="cake-wrapper"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.7, type: 'spring', bounce: 0.4 }}
            onClick={blowCandle}
            role="button"
            aria-label="Blow the candle"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && blowCandle()}
          >
            {/* Candle + Flame */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="candle">
                {/* Flame */}
                <AnimatePresence>
                  {!blown && (
                    <motion.div
                      className="flame"
                      key="flame"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flame-inner" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Smoke */}
                <AnimatePresence>
                  {showSmoke && (
                    <>
                      {[0, 1, 2, 3, 4].map((i) => (
                        <motion.div
                          key={i}
                          className="smoke-particle"
                          style={{
                            '--drift': `${(i - 2) * 8}px`,
                            left: `${30 + i * 8}%`,
                            animationDelay: `${i * 0.15}s`,
                          }}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Cake body */}
            <div className="cake-base">
              <div className="cake-top">
                <div className="frosting" />
              </div>
              <div className="cake-middle">
                <span className="cake-text" style={{ color: '#fff', fontFamily: 'Caveat, cursive' }}>
                  Happy Birthday
                </span>
              </div>
              <div className="cake-bottom">
                <span className="cake-text">Sheetal 🎂</span>
              </div>
            </div>
          </motion.div>

          <motion.p
            className="blow-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: blown ? 0 : 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            onClick={blowCandle}
          >
            🌬️ Blow the Candle
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
