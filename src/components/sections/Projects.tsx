import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard, { type ProjectStatus } from './ProjectCard';

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: number;
  title: string;
  description: string;
  tech: string[];
  status: ProjectStatus;
  image?: string;
  link?: string;
};

const data: Project[] = [
  {
    id: 1,
    title: '3D Portfolio Website',
    description: 'Interactive portfolio built with React, Three.js, and GSAP transitions.',
    tech: ['React', 'Three.js', 'TypeScript', 'Tailwind CSS'],
    status: 'In Progress',
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with modern UI/UX and secure checkout.',
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
    status: 'Completed',
  },
  {
    id: 3,
    title: '3D Game Experience',
    description: 'Browser-based 3D game with physics and animations.',
    tech: ['Three.js', 'Cannon.js', 'GLSL', 'WebGL'],
    status: 'Completed',
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading fade-down
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          opacity: 0,
          y: -16,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Cards stagger fade-up (safe defaults to avoid hidden state)
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.project-card');
        if (cards.length) {
          gsap.set(cards, { opacity: 1, y: 0 });
          gsap.fromTo(
            cards,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power3.out',
              stagger: 0.12,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-hidden py-16 px-6 md:px-10 bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Background overlays */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-0 md:w-[28rem] md:h-[28rem] w-72 h-72 bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 right-0 md:w-[28rem] md:h-[28rem] w-72 h-72 bg-blue-500/20 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 ref={headingRef} className="text-center text-3xl md:text-4xl font-extrabold text-white mb-12">
          My Projects
        </h2>

  <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 md:mt-14">
          {data.map((p) => (
            <ProjectCard key={p.id} title={p.title} description={p.description} tech={p.tech} status={p.status} link={p.link} image={p.image} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
