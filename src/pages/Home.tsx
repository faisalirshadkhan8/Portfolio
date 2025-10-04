import HeroSection from '../components/hero/HeroSection';
import ProfileHeader from '../components/hero/ProfileHeader';
import TechnicalSkills from '../components/TechnicalSkills';
import { lazy, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Lazy-loaded sections (split heavy content off main bundle)
const Projects = lazy(() => import('../components/sections/Projects'));
const Contact = lazy(() => import('../components/sections/Contact'));

const Home = () => {
  const location = useLocation() as any;

  useEffect(() => {
    const state = location?.state as { scrollTo?: string } | undefined;
    if (state?.scrollTo) {
      const id = state.scrollTo;
      const el = document.getElementById(id);
      if (el) {
        const smoother = ScrollSmoother.get();
        if (smoother) {
          smoother.scrollTo(el, true);
        } else {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  }, [location?.state]);

  // Prefetch lazy chunks after initial paint (keeps initial bundle small but loads sections quickly)
  useEffect(() => {
    const prefetch = () => {
      import('../components/sections/Projects');
      import('../components/sections/Contact');
    };
    // Use requestIdleCallback when available
    const ric: any = (window as any).requestIdleCallback;
    let handle: any;
    if (typeof ric === 'function') {
      handle = ric(prefetch, { timeout: 1500 });
      return () => (window as any).cancelIdleCallback?.(handle);
    } else {
      const t = setTimeout(prefetch, 0);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <>
      <ProfileHeader />
      {/* Hero */}
      <HeroSection />
      {/* Skills */}
      <TechnicalSkills />
      {/* Projects (lazy) */}
      <Suspense
        fallback={
          <section id="projects" className="py-16 px-6 md:px-10">
            <div className="max-w-6xl mx-auto text-gray-400">Loading projects…</div>
          </section>
        }
      >
        <Projects />
      </Suspense>
      {/* Contact (lazy) */}
      <Suspense
        fallback={
          <section id="contact" className="py-20 px-6 md:px-10">
            <div className="max-w-6xl mx-auto text-gray-400">Loading contact…</div>
          </section>
        }
      >
        <Contact />
      </Suspense>
    </>
  );
};

export default Home;
