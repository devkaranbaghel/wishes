import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';

import IntroScene from './components/IntroScene';
import JournalCover from './components/JournalCover';
import BookSpread from './components/JournalSpread';
import EndPage from './components/EndPage';
import StarField from './components/StarField';

// Chapter images
import img1 from './assets/images/chapter1.png';
import img2 from './assets/images/chapter2.jpg';
import img3 from './assets/images/chapter3.jpg';
import img4 from './assets/images/chapter4.jpg';
import img5 from './assets/images/chapter5.jpg';
import imgEnd from './assets/images/endpage.png';

// ── Chapter Data ──────────────────────────────────────────────────────────────
const CHAPTERS = [
  {
    id: 'ch1',
    image: img1,
    chapterNum: 'Chapter  01',
    title: 'Every Road Begins Somewhere',
    message:
      'The open road stretched ahead, and she rode toward the mountains with nothing but a full tank, a light heart, and the whole world waiting.',
    note: '— The days that become stories you tell forever 🏔️',
    symbol: '🏍️',
  },
  {
    id: 'ch2',
    image: img2,
    chapterNum: 'Chapter  02',
    title: 'Mountains Reward the Adventurous',
    message:
      'She parked at the viewpoint, raised her DSLR, and let the mountains fill the frame. May every peak reward you with a view worth capturing.',
    note: '— Stop often. The best moments aren\'t at the destination 📷',
    symbol: '⛰️',
  },
  {
    id: 'ch3',
    image: img3,
    chapterNum: 'Chapter  03',
    title: 'The Climb That Changes You',
    message:
      'Deeper into the mountains she went — trail rising beneath her boots, peaks sharp against the sky. Growth happens just beyond comfort.',
    note: '— The rugged paths lead to the most breathtaking views 🌄',
    symbol: '🎒',
  },
  {
    id: 'ch4',
    image: img4,
    chapterNum: 'Chapter  04',
    title: 'The Ocean Knows How to Rest',
    message:
      'After every climb comes a shore. She sat by the ocean as the sun melted into the sea. May you always find your ocean after every mountain.',
    note: '— Sit still. Let the waves wash over you 🌊',
    symbol: '🌅',
  },
  {
    id: 'ch5',
    image: img5,
    chapterNum: 'Chapter  05',
    title: 'Campfire Stories Under the Stars',
    message:
      'The tent glowed orange, the fire crackled, and her Royal Enfield stood guard. She cooked a simple meal that tasted like freedom.',
    note: '— The best table is beside a fire under a sky full of stars 🔥',
    symbol: '⛺',
    bucketList: [
      { text: 'More Trips',         done: true },
      { text: 'Beautiful Sunrises', done: true },
      { text: 'Amazing Memories',   done: true },
      { text: 'Dreams Achieved',    done: true },
      { text: 'Countless Smiles',   done: true },
      { text: 'Never Stop Exploring', done: true },
      { text: '...',                done: false },
    ],
  },
];

const JOURNAL_PAGES = [
  { id: 'cover', isCover: true },
  ...CHAPTERS
];

