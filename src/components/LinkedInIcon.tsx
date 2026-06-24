'use client';

import { useId } from 'react';

interface LinkedInIconProps {
  href: string;
  name?: string;
  label?: string;
  className?: string;
  size?: 'default' | 'sm';
}

export default function LinkedInIcon({
  href,
  name,
  label,
  className = '',
  size = 'default',
}: LinkedInIconProps) {
  const clipId = useId();
  const dimension = size === 'sm' ? 32 : 41;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-full bg-ink hover:bg-ink/80 transition-colors shrink-0 ${size === 'sm' ? 'size-8' : 'size-[41px]'} ${className}`}
      aria-label={label ?? (name ? `View ${name} on LinkedIn` : 'View on LinkedIn')}
    >
      <svg width={dimension} height={dimension} viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g clipPath={`url(#${clipId})`}>
          <path d="M28.2073 26.7297H28.2111V21.2148C28.2111 18.5173 27.6303 16.4395 24.4767 16.4395C22.9609 16.4395 21.9434 17.2714 21.5282 18.0601H21.4841V16.6911H18.4941V26.7297H21.6069V21.7587C21.6069 20.4499 21.8547 19.1845 23.4754 19.1845C25.0723 19.1845 25.0961 20.6781 25.0961 21.8427V26.7297H28.2073Z" fill="white" />
          <path d="M13.6128 16.6914H16.7299V26.7291H13.6128V16.6914Z" fill="white" />
          <path d="M15.1701 11.6943C14.6914 11.6945 14.2322 11.8848 13.8937 12.2233C13.5552 12.5618 13.3649 13.0209 13.3647 13.4997C13.3647 14.4964 14.1735 15.3221 15.1701 15.3221C16.1668 15.3221 16.9767 14.4964 16.9767 13.4997C16.9762 13.0208 16.7857 12.5617 16.447 12.2232C16.1082 11.8847 15.649 11.6945 15.1701 11.6943Z" fill="white" />
        </g>
        <defs>
          <clipPath id={clipId}>
            <rect width="15.0351" height="15.0351" fill="white" transform="translate(13.3647 11.6943)" />
          </clipPath>
        </defs>
      </svg>
    </a>
  );
}
