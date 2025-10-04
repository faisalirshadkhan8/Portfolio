import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

import profileImage from '../../assets/cv.jpg';

const ProfileHeader = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  gsap.registerPlugin(ScrollTrigger);
  
  const navItems = [
    { label: 'Home', hash: '#hero' },
    { label: 'Skills', hash: '#skills' },
    { label: 'Projects', hash: '#projects' },
    { label: 'Contact', hash: '#contact' },
  ];

  const navigate = useNavigate();
  const handleNavClick = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    const targetId = hash.replace('#', '');
    const isHome = location.pathname === '/';
    if (isHome) {
      const el = document.getElementById(targetId);
      if (el) {
        // Prefer ScrollSmoother if available
        const smoother = ScrollSmoother.get?.();
        if (smoother) {
          smoother.scrollTo(el, true);
          return;
        }
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate('/', { state: { scrollTo: targetId } });
    }
    setIsMobileMenuOpen(false);
  };

  const isActiveRoute = (hash?: string) => {
    if (!hash) return false;
    const id = hash.replace('#', '');
    return activeSection === id && location.pathname === '/';
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const newScrolled = scrollTop > 50;
      
      if (newScrolled !== isScrolled) {
        setIsScrolled(newScrolled);
        
        if (navRef.current) {
          gsap.to(navRef.current, {
            duration: 0.3,
            backgroundColor: newScrolled 
              ? 'rgba(15, 23, 42, 0.7)' 
              : 'rgba(0, 0, 0, 0)',
            backdropFilter: newScrolled ? 'blur(12px)' : 'blur(0px)',
            borderBottom: newScrolled 
              ? '1px solid rgba(255, 255, 255, 0.1)' 
              : '1px solid rgba(255, 255, 255, 0)',
            ease: "power2.out"
          });
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isProfileHovered) {
        setIsProfileHovered(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isScrolled, isProfileHovered]);

  // Track active section via ScrollTrigger
  useEffect(() => {
    const sections = ['hero', 'skills', 'projects', 'contact'];
    const triggers: ScrollTrigger[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const t = ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id),
        });
        triggers.push(t);
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <motion.nav
      ref={navRef}
      className="fixed w-full top-0 z-50 transition-all duration-300"
      style={{ 
        backgroundColor: 'transparent',
        backdropFilter: 'blur(0px)',
        borderBottom: '1px solid transparent'
      }}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-[10%]">
        <div className="flex items-center justify-between h-16">
          {/* Profile Section */}
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500 cursor-pointer transition-transform duration-300 hover:scale-110"
              onMouseEnter={() => setIsProfileHovered(true)}
              onMouseLeave={() => setIsProfileHovered(false)}
            >
              <img 
                src={profileImage} 
                alt="Musab Rehman Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <Link 
                to="/"
                onClick={(e) => handleNavClick(e, '#hero')}
                className="text-lg font-bold text-white hover:text-gray-200 transition-colors"
              >
                Faisal Irshad
              </Link>
              <span className="text-xs text-emerald-400">
                Available for work
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ label, hash }) => {
              const isActive = isActiveRoute(hash);
              return (
                <Link
                  key={hash}
                  to="/"
                  onClick={(e) => handleNavClick(e, hash!)}
                  className="group relative px-1 py-2 text-sm font-medium"
                >
                  <span 
                    className={`relative z-10 transition-colors duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'
                        : 'text-purple-200 hover:text-purple-50'
                    }`}
                  >
                    {label}
                  </span>
                  <span 
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-transform duration-300 ${
                      isActive 
                        ? 'scale-x-100' 
                        : 'scale-x-0 group-hover:scale-x-75'
                    }`}
                  ></span>
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-5 h-5 text-purple-200" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
  <div className={`md:hidden fixed inset-0 bg-gray-900 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col h-full pt-4">
          {navItems.map(({ label, hash }) => {
            const isActive = isActiveRoute(hash);
            return (
              <Link
                key={hash}
                to="/"
                onClick={(e) => handleNavClick(e, hash!)}
                className={`px-6 py-4 text-lg font-medium ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'
                    : 'text-purple-200 hover:text-purple-50'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
      
      {/* Profile Hover Overlay */}
      {isProfileHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backdropFilter: 'blur(10px)' }}
          onMouseLeave={() => setIsProfileHovered(false)}
        >
          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-black/60"></div>
          
          {/* Elevated Profile Image */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center space-y-4"
          >
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-purple-500 shadow-2xl">
              <img 
                src={profileImage} 
                alt="Musab Rehman Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Musab Rehman</h2>
              <p className="text-purple-300 text-lg">Full-Stack Developer</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default ProfileHeader;
