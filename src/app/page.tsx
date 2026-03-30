import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HomeIntro from '@/components/HomeIntro';

export default function Home() {
  return (
    <main>
      <Navbar variant="dark" />
      <Hero />
      <HomeIntro />
    </main>
  );
}
