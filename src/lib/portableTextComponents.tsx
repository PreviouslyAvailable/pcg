import Image from 'next/image';
import type { PortableTextComponents } from '@portabletext/react';
import { PortableTextLink } from '@/lib/portableText';
import { urlFor } from '@/sanity/image';

type ColorScheme = 'dark' | 'light';

export function bodyTextComponents(scheme: ColorScheme): PortableTextComponents {
  const textColor = scheme === 'dark' ? 'text-white' : 'text-ink';
  const paragraphClass =
    scheme === 'dark'
      ? `font-nav text-[16px] leading-[1.3] mb-4 max-w-[348px] ${textColor}`
      : `font-nav text-[16px] leading-[1.3] mb-4 ${textColor}`;

  return {
    block: {
      normal: ({ children }) => <p className={paragraphClass}>{children}</p>,
    },
    list: {
      bullet: ({ children }) => <ul className="space-y-1 mb-6">{children}</ul>,
    },
    listItem: {
      bullet: ({ children }) => (
        <li className={`font-nav text-[16px] leading-[1.3] flex gap-2 ${textColor}`}>
          <span className={`mt-[6px] shrink-0 size-[5px] rounded-full ${scheme === 'dark' ? 'bg-white/70' : 'bg-ink/50'}`} />
          <span>{children}</span>
        </li>
      ),
    },
    marks: {
      strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
      link: PortableTextLink,
    },
  };
}

export const articlePortableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-nav text-ink text-[16px] leading-[1.6] mb-5">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="font-serif font-light text-ink text-[clamp(40px,4.2vw,56px)] leading-[1.05] tracking-[-0.012em] mt-14 mb-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif font-light text-ink text-[clamp(28px,3vw,38px)] leading-[1.1] tracking-[-0.01em] mt-12 mb-5">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-sans text-ink text-[24px] leading-[1.25] mt-10 mb-4">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-sans text-ink text-[20px] leading-[1.3] mt-8 mb-3">{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="font-sans text-ink text-[17px] leading-[1.3] tracking-wide uppercase mt-6 mb-2">{children}</h5>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-ink/20 pl-6 my-8 font-serif text-ink/70 text-[20px] leading-[1.4] italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside pl-5 mb-5 space-y-2 font-nav text-ink text-[16px] leading-[1.6]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside pl-5 mb-5 space-y-2 font-nav text-ink text-[16px] leading-[1.6]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: PortableTextLink,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-10">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt ?? ''}
            width={1200}
            height={675}
            style={{ width: '100%', height: 'auto' }}
            className="rounded-[12px]"
          />
          {value.caption ? (
            <figcaption className="font-sans text-[13px] text-ink/50 mt-5 text-center">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
};
