import type { Metadata } from 'next';
import Image from 'next/image';
import SiteChrome from '@/components/SiteChrome';
import ContactForm from '@/components/ContactForm';
import QuoteBanner from '@/components/QuoteBanner';
import { getContactPage } from '@/sanity/loaders';
import { quoteBannerUrl } from '@/sanity/imageUrls';
import { urlFor } from '@/sanity/image';
import { IMAGE_SIZES } from '@/lib/imageSizes';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContactPage();
  return { title: data?.pageTitle ?? 'Contact' };
}

const fallbackOffices = [
  { name: 'Auckland Office', addressLines: ['131 Queen Street', 'Auckland CBD', 'Auckland, 1010'], image: '/images/insight-3.jpg' },
  { name: 'Queenstown Office', addressLines: ['Level 2', 'The Mountaineer Building', '32 Rees Street, Queenstown'], image: '/images/insight-4.jpg' },
];

export default async function ContactPage() {
  const data = await getContactPage();

  const quoteBannerImageSrc = quoteBannerUrl(data?.quoteBanner?.image);

  const offices = (data?.offices && data.offices.length > 0)
    ? data.offices.map((office) => ({
        name: office.name ?? '',
        addressLines: office.addressLines ?? [],
        imageSrc: office.image?.asset?.url
          ? urlFor(office.image).width(600).height(400).url()
          : '/images/insight-3.jpg',
        imageAlt: office.image?.alt ?? office.name ?? '',
      }))
    : fallbackOffices.map((office) => ({ ...office, imageSrc: office.image, imageAlt: office.name }));

  return (
    <SiteChrome>
      <main className="bg-cream">
        <section className="pt-36 pb-0 lg:pt-40 lg:pb-0">
          <div className="pcg-inner">
            <div className="w-full lg:w-1/2">
              <h1 className="font-serif font-light text-ink text-[clamp(60px,6.4vw,80px)] leading-[1.0] tracking-[-0.015em] mb-6">
                {data?.hero?.heading ?? 'Ready to Explore Private Debt Solutions?'}
              </h1>
              <p className="font-nav text-ink text-[16px] leading-[1.3] max-w-[440px]">
                {data?.hero?.subtext ?? "Whether you're seeking financing for your business or considering private credit investment, we're here to help"}
              </p>
            </div>
          </div>
        </section>

        <section className="py-[calc(var(--spacing)*18)]">
          <div className="pcg-inner grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h2 className="font-sans text-ink text-[22px] mb-6">Contact Form</h2>
              <ContactForm />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {offices.map((office) => (
                <div key={office.name}>
                  <div className="relative w-full aspect-[3/2] rounded-[12px] overflow-hidden bg-cream-warm mb-4">
                    <Image src={office.imageSrc} alt={office.imageAlt} fill sizes={IMAGE_SIZES.office} className="object-cover" />
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

        <QuoteBanner
          quote={data?.quoteBanner?.quote ?? "Capital isn't just numbers on a spreadsheet. It's the fuel that transforms vision into operational reality."}
          imageSrc={quoteBannerImageSrc}
          overlayClassName="bg-dark/40"
          minHeightClassName="min-h-[380px]"
          priority
        />
      </main>
    </SiteChrome>
  );
}
