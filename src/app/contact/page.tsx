import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const offices = [
  {
    name: 'Auckland Office',
    address: ['Level 2', 'The Mountaineer Building', '32 Rees Street, Queenstown'],
    image: '/images/insight-3.jpg',
  },
  {
    name: 'Queenstown Office',
    address: ['Level 2', 'The Mountaineer Building', '32 Rees Street, Queenstown'],
    image: '/images/insight-4.jpg',
  },
];

export default function ContactPage() {
  return (
    <main className="bg-cream">
      <Navbar variant="light" />

      {/* Header */}
      <section className="px-4 lg:px-[60px] pt-36 pb-12 lg:pt-40 lg:pb-16">
        <h1 className="font-serif font-light text-ink text-[clamp(36px,4.5vw,64px)] leading-[1.0] tracking-[-0.02em] mb-6">
          Ready to Explore Private Capital Solutions?
        </h1>
        <p className="font-nav text-ink text-[18px] leading-[1.4] max-w-[440px]">
          Whether you're seeking financing for your business or considering private credit investment, we're here to help
        </p>
      </section>

      {/* Form + offices */}
      <section className="px-4 lg:px-[60px] pb-16 lg:pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
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
                <Image src={office.image} alt={office.name} fill className="object-cover" />
              </div>
              <p className="font-sans text-ink text-[16px] mb-1">{office.name}</p>
              {office.address.map((line) => (
                <p key={line} className="font-nav text-ink/60 text-[14px] leading-[1.5]">{line}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Quote banner with vineyard */}
      <section className="relative min-h-[380px] flex items-center justify-center px-10 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/quote-bg.jpg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-dark/40" />
        </div>
        <blockquote className="relative z-10 font-sans text-white text-[clamp(22px,2.8vw,40px)] leading-[1.2] text-center max-w-[720px]">
          Capital isn't just numbers on a spreadsheet. It's the fuel that transforms vision into operational reality.
        </blockquote>
      </section>

      <Footer />
    </main>
  );
}
