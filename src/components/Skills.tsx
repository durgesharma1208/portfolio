/**
 * ============================================
 * SKILLS SECTION COMPONENT
 * Technical skills showcase with categories
 * Animated skill cards with hover effects
 * Progress indicators and proficiency levels
 * ============================================
 */

import { useEffect, useRef, useState } from 'react';

// Skills data organized by category
const skillCategories = [
  {
    title: 'Frontend Development',
    icon: '🎨',
    color: 'from-cyan-400 to-cyan-600',
    skills: [
      { name: 'HTML5', level: 95, icon: '🌐' },
      { name: 'CSS3', level: 90, icon: '🎨' },
      { name: 'JavaScript', level: 88, icon: '⚡' },
      { name: 'React.js', level: 85, icon: '⚛️' },
      { name: 'Tailwind CSS', level: 90, icon: '💨' },
      { name: 'Bootstrap', level: 85, icon: '📦' },
    ],
  },
  {
    title: 'Backend Development',
    icon: '⚙️',
    color: 'from-blue-400 to-blue-600',
    skills: [
      { name: 'Node.js', level: 82, icon: '🟢' },
      { name: 'Express.js', level: 80, icon: '🚂' },
      { name: 'MongoDB', level: 78, icon: '🍃' },
      { name: 'MySQL', level: 75, icon: '🐬' },
      { name: 'REST APIs', level: 85, icon: '🔗' },
      { name: 'Firebase', level: 72, icon: '🔥' },
    ],
  },
  {
    title: 'Programming Languages',
    icon: '💻',
    color: 'from-purple-400 to-purple-600',
    skills: [
      { name: 'C++', level: 88, icon: '🔷' },
      { name: 'JavaScript', level: 88, icon: '🟨' },
      { name: 'Python', level: 75, icon: '🐍' },
      { name: 'Java', level: 70, icon: '☕' },
      { name: 'TypeScript', level: 72, icon: '📘' },
      { name: 'C', level: 80, icon: '🔵' },
    ],
  },
  {
    title: 'Tools & Technologies',
    icon: '🛠️',
    color: 'from-green-400 to-green-600',
    skills: [
      { name: 'Git', level: 88, icon: '📁' },
      { name: 'GitHub', level: 90, icon: '🐙' },
      { name: 'VS Code', level: 95, icon: '💙' },
      { name: 'Postman', level: 82, icon: '📮' },
      { name: 'Figma', level: 70, icon: '🎨' },
      { name: 'Linux', level: 72, icon: '🐧' },
    ],
  },
];

// Core competencies
const coreCompetencies = [
  { name: 'Data Structures', icon: '🗂️' },
  { name: 'Algorithms', icon: '📊' },
  { name: 'Problem Solving', icon: '🧩' },
  { name: 'MERN Stack', icon: '🥞' },
  { name: 'OOP Concepts', icon: '🔲' },
  { name: 'Database Design', icon: '🗄️' },
  { name: 'API Development', icon: '🔌' },
  { name: 'Responsive Design', icon: '📱' },
  { name: 'Version Control', icon: '🔀' },
  { name: 'Debugging', icon: '🐛' },
  { name: 'Clean Code', icon: '✨' },
  { name: 'Agile/Scrum', icon: '🔄' },
];

// Skill progress bar component
function SkillBar({ name, level, icon, delay }: { name: string; level: number; icon: string; delay: number }) {
  const [width, setWidth] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(level), delay);
        }
      },
      { threshold: 0.5 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, [level, delay]);

  return (
    <div ref={barRef} className="group">
      <div className="flex items-center justify-between mb-2">
        <span className="flex items-center gap-2 text-gray-300 font-medium group-hover:text-white transition-colors duration-300">
          <span className="text-lg">{icon}</span>
          {name}
        </span>
        <span className="text-cyan-400 font-semibold text-sm">{level}%</span>
      </div>
      <div className="h-2.5 bg-[#1a1a24] rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-1000 ease-out relative"
          style={{ width: `${width}%` }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  );
}

export function Skills() {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d14] to-[#0a0a0f] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-4">
            My Skills
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Technical
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Expertise</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit of technologies and skills I've mastered through hands-on experience and continuous learning
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {skillCategories.map((category, categoryIndex) => (
            <div 
              key={category.title}
              className={`p-8 bg-[#16161f]/50 backdrop-blur-xl rounded-3xl border border-white/5 hover:border-cyan-500/30 transition-all duration-500 group
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${categoryIndex * 150}ms` }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                  <p className="text-gray-500 text-sm">{category.skills.length} skills</p>
                </div>
              </div>

              {/* Skills List */}
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar 
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    icon={skill.icon}
                    delay={categoryIndex * 150 + skillIndex * 100}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Core Competencies */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white mb-2">Core Competencies</h3>
            <p className="text-gray-400">Key areas where I excel and deliver exceptional results</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {coreCompetencies.map((competency, index) => (
              <div
                key={competency.name}
                className="group px-6 py-3 bg-[#16161f] rounded-full border border-white/5 flex items-center gap-2 hover:border-cyan-500/50 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-600/10 transition-all duration-300 cursor-default hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-lg group-hover:scale-125 transition-transform duration-300">{competency.icon}</span>
                <span className="text-gray-300 font-medium group-hover:text-white transition-colors duration-300">{competency.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* DSA Stats */}
        <div className={`mt-20 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="p-8 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl border border-cyan-500/20 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-cyan-500/20 to-transparent rounded-bl-full" />
            
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">🏆</span>
                  <h3 className="text-2xl font-bold text-white">DSA Problem Solving</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  Consistent practice and dedication to mastering Data Structures and Algorithms. 
                  Active problem solver on multiple competitive programming platforms.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['LeetCode', 'Codeforces', 'GeeksforGeeks', 'HackerRank'].map((platform) => (
                    <span 
                      key={platform}
                      className="px-4 py-2 bg-white/5 rounded-full text-sm text-gray-300 border border-white/10"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '500+', label: 'Problems Solved', icon: '✅' },
                  { value: '100+', label: 'Contest Rating', icon: '📈' },
                  { value: '50+', label: 'Contests', icon: '🎯' },
                  { value: '30+', label: 'Daily Streak', icon: '🔥' },
                ].map((stat, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-[#0a0a0f]/50 rounded-2xl text-center group hover:bg-[#16161f] transition-colors duration-300"
                  >
                    <span className="text-2xl mb-2 block group-hover:scale-125 transition-transform duration-300">{stat.icon}</span>
                    <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-gray-500 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
