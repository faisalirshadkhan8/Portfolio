import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// Custom Text Flipper Effect Component
const TextFlipper = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => {
  const [currentText, setCurrentText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      let index = 0;
      const interval = setInterval(() => {
        if (index <= text.length) {
          setCurrentText(text.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.span
          initial={{ opacity: 0, y: 2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className={className}
        >
          {currentText}
        </motion.span>
      )}
    </AnimatePresence>
  );
};

const CodeEditor = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className="relative w-full h-[260px] sm:h-[320px] lg:h-[400px] lg:ml-16 lg:mr-16 space-y-0 text-left"
    >
      {/* Gradient Border Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-lg blur-lg animate-pulse -z-10"
      ></motion.div>

      {/* Code Editor Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="relative w-full h-full rounded-lg shadow-lg border overflow-hidden flex flex-col bg-[#0f172a] border-white/10"
      >
        {/* Editor Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0 bg-[#1e293b] border-white/10">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-sm font-mono text-gray-400">developer.py</div>
          <div className="w-8"></div>
        </div>

        {/* Code Content with Flipper Effect - Fixed Height, No Scroll */}
        <div className="flex-1 p-4 overflow-hidden">
          <div className="font-mono text-xs leading-tight h-full">
            {/* Line 1: coder = { */}
            <div className="flex mb-1 space-x-1">
              <TextFlipper text="coder" delay={500} className={'text-cyan-400'} />
              <TextFlipper text="=" delay={700} className="text-gray-300" />
              <TextFlipper text="{" delay={900} className="text-gray-300" />
            </div>

            {/* Line 2: "name": "Faisal Irshad", */}
            <div className="flex ml-4 mb-1 space-x-1">
              <TextFlipper text='"name":' delay={1200} className="text-blue-300" />
              <TextFlipper text='"Faisal Irshad",' delay={1500} className="text-emerald-400" />
            </div>

            {/* Line 3: "role": "Full-Stack Developer (Student)", */}
            <div className="flex ml-4 mb-1 space-x-1">
              <TextFlipper text='"role":' delay={1800} className="text-blue-300" />
              <TextFlipper text='"Full-Stack Developer (Student)",' delay={2100} className="text-emerald-400" />
            </div>

            {/* Line 4: "motto": "...", */}
            <div className="flex ml-4 mb-1 space-x-1">
              <TextFlipper text='"motto":' delay={2400} className="text-blue-300" />
              <TextFlipper text='"Building my future, one project at a time.",' delay={2700} className="text-emerald-400" />
            </div>

            {/* Line 5: "skills": [ */}
            <div className="flex ml-4 mb-1 space-x-1">
              <TextFlipper text='"skills":' delay={3200} className="text-blue-300" />
              <TextFlipper text="[" delay={3400} className="text-gray-300" />
            </div>

            {/* Line 6: Skills array first line */}
            <div className="flex ml-8 mb-1 space-x-1">
              <TextFlipper text='"React",' delay={3600} className="text-emerald-400" />
              <TextFlipper text='"Node.js",' delay={3800} className="text-emerald-400" />
              <TextFlipper text='"Express",' delay={4000} className="text-emerald-400" />
              <TextFlipper text='"MongoDB",' delay={4200} className="text-emerald-400" />
            </div>

            {/* Line 7: Skills array second line */}
            <div className="flex ml-8 mb-1 space-x-1">
              <TextFlipper text='"Python",' delay={4400} className="text-emerald-400" />
              <TextFlipper text='"Django",' delay={4600} className="text-emerald-400" />
              <TextFlipper text='"Vite",' delay={4800} className="text-emerald-400" />
              <TextFlipper text='"PostgreSQL"' delay={5000} className="text-emerald-400" />
            </div>

            {/* Line 9: Close skills array */}
            <div className="flex ml-4 mb-1">
              <TextFlipper text="," delay={5200} className="text-gray-300" />
            </div>

            {/* Line 10: "qualities": { */}
            <div className="flex ml-4 mb-1 space-x-1">
              <TextFlipper text='"qualities":' delay={5400} className="text-blue-300" />
              <TextFlipper text="{" delay={5600} className="text-gray-300" />
            </div>

            {/* Line 11: "hard_worker": True, */}
            <div className="flex ml-8 mb-1 space-x-1">
              <TextFlipper text='"hard_worker":' delay={5800} className="text-blue-300" />
              <TextFlipper text="True," delay={6000} className="text-orange-400" />
            </div>

            {/* Line 12: "quick_learner": True, */}
            <div className="flex ml-8 mb-1 space-x-1">
              <TextFlipper text='"quick_learner":' delay={6200} className="text-blue-300" />
              <TextFlipper text="True," delay={6400} className="text-orange-400" />
            </div>

            {/* Line 13: duplicate quick_learner True (kept to match original pacing) */}
            <div className="flex ml-8 mb-1 space-x-1">
              <TextFlipper text='"quick_learner":' delay={6600} className="text-blue-300" />
              <TextFlipper text="True" delay={6800} className="text-orange-400" />
            </div>

            {/* Line 14: Close qualities */}
            <div className="flex ml-4 mb-1">
              <TextFlipper text="}" delay={7000} className="text-gray-300" />
            </div>

            {/* Line 15: Close coder dict */}
            <div className="flex mb-1">
              <TextFlipper text="}" delay={7200} className="text-gray-300" />
            </div>

            {/* Empty line */}
            <div className="mb-1"></div>

            {/* Line 17: def hireable(coder): */}
            <div className="flex mb-1 space-x-1">
              <TextFlipper text="def" delay={7600} className={'text-purple-400'} />
              <TextFlipper text="hireable(coder):" delay={7800} className={'text-yellow-400'} />
            </div>

            {/* Line 18: return ( */}
            <div className="flex ml-4 mb-1 space-x-1">
              <TextFlipper text="return" delay={8000} className={'text-purple-400'} />
              <TextFlipper text="(" delay={8200} className="text-gray-300" />
            </div>

            {/* Line 19: condition check */}
            <div className="flex ml-8 mb-1 space-x-1">
              <TextFlipper text='coder["qualities"]["hard_worker"]' delay={8400} className="text-gray-300" />
            </div>

            <div className="flex ml-8 mb-1 space-x-1">
              <TextFlipper text="and" delay={8600} className={'text-purple-400'} />
              <TextFlipper text='coder["qualities"]["quick_learner"]' delay={8800} className="text-gray-300" />
            </div>

            <div className="flex ml-8 mb-1 space-x-1">
              <TextFlipper text="and" delay={9000} className={'text-purple-400'} />
              <TextFlipper text='len(coder["skills"]) >= 5' delay={9200} className="text-gray-300" />
            </div>

            {/* Line 22: Close return */}
            <div className="flex ml-4 mb-1">
              <TextFlipper text=")" delay={9400} className="text-gray-300" />
            </div>

            {/* Empty line */}
            <div className="mb-1"></div>

            {/* Line 24: print statement */}
            <div className="flex mb-1 space-x-1">
              <TextFlipper text="print(hireable(coder))" delay={9800} className={'text-yellow-400'} />
              <TextFlipper text="# True" delay={10000} className="text-green-400" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CodeEditor;
