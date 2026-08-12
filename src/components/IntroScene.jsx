import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoginStep from './LoginStep';
import ReviewStep from './ReviewStep';
import CandleStep from './CandleStep';
import OutroStep from './OutroStep';

/**
 * IntroScene orchestrates the full opening sequence:
 * login → review → candle → outro → onComplete (journal)
 */
export default function IntroScene({ onComplete }) {
  const [step, setStep] = useState('login'); // login | review | candle | outro

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: '#080b14' }}>
      <AnimatePresence mode="wait">
        {step === 'login' && (
          <LoginStep key="login" onSuccess={() => setStep('review')} />
        )}
        {step === 'review' && (
          <ReviewStep key="review" onComplete={() => setStep('candle')} />
        )}
        {step === 'candle' && (
          <CandleStep key="candle" onComplete={() => setStep('outro')} />
        )}
        {step === 'outro' && (
          <OutroStep key="outro" onComplete={onComplete} />
        )}
      </AnimatePresence>
    </div>
  );
}
