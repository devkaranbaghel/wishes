import { motion, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import endpageImg from '../assets/images/endpage.png';

/**
 * BookSpread
 *
 * Uses the journal-page.css pattern exactly:
 *
 *   .journal-page-wrapper  { perspective: 1200px }
 *   .journal-page          { transform-style: preserve-3d; transform-origin: left center }
 *   .page-front            { backface-visibility: hidden }
 *   .page-back             { backface-visibility: hidden; transform: rotateY(180deg) }
 *
 * The book is two halves:
 *   LEFT:  .page-left-static  — fixed, always shows left half of panoramic image
 *   RIGHT: .right-page-wrapper > .journal-page — the 3D card that flips
 *
 * Scroll drives rotateY on .journal-page: 0° → -180°
 * At exactly 90°, the right half underneath swaps to next chapter content (pastHalf).
 */
import JournalCover from './JournalCover';
import EndPage from './EndPage';

export default function BookSpread({ scrollYProgress, currentChapter, nextChapter }) {

  // ── Motion values ───────────────────────────────────────────────────────
  const smooth = useSpring(scrollYProgress, { stiffness: 50, damping: 16 });

  // Main flip: rotateY 0° → -180° (left-to-right page turn around spine)
  const rotateY = useTransform(smooth, [0.15, 0.90], [0, -180]);

  // Shadow on the LEFT page as right page lifts away
  const leftShadowOpacity = useTransform(smooth, [0.15, 0.50, 0.52, 0.90], [0, 0.45, 0, 0]);

  // Curl shadow on front face — peaks at 90°, gone after
  const curlShadowOpacity = useTransform(smooth, [0.15, 0.50, 0.52], [0, 0.65, 0]);

  // Fold crease at spine — bright line
  const foldLineOpacity = useTransform(smooth, [0.15, 0.40, 0.52, 0.90], [0, 0.90, 0.90, 0]);

  // Whole spread fades out as flip finishes (transition to next chapter section)
  const spreadOpacity = useTransform(smooth, [0.92, 1.0], [1, 0]);

  // ── State ───────────────────────────────────────────────────────────────
  // pastHalf: true when the flipper has crossed 90° (back face now showing)
  const [pastHalf, setPastHalf] = useState(false);
  const [tickedCount, setTickedCount] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      // Angle from 0 to 180 maps scroll [0.15 → 0.90]
      const angle = ((Math.max(0, v - 0.15)) / 0.75) * 180;
      setPastHalf(angle >= 90);

      if (currentChapter.bucketList && v > 0.01 && v < 0.14) {
        const frac = (v - 0.01) / 0.13;
        setTickedCount(Math.min(
          Math.floor(frac * currentChapter.bucketList.length) + 1,
          currentChapter.bucketList.length
        ));
      }
    });
    return unsub;
  }, [scrollYProgress, currentChapter.bucketList]);

  return (
    <motion.div style={{ opacity: spreadOpacity }}>
      {/*
        .book-spread — the full open book
        drop-shadow applied here (NOT on children to avoid 3D issues)
      */}
      <div className="book-spread">

        {/* ═══════════════════════════════════════════════
            LEFT PAGE — always visible, never moves
        ═══════════════════════════════════════════════ */}
        <div className="page-left-static" style={{ background: currentChapter.isCover ? '#0d0d1a' : 'transparent' }}>
          {/* Background image for left page */}
          {!currentChapter.isCover ? (
            <img
              src={pastHalf && nextChapter ? nextChapter.image : currentChapter.image}
              alt={pastHalf && nextChapter ? nextChapter.title : currentChapter.title}
            />
          ) : null}

          {/* Text overlay at top of left page */}
          {(!currentChapter.isCover || pastHalf) && (
            <div className="page-text-overlay">
              {pastHalf && nextChapter && !nextChapter.isEnd ? (
                <motion.div key="next-left" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
                  <span className="txt-chapter-num">{nextChapter.chapterNum}</span>
                  <h2 className="txt-title" style={{ marginTop: '0.3rem' }}>{nextChapter.title}</h2>
                  <div className="txt-divider" />
                  <p className="txt-message">{nextChapter.message}</p>
                </motion.div>
              ) : !pastHalf && !currentChapter.isCover && !currentChapter.isEnd ? (
                <motion.div key="cur-left" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}>
                  <span className="txt-chapter-num">{currentChapter.chapterNum}</span>
                  <h2 className="txt-title" style={{ marginTop: '0.3rem' }}>{currentChapter.title}</h2>
                  <div className="txt-divider" />
                  <p className="txt-message">{currentChapter.message}</p>
                </motion.div>
              ) : null}
            </div>
          )}

          {/* Shadow cast by lifting right page */}
          <motion.div
            className="left-page-shadow"
            style={{ opacity: leftShadowOpacity }}
          />
        </div>

        {/* ═══════════════════════════════════════════════
            STATIC RIGHT PAGE (Underneath the flipper)
            Prevents the "Frankenstein stitch" by blocking the view of the next 
            chapter's right side until the flipper crosses 90 degrees.
        ═══════════════════════════════════════════════ */}
        {!pastHalf && (
          <div style={{ position: 'absolute', right: 0, width: '50%', height: '100%', overflow: 'hidden', borderRadius: '0 8px 8px 0', zIndex: 1 }}>
            {currentChapter.isCover ? (
              // When cover lifts, you see Chapter 1 Right underneath!
              <img src={nextChapter.image} alt="" style={{ position: 'absolute', top: 0, left: '-100%', width: '200%', height: '100%', objectFit: 'cover', objectPosition: 'right center' }} />
            ) : !nextChapter ? (
              // Last chapter flipping - reveal empty right side
              <div style={{ position: 'absolute', inset: 0, background: 'transparent' }} />
            ) : (
              // Normal chapter right side
              <img src={currentChapter.image} alt="" style={{ position: 'absolute', top: 0, left: '-100%', width: '200%', height: '100%', objectFit: 'cover', objectPosition: 'right center' }} />
            )}
            {/* Subtle shadow to imply it's underneath */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} />
          </div>
        )}

        {/* ═══════════════════════════════════════════════
            RIGHT PAGE — the flipping card
            .right-page-wrapper: perspective: 1200px
            .journal-page: transform-style preserve-3d, flips via rotateY
        ═══════════════════════════════════════════════ */}
        <div className="right-page-wrapper" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            className="journal-page"
            style={{ rotateY }}
          >
            {/* ── FRONT FACE (.page-front) ────────────────────── */}
            <div className="page-front" style={{ padding: currentChapter.isCover || currentChapter.isEnd ? 0 : undefined }}>
              {currentChapter.isCover ? (
                <JournalCover />
              ) : currentChapter.isEnd ? (
                <EndPage />
              ) : (
                <>
                  <img src={currentChapter.image} alt={currentChapter.title} aria-hidden />
                  <div className="page-text-right">
                    <RightPageContent chapter={currentChapter} tickedCount={tickedCount} />
                  </div>
                </>
              )}

              {/* Fold crease at spine (left edge) */}
              <motion.div className="fold-crease" style={{ opacity: foldLineOpacity }} />
              {/* Curl shadow */}
              <motion.div className="curl-shadow" style={{ opacity: curlShadowOpacity }} />
              
              {/* Page number */}
              {!currentChapter.isCover && !currentChapter.isEnd && (
                <div className="page-number" style={{ position: 'absolute', bottom: '1.2rem', right: '1.8rem', fontFamily: "'Caveat', cursive", fontSize: '1rem', color: 'rgba(245,241,232,0.5)', zIndex: 5 }}>
                  {currentChapter.chapterNum}
                </div>
              )}
            </div>

            {/* ── BACK FACE (.page-back) ─────────────────────── */}
            <div className="page-back">
              <div className="back-face-corrector">
                {nextChapter ? (
                  <>
                    <img src={nextChapter.image} alt={nextChapter.title} aria-hidden />
                    {/* Next chapter left-page text */}
                    <div className="page-text-overlay">
                      <span className="txt-chapter-num">{nextChapter.chapterNum}</span>
                      <h2 className="txt-title" style={{ marginTop: '0.3rem' }}>{nextChapter.title}</h2>
                      <div className="txt-divider" />
                      <p className="txt-message" style={{ marginTop: '1.2rem', maxWidth: '85%' }}>{nextChapter.message}</p>
                    </div>
                  </>
                ) : (
                  /* Last chapter flips to reveal End Page */
                  <div style={{ position: 'absolute', inset: 0, background: 'transparent' }}>
                    <EndPage interactive={false} />
                  </div>
                )}
              </div>
              <div className="back-spine-shadow" />
            </div>

          </motion.div>{/* end .journal-page */}
        </div>{/* end .right-page-wrapper */}

        {/* Book spine center shadow */}
        <div className="book-spine" />

        {/* Page edges thickness strip */}
        <div className="page-edges" />

      </div>{/* end .book-spread */}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   Right page content: note text OR bucket list
───────────────────────────────────────────────────────── */
function RightPageContent({ chapter, tickedCount }) {
  if (chapter.bucketList) {
    return (
      <motion.ul
        className="bucket-list"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {chapter.bucketList.map((item, i) => {
          const ticked = i < tickedCount;
          const isPending = item.text === '...';
          return (
            <motion.li
              key={i}
              className={`bucket-item${(!ticked || isPending) ? ' pending' : ''}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.10 }}
            >
              <span className="bucket-check">{ticked && !isPending ? '✓' : ''}</span>
              <span style={{
                textDecoration: (ticked && !isPending) ? 'line-through' : 'none',
                opacity: isPending ? 0.45 : 1,
                fontStyle: isPending ? 'italic' : 'normal',
              }}>{item.text}</span>
            </motion.li>
          );
        })}
      </motion.ul>
    );
  }
  if (chapter.note) {
    return (
      <motion.p
        className="txt-note"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
      >
        {chapter.note}
      </motion.p>
    );
  }
  return null;
}
