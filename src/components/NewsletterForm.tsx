'use client';

import { AutocompleteInput } from '@/lib/autocompleteFields';

type NewsletterFormProps = {
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  inputId?: string;
  autoCompleteSection?: string;
};

export default function NewsletterForm({
  className = 'flex gap-3 max-w-[437px] mb-[20px]',
  inputClassName = 'flex-1 bg-white rounded-[6px] px-4 py-3 font-nav text-[16px] text-ink placeholder:text-ink/40 outline-none border border-black/10 focus:border-black/30 transition-colors',
  buttonClassName = 'bg-ink text-white font-sans text-[14px] uppercase rounded-[6px] px-6 py-3 hover:bg-ink/80 transition-colors',
  inputId = 'newsletter-email',
  autoCompleteSection = 'newsletter',
}: NewsletterFormProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form className={className} onSubmit={handleSubmit} aria-label="Newsletter signup (coming soon)">
      <AutocompleteInput
        id={inputId}
        type="email"
        name="email"
        autoComplete={`section-${autoCompleteSection} email`}
        placeholder="Email Address"
        disabled
        aria-disabled="true"
        title="Newsletter signup coming soon"
        className={inputClassName}
      />
      <button type="submit" disabled className={buttonClassName}>
        Coming soon
      </button>
    </form>
  );
}
