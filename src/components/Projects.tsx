/**
 * ============================================
 * PROJECTS SECTION COMPONENT
 * Portfolio showcase with project cards
 * Grid layout with hover animations
 * Live demo and GitHub links
 * ============================================
 */

import { useEffect, useRef, useState } from 'react';

// Projects data
const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with product catalog, shopping cart, user authentication, payment integration, and order management. Built with modern web technologies for optimal performance.',
    image: '🛒',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
    category: 'Full Stack',
    liveUrl: 'https://github.com/durgesharma1208/portfolio/',
    githubUrl: 'https://github.com/durgesharma1208/portfolio/',
    featured: true,
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, team collaboration features, and progress tracking dashboards.',
    image: '📋',
    tags: ['React', 'Firebase', 'Tailwind CSS', 'DnD Kit'],
    category: 'Frontend',
    liveUrl: 'https://github.com/durgesharma1208/portfolio/',
    githubUrl: 'https://github.com/durgesharma1208/portfolio/',
    featured: true,
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'A beautiful weather dashboard with real-time data, 7-day forecasts, location search, and interactive weather maps. Features smooth animations and responsive design.',
    image: '🌤️',
    tags: ['JavaScript', 'API Integration', 'CSS3', 'Chart.js'],
    category: 'Frontend',
    liveUrl: 'https://github.com/durgesharma1208/portfolio/',
    githubUrl: 'https://github.com/durgesharma1208/portfolio/',
    featured: false,
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'Modern, responsive portfolio website showcasing projects and skills. Features smooth animations, dark theme, and optimal performance. The site you are currently viewing!',
    image: '💼',
    tags: ['React', 'Tailwind CSS', 'TypeScript', 'Framer Motion'],
    category: 'Frontend',
    liveUrl: 'https://github.com/durgesharma1208/portfolio/',
    githubUrl: 'https://github.com/durgesharma1208/portfolio/',
    featured: true,
  },
  {
    id: 5,
    title: 'Blog Platform',
    description: 'A full-stack blogging platform with rich text editor, user authentication, comment system, and social sharing. Includes admin dashboard for content management.',
    image: '📝',
    tags: ['MERN Stack', 'JWT', 'Rich Text', 'Cloudinary'],
    category: 'Full Stack',
    liveUrl: 'https://github.com/durgesharma1208/portfolio/',
    githubUrl: 'https://github.com/durgesharma1208/portfolio/',
    featured: false,
  },
  {
    id: 6,
    title: 'DSA Visualizer',
    description: 'Interactive visualizer for data structures and algorithms. Helps understand sorting algorithms, graph traversals, tree operations, and more with step-by-step animations.',
    image: '📊',
    tags: ['JavaScript', 'Algorithms', 'Canvas API', 'CSS3'],
    category: 'Educational',
    liveUrl: 'https://github.com/durgesharma1208/portfolio/',
    githubUrl: 'https://github.com/durgesharma1208/portfolio/',
    featured: true,
  },
];

// Filter categories
const categories = ['All', 'Full Stack', 'Frontend', 'Educational'];

// Project Card Component
function ProjectCard({ project, index, isVisible }: { project: typeof projects[0]; index: number; isVisible: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`group relative bg-[#16161f] rounded-3xl overflow-hidden border border-white/5 transition-all duration-500 hover:border-cyan-500/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        ${project.featured ? 'md:col-span-2 lg:col-span-1' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white text-xs font-semibold">
          Featured
        </div>
      )}

      {/* Project Image/Icon Area */}
      <div className="relative h-48 bg-gradient-to-br from-[#1a1a24] to-[#12121a] flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#16161f] via-transparent to-transparent z-10" />
        
        {/* Project Icon */}
        <span 
          className={`text-7xl relative z-0 transition-all duration-500 ${isHovered ? 'scale-125 rotate-12' : 'scale-100 rotate-0'}`}
        >
          {project.image}
        </span>

        {/* Hover Overlay with Links */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/95 to-[#0a0a0f]/80 flex items-center justify-center gap-4 z-20 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        >
          <a 
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Live Demo
          </a>
          <a 
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-xl text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        {/* Category */}
        <span className="inline-block px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-medium rounded-full mb-3">
          {project.category}
        </span>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span 
              key={tag}
              className="px-3 py-1 bg-white/5 text-gray-400 text-xs rounded-full border border-white/5 hover:border-cyan-500/30 hover:text-cyan-400 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
}

export function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Filter projects based on active category
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#0a0a0f] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-dots opacity-20" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-4">
            My Work
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Featured
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A showcase of projects that demonstrate my skills in building full-stack applications, from concept to deployment
          </p>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* View More CTA */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <a 
            href="https://github.com/durgesharma1208/portfolio/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white font-medium hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>View All Projects on GitHub</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
