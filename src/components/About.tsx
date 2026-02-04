/**
 * ============================================
 * ABOUT SECTION COMPONENT
 * Professional bio and personal introduction
 * Career focus and background information
 * Clean, readable layout with animations
 * ============================================
 */

import { useEffect, useRef, useState } from 'react';

// Experience/Education data
const timeline = [
  {
    year: '2024 - 2028',
    title: 'B.Tech in Computer Science',
    organization: 'SKIT Jaipur',
    description: 'Currently pursuing Bachelor of Technology in Computer Science & Engineering with focus on Full Stack Development and Data Structures.',
    icon: '🎓',
    current: true,
  },
  {
    year: '2024',
    title: 'Full Stack Developer',
    organization: 'Self-Taught & Projects',
    description: 'Mastered MERN stack development, built multiple production-ready applications, and contributed to open-source projects.',
    icon: '💻',
    current: false,
  },
  {
    year: '2023 - Present',
    title: 'DSA Problem Solver',
    organization: 'LeetCode, Codeforces, GFG',
    description: 'Solved 500+ DSA problems across various platforms. Strong foundation in algorithms, data structures, and competitive programming.',
    icon: '🧩',
    current: false,
  },
];

// Highlights data
const highlights = [
  { icon: '🎯', title: 'Focus', value: 'Full Stack Development' },
  { icon: '📍', title: 'Location', value: 'Jaipur, Rajasthan' },
  { icon: '🗣️', title: 'Languages', value: 'English, Hindi' },
  { icon: '☕', title: 'Fuel', value: 'Coffee & Code' },
];

export function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for animations
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

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#0a0a0f] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-dots opacity-20" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-[80px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-4">
            About Me
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Turning Ideas Into
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Reality</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Passionate about creating impactful digital solutions and solving complex problems
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Bio */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {/* Bio Card */}
            <div className="relative p-8 bg-gradient-to-br from-[#16161f] to-[#12121a] rounded-3xl border border-white/5 mb-8 group hover:border-cyan-500/30 transition-all duration-500">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-tr-3xl" />
              
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl flex-shrink-0">
                  👨‍💻
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">Durgesh Sharma</h3>
                  <p className="text-cyan-400 font-medium">Full Stack Developer & DSA Expert</p>
                </div>
              </div>

              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Hello! I'm <span className="text-white font-medium">Durgesh Sharma</span>, a dedicated 
                  <span className="text-cyan-400 font-medium"> Computer Science student</span> at SKIT Jaipur, 
                  passionate about crafting beautiful, functional, and user-centric digital experiences.
                </p>
                <p>
                  My journey in tech began with curiosity about how things work, which led me to dive deep 
                  into <span className="text-white font-medium">Full Stack Development</span> and 
                  <span className="text-white font-medium"> Data Structures & Algorithms</span>. Today, I 
                  specialize in building scalable web applications using modern technologies.
                </p>
                <p>
                  When I'm not coding, you'll find me solving DSA problems on LeetCode, exploring new 
                  technologies, or contributing to open-source projects. I believe in continuous learning 
                  and pushing the boundaries of what's possible with code.
                </p>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {highlights.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <div className="text-gray-500 text-xs">{item.title}</div>
                      <div className="text-white text-sm font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume Download */}
            <a 
              href="https://github.com/durgesharma1208/portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-xl text-cyan-400 font-medium hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:text-white transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>View My GitHub Portfolio</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Right Column - Timeline */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-lg">
                📈
              </span>
              My Journey
            </h3>

            <div className="relative space-y-6">
              {/* Timeline Line */}
              <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-transparent" />

              {timeline.map((item, index) => (
                <div 
                  key={index}
                  className="relative pl-16 group"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-0 top-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-cyan-500/20
                    ${item.current 
                      ? 'bg-gradient-to-br from-cyan-500 to-blue-600' 
                      : 'bg-[#16161f] border border-white/10'
                    }`}
                  >
                    {item.icon}
                  </div>

                  {/* Content Card */}
                  <div className="p-6 bg-[#16161f] rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all duration-300 group-hover:transform group-hover:translate-x-2">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-sm font-medium rounded-full">
                        {item.year}
                      </span>
                      {item.current && (
                        <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                          Current
                        </span>
                      )}
                    </div>
                    <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-cyan-400 text-sm font-medium mb-3">{item.organization}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fun Facts / Interests */}
        <div className={`mt-20 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white mb-2">What Drives Me</h3>
            <p className="text-gray-400">Beyond code, here's what keeps me motivated</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🚀', text: 'Building Products', color: 'from-cyan-500' },
              { icon: '🧠', text: 'Problem Solving', color: 'from-blue-500' },
              { icon: '📚', text: 'Continuous Learning', color: 'from-purple-500' },
              { icon: '🤝', text: 'Team Collaboration', color: 'from-green-500' },
            ].map((item, index) => (
              <div 
                key={index}
                className="group p-6 bg-[#16161f] rounded-2xl border border-white/5 text-center hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${item.color} to-transparent/50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <p className="text-white font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
