import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import StarField from './StarField';

export default function EndReview() {
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!review.trim()) {
      setError('Please write something before submitting.');
      return;
    }

    setLoading(true);
    setError('');
    const userName = localStorage.getItem('journal_userName') || 'Guest User';
    
    emailjs.send(
      'service_svest6s',
      'template_xkhuzkg',
      {
        name: userName,
        action_message: `${userName} submitted a review`,
        review_text: review
      },
      'sIYs52lV_hD13XXDW'
    ).then(() => {
      setSubmitted(true);
      setLoading(false);
    }).catch(err => {
      console.error("EmailJS error:", err);
      // Still show submitted to not block the flow
      setSubmitted(true);
      setLoading(false);
    });
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          zIndex: 60,
          background: '#080b14'
        }}
      >
        <StarField visible />
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}>
          <span style={{ fontSize: '4rem' }}>🌟</span>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.4 }}
          style={{ fontFamily: 'Lato, sans-serif', marginTop: '1rem', fontSize: '2rem' }}
        >
          Thank You!
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.6 }}
          style={{ marginTop: '0.5rem', color: '#ccc' }}
        >
          Your review has been successfully submitted. 😊
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 60,
        background: '#080b14'
      }}
    >
      <StarField visible />
      
      <div className="login-overlay" />

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '400px', padding: '2rem' }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontFamily: 'Lato, sans-serif', color: 'white', textAlign: 'center', fontSize: '1.8rem', marginBottom: '0.5rem' }}
        >
          Leave a Review
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ color: '#ccc', textAlign: 'center', marginBottom: '2rem', fontSize: '0.9rem' }}
        >
          Please share your thoughts on the journey and the gifts.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <textarea
            value={review}
            onChange={(e) => { setReview(e.target.value); setError(''); }}
            placeholder="Write your review here..."
            rows={5}
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid rgba(201,168,76,0.3)',
              background: 'rgba(255,255,255,0.05)',
              color: 'white',
              fontFamily: 'Lato, sans-serif',
              resize: 'none',
              outline: 'none',
            }}
          />
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ color: '#ff6b6b', fontSize: '0.85rem', margin: 0 }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: 'rgba(201,168,76,0.15)',
              color: '#C9A84C',
              fontFamily: 'Lato, sans-serif',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '0.5rem'
            }}
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </motion.button>
        </motion.form>
      </div>
    </motion.div>
  );
}
