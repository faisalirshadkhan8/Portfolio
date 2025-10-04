import HeroSection from '../components/hero/HeroSection';
import ProfileHeader from '../components/hero/ProfileHeader';
import TechnicalSkills from '../components/TechnicalSkills';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollSmoother } from 'gsap-trial/ScrollSmoother';

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

  return (
    <>
      <ProfileHeader />
      {/* Hero */}
      <HeroSection />
      {/* Skills */}
      <TechnicalSkills />
  {/* Projects */}
  <Projects />
      {/* Contact */}
      <Contact />
    </>
  );
};

export default Home;
