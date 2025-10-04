import { Outlet } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap-trial/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

function SmootherProvider({ children }: { children: React.ReactNode }) {
  useGSAP(() => {
    // Create smoother if not already created
    if (!ScrollSmoother.get()) {
      ScrollSmoother.create({
        smooth: 1.2,
        effects: true,
        normalizeScroll: true,
        ignoreMobileResize: true,
        smoothTouch: 0.1,
        content: '#smooth-content',
        wrapper: '#smooth-wrapper',
      });
    }
  }, []);
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}

const Layout = () => {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Global subtle background grid overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      <div className="relative z-10">
        <SmootherProvider>
          <main>
            <Outlet />
          </main>
        </SmootherProvider>
      </div>
    </div>
  );
};

export default Layout;
