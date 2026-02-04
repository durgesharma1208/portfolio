/**
 * ============================================
 * HERO SECTION COMPONENT
 * Main landing section with introduction
 * Animated text, profile image, and CTAs
 * Particle effects and gradient orbs
 * ============================================
 */

import { useState, useEffect } from 'react';

// Roles for typewriter effect
const roles = [
  'Full Stack Developer',
  'DSA Problem Solver',
  'React Developer',
  'Web Developer',
  'MERN Stack Developer'
];

export function Hero() {
  // State for typewriter effect
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Stats data
  const stats = [
    { number: '500+', label: 'DSA Problems' },
    { number: '25+', label: 'Projects' },
    { number: '10+', label: 'Technologies' },
  ];

  // Typewriter effect logic
  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseDuration = 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.substring(0, displayText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(currentRole.substring(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex]);

  // Smooth scroll to contact section
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Smooth scroll to projects section
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content - Text */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Greeting Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-8 animate-fade-in-down"
            >
              <span className="animate-wave text-xl">👋</span>
              <span className="text-gray-300 text-sm font-medium">Welcome to my portfolio</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 animate-fade-in-up opacity-0-initial" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              <span className="text-white">Hi, I'm</span>
              <br />
              <span className="relative inline-block mt-2">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                  Durgesh Sharma
                </span>
                {/* Underline decoration */}
                <svg 
                  className="absolute -bottom-2 left-0 w-full" 
                  viewBox="0 0 300 12" 
                  fill="none"
                >
                  <path 
                    d="M2 10C50 3 150 3 298 10" 
                    stroke="url(#gradient)" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                    className="animate-[dash_2s_ease-in-out_forwards]"
                    style={{ strokeDasharray: 300, strokeDashoffset: 300 }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00d4ff" />
                      <stop offset="50%" stopColor="#0077b6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            {/* Role with Typewriter Effect */}
            <div 
              className="flex items-center justify-center lg:justify-start gap-3 mb-6 animate-fade-in-up opacity-0-initial"
              style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
            >
              <span className="text-gray-400 text-lg">I'm a</span>
              <span className="text-xl sm:text-2xl font-semibold text-cyan-400 code-font min-w-[280px] sm:min-w-[320px]">
                {displayText}
                <span className="animate-pulse">|</span>
              </span>
            </div>

            {/* Description */}
            <p 
              className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-in-up opacity-0-initial"
              style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
            >
              A passionate <span className="text-cyan-400 font-medium">B.Tech CSE</span> student at <span className="text-white font-medium">SKIT Jaipur (2024-2028)</span>, 
              specializing in building exceptional digital experiences. I love turning complex problems into simple, 
              beautiful, and intuitive solutions.
            </p>

            {/* CTA Buttons */}
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 animate-fade-in-up opacity-0-initial"
              style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
            >
              {/* Primary Button */}
              <button 
                onClick={scrollToContact}
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/30 hover:-translate-y-1"
              >
                <span className="relative z-10">Contact Me</span>
                <svg className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                {/* Shine effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>

              {/* Secondary Button */}
              <button 
                onClick={scrollToProjects}
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-cyan-500/50 text-cyan-400 font-semibold rounded-full overflow-hidden transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-500/10 hover:-translate-y-1"
              >
                <span>View Projects</span>
                <svg className="w-5 h-5 transform group-hover:rotate-45 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </div>

            {/* Stats */}
            <div 
              className="flex flex-wrap justify-center lg:justify-start gap-8 animate-fade-in-up opacity-0-initial"
              style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
            >
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center lg:text-left group cursor-default"
                >
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center animate-fade-in-right opacity-0-initial" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <div className="relative">
              {/* Rotating Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full animate-spin-slow p-1" style={{ animationDuration: '8s' }}>
                <div className="w-full h-full bg-[#0a0a0f] rounded-full" />
              </div>
              
              {/* Profile Image Container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-[#0a0a0f] animate-float">
                {/* Placeholder for profile image - Replace with actual image */}
                <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center">
                  {/* Profile Initials as fallback */}
                  <span className="text-8xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    DS
                  </span>
                </div>
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/50 to-transparent" />
              </div>

              {/* Floating Tech Icons */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#12121a] rounded-2xl flex items-center justify-center border border-white/10 animate-float shadow-xl" style={{ animationDelay: '0.5s' }}>
                <span className="text-3xl">⚛️</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-[#12121a] rounded-2xl flex items-center justify-center border border-white/10 animate-float shadow-xl" style={{ animationDelay: '1s' }}>
                <span className="text-2xl">💻</span>
              </div>
              <div className="absolute top-1/2 -right-8 w-12 h-12 bg-[#12121a] rounded-xl flex items-center justify-center border border-white/10 animate-float shadow-xl" style={{ animationDelay: '1.5s' }}>
                <span className="text-xl">🚀</span>
              </div>
              <div className="absolute top-1/4 -left-6 w-12 h-12 bg-[#12121a] rounded-xl flex items-center justify-center border border-white/10 animate-float shadow-xl" style={{ animationDelay: '2s' }}>
                <span className="text-xl">🎯</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
        <span className="text-gray-500 text-xs uppercase tracking-widest">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-cyan-400 rounded-full animate-pulse" />
        </div>
      </div>

      {/* CSS for dash animation */}
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </section>
  );
}
