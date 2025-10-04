import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaReact } from 'react-icons/fa';
import { SiDjango, SiPostgresql } from 'react-icons/si';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Technology {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  className: string;
}

const Specialization = () => {
  const technologies: Technology[] = [
    {
      name: 'React',
      icon: FaReact,
      className: 'text-blue-400'
    },
    {
      name: 'Django',
      icon: SiDjango,
      className: 'text-green-600'
    },
    {
      name: 'PostgreSQL',
      icon: SiPostgresql,
      className: 'text-blue-500'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Safety check: if technologies array is empty, don't set up interval
    if (technologies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // Safely cycle through array, protecting against out-of-range index
        return (prevIndex + 1) % technologies.length;
      });
    }, 2000);

    // Clean up interval to prevent memory leaks
    return () => clearInterval(interval);
  }, [technologies.length]);

  // Safety check: render nothing if no technologies or invalid index
  if (technologies.length === 0 || currentIndex >= technologies.length) {
    return null;
  }

  const currentTech = technologies[currentIndex];
  const IconComponent = currentTech.icon;
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Reveal the specialization line when it scrolls into view
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });

      // Hover scaling for the icon element only
  const iconEl = containerRef.current?.querySelector('.skill-icon');
      if (iconEl) {
        const onEnter = () => gsap.to(iconEl, { scale: 1.2, duration: 0.25, ease: 'power2.out', overwrite: 'auto' });
        const onLeave = () => gsap.to(iconEl, { scale: 1, duration: 0.25, ease: 'power2.inOut', overwrite: 'auto' });
        iconEl.addEventListener('mouseenter', onEnter);
        iconEl.addEventListener('mouseleave', onLeave);
        (iconEl as any)._gsapEnter = onEnter;
        (iconEl as any)._gsapLeave = onLeave;
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} id="skills" className="flex items-center gap-2 text-sm sm:text-base">
      <span className="text-gray-300">Currently specializing in</span>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ 
            duration: 0.3,
            ease: "easeInOut"
          }}
          className="flex items-center gap-2"
        >
          <IconComponent className={`skill-icon ${currentTech.className} text-lg`} />
          <span className={currentTech.className}>{currentTech.name}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Specialization;
