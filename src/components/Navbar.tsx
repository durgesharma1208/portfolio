/**
 * ============================================
 * NAVBAR COMPONENT
 * Sticky navigation with glass morphism effect
 * Smooth scroll navigation to all sections
 * Mobile responsive hamburger menu
 * ============================================
 */

import { useState, useEffect } from 'react';

// Navigation links configuration
const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  // State for mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // State for scroll detection (navbar background change)
  const [isScrolled, setIsScrolled] = useState(false);
  // State for active section
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      // Add background when scrolled past 50px
      setIsScrolled(window.scrollY > 50);

      // Determine active section based on scroll position
      const sections = navLinks.map(link => link.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scroll navigation
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    
    // Close mobile menu after clicking
    setIsMenuOpen(false);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'navbar-glass shadow-lg shadow-black/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="group flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg transform group-hover:rotate-12 transition-transform duration-300">
              D
            </div>
            <span className="text-xl font-bold hidden sm:block">
              <span className="text-white">Durgesh</span>
              <span className="gradient-text">.</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-5 py-2 text-sm font-medium transition-all duration-300 rounded-full group
                  ${activeSection === link.href.substring(1) 
                    ? 'text-cyan-400' 
                    : 'text-gray-300 hover:text-white'
                  }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link.name}
                {/* Animated underline */}
                <span 
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 rounded-full
                    ${activeSection === link.href.substring(1) ? 'w-6' : 'w-0 group-hover:w-6'}`}
                />
                {/* Hover background */}
                <span className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="relative inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-full overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-0.5"
            >
              <span className="relative z-10">Hire Me</span>
              <svg 
                className="w-4 h-4 relative z-10 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              {/* Shimmer effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span 
                className={`block w-full h-0.5 bg-white rounded-full transform transition-all duration-300 origin-center
                  ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}
              />
              <span 
                className={`block w-full h-0.5 bg-white rounded-full transition-all duration-300
                  ${isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
              />
              <span 
                className={`block w-full h-0.5 bg-white rounded-full transform transition-all duration-300 origin-center
                  ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out
            ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="py-4 px-2 space-y-1 bg-[#12121a]/90 backdrop-blur-xl rounded-2xl mb-4 border border-white/5">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 transform
                  ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}
                  ${activeSection === link.href.substring(1) 
                    ? 'bg-gradient-to-r from-cyan-500/10 to-blue-600/10 text-cyan-400 border-l-2 border-cyan-400' 
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                style={{ transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms' }}
              >
                <span className="text-base font-medium">{link.name}</span>
              </a>
            ))}
            
            {/* Mobile CTA */}
            <div className="pt-3">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30"
              >
                <span>Hire Me</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
