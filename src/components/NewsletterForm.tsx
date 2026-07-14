'use client';

import { useState } from 'react';
import { AutocompleteInput } from '@/lib/autocompleteFields';
import { isValidEmail } from '@/lib/validation';

type NewsletterFormProps = {
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  hintClassName?: string;
  /** When true, success/error copy is tuned for the teal NewsletterBanner. */
  onTeal?: boolean;
  inputId?: string;
  autoCompleteSection?: string;
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const honeypotClass =
  'absolute left-[-10000px] top-auto h-px w-px overflow-hidden whitespace-nowrap';

export default function NewsletterForm({
  className = 'flex flex-col gap-2 max-w-[437px] mb-[20px]',
  inputClassName = 'w-full bg-white rounded-[6px] px-4 py-3 font-nav text-[16px] text-ink placeholder:text-ink/40 outline-none border border-black/10 focus:border-black/30 transition-colors',
  buttonClassName = 'bg-ink text-white font-sans text-[14px] uppercase rounded-[6px] px-6 py-3 hover:bg-ink/80 transition-colors disabled:opacity-60 disabled:cursor-not-allowed',
  hintClassName = 'font-nav text-[13px] text-ink/50',
  onTeal = false,
  inputId = 'newsletter-email',
  autoCompleteSection = 'newsletter',
}: NewsletterFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const canSubmit =
    name.trim().length > 0 && isValidEmail(email) && consent && status !== 'submitting';

  const successClass = onTeal
    ? 'font-nav text-[15px] text-white mb-[20px]'
    : 'font-nav text-[15px] text-ink/80 mb-[20px]';
  const errorClass = onTeal
    ? 'font-nav text-[14px] text-cream'
    : 'font-nav text-[14px] text-red-700';
  const consentClass = onTeal
    ? 'font-nav text-[13px] text-white/80'
    : 'font-nav text-[13px] text-ink/70';

  function clearError() {
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    setStatus('submitting');
    setErrorMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          website: formData.get('website'),
          consent: formData.get('consent') === 'on' || consent,
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus('error');
        setErrorMessage(data.error ?? 'Something went wrong. Please try again.');
        return;
      }

      setStatus('success');
      setName('');
      setEmail('');
      setConsent(false);
      form.reset();
    } catch {
      setStatus('error');
      setErrorMessage('We could not subscribe you. Please check your connection and try again.');
    }
  }

  if (status === 'success') {
    return (
      <p className={successClass} role="status">
        Thanks — you&apos;re subscribed.
      </p>
    );
  }

  return (
    <form className={`relative ${className}`} onSubmit={handleSubmit} aria-label="Newsletter signup" noValidate>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className={honeypotClass}
        aria-hidden="true"
      />
      <div>
        <label htmlFor={`${inputId}-name`} className="sr-only">
          Name
        </label>
        <AutocompleteInput
          id={`${inputId}-name`}
          type="text"
          name="name"
          autoComplete={`section-${autoCompleteSection} name`}
          placeholder="Name *"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            clearError();
          }}
          required
          className={inputClassName}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="w-full sm:flex-1">
          <label htmlFor={inputId} className="sr-only">
            Email address
          </label>
          <AutocompleteInput
            id={inputId}
            type="email"
            name="email"
            autoComplete={`section-${autoCompleteSection} email`}
            placeholder="Email Address *"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              clearError();
            }}
            required
            className={inputClassName}
          />
        </div>
        <button type="submit" disabled={!canSubmit} className={buttonClassName}>
          {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </div>
      <label className={`flex items-start gap-2 ${consentClass}`}>
        <input
          type="checkbox"
          name="consent"
          checked={consent}
          onChange={(event) => {
            setConsent(event.target.checked);
            clearError();
          }}
          required
          className="mt-1 size-4 shrink-0"
        />
        <span>I agree to receive updates *</span>
      </label>
      {status === 'error' && errorMessage ? (
        <p className={errorClass} role="alert">
          {errorMessage}
        </p>
      ) : null}
      <p className={hintClassName}>* Required field</p>
    </form>
  );
}
