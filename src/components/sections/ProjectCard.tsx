import React from 'react';

export type ProjectStatus = 'Completed' | 'In Progress' | 'Pending';

export interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  tech: string[];
  status: ProjectStatus;
  link?: string;
}

const statusStyles: Record<ProjectStatus, string> = {
  'Completed': 'bg-green-600/20 text-green-300 border border-green-500/30',
  'In Progress': 'bg-yellow-600/20 text-yellow-200 border border-yellow-500/30',
  'Pending': 'bg-red-600/20 text-red-200 border border-red-500/30',
};

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, image, tech, status, link }) => {
  return (
    <article
      className="project-card group relative overflow-hidden rounded-2xl bg-gradient-to-b from-gray-900/70 to-gray-900/40 backdrop-blur border border-white/10 shadow-lg transition-transform duration-300 will-change-transform hover:-translate-y-1 hover:scale-[1.03] hover:shadow-blue-500/10"
    >
      {/* Glowing border on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 group-hover:ring-1 ring-blue-500/40 transition" />

      {/* Preview area */}
      <div className="relative h-44 md:h-48 lg:h-40 w-full overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="h-full w-full object-cover transition duration-300 group-hover:brightness-75" />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(147,51,234,0.12),transparent_45%)]" />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          {link ? (
            <a href={link} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 shadow">
              View Project
            </a>
          ) : (
            <div className="px-4 py-2 rounded-lg bg-blue-600/80 text-white font-medium">View Project</div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-2">
          {tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full text-xs bg-gray-800 text-blue-400 border border-blue-500/10 transition-shadow hover:shadow-[0_0_12px_rgba(59,130,246,0.25)]"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          {/* Status badge */}
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>{status}</span>

          {/* Details link */}
          <a
            href={link || '#'}
            className="text-blue-400 font-medium inline-flex items-center gap-1 group/link"
          >
            <span className="border-b border-transparent group-hover/link:border-blue-400 transition">View Details</span>
            <span className="transform transition-transform group-hover/link:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
