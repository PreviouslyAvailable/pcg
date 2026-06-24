'use client';

import { useState } from 'react';

const fieldClass =
  'bg-white border border-black/15 rounded-[8px] px-4 py-3 font-nav text-[15px] text-ink placeholder:text-ink/40 outline-none focus:border-black/40 transition-colors';

const LENDING_AMOUNT_OPTIONS = [
  { value: '5-10', label: '$5M – $10M' },
  { value: '10-25', label: '$10M – $25M' },
  { value: '25-50', label: '$25M – $50M' },
  { value: '50-75', label: '$50M – $75M' },
  { value: '75+', label: '$75M+' },
] as const;

export default function ContactForm() {
  const [roleType, setRoleType] = useState('');
  const [lendingAmount, setLendingAmount] = useState('');

  const isBorrower = roleType === 'borrower';

  function handleRoleChange(value: string) {
    setRoleType(value);
    if (value !== 'borrower') {
      setLendingAmount('');
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-3">
        <input type="text" name="firstName" placeholder="First Name" className={fieldClass} />
        <input type="text" name="lastName" placeholder="Last Name" className={fieldClass} />
      </div>
      <input type="email" name="email" placeholder="Email Address" className={fieldClass} />
      <div className="grid grid-cols-2 gap-3">
        <input type="tel" name="phone" placeholder="Phone" className={fieldClass} />
        <select
          name="roleType"
          value={roleType}
          onChange={(event) => handleRoleChange(event.target.value)}
          className={`${fieldClass} ${roleType ? 'text-ink' : 'text-ink/60'}`}
        >
          <option value="">I am Borrower / Investor / Professional Advisor</option>
          <option value="borrower">Borrower</option>
          <option value="investor">Investor</option>
          <option value="advisor">Professional Advisor</option>
        </select>
      </div>
      {isBorrower && (
        <select
          name="lendingAmount"
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
        </select>
      )}
      <textarea
        name="comments"
        placeholder="Comments / Requirements"
        rows={5}
        className={`${fieldClass} resize-none`}
      />
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-ink text-white font-sans text-[16px] uppercase px-8 py-3 rounded-[10px] hover:bg-ink/80 transition-colors"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
