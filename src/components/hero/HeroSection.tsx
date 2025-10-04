import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
gsap.registerPlugin(ScrollTrigger);
import { Download, Mail } from 'lucide-react';
import CodeEditor from './CodeEditorNew';
import SocialLinks from './SocialLinks';
import Specialization from './Specialization';
 

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!heroRef.current) return;
      // Optional parallax on background blobs (non-essential)
      const blobs = heroRef.current.querySelectorAll('.bg-blob');
      blobs.forEach((el, i) => {
        gsap.to(el, {
          yPercent: i % 2 === 0 ? -5 : 5,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);
  return (
        <div 
          id="hero"
          ref={heroRef}
          className={`min-h-screen h-screen relative overflow-hidden transition-all duration-300 bg-gradient-to-br from-black via-gray-900 to-black`}
        >
      {/* Advanced Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0">
          <div className="bg-blob absolute top-0 -left-4 md:w-96 md:h-96 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20"></div>
          <div className="bg-blob absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20 hidden sm:block"></div>
          <div className="bg-blob absolute -bottom-8 left-[-40%] md:left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20"></div>
          <div className="bg-blob absolute -bottom-10 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 md:opacity-10 hidden sm:block"></div>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative z-10 pt-20 pb-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center min-h-[calc(100vh-8rem)]">
            
            {/* Left Content - Fast Enhanced Animation */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.1,
                ease: [0.23, 1, 0.32, 1] 
              }}
              className="space-y-10 lg:pr-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.2,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full px-4 py-2 backdrop-blur-sm"
                >
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipRule="evenodd" />
                  </svg>
                  <span className="text-blue-400 font-medium text-sm">Full Stack Developer</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.3,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                  className="text-3xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl font-bold tracking-tight"
                  style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                >
                  <span className="relative inline-block mt-2">
                    <span className="absolute -inset-2 opacity-20"></span>
                    <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">Hello, I'm</span>
                  </span>
                  <br />
                  <span className="relative inline-block">
                    <span className="absolute -inset-2 bg-gradient-to-r opacity-20"></span>
                    <span className={`relative bg-gradient-to-r bg-clip-text text-transparent from-white via-blue-100 to-purple-200`}>Faisal Irshad</span>
                  </span>
                  <br />
                  <div className="mt-4">
                    <Specialization />
                  </div>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.4,
                  ease: [0.23, 1, 0.32, 1]
                }}
                className={`text-sm sm:text-base md:text-lg max-w-xl leading-relaxed font-light mx-auto lg:mx-0 text-gray-400`}
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
              >
                I’m a Software Engineering student at Superior University and an aspiring Full-Stack Developer. I began with the MERN stack (React, Node.js, Express, MongoDB) and  now specializing in Python with Django and PostgreSQL to build scalable and efficient web applications. I enjoy solving problems, learning new technologies, and creating projects that blend frontend creativity with backend strength.
              </motion.p>

              {/* Action Buttons - Fast Bounce */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.5,
                  ease: [0.23, 1, 0.32, 1]
                }}
                className="flex flex-col sm:flex-row gap-4 pt-6"
              >
                <motion.button 
                  initial={{ opacity: 0, rotateY: -30 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.6,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                  className={`px-6 py-3 border-2 font-medium rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 group bg-gray-800/50 border-gray-600 hover:border-gray-500 text-white hover:bg-gray-700/50`}
                >
                  <Download className="w-4 h-4 group-hover:animate-bounce" />
                  <span>CV Download</span>
                </motion.button>
                
                <motion.button 
                  initial={{ opacity: 0, rotateY: 30 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.7,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                  className={`px-6 py-3 border-2 font-medium rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 group bg-gray-800/50 border-gray-600 hover:border-gray-500 text-white hover:bg-gray-700/50`}
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Contact</span>
                </motion.button>
              </motion.div>

              {/* Social Links */}
              <SocialLinks />
            </motion.div>

            {/* Right Content - Code Editor */}
            <div className="lg:pl-8">
              <CodeEditor />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
