import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen py-20 px-8 bg-gray-100"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl font-bold text-gray-900 mb-8"
        >
          About Me
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <p className="text-lg text-gray-700 mb-6">
              I'm a passionate developer who loves creating immersive digital experiences 
              using cutting-edge technologies like React, Three.js, and modern web frameworks.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              With a strong background in both front-end development and 3D graphics, 
              I bring ideas to life through interactive and visually stunning applications.
            </p>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Skills & Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {['React', 'TypeScript', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'Node.js'].map((skill) => (
                  <span 
                    key={skill}
                    className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-gray-300 h-96 rounded-lg flex items-center justify-center">
            <p className="text-gray-600">Your Photo/3D Avatar Here</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
