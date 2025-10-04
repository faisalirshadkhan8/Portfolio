import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);
import { 
  FaHtml5, 
  FaCss3Alt, 
  FaReact, 
  FaNodeJs, 
  FaPython 
} from 'react-icons/fa';
import { 
  SiJavascript, 
  SiTailwindcss, 
  SiVite, 
  SiFirebase, 
  SiDjango, 
  SiExpress, 
  SiPostgresql 
} from 'react-icons/si';
 

interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const TechnicalSkills = () => {
  

  const skills: Skill[] = [
    {
      name: "HTML5",
      icon: FaHtml5,
      color: "text-orange-500"
    },
    {
      name: "CSS3",
      icon: FaCss3Alt,
      color: "text-blue-500"
    },
    {
      name: "JavaScript",
      icon: SiJavascript,
      color: "text-yellow-400"
    },
    {
      name: "Tailwind CSS",
      icon: SiTailwindcss,
      color: "text-cyan-400"
    },
    {
      name: "React.js",
      icon: FaReact,
      color: "text-blue-400"
    },
    {
      name: "Vite",
      icon: SiVite,
      color: "text-purple-400"
    },
    {
      name: "Node.js",
      icon: FaNodeJs,
      color: "text-green-500"
    },
    {
      name: "Firebase",
      icon: SiFirebase,
      color: "text-yellow-500"
    },
    {
      name: "Python",
      icon: FaPython,
      color: "text-yellow-400"
    },
    {
      name: "Django",
      icon: SiDjango,
      color: "text-green-600"
    },
    {
      name: "Express.js",
      icon: SiExpress,
      color: "text-gray-300"
    },
    {
      name: "PostgreSQL",
      icon: SiPostgresql,
      color: "text-blue-500"
    }
  ];

  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          opacity: 0,
          y: 24,
          stagger: 0.12,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      }
      if (gridRef.current) {
        // Scroll-triggered staggered reveal of skill icons
        const icons = gridRef.current.querySelectorAll('.skill-icon');
        if (icons.length) {
          // Set initial state
          gsap.set(icons, { opacity: 1, scale: 1, y: 0 });
          
          // Animate from hidden state
          gsap.fromTo(icons, 
            {
              opacity: 0,
              scale: 0.5,
              y: 50,
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              stagger: 0.15,
              duration: 0.8,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: gridRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );

          // Hover interactions for icons
          icons.forEach((icon) => {
            const onEnter = () => gsap.to(icon, { scale: 1.2, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
            const onLeave = () => gsap.to(icon, { scale: 1, duration: 0.3, ease: 'power2.inOut', overwrite: 'auto' });
            icon.addEventListener('mouseenter', onEnter);
            icon.addEventListener('mouseleave', onLeave);
          });
        }
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Fallback if no skills
  if (!skills || skills.length === 0) {
    return (
      <section className={`py-16 px-6 md:px-20 bg-gradient-to-b from-black via-gray-900 to-gray-800`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className={`text-3xl font-bold mb-4 text-white`}>
              Technical Skills
            </h2>
            <p className={`text-lg mb-10 text-gray-400`}>
              No skills added yet.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
  <section id="skills" ref={sectionRef} className={`relative overflow-hidden py-16 px-6 md:px-20 bg-gradient-to-b from-black via-gray-900 to-black`}>
      {/* Background overlays for consistent look */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-16 -left-10 md:w-96 md:h-96 w-72 h-72 bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 right-0 md:w-96 md:h-96 w-72 h-72 bg-cyan-500/20 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center justify-center px-4 py-2 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20"
          >
            <span className="text-sm font-medium text-blue-400">⚡ My Expertise</span>
          </div>
          
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent`}>
            Technical Skills
          </h2>
          
          <div className="flex justify-center">
            <p className={`text-lg md:text-xl max-w-3xl leading-relaxed text-center text-gray-400`}>
              A showcase of the technologies and tools I've learned throughout my journey as a developer.
            </p>
          </div>
        </div>

        {/* Skills Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
        >
          {skills.map((skill) => {
            const IconComponent = skill.icon;
            
            return (
              <div
                key={skill.name}
                data-skill-card
                className={`group relative p-6 rounded-xl border transition-all duration-300 cursor-pointer will-change-transform bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/80 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 backdrop-blur-sm hover:-translate-y-1 hover:scale-[1.03]`}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-blue-500/0 to-cyan-500/0 group-hover:from-purple-500/5 group-hover:via-blue-500/5 group-hover:to-cyan-500/5 transition-all duration-300" />
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon with Neon Effect */}
                  <div className="mb-3 relative">
                    {IconComponent ? (
                      <>
                        {/* Neon glow effect */}
                        <div className={`absolute inset-0 ${skill.color} opacity-0 group-hover:opacity-30 blur-lg scale-150 transition-all duration-500`}>
                          <IconComponent className="w-8 h-8 md:w-10 md:h-10" />
                        </div>
                        {/* Main icon */}
                        <IconComponent 
                          className={`skill-icon relative w-8 h-8 md:w-10 md:h-10 ${skill.color} group-hover:drop-shadow-[0_0_12px_currentColor] transition-all duration-300 filter group-hover:brightness-125`}
                        />
                      </>
                    ) : (
                      <div className={`skill-icon w-8 h-8 md:w-10 md:h-10 rounded bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-700`}>
                        {skill.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  
                  {/* Skill Name */}
                  <h3 className={`text-sm md:text-base font-semibold transition-colors duration-300 text-gray-300 group-hover:text-white`}>
                    {skill.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;
