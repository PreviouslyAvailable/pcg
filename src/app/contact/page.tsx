import type { Metadata } from 'next';
import Image from 'next/image';
import Navbar from '@/components/NavbarServer';
import Footer from '@/components/Footer';
import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/image';
import { contactPageQuery } from '@/sanity/queries';
import type { ContactPage } from '@/sanity/types';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch<ContactPage>(contactPageQuery).catch(() => null);
  return { title: data?.pageTitle ?? 'Contact' };
}

const fallbackOffices = [
  { name: 'Auckland Office', addressLines: ['Level 2', 'The Mountaineer Building', '32 Rees Street, Queenstown'], image: '/images/insight-3.jpg' },
  { name: 'Queenstown Office', addressLines: ['Level 2', 'The Mountaineer Building', '32 Rees Street, Queenstown'], image: '/images/insight-4.jpg' },
];

export default async function ContactPage() {
  const data = await client.fetch<ContactPage>(contactPageQuery).catch(() => null);

  const quoteBannerImageSrc = data?.quoteBanner?.image?.asset?.url
    ? urlFor(data.quoteBanner.image).width(1920).height(800).url()
    : '/images/quote-bg.jpg';

  const offices = (data?.offices && data.offices.length > 0)
    ? data.offices.map((office) => ({
        name: office.name ?? '',
        addressLines: office.addressLines ?? [],
        imageSrc: office.image?.asset?.url
          ? urlFor(office.image).width(600).height(400).url()
          : '/images/insight-3.jpg',
        imageAlt: office.image?.alt ?? office.name ?? '',
      }))
    : fallbackOffices.map((o) => ({ ...o, imageSrc: o.image, imageAlt: o.name }));

  return (
    <main className="bg-cream">
      <Navbar variant="light" />

      {/* Header */}
      <section className="pt-36 pb-0 lg:pt-40 lg:pb-0">
        <div className="pcg-inner">
          <div className='w-1/2'>
            <h1 className="font-serif font-light text-ink text-[clamp(60px,6.4vw,80px)] leading-[1.0] tracking-[-0.015em] mb-6">
              {data?.hero?.heading ?? 'Ready to Explore Private Debt Solutions?'}
            </h1>
            <p className="font-nav text-ink text-[16px] leading-[1.3] max-w-[440px]">
              {data?.hero?.subtext ?? "Whether you're seeking financing for your business or considering private credit investment, we're here to help"}
            </p>
          </div>
        </div>
      </section>

      {/* Form + offices */}
      <section className="py-[calc(var(--spacing)*18)]">
        <div className="pcg-inner grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact form */}
          <div>
            <h2 className="font-sans text-ink text-[22px] mb-6">Contact Form</h2>
            <form className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="First Name" className="bg-white border border-black/15 rounded-[8px] px-4 py-3 font-nav text-[15px] text-ink placeholder:text-ink/40 outline-none focus:border-black/40 transition-colors" />
                <input type="text" placeholder="Last Name" className="bg-white border border-black/15 rounded-[8px] px-4 py-3 font-nav text-[15px] text-ink placeholder:text-ink/40 outline-none focus:border-black/40 transition-colors" />
              </div>
              <input type="email" placeholder="Email Address" className="bg-white border border-black/15 rounded-[8px] px-4 py-3 font-nav text-[15px] text-ink placeholder:text-ink/40 outline-none focus:border-black/40 transition-colors" />
              <div className="grid grid-cols-2 gap-3">
                <input type="tel" placeholder="Phone" className="bg-white border border-black/15 rounded-[8px] px-4 py-3 font-nav text-[15px] text-ink placeholder:text-ink/40 outline-none focus:border-black/40 transition-colors" />
                <select className="bg-white border border-black/15 rounded-[8px] px-4 py-3 font-nav text-[15px] text-ink/60 outline-none focus:border-black/40 transition-colors">
                  <option value="">I am Borrower / Investor / Professional Advisor</option>
                  <option value="borrower">Borrower</option>
                  <option value="investor">Investor</option>
                  <option value="advisor">Professional Advisor</option>
                </select>
              </div>
              <textarea
                placeholder="Comments / Requirements"
                rows={5}
                className="bg-white border border-black/15 rounded-[8px] px-4 py-3 font-nav text-[15px] text-ink placeholder:text-ink/40 outline-none focus:border-black/40 transition-colors resize-none"
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
          </div>

          {/* Office locations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {offices.map((office) => (
              <div key={office.name}>
                <div className="relative w-full aspect-[3/2] rounded-[12px] overflow-hidden bg-cream-warm mb-4">
                  <Image src={office.imageSrc} alt={office.imageAlt} fill className="object-cover" />
                </div>
                <p className="font-sans text-ink text-[16px] mb-1">{office.name}</p>
                {office.addressLines.map((line) => (
                  <p key={line} className="font-nav text-ink/60 text-[16px] leading-[1.5]">{line}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote banner */}
      <section className="relative min-h-[380px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src={quoteBannerImageSrc} alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-dark/40" />
        </div>
        <blockquote className="relative z-10 font-sans text-white text-[clamp(22px,2.8vw,40px)] leading-[1.2] text-center max-w-[720px]">
          {data?.quoteBanner?.quote ?? "Capital isn't just numbers on a spreadsheet. It's the fuel that transforms vision into operational reality."}
        </blockquote>
      </section>

      <Footer />
    </main>
  );
}