// ── Sections: all chapters stacked in one spot ────────────────────────────────
function ChaptersContainer() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={containerRef}
      style={{ height: `calc(${JOURNAL_PAGES.length * 120}vh + 100vh)`, position: 'relative' }}
      id="chapters-container"
    >
      {/* Invisible markers for scroll progress detection (dots) */}
      {JOURNAL_PAGES.map((page, i) => (
        <div
          key={`marker-${i}`}
          className="scroll-section-marker"
          style={{
            position: 'absolute',
            top: `${i * 120}vh`,
            height: '120vh',
            width: '10px',
            pointerEvents: 'none'
          }}
          id={page.id}
        />
      ))}

      {/* End Page marker to highlight the final dot when fully scrolled */}
      <div
        className="scroll-section-marker"
        style={{
          position: 'absolute',
          top: `${JOURNAL_PAGES.length * 120}vh`,
          height: '10px',
          width: '10px',
          pointerEvents: 'none'
        }}
        id="end"
      />

      {/* The sticky container that holds ALL pages in place */}
      <div className="sticky-journal">
        {/* End Page Spread sits at the very bottom (z-index 0) */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 0 }}>
          <div className="book-spread" style={{ background: 'transparent', filter: 'drop-shadow(0 30px 55px rgba(0,0,0,0.75))' }}>
            {/* Book spine center shadow strip */}
            <div className="book-spine" />
            {/* Left page: End Page content */}
            <div className="page-left-static" style={{ background: 'transparent' }}>
              <EndPage />
            </div>
            
            {/* Right page: Empty */}
            <div className="right-page-wrapper" style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ position: 'absolute', inset: 0, background: 'transparent' }} />
            </div>
          </div>
        </div>

        {JOURNAL_PAGES.map((page, i) => (
          <MappedChapter
            key={page.id}
            chapter={page}
            index={i}
            total={JOURNAL_PAGES.length}
            globalProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}

function MappedChapter({ chapter, index, total, globalProgress }) {
  // Each chapter takes an equal slice of the global scroll progress
  const slice = 1 / total;
  const start = index * slice;
  const end = (index + 1) * slice;

  // Local progress goes 0->1 only during this chapter's slice
  const localProgress = useTransform(globalProgress, [start, end], [0, 1]);
  
  // Feature: if page turned more than 40% (0.45), auto-complete the turn to 1.
  const snappedProgress = useTransform(localProgress, (v) => v > 0.45 ? 1 : v);
  
  const nextChapter = index < total - 1 ? JOURNAL_PAGES[index + 1] : null;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100 - index, // Early chapters are on top
        pointerEvents: 'none', // Let clicks pass through empty space
      }}
    >
      <motion.div style={{ pointerEvents: useTransform(localProgress, v => v >= 0.99 ? 'none' : 'auto') }}>
        <BookSpread
          scrollYProgress={snappedProgress}
          currentChapter={chapter}
          nextChapter={nextChapter}
        />
      </motion.div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [journeyStarted, setJourneyStarted] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  // Lenis smooth scroll (only after journey starts)
  useEffect(() => {
    if (!journeyStarted) return;

    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleScroll = () => {
      // Find all markers (cover, chapter markers, end page)
      const sections = document.querySelectorAll('.scroll-section-marker, .scroll-section.single-page');
      const triggerY = window.innerHeight * 0.4; // 40% down the screen
      let found = 0;
      
      sections.forEach((sec, i) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= triggerY) {
          found = i;
        }
      });
      setActiveSection(found);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [journeyStarted]);

  const totalSections = CHAPTERS.length + 2; // cover + chapters + end

  return (
    <div>
      {/* Intro */}
      <AnimatePresence>
        {!journeyStarted && (
          <IntroScene onComplete={() => setJourneyStarted(true)} />
        )}
      </AnimatePresence>

      {journeyStarted && <StarField visible />}

      <AnimatePresence>
        {journeyStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            {/* Gold progress bar */}
            <ProgressBar />

            {/* Chapter indicator dots (Cover + Chapters + End Page) */}
            <ChapterIndicator active={activeSection} total={JOURNAL_PAGES.length + 1} />

            {/* ── ALL Pages (Cover -> Chapters -> End) stacked in one spot ── */}
            <ChaptersContainer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Progress Bar ──────────────────────────────────────────────────────────────
function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return <motion.div className="progress-bar" style={{ scaleX }} />;
}

// ── Chapter Dots ──────────────────────────────────────────────────────────────
function ChapterIndicator({ active, total }) {
  return (
    <div className="chapter-indicator" role="navigation" aria-label="Journey progress">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`indicator-dot${i === active ? ' active' : ''}`}
          title={`Section ${i + 1}`}
        />
      ))}
    </div>
  );
}
