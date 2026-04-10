'use client';

import React, { useEffect, useRef, useState } from 'react';

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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : `translateY(${distance}px)`,
        transition: `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </Tag>
  );
}
