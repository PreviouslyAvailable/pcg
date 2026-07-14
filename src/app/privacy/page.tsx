import type { Metadata } from 'next';
import SiteChrome from '@/components/SiteChrome';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Privacy Policy',
    description: 'Privacy policy for Private Capital Group.',
    path: '/privacy',
  }),
  // Placeholder until PCG / counsel provide final copy — exclude from search.
  robots: { index: false, follow: false },
};

export const revalidate = 60;

export default function PrivacyPage() {
  return (
    <SiteChrome>
      <main className="bg-cream min-h-screen">
        <section className="pt-36 pb-20 lg:pt-40">
          <div className="pcg-inner max-w-3xl">
            <h1 className="font-serif font-light text-ink text-[clamp(40px,5vw,56px)] leading-[1.05] tracking-[-0.015em] mb-6">
              Privacy Policy
            </h1>
            <div className="font-nav text-ink text-[16px] leading-[1.5] space-y-4">
              <p>
                Our privacy policy is being prepared and will be published here
                once finalised.
              </p>
              <p>
                In the meantime, for privacy-related enquiries please{' '}
                <a href="/contact" className="underline hover:opacity-70">
                  contact us
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
