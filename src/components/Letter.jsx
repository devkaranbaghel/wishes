import { motion } from 'framer-motion';

export default function Letter({ onContinueReview }) {
  return (
    <motion.div 
      className="letter-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#f6ebe0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        color: '#4a3b32',
        fontFamily: 'Lato, sans-serif',
        zIndex: 50
      }}
    >
      {/* Abstract Shapes (SVGs) */}
      <svg style={{ position: 'absolute', top: '-15%', left: '-10%', width: '50%', opacity: 0.6 }} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#d2bba0" d="M42.7,-73.4C55.9,-66.3,67.6,-54.6,76.5,-41.2C85.4,-27.8,91.4,-12.7,89.5,1.7C87.5,16.2,77.5,29.9,67.3,42.7C57.1,55.5,46.7,67.4,33.5,74.7C20.4,81.9,4.4,84.5,-10.8,81.9C-25.9,79.3,-40.2,71.5,-52.1,61C-64,50.4,-73.6,37.1,-80.1,22.1C-86.6,7.1,-90,-9.7,-85.7,-24.5C-81.5,-39.3,-69.6,-52,-55.8,-59.8C-42.1,-67.6,-26.6,-70.6,-11.9,-73C2.8,-75.4,17.4,-77.3,29.6,-80.4L42.7,-73.4Z" transform="translate(100 100)" />
      </svg>
      <svg style={{ position: 'absolute', bottom: '-20%', right: '-15%', width: '60%', opacity: 0.5 }} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#ba9f83" d="M37.6,-66.1C47.8,-57.8,54.7,-45.3,62.9,-33.1C71.1,-20.9,80.7,-9,79.2,2C77.6,13,64.9,23.1,54.6,32.3C44.3,41.5,36.5,49.8,26.4,56.7C16.3,63.6,3.9,69.1,-7.8,69.8C-19.5,70.5,-39.1,66.4,-52,56.2C-64.8,45.9,-71,29.5,-74.6,13C-78.2,-3.5,-79.2,-20.1,-71.4,-32.2C-63.6,-44.3,-47.1,-52,-33.4,-59C-19.7,-66,-8.9,-72.3,2.6,-75.8C14,-79.3,27.3,-74.3,37.6,-66.1Z" transform="translate(100 100)" />
      </svg>

      {/* Botanical Line Art */}
      <svg style={{ position: 'absolute', bottom: '5%', right: '10%', width: '120px', height: 'auto', opacity: 0.7 }} viewBox="0 0 24 24" fill="none" stroke="#4a3b32" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22v-9" />
        <path d="M12 13c-2.5 0-5-2-5-5s2-5 5-5 5 2 5 5-2.5 5-5 5z" />
        <path d="M12 13c-1.5 0-3-1-3-3s1-3 3-3 3 1 3 3-1.5 3-3 3z" />
        <path d="M12 22c-3.5 0-6-2.5-6-6s2.5-6 6-6 6 2.5 6 6-2.5 6-6 6z" />
      </svg>
      <svg style={{ position: 'absolute', top: '10%', right: '20%', width: '40px', height: 'auto', opacity: 0.7 }} viewBox="0 0 24 24" fill="#4a3b32" stroke="#4a3b32">
        <circle cx="12" cy="12" r="3" />
        <circle cx="19" cy="5" r="2" />
        <circle cx="5" cy="19" r="2" />
        <circle cx="6" cy="6" r="1.5" />
      </svg>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="letter-paper" 
        style={{
          position: 'relative',
          zIndex: 10,
          backgroundColor: '#fffcf9',
          padding: '2.5rem 2rem 2rem',
          maxWidth: '500px',
          width: '85%',
          maxHeight: '85vh',
          overflowY: 'auto',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
          borderRadius: '4px',
          backgroundImage: 'linear-gradient(transparent 95%, rgba(139,90,43,0.1) 100%)',
          backgroundSize: '100% 1.8rem',
          lineHeight: '1.8rem',
          fontSize: '0.95rem'
        }}
      >
        {/* Tape */}
        <div style={{
          position: 'absolute',
          top: '0px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100px',
          height: '25px',
          backgroundColor: '#4a3b32',
          opacity: 0.9,
          clipPath: 'polygon(5% 0%, 95% 0%, 100% 10%, 98% 90%, 90% 100%, 10% 98%, 0% 90%, 2% 10%)'
        }}></div>

        <p style={{ marginTop: '0.5rem' }}>I hope you liked this little surprise, and that it became a small reason to make you smile on your special day. 😊</p>
        <p>This is just a little ending note to wrap everything up. I hope you also liked the things inside the box. There are a few tiny mistakes here and there because, honestly, I’m not not good in making art and craft 😅, that you are able to see now.</p>
        <p>And you might be wondering why there are two gifts. First one (the earrings) was actually my sister’s suggestion for gift. I picked them up with her when I was at home during year break, and the second one is a little birthday gift from me.</p>
        <p>I hope you’ll keep them, especially since you once told me that you’d keep a gift when I asked you about it.</p>
        <p>If this whole thing managed to put even a small smile on your face, then it has already served its purpose.</p>
        <p>Once again, <strong>Happy Birthday! 🎂✨</strong></p>
        <p>I hope this year brings you plenty of good memories, beautiful places, unexpected adventures, and lots of reasons to smile.</p>

        <div style={{ textAlign: 'center', marginTop: '2.5rem', marginBottom: '1rem' }}>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onContinueReview}
            style={{
              padding: '12px 24px',
              backgroundColor: '#4a3b32',
              color: '#f6ebe0',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              fontFamily: 'Lato, sans-serif',
              fontWeight: 'bold',
              fontSize: '1rem',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}
          >
            Continue to Review
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
