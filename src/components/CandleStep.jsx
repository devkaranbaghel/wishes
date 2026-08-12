import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Particle spark component for atmospheric effect
function Particle({ x, y, delay }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 4,
        height: 4,
        borderRadius: '50%',
        background: 'rgba(255, 200, 80, 0.8)',
        boxShadow: '0 0 6px rgba(255,180,50,0.9)',
        pointerEvents: 'none',
      }}
      initial={{ opacity: 0, scale: 0, y: 0 }}
      animate={{
        opacity: [0, 0.9, 0],
        scale: [0, 1, 0],
        y: [0, -40 - Math.random() * 40],
        x: [(Math.random() - 0.5) * 30],
      }}
      transition={{
        duration: 1.5 + Math.random(),
        repeat: Infinity,
        delay,
        ease: 'easeOut',
      }}
    />
  );
}

// Animated candle flame using CSS + framer-motion
function CandleFlame({ blown }) {
  return (
    <div className="candle-flame-wrapper">
      <AnimatePresence>
        {!blown && (
          <motion.div
            className="candle-flame"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{
              scaleY: [1, 1.4, 0.2, 0],
              scaleX: [1, 0.5, 1.5, 0],
              opacity: [1, 0.8, 0.4, 0],
              x: [0, 8, -5, 0],
            }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="flame-inner" />
            <div className="flame-core" />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Glow ring below flame */}
      <AnimatePresence>
        {!blown && (
          <motion.div
            className="candle-glow"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CandleStep({ onComplete }) {
  const [phase, setPhase] = useState('text1'); // text1 | text2 | text3 | interactive | blown | fadeout
  const [holding, setHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const holdTimer = useRef(null);
  const progressTimer = useRef(null);

  // Text sequence
  useEffect(() => {
    const timings = {
      text1: 2200,
      text2: 2000,
      text3: 2000,
    };

    if (phase === 'text1') {
      const t = setTimeout(() => setPhase('text2'), timings.text1);
      return () => clearTimeout(t);
    }
    if (phase === 'text2') {
      const t = setTimeout(() => setPhase('text3'), timings.text2);
      return () => clearTimeout(t);
    }
    if (phase === 'text3') {
      const t = setTimeout(() => setPhase('interactive'), timings.text3);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // Hold-to-blow interaction
  const startHold = () => {
    if (phase !== 'interactive') return;
    setHolding(true);
    setHoldProgress(0);

    let progress = 0;
    progressTimer.current = setInterval(() => {
      progress += 4;
      setHoldProgress(progress);
      if (progress >= 100) {
        clearInterval(progressTimer.current);
        handleBlow();
      }
    }, 30);
  };

  const cancelHold = () => {
    setHolding(false);
    clearInterval(progressTimer.current);
    // Fade back down
    let p = holdProgress;
    const drain = setInterval(() => {
      p -= 8;
      if (p <= 0) {
        clearInterval(drain);
        setHoldProgress(0);
      } else {
        setHoldProgress(p);
      }
    }, 20);
  };

  const handleBlow = () => {
    setHolding(false);
    setPhase('blown');
    setTimeout(() => setPhase('fadeout'), 1200);
    setTimeout(() => onComplete(), 2800);
  };

  const particles = Array.from({ length: 12 }, (_, i) => ({
    x: `${38 + Math.random() * 24}%`,
    y: `${30 + Math.random() * 20}%`,
    delay: i * 0.18,
  }));

  return (
    <motion.div
      className="candle-step"
      initial={{ opacity: 0 }}
      animate={{ opacity: phase === 'fadeout' ? 0 : 1 }}
      transition={{ duration: phase === 'fadeout' ? 1.5 : 1 }}
    >
      {/* Dark cinematic vignette */}
      <div className="candle-vignette" />

      {/* Atmospheric glow from candle */}
      <AnimatePresence>
        {phase !== 'blown' && phase !== 'fadeout' && (
          <motion.div
            className="candle-ambient-glow"
            animate={{
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.08, 1],
            }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Floating particles around flame */}
      {phase === 'interactive' && particles.map((p, i) => (
        <Particle key={i} x={p.x} y={p.y} delay={p.delay} />
      ))}

      {/* ─── Cake ─── */}
      <div className="cake-wrapper">
        {/* Candle */}
        <div className="candle-stick">
          <CandleFlame blown={phase === 'blown' || phase === 'fadeout'} />
        </div>

        {/* Cake body */}
        <div className="cake-body">
          <div className="cake-top-layer">
            <div className="cake-frosting-drip" />
          </div>
          <div className="cake-mid-layer" />
          <div className="cake-bottom-layer">
            <div className="cake-bottom-frosting" />
          </div>
          <div className="cake-plate" />
        </div>
      </div>

      {/* ─── Text Messages ─── */}
      <div className="candle-messages">
        <AnimatePresence mode="wait">
          {phase === 'text1' && (
            <motion.p
              key="text1"
              className="candle-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.7 }}
            >
              Before you see what's next…
            </motion.p>
          )}
          {phase === 'text2' && (
            <motion.p
              key="text2"
              className="candle-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.7 }}
            >
              Make a wish ✨
            </motion.p>
          )}
          {phase === 'text3' && (
            <motion.p
              key="text3"
              className="candle-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.7 }}
            >
              Now… blow out the candle 🕯️
            </motion.p>
          )}
          {phase === 'interactive' && (
            <motion.div
              key="interactive"
              className="candle-blow-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="candle-text-small">Hold the button to blow</p>

              {/* Blow button with progress ring */}
              <div className="blow-btn-wrapper">
                <svg className="blow-progress-ring" viewBox="0 0 88 88">
                  <circle
                    cx="44" cy="44" r="38"
                    fill="none"
                    stroke="rgba(201,168,76,0.2)"
                    strokeWidth="4"
                  />
                  <circle
                    cx="44" cy="44" r="38"
                    fill="none"
                    stroke="#C9A84C"
                    strokeWidth="4"
                    strokeDasharray={`${2 * Math.PI * 38}`}
                    strokeDashoffset={`${2 * Math.PI * 38 * (1 - holdProgress / 100)}`}
                    strokeLinecap="round"
                    transform="rotate(-90 44 44)"
                    style={{ transition: 'stroke-dashoffset 0.03s linear' }}
                  />
                </svg>
                <motion.button
                  className="blow-btn"
                  onPointerDown={startHold}
                  onPointerUp={cancelHold}
                  onPointerLeave={cancelHold}
                  whileTap={{ scale: 0.95 }}
                  animate={holding ? { scale: 1.05 } : { scale: 1 }}
                >
                  💨
                </motion.button>
              </div>

              <p className="candle-text-tiny">
                {holding ? 'Blowing… 💨' : 'Tap & hold 💨'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
