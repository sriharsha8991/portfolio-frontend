import { HeroSection } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';
import { FloatingChatButton } from '@/components/ui/FloatingChatButton';

export default function Home() {
  return (
    <>
      <main className="min-h-screen relative">
        <HeroSection />
        <div className="relative z-10 space-y-0">
          <Projects />
          <About />
          <Skills />
          <Contact />
        </div>
        <Footer />
      </main>
      <FloatingChatButton />
    </>
  );
}
