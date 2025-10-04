import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram } from 'lucide-react';

const SocialLinks = () => {
  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/musabrehman',
      label: 'GitHub',
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/musabrehman',
      label: 'LinkedIn',
    },
    {
      icon: Instagram,
      href: 'https://instagram.com/musabrehman',
      label: 'Instagram',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.8 }}
      className="flex space-x-8"
    >
      {socialLinks.map(({ icon: Icon, href, label }, index) => (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20, rotateX: -45 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ 
            duration: 0.3, 
            delay: 0.9 + index * 0.08,
            ease: [0.23, 1, 0.32, 1]
          }}
          whileHover={{ 
            scale: 1.1, 
            y: -3,
            rotateY: 5,
            transition: { duration: 0.15 }
          }}
          whileTap={{ scale: 0.95, rotateY: -3 }}
          className={`p-4 border rounded-2xl transition-all duration-300 group relative bg-gray-800/50 hover:bg-gray-700/50 border-gray-600 hover:border-gray-500`}
          style={{
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(168, 85, 247, 0.2)',
            transition: 'box-shadow 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 30px rgba(168, 85, 247, 0.7), 0 0 60px rgba(168, 85, 247, 0.4), 0 0 80px rgba(168, 85, 247, 0.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(168, 85, 247, 0.2)'
          }}
          aria-label={label}
        >
          <Icon className={`w-5 h-5 transition-colors text-gray-300 group-hover:text-white`} />
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialLinks;
