import type { Metadata } from 'next';
import SiteChrome from '@/components/SiteChrome';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for Private Capital Group.',
};

export const revalidate = 60;

export default function TermsPage() {
  return (
    <SiteChrome>
      <main className="bg-cream min-h-screen">
        <section className="pt-36 pb-20 lg:pt-40">
          <div className="pcg-inner max-w-3xl">
            <h1 className="font-serif font-light text-ink text-[clamp(40px,5vw,56px)] leading-[1.05] tracking-[-0.015em] mb-6">
              Terms of Service
            </h1>
            <p className="font-nav text-ink text-[16px] leading-[1.5]">
              Our terms of service are being finalised. For questions, please{' '}
              <a href="/contact" className="underline hover:opacity-70">
                contact us
              </a>
              .
            </p>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
