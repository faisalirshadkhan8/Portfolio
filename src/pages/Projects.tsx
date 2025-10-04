import { motion } from 'framer-motion';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "3D Portfolio Website",
      description: "Interactive portfolio built with React, Three.js, and Framer Motion",
      tech: ["React", "Three.js", "TypeScript", "Tailwind CSS"],
      status: "In Progress"
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with modern UI/UX",
      tech: ["Next.js", "Node.js", "MongoDB", "Stripe"],
      status: "Completed"
    },
    {
      id: 3,
      title: "3D Game Experience",
      description: "Browser-based 3D game with physics and animations",
      tech: ["Three.js", "Cannon.js", "GLSL", "WebGL"],
      status: "Completed"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen py-20 px-8 bg-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl font-bold text-white mb-12 text-center"
        >
          My Projects
        </motion.h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="bg-gray-700 h-48 rounded-lg mb-4 flex items-center justify-center">
                <p className="text-gray-400">Project Preview</p>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 bg-blue-600 text-blue-100 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  project.status === 'Completed' 
                    ? 'bg-green-600 text-green-100' 
                    : 'bg-yellow-600 text-yellow-100'
                }`}>
                  {project.status}
                </span>
                <button className="text-blue-400 hover:text-blue-300 font-medium">
                  View Details →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
