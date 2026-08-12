import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import credentials from '../data/credentials.json';
import StarField from './StarField';

export default function LoginStep({ onSuccess }) {
  const [name, setName] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [error, setError] = useState('');
  const [shaking, setShaking] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const match = credentials.users.find(
      (u) =>
        u.name.toLowerCase().trim() === name.toLowerCase().trim() &&
        u.secretKey === secretKey.trim()
    );

    if (match) {
      setLoading(true);
      setTimeout(onSuccess, 1000);
    } else {
      setError('Hmm, those details don\'t match. Try again.');
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
    }
  };

  return (
    <motion.div
      className="login-step"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 1 }}
    >
      <StarField visible />

      {/* Atmospheric overlay */}
      <div className="login-overlay" />

      {/* Floating mountain silhouettes */}
      <svg className="login-mountains" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          d="M0,320 L120,180 L240,260 L400,120 L560,200 L720,80 L880,160 L1040,100 L1200,200 L1360,140 L1440,180 L1440,320 Z"
          fill="rgba(201,168,76,0.07)"
        />
        <path
          d="M0,320 L180,220 L360,280 L540,160 L720,240 L900,140 L1080,220 L1260,160 L1440,220 L1440,320 Z"
          fill="rgba(255,255,255,0.03)"
        />
      </svg>

      <div className="login-content">
        {/* Icon */}
        <motion.div
          className="login-icon"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: 'spring', bounce: 0.4 }}
        >
          ⭐
        </motion.div>

        {/* Title */}
        <motion.h1
          className="login-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{ fontSize: '1.8rem', fontFamily: 'Lato, sans-serif' }}
        >
          Feedback Portal
        </motion.h1>

        <motion.p
          className="login-subtitle"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Please login to submit your product review.
        </motion.p>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="login-form"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          animate={shaking ? { x: [-10, 10, -8, 8, -4, 4, 0] } : { opacity: 1, y: 0 }}
        >
          <div className="login-field">
            <label className="login-label">Name</label>
            <input
              type="text"
              className="login-input"
              placeholder=""
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              autoComplete="off"
              autoCapitalize="words"
            />
          </div>

          <div className="login-field">
            <label className="login-label">Access Code</label>
            <input
              type="password"
              className="login-input"
              placeholder=""
              value={secretKey}
              onChange={(e) => { setSecretKey(e.target.value); setError(''); }}
              autoComplete="off"
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                className="login-error"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            className="login-btn"
            disabled={loading}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {loading ? (
              <span className="login-btn-loading">Authenticating…</span>
            ) : (
              'Login'
            )}
          </motion.button>
        </motion.form>

        <motion.p
          className="login-footer-note"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          style={{ fontFamily: 'Lato, sans-serif' }}
        >
          Secure Customer Portal
        </motion.p>
      </div>
    </motion.div>
  );
}
