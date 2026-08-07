import { motion } from 'framer-motion';
import coverImg from '../assets/images/cover.png';

export default function JournalCover() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <motion.div
        initial={{ scale: 0.85, opacity: 0, rotateY: -15 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        transition={{ duration: 1.1, type: 'spring', bounce: 0.25 }}
        style={{
          width: '100%',
          height: '100%',
          padding: 0,
          overflow: 'hidden',
          position: 'relative',
          borderRadius: '4px 16px 16px 4px',
          boxShadow: '-8px 0 20px rgba(0,0,0,0.6), 8px 4px 40px rgba(0,0,0,0.5)',
        }}
      >
        <img
          src={coverImg}
          alt="Front Cover"
          className="cover-img"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />

        {/* Scroll hint overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            animation: 'bounce-hint 2s ease-in-out infinite',
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', fontFamily: 'Caveat, cursive', letterSpacing: '0.05em' }}>Scroll down to open</span>
          <span style={{ color: 'rgba(255,255,255,0.8)', marginTop: '0.2rem' }}>▼</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
