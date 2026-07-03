import type { PortableTextBlock } from '@portabletext/react';
import BodyText from './BodyText';

interface CmsBodyProps {
  /** Portable Text array from Sanity, or a plain string, or undefined. */
  value?: PortableTextBlock[] | string;
  scheme?: 'dark' | 'light';
  /** Classes applied to the Portable Text wrapper. */
  className?: string;
  /** Classes applied to the plain-string / fallback paragraph. */
  fallbackClassName?: string;
  /** Rendered when `value` is not usable Portable Text and not a string. */
  fallback?: React.ReactNode;
}

/**
 * Renders CMS rich text when available, otherwise a plain paragraph.
 * Consolidates the `Array.isArray(body) ? <BodyText/> : <p/>` pattern used across pages.
 */
export default function CmsBody({
  value,
  scheme = 'light',
  className,
  fallbackClassName,
  fallback = null,
}: CmsBodyProps) {
  if (Array.isArray(value) && value.length > 0) {
    return <BodyText value={value} scheme={scheme} className={className} />;
  }

  return <p className={fallbackClassName}>{typeof value === 'string' ? value : fallback}</p>;
}
