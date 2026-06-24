import { getNavLabels, getSiteSettings } from '@/sanity/loaders';
import { buildNavLinks } from '@/lib/nav';
import Footer from './Footer';

export default async function FooterServer() {
  const [labels, settings] = await Promise.all([getNavLabels(), getSiteSettings()]);

  return (
    <Footer
      navLinks={buildNavLinks(labels, settings)}
      newsletterHeading={settings?.newsletterHeading}
      footerTagline={settings?.footerTagline}
    />
  );
}
