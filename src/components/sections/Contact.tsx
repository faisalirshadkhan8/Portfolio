import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);
  const socialsRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading fade up
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Info (left) and form (right) staggered fade
      if (infoRef.current) {
        gsap.from(infoRef.current, {
          opacity: 0,
          x: -40,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }
      if (formRef.current) {
        gsap.from(formRef.current, {
          opacity: 0,
          x: 40,
          duration: 0.7,
          ease: 'power3.out',
          delay: 0.1,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Social icons stagger with bounce
      if (socialsRef.current) {
        const icons = socialsRef.current.querySelectorAll('a');
        gsap.from(icons, {
          opacity: 0,
          y: 16,
          scale: 0.9,
          duration: 0.5,
          ease: 'back.out(1.7)',
          stagger: 0.08,
          scrollTrigger: {
            trigger: socialsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Button hover scale
      if (buttonRef.current) {
        const btn = buttonRef.current;
        const onEnter = () => gsap.to(btn, { scale: 1.05, duration: 0.2, ease: 'power2.out' });
        const onLeave = () => gsap.to(btn, { scale: 1, duration: 0.2, ease: 'power2.inOut' });
        btn.addEventListener('mouseenter', onEnter);
        btn.addEventListener('mouseleave', onLeave);

        return () => {
          btn.removeEventListener('mouseenter', onEnter);
          btn.removeEventListener('mouseleave', onLeave);
        };
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden py-20 px-6 md:px-10 bg-gradient-to-b from-black via-gray-900 to-black"
      aria-labelledby="contact-heading"
    >
      {/* Top angled divider */}
      <div className="absolute top-0 left-0 right-0 h-16 -translate-y-1/2 bg-black/40" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }} />

      {/* Background overlays for consistency */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-0 md:w-[28rem] md:h-[28rem] w-72 h-72 bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 right-0 md:w-[28rem] md:h-[28rem] w-72 h-72 bg-cyan-500/20 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Heading */}
        <h2
          id="contact-heading"
          ref={headingRef}
          className="text-center text-3xl md:text-4xl font-extrabold text-white mb-16 md:mb-20"
        >
          Get In Touch
        </h2>
        {/* Spacer to guarantee separation regardless of margin collapsing */}
        <div aria-hidden className="h-12 md:h-20" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-start pt-2 md:pt-4">
          {/* Left: Contact Info */}
          <div ref={infoRef} className="space-y-8">
            <h3 className="text-white font-semibold text-2xl">Contact Information</h3>
            <div className="space-y-5">
              <div className="group flex items-center gap-4">
                <Mail className="w-6 h-6 text-gray-300 group-hover:text-blue-400 transition-colors" />
                <a href="mailto:your.email@example.com" className="text-gray-300 group-hover:text-blue-400 transition-colors">
                  your.email@example.com
                </a>
              </div>
              <div className="group flex items-center gap-4">
                <Phone className="w-6 h-6 text-gray-300 group-hover:text-blue-400 transition-colors" />
                <a href="tel:+15551234567" className="text-gray-300 group-hover:text-blue-400 transition-colors">
                  +1 (555) 123-4567
                </a>
              </div>
              <div className="group flex items-center gap-4">
                <MapPin className="w-6 h-6 text-gray-300 group-hover:text-blue-400 transition-colors" />
                <span className="text-gray-300 group-hover:text-blue-400 transition-colors">Your City, Country</span>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Follow Me</h3>
              <div ref={socialsRef} className="flex items-center gap-4">
                {[
                  { Icon: Github, label: 'GitHub', href: '#' },
                  { Icon: Linkedin, label: 'LinkedIn', href: '#' },
                  { Icon: Twitter, label: 'Twitter', href: '#' },
                ].map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="text-2xl text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    <Icon className="w-8 h-8 transition-transform duration-200 hover:scale-110" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div ref={formRef} className="group relative">
            {/* Gradient border wrapper for premium feel */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20 opacity-60 blur transition-opacity group-hover:opacity-80" aria-hidden />
            <div className="relative rounded-2xl bg-[#0b0f1a]/60 md:bg-[#0b0f1a]/50 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_-10px_rgba(59,130,246,0.25)] p-6 md:p-8">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-400 bg-gray-900/60 border border-gray-700/60 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/60 transition shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] focus:shadow-[0_0_0_6px_rgba(37,99,235,0.12)]"
                  placeholder="Your Name"
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-400 bg-gray-900/60 border border-gray-700/60 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/60 transition shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] focus:shadow-[0_0_0_6px_rgba(37,99,235,0.12)]"
                  placeholder="your@email.com"
                  autoComplete="email"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-400 bg-gray-900/60 border border-gray-700/60 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/60 transition shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] focus:shadow-[0_0_0_6px_rgba(37,99,235,0.12)] resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button
                ref={buttonRef}
                type="submit"
                className="w-full px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-colors shadow-[0_8px_30px_rgba(59,130,246,0.25)]"
              >
                Send Message
              </button>
            </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
