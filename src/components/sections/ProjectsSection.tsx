import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!gridRef.current) return;
      const cards = gridRef.current.querySelectorAll('.project-card');
      if (cards.length) {
        gsap.from(cards, {
          opacity: 0,
          y: 40,
          stagger: 0.12,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const projects = [
    {
      id: 1,
      title: '3D Portfolio Website',
      description: 'Interactive portfolio built with React, Three.js, and Framer Motion',
      tech: ['React', 'Three.js', 'TypeScript', 'Tailwind CSS'],
      status: 'In Progress',
    },
    {
      id: 2,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with modern UI/UX',
      tech: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
      status: 'Completed',
    },
    {
      id: 3,
      title: '3D Game Experience',
      description: 'Browser-based 3D game with physics and animations',
      tech: ['Three.js', 'Cannon.js', 'GLSL', 'WebGL'],
      status: 'Completed',
    },
  ];

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-hidden py-20 px-8 bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Background overlays for consistency */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-0 md:w-[28rem] md:h-[28rem] w-72 h-72 bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 right-0 md:w-[28rem] md:h-[28rem] w-72 h-72 bg-blue-500/20 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">My Projects</h2>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card bg-gray-800 rounded-lg p-6 hover:bg-gray-750/50 transition-colors cursor-pointer border border-gray-700/50 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="bg-gray-700/70 h-48 rounded-lg mb-4 flex items-center justify-center">
                <p className="text-gray-400">Project Preview</p>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-blue-600 text-blue-100 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    project.status === 'Completed'
                      ? 'bg-green-600 text-green-100'
                      : 'bg-yellow-600 text-yellow-100'
                  }`}
                >
                  {project.status}
                </span>
                <button className="text-blue-400 hover:text-blue-300 font-medium">View Details →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
