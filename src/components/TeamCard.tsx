'use client';

import { useCallback, useEffect, useId, useRef, useState, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import type { TeamMember } from '@/sanity/types';
import LinkedInIcon from '@/components/LinkedInIcon';
import { IMAGE_SIZES } from '@/lib/imageSizes';

interface TeamCardProps extends Omit<TeamMember, 'image'> {
  image?: TeamMember['image'] | null;
  cardImgSrc?: string | null;
  modalImgSrc?: string | null;
}

interface TeamMemberModalProps {
  member: Omit<TeamMember, 'image'> & { image?: TeamMember['image'] | null };
  modalImgSrc: string | null;
  onClose: () => void;
}

function TeamMemberModal({ member, modalImgSrc, onClose }: TeamMemberModalProps) {
  const { name, role, bio, linkedIn, image } = member;
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) onClose();
    },
    [onClose],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/50"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative flex h-[min(90vh,640px)] w-full max-w-[920px] max-h-[90vh] flex-col overflow-hidden rounded-[16px] bg-cream p-6 shadow-[0_24px_48px_rgba(0,0,0,0.18)] outline-none md:h-[600px] md:max-h-[600px] md:p-10"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 z-10 flex size-10 items-center justify-center rounded-full text-ink/70 hover:text-ink hover:bg-ink/5 transition-colors md:top-10 md:right-10"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="flex min-h-0 flex-1 flex-col gap-6 pr-8 md:grid md:grid-cols-[340px_1fr] md:items-stretch md:gap-12 md:pr-14">
          {modalImgSrc ? (
            <div className="relative mx-auto aspect-[3/4] w-[200px] shrink-0 md:mx-0 md:h-full md:w-full md:max-w-none md:min-h-0 md:aspect-auto">
              <Image
                src={modalImgSrc}
                alt={image?.alt ?? name}
                fill
                className="rounded-[16px] object-cover object-top bg-cream-warm"
                sizes="(max-width: 768px) 200px, 340px"
                priority
              />
            </div>
          ) : null}

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <h3 id={titleId} className="shrink-0 font-sans text-ink text-[24px] md:text-[28px] leading-tight mb-1 pr-8">
              {name}
            </h3>
            {role ? (
              <p className="shrink-0 font-sans text-[14px] uppercase tracking-[0.33px] text-ink/80 mb-3 md:mb-4">
                {role}
              </p>
            ) : null}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-14 pr-1">
              {bio ? (
                <p className="font-nav text-ink text-[16px] leading-[1.4] whitespace-pre-line">
                  {bio}
                </p>
              ) : (
                <p className="font-nav text-ink/60 text-[16px] leading-[1.4]">
                  Bio coming soon.
                </p>
              )}
            </div>
          </div>
        </div>

        {linkedIn ? (
          <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10">
            <LinkedInIcon href={linkedIn} name={name} />
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export default function TeamCard({
  name,
  role,
  image,
  bio,
  linkedIn,
  cardImgSrc = null,
  modalImgSrc = null,
}: TeamCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="relative">
          <button
            type="button"
            onClick={openModal}
            className="img-team hover-zoom block w-full p-0 border-0 bg-transparent cursor-pointer text-left"
            aria-label={`Read bio for ${name}`}
          >
            {cardImgSrc ? (
              <Image
                src={cardImgSrc}
                alt={image?.alt ?? name}
                fill
                className="object-cover object-top img-zoom"
                sizes={IMAGE_SIZES.team}
              />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center font-serif text-[48px] text-ink/25" aria-hidden="true">
                {getInitials(name)}
              </span>
            )}
          </button>

          {linkedIn ? (
            <div className="absolute bottom-2 right-2 z-10 lg:hidden">
              <LinkedInIcon
                href={linkedIn}
                name={name}
                size="sm"
                className="shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
              />
            </div>
          ) : null}
        </div>

        <div className="flex items-start gap-2 lg:gap-3">
          <div className="min-w-0 flex-1">
            <button
              type="button"
              onClick={openModal}
              className="font-sans text-ink text-[18px] lg:text-[22px] leading-tight mb-0.5 text-left hover:opacity-70 transition-opacity cursor-pointer"
            >
              {name}
            </button>
            {role ? (
              <p className="font-sans text-[12px] lg:text-[14px] uppercase tracking-[0.33px] text-ink/80 mt-0.5 leading-snug">
                {role}
              </p>
            ) : null}
          </div>
          {linkedIn ? (
            <div className="hidden shrink-0 lg:block">
              <LinkedInIcon href={linkedIn} name={name} />
            </div>
          ) : null}
        </div>
      </div>

      {isOpen ? (
        <TeamMemberModal
          member={{ name, role, image, bio, linkedIn, _id: '' }}
          modalImgSrc={modalImgSrc}
          onClose={closeModal}
        />
      ) : null}
    </>
  );
}
