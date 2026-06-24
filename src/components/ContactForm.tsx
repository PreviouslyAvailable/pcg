'use client';

import { useState } from 'react';
import {
  AutocompleteInput,
  AutocompleteSelect,
  AutocompleteTextarea,
} from '@/lib/autocompleteFields';

const fieldClass =
  'w-full bg-white border border-black/15 rounded-[8px] px-4 py-3 font-nav text-[15px] text-ink placeholder:text-ink/40 outline-none focus:border-black/40 transition-colors';

const labelClass = 'sr-only';

import { LENDING_AMOUNT_OPTIONS } from '@/lib/contact';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [roleType, setRoleType] = useState('');
  const [lendingAmount, setLendingAmount] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const isBorrower = roleType === 'borrower';

  function handleRoleChange(value: string) {
    setRoleType(value);
    if (value !== 'borrower') {
      setLendingAmount('');
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.get('firstName'),
          lastName: formData.get('lastName'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          roleType: formData.get('roleType'),
          lendingAmount: formData.get('lendingAmount'),
          comments: formData.get('comments'),
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
      form.reset();
      setRoleType('');
      setLendingAmount('');
    } catch {
      setStatus('error');
      setErrorMessage('We could not send your message. Please check your connection and try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-[12px] border border-black/10 bg-white px-6 py-8" role="status">
        <p className="font-sans text-ink text-[22px] mb-2">Thank you</p>
        <p className="font-nav text-ink/80 text-[16px] leading-[1.4]">
          Your message has been sent. A member of our team will be in touch shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 font-sans text-[14px] uppercase tracking-wide text-ink border border-ink rounded-[10px] px-6 py-3 hover:bg-ink/5 transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit} autoComplete="on" noValidate>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="contact-first-name" className={labelClass}>First name</label>
          <AutocompleteInput
            id="contact-first-name"
            type="text"
            name="firstName"
            autoComplete="section-contact given-name"
            placeholder="First Name"
            required
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="contact-last-name" className={labelClass}>Last name</label>
          <AutocompleteInput
            id="contact-last-name"
            type="text"
            name="lastName"
            autoComplete="section-contact family-name"
            placeholder="Last Name"
            required
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-email" className={labelClass}>Email address</label>
        <AutocompleteInput
          id="contact-email"
          type="email"
          name="email"
          autoComplete="section-contact email"
          placeholder="Email Address"
          required
          className={fieldClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="contact-phone" className={labelClass}>Phone</label>
          <AutocompleteInput
            id="contact-phone"
            type="tel"
            name="phone"
            autoComplete="section-contact tel"
            placeholder="Phone"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="contact-role-type" className={labelClass}>I am a</label>
          <AutocompleteSelect
            id="contact-role-type"
            name="roleType"
            autoComplete="off"
            value={roleType}
            onChange={(event) => handleRoleChange(event.target.value)}
            required
            className={`${fieldClass} ${roleType ? 'text-ink' : 'text-ink/60'}`}
          >
            <option value="">I am Borrower / Investor / Professional Advisor</option>
            <option value="borrower">Borrower</option>
            <option value="investor">Investor</option>
            <option value="advisor">Professional Advisor</option>
          </AutocompleteSelect>
        </div>
      </div>

      {isBorrower && (
        <div>
          <label htmlFor="contact-lending-amount" className={labelClass}>Approximate lending requirement</label>
          <AutocompleteSelect
            id="contact-lending-amount"
            name="lendingAmount"
            autoComplete="off"
            value={lendingAmount}
            onChange={(event) => setLendingAmount(event.target.value)}
            required
            className={`${fieldClass} ${lendingAmount ? 'text-ink' : 'text-ink/60'}`}
          >
            <option value="">Approximate lending requirement</option>
            {LENDING_AMOUNT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </AutocompleteSelect>
        </div>
      )}

      <div>
        <label htmlFor="contact-comments" className={labelClass}>Comments or requirements</label>
        <AutocompleteTextarea
          id="contact-comments"
          name="comments"
          autoComplete="off"
          placeholder="Comments / Requirements"
          rows={5}
          className={`${fieldClass} resize-none`}
        />
      </div>

      {status === 'error' && errorMessage ? (
        <p className="font-nav text-[15px] text-red-700" role="alert">{errorMessage}</p>
      ) : null}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="bg-ink text-white font-sans text-[16px] uppercase px-8 py-3 rounded-[10px] hover:bg-ink/80 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Sending…' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
