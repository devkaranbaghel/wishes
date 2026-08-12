import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ReviewStep({ onComplete }) {
  const [review, setReview] = useState('');
  const [triggered, setTriggered] = useState(false);

  // The moment ANY key is pressed, we fly them to the cake 🎂
  useEffect(() => {
    const handleKey = () => {
      if (!triggered) {
        setTriggered(true);
        setTimeout(onComplete, 400);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [triggered, onComplete]);

  const handleInputChange = (e) => {
    setReview(e.target.value);
    if (!triggered) {
      setTriggered(true);
      setTimeout(onComplete, 400);
    }
  };

  return (
    <motion.div
      className="review-step"
      initial={{ opacity: 0 }}
      animate={{ opacity: triggered ? 0 : 1 }}
      transition={{ duration: triggered ? 0.4 : 0.8 }}
    >
      <div className="review-overlay" />

      {/* Bokeh particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="review-bokeh"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.4}s`,
            width: `${8 + (i % 3) * 6}px`,
            height: `${8 + (i % 3) * 6}px`,
          }}
        />
      ))}

      <div className="review-content">
        <motion.div
          className="review-gift-icon"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
        >
          ⭐
        </motion.div>

        <motion.h2
          className="review-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ fontFamily: 'Lato, sans-serif' }}
        >
          Leave a Review
        </motion.h2>

        <motion.p
          className="review-subtitle"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Please share your feedback on the item you received.
        </motion.p>

        <motion.div
          className="review-input-wrapper"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <textarea
            className="review-textarea"
            placeholder="Write your review here..."
            value={review}
            onChange={handleInputChange}
            rows={3}
            autoComplete="off"
            style={{ fontFamily: 'Lato, sans-serif' }}
          />
        </motion.div>

        <motion.p
          className="review-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{ fontFamily: 'Lato, sans-serif' }}
        >
          Start typing to submit
        </motion.p>
      </div>
    </motion.div>
  );
}
