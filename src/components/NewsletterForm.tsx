'use client';

import { useState } from 'react';
import { AutocompleteInput } from '@/lib/autocompleteFields';
import { isValidEmail } from '@/lib/validation';

type NewsletterFormProps = {
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  inputId?: string;
  autoCompleteSection?: string;
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function NewsletterForm({
  className = 'flex flex-wrap gap-3 max-w-[437px] mb-[20px]',
  inputClassName = 'flex-1 bg-white rounded-[6px] px-4 py-3 font-nav text-[16px] text-ink placeholder:text-ink/40 outline-none border border-black/10 focus:border-black/30 transition-colors',
  buttonClassName = 'bg-ink text-white font-sans text-[14px] uppercase rounded-[6px] px-6 py-3 hover:bg-ink/80 transition-colors disabled:opacity-60 disabled:cursor-not-allowed',
  inputId = 'newsletter-email',
  autoCompleteSection = 'newsletter',
}: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const canSubmit = isValidEmail(email) && status !== 'submitting';

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
          email: formData.get('email'),
          website: formData.get('website'),
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus('error');
        setErrorMessage(data.error ?? 'Something went wrong. Please try again.');
        return;
      }

      setStatus('success');
      setEmail('');
      form.reset();
    } catch {
      setStatus('error');
      setErrorMessage('We could not subscribe you. Please check your connection and try again.');
    }
  }

  if (status === 'success') {
    return (
      <p className="font-nav text-[15px] text-ink/80 mb-[20px]" role="status">
        Thanks — you&apos;re subscribed.
      </p>
    );
  }

  return (
    <form className={className} onSubmit={handleSubmit} aria-label="Newsletter signup" noValidate>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <AutocompleteInput
        id={inputId}
        type="email"
        name="email"
        autoComplete={`section-${autoCompleteSection} email`}
        placeholder="Email Address"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          if (status === 'error') {
            setStatus('idle');
            setErrorMessage('');
          }
        }}
        required
        className={inputClassName}
      />
      <button type="submit" disabled={!canSubmit} className={buttonClassName}>
        {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
      </button>
      {status === 'error' && errorMessage ? (
        <p className="basis-full font-nav text-[14px] text-red-700" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
