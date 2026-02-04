/**
 * ============================================
 * DURGESH SHARMA - PORTFOLIO WEBSITE
 * ============================================
 * 
 * A modern, production-ready portfolio website
 * showcasing skills, projects, and professional
 * experience as a Full Stack Developer.
 * 
 * Author: Durgesh Sharma
 * Email: durgesharma1208@gmail.com
 * Phone: +91 6377592328
 * LinkedIn: linkedin.com/in/durgesh-sharma-64260b33b
 * GitHub: github.com/durgesharma1208/portfolio
 * 
 * Education: B.Tech CSE, SKIT Jaipur (2024-2028)
 * 
 * Tech Stack: React, TypeScript, Tailwind CSS
 * ============================================
 */

import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

// Loading Screen Component
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#0a0a0f] flex flex-col items-center justify-center">
      {/* Logo Animation */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center animate-pulse">
          <span className="text-5xl font-bold text-white">D</span>
        </div>
        {/* Rotating ring */}
        <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400/30 animate-spin" style={{ animationDuration: '3s' }} />
      </div>

      {/* Name */}
      <h2 className="text-2xl font-bold text-white mb-2">Durgesh Sharma</h2>
      <p className="text-gray-400 mb-8">Full Stack Developer</p>

      {/* Progress Bar */}
      <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-gray-500 text-sm mt-3">{progress}%</p>
    </div>
  );
}

// Cursor Effect Component (Desktop Only)
function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        !!target.closest('button') || 
        !!target.closest('a') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(isClickable);
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Don't show on touch devices
  if ('ontouchstart' in window) return null;

  return (
    <>
      {/* Main Cursor */}
      <div 
        className={`fixed w-4 h-4 bg-cyan-400 rounded-full pointer-events-none z-[999] mix-blend-difference transition-transform duration-100 ${isHidden ? 'opacity-0' : 'opacity-100'} ${isPointer ? 'scale-150' : 'scale-100'}`}
        style={{ 
          left: position.x - 8, 
          top: position.y - 8,
          transform: `translate(0, 0) scale(${isPointer ? 1.5 : 1})`,
        }}
      />
      {/* Cursor Trail */}
      <div 
        className={`fixed w-8 h-8 border border-cyan-400/50 rounded-full pointer-events-none z-[998] transition-all duration-300 ${isHidden ? 'opacity-0' : 'opacity-100'} ${isPointer ? 'scale-150 border-cyan-400' : 'scale-100'}`}
        style={{ 
          left: position.x - 16, 
          top: position.y - 16,
        }}
      />
    </>
  );
}

// Particle Background Component
function ParticleBackground() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-cyan-400/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// Main App Component
export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  // Handle loading complete
  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => setIsReady(true), 100);
  };

  // Prevent scroll during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  return (
    <>
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Particle Background */}
      <ParticleBackground />

      {/* Main Content */}
      <div className={`transition-opacity duration-500 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
        {/* Navigation */}
        <Navbar />

        {/* Main Sections */}
        <main>
          {/* Hero Section - Landing */}
          <Hero />

          {/* About Section - Bio & Journey */}
          <About />

          {/* Skills Section - Technical Expertise */}
          <Skills />

          {/* Projects Section - Portfolio */}
          <Projects />

          {/* Contact Section - Get in Touch */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Global Styles for Animations */}
      <style>{`
        /* Smooth scrolling for the entire document */
        html {
          scroll-behavior: smooth;
        }

        /* Hide scrollbar while maintaining functionality */
        body::-webkit-scrollbar {
          width: 8px;
        }

        body::-webkit-scrollbar-track {
          background: #0a0a0f;
        }

        body::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #00d4ff, #0077b6);
          border-radius: 4px;
        }

        body::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #48cae4, #00b4d8);
        }

        /* Selection styling */
        ::selection {
          background: #00d4ff;
          color: #0a0a0f;
        }

        /* Focus visible for accessibility */
        :focus-visible {
          outline: 2px solid #00d4ff;
          outline-offset: 2px;
        }

        /* Disable text selection on decorative elements */
        .no-select {
          user-select: none;
          -webkit-user-select: none;
        }

        /* Line clamp utility */
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Animation fill mode */
        .animation-fill-forwards {
          animation-fill-mode: forwards;
        }
      `}</style>
    </>
  );
}
