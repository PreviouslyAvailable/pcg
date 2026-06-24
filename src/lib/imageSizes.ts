/** Shared `sizes` values for `next/image` with `fill`. */
export const IMAGE_SIZES = {
  viewport: '100vw',
  halfViewport: '(max-width: 1024px) 100vw, 50vw',
  gridThird: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  featureCard: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 662px',
  postCard: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px',
  pageHero: '(max-width: 1024px) 100vw, 558px',
  office: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px',
  team: '(max-width: 1024px) 50vw, 33vw',
  caseStudy: '(max-width: 1024px) 100vw, 774px',
  postHero: '(max-width: 1024px) 100vw, 1200px',
} as const;
