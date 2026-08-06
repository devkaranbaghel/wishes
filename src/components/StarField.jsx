import { motion } from 'framer-motion';

const STAR_COUNT = 80;

const stars = Array.from({ length: STAR_COUNT }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  dur: Math.random() * 2 + 1.5,
  delay: Math.random() * 3,
}));

export default function StarField({ visible }) {
  if (!visible) return null;
  return (
    <div className="stars-overlay">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="star-dot"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 1, 0.1] }}
          transition={{
            duration: s.dur,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            '--dur': `${s.dur}s`,
          }}
        />
      ))}
    </div>
  );
}
