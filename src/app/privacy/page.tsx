import type { Metadata } from 'next';
import Navbar from '@/components/NavbarServer';
import Footer from '@/components/FooterServer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Private Capital Group.',
};

export default function PrivacyPage() {
  return (
    <main className="bg-cream min-h-screen">
      <Navbar variant="light" />
      <section className="pt-36 pb-20 lg:pt-40">
        <div className="pcg-inner max-w-3xl">
          <h1 className="font-serif font-light text-ink text-[clamp(40px,5vw,56px)] leading-[1.05] tracking-[-0.015em] mb-6">
            Privacy Policy
          </h1>
          <p className="font-nav text-ink text-[16px] leading-[1.5]">
            Our privacy policy is being finalised. For privacy-related enquiries, please{' '}
            <a href="/contact" className="underline hover:opacity-70">
              contact us
            </a>
            .
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
