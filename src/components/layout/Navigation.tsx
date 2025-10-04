import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, User, Briefcase, Mail } from 'lucide-react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollSmoother } from 'gsap-trial/ScrollSmoother';
gsap.registerPlugin(ScrollToPlugin);

const Navigation = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: 'Home', icon: Home, hash: '#hero' },
    { path: '/', label: 'Skills', icon: User, hash: '#skills' },
    { path: '/', label: 'Projects', icon: Briefcase, hash: '#projects' },
    { path: '/', label: 'Contact', icon: Mail, hash: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent, _path: string, hash?: string) => {
    if (!hash) return; // fall back to normal routing for About
    e.preventDefault();
    const isHome = location.pathname === '/';
    const target = hash.replace('#', '');
    if (isHome) {
      const el = document.getElementById(target);
      if (el) {
        const smoother = ScrollSmoother.get();
        if (smoother) {
          smoother.scrollTo(el, true);
        } else {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      navigate('/', { state: { scrollTo: target } });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10"
    >
      <div className="max-w-6xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - No animation */}
          <div>
            <Link to="/" className="text-2xl font-bold text-white">
              Portfolio
            </Link>
          </div>

          {/* Desktop Navigation - No animation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ path, label, icon: Icon, hash }) => {
              const isActive = location.pathname === path;
              return (
                <div key={path}>
                  <Link
                    to={path}
                    onClick={(e) => handleNavClick(e, path, hash)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-medium">{label}</span>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Mobile Navigation Button - No animation */}
          <div className="md:hidden">
            <button className="text-white p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
