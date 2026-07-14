'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';

interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;       // ms
  duration?: number;    // ms
  distance?: number;    // px
  threshold?: number;   // 0–1
  as?: React.ElementType;
}

export default function FadeUp({
  children,
  className = '',
  delay = 0,
  duration = 700,
  distance = 36,
  threshold = 0.12,
  as: Tag = 'div',
}: FadeUpProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const visible = reduceMotion || inView;

  useEffect(() => {
    if (reduceMotion) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, reduceMotion]);

  const motionStyle = reduceMotion
    ? {}
    : {
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : `translateY(${distance}px)`,
        transition: `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: 'opacity, transform' as const,
      };

  return (
    <Tag
      ref={ref}
      data-fadeup=""
      className={className}
      style={motionStyle}
    >
      {children}
    </Tag>
  );
}
