import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

/**
 * Hook: Initializes Lenis smooth scroll and returns current scrollY.
 */
export function useSmoothScroll() {
  const [scrollY, setScrollY] = useState(0);
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ({ scroll }) => {
      setScrollY(scroll);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return scrollY;
}

/**
 * Hook: Returns a 0-1 progress value for a DOM element as it scrolls through its section.
 * @param {React.RefObject} ref - ref to the scroll section element
 * @param {number} scrollY - current scroll position
 */
export function useSectionProgress(ref, scrollY) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const { top, height } = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    // section top in page coords
    const sectionTop = scrollY + top;
    const scrollable = height - windowHeight;
    const raw = scrollable > 0 ? (scrollY - sectionTop) / scrollable : 0;
    setProgress(Math.max(0, Math.min(1, raw)));
  }, [scrollY, ref]);

  return progress;
}
