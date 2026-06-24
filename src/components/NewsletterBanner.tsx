import { autocomplete } from '@/lib/formAttributes';

export default function NewsletterBanner() {
  return (
    <div className="bg-teal rounded-[16px] px-8 py-12 lg:px-16 lg:py-14 text-center">
      <h2 className="font-sans text-white text-[clamp(22px,2.5vw,36px)] leading-[1.2] mb-3">
        Stay Informed About Private Credit Markets
      </h2>
      <p className="font-nav text-white/80 text-[15px] leading-[1.4] max-w-[380px] mx-auto mb-6">
        Monthly insights delivered directly to your inbox covering market trends, regulatory developments, and investment opportunities
      </p>
      <form className="flex flex-col sm:flex-row gap-2 max-w-[420px] mx-auto">
        <input
          id="newsletter-email"
          type="email"
          name="email"
          {...autocomplete('email')}
          placeholder="Email Address"
          className="flex-1 bg-white/20 border border-white/30 rounded-[8px] px-4 py-3 font-nav text-[15px] text-white placeholder:text-white/50 outline-none focus:border-white/60 transition-colors"
        />
        <button
          type="submit"
          className="bg-white text-teal font-sans text-[14px] uppercase px-6 py-3 rounded-[8px] hover:bg-white/90 transition-colors whitespace-nowrap"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
