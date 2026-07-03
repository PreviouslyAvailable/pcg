'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

function subscribeReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

interface CountUpProps {
  value?: string;
  duration?: number;   // ms
  threshold?: number;  // 0–1
  className?: string;
  animate?: boolean;   // opt a value out of the count-up
}

// easeOutExpo — fast start, gentle settle at the top number
function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export default function CountUp({
  value = '',
  duration = 2400,
  threshold = 0.4,
  className,
  animate = true,
}: CountUpProps) {
  // Split into: leading prefix, the numeric group, trailing suffix.
  const match = value.match(/^(\D*)([\d,]+)(.*)$/);
  const hasCommas = match ? match[2].includes(',') : false;
  const target = match ? parseInt(match[2].replace(/,/g, ''), 10) : NaN;
  // Only animate a single, clean number (skip ranges like "$5–75M" whose suffix still holds a digit).
  const animatable = animate && !!match && Number.isFinite(target) && !/\d/.test(match[3]);

  const prefix = match ? match[1] : '';
  const suffix = match ? match[3] : '';

  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );

  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!animatable || reduceMotion) return;

    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let started = false;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        setCurrent(Math.round(easeOutExpo(progress) * target));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          run();
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [animatable, reduceMotion, target, duration, threshold]);

  if (!animatable) {
    return <span className={className}>{value}</span>;
  }

  const shown = reduceMotion ? target : current;
  const formatted = hasCommas ? shown.toLocaleString('en-US') : String(shown);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
