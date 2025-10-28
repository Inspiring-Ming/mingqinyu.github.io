import React, { useState, useEffect } from 'react';

// ==========================================
// CONFIGURATION SECTION - EDIT HERE
// ==========================================

const CONFIG = {
  // Personal Information
  name: "Mingqin Yu",
  title: "PhD Researcher | Software Engineering | ESG Reporting",
  email: "your.email@university.edu",

  // About Me Text
  aboutText: "I am a PhD researcher specializing in software engineering solutions for Environmental, Social, and Governance (ESG) reporting. My work focuses on developing scalable, automated systems for ESG data collection, analysis, and disclosure that comply with emerging regulatory frameworks. With a strong foundation in computer science and a passion for sustainability, I create innovative tools that bridge the gap between technology and responsible business practices.",

  // Profile Photo (leave empty string for placeholder icon)
  profilePhoto: "", // Add your photo URL here: "https://example.com/your-photo.jpg"

  // Social Links
  socialLinks: {
    googleScholar: "https://scholar.google.com/",
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourusername"
  },

  // Projects - Add your project images here
  projects: [
    {
      id: 1,
      title: "ESG-Analyzer Platform",
      url: "github.com/yourusername/esg-analyzer",
      description: "An open-source platform enabling organizations to analyze and benchmark ESG performance against industry peers. Incorporates advanced NLP for automated report analysis and machine learning models for trend prediction.",
      tags: ["Python", "Machine Learning", "NLP", "Open Source", "TensorFlow"],
      github: "https://github.com/yourusername/esg-analyzer",
      demo: "#",
      image: "", // Add image URL here: "https://example.com/project1.jpg"
      imageColor: "#4f46e5" // Fallback color if no image
    },
    {
      id: 2,
      title: "Climate Disclosure Compliance Checker",
      url: "github.com/yourusername/tcfd-checker",
      description: "Automated validation tool for corporate climate disclosures against TCFD recommendations. Uses rule-based engines combined with semantic analysis to identify reporting gaps and ensure compliance.",
      tags: ["TCFD", "Regulatory Tech", "Semantic Analysis", "Python"],
      github: "https://github.com/yourusername/tcfd-checker",
      demo: "#",
      image: "",
      imageColor: "#059669"
    },
    {
      id: 3,
      title: "Blockchain for Supply Chain ESG",
      url: "research-publication.com/blockchain-esg",
      description: "Research on applying blockchain technology to create immutable, transparent ESG metric records throughout supply chains. Enables more reliable Scope 3 emissions reporting and enhances supply chain sustainability visibility.",
      tags: ["Blockchain", "Supply Chain", "Ethereum", "Smart Contracts"],
      github: "#",
      demo: "#",
      image: "",
      imageColor: "#dc2626"
    },
    {
      id: 4,
      title: "ESG Data Quality Framework",
      url: "github.com/yourusername/esg-quality",
      description: "Comprehensive framework for assessing ESG data quality, completeness, and reliability. Addresses key challenges in sustainability reporting through systematic validation methods and quality metrics.",
      tags: ["Data Quality", "Validation", "Standards", "TypeScript"],
      github: "https://github.com/yourusername/esg-quality",
      demo: "#",
      image: "",
      imageColor: "#7c3aed"
    },
    {
      id: 5,
      title: "Deep Learning for ESG Text Analysis",
      url: "papers.icml.cc/esg-transformers",
      description: "Advanced deep learning models using transformer architectures for automated ESG information extraction from unstructured corporate documents. Achieves state-of-the-art accuracy in ESG disclosure analysis.",
      tags: ["Deep Learning", "Transformers", "BERT", "PyTorch"],
      github: "https://github.com/yourusername/esg-transformers",
      demo: "#",
      image: "",
      imageColor: "#0891b2"
    },
    {
      id: 6,
      title: "Real-time ESG Monitoring Dashboard",
      url: "esg-dashboard.com",
      description: "Interactive dashboard for continuous ESG performance monitoring with real-time alerts and predictive analytics. Scalable architecture supporting enterprise-level deployments with React and WebSocket integration.",
      tags: ["React", "Real-time", "Data Visualization", "WebSocket"],
      github: "#",
      demo: "#",
      image: "",
      imageColor: "#ea580c"
    }
  ],

  // Footer
  footerText: "PhD Researcher | Software Engineering | ESG Reporting",
  copyright: "© 2025 Mingqin Yu. All rights reserved."
};

// ==========================================
// END CONFIGURATION SECTION
// ==========================================

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const galleryRef = React.useRef(null);
  const isScrollingRef = React.useRef(false);
  const scrollTimeoutRef = React.useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isDark]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.05,
      rootMargin: '0px 0px 100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id) {
          setVisibleSections(prev => new Set([...prev, entry.target.id]));
        }
      });
    }, observerOptions);

    // Small delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(() => {
      const sections = document.querySelectorAll('[id]');
      sections.forEach(section => {
        const classList = section.className || '';
        if (classList.includes('hero') ||
            classList.includes('gallery-section') ||
            classList.includes('project-wrapper')) {
          observer.observe(section);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      const sections = document.querySelectorAll('[id]');
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const updateScrollButtons = () => {
    if (galleryRef.current) {
      // Always show both arrows for circular navigation
      setCanScrollLeft(true);
      setCanScrollRight(true);

      // Calculate which project is currently in view
      const gallery = galleryRef.current;
      const { scrollLeft, scrollWidth } = gallery;
      const projectSetWidth = scrollWidth / 3;
      const singleProjectWidth = projectSetWidth / CONFIG.projects.length;

      // Calculate relative scroll position within the middle set
      const relativeScroll = ((scrollLeft % projectSetWidth) + projectSetWidth) % projectSetWidth;
      const index = Math.round(relativeScroll / singleProjectWidth) % CONFIG.projects.length;

      setCurrentProjectIndex(index);
    }
  };

  useEffect(() => {
    const gallery = galleryRef.current;
    if (gallery) {
      // Initial update
      updateScrollButtons();
      // Update again after a short delay to ensure content is loaded
      const timeoutId = setTimeout(updateScrollButtons, 100);

      gallery.addEventListener('scroll', updateScrollButtons);
      window.addEventListener('resize', updateScrollButtons);

      return () => {
        clearTimeout(timeoutId);
        gallery.removeEventListener('scroll', updateScrollButtons);
        window.removeEventListener('resize', updateScrollButtons);
      };
    }
  }, []);

  const scrollGallery = (direction) => {
    if (galleryRef.current) {
      const gallery = galleryRef.current;
      const scrollAmount = 800;

      gallery.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollToProject = (index) => {
    if (galleryRef.current) {
      const gallery = galleryRef.current;
      const { scrollWidth } = gallery;
      const projectSetWidth = scrollWidth / 3;
      const singleProjectWidth = projectSetWidth / CONFIG.projects.length;

      // Scroll to the project in the middle set
      const targetScroll = projectSetWidth + (index * singleProjectWidth);

      gallery.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  // Handle infinite loop by detecting when we reach the end/beginning
  const handleInfiniteScroll = () => {
    if (galleryRef.current && !isScrollingRef.current) {
      const gallery = galleryRef.current;
      const { scrollWidth } = gallery;

      // Calculate the width of one set of projects
      const projectSetWidth = scrollWidth / 3; // We have 3 sets (original + 2 clones)

      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Wait for scroll to stop before checking position
      scrollTimeoutRef.current = setTimeout(() => {
        const currentScroll = gallery.scrollLeft;

        // If scrolled past the second set (too far right), instantly reposition to first set
        if (currentScroll >= projectSetWidth * 2 - 50) {
          isScrollingRef.current = true;
          gallery.scrollTo({
            left: currentScroll - projectSetWidth,
            behavior: 'instant'
          });
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 50);
        }
        // If scrolled before the first set (too far left), instantly reposition to second set
        else if (currentScroll <= 50) {
          isScrollingRef.current = true;
          gallery.scrollTo({
            left: currentScroll + projectSetWidth,
            behavior: 'instant'
          });
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 50);
        }
      }, 50);
    }
  };

  useEffect(() => {
    const gallery = galleryRef.current;
    if (gallery) {
      // Initial position to middle set
      const timeoutId = setTimeout(() => {
        const projectSetWidth = gallery.scrollWidth / 3;
        gallery.scrollTo({
          left: projectSetWidth,
          behavior: 'instant'
        });
      }, 150);

      gallery.addEventListener('scroll', handleInfiniteScroll);

      return () => {
        clearTimeout(timeoutId);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        gallery.removeEventListener('scroll', handleInfiniteScroll);
      };
    }
  }, []);

  const projects = CONFIG.projects;

  const ProjectCard = ({ project, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const projectId = `project-${project.id}`;

    return (
      <div
        className={`project-wrapper ${visibleSections.has(projectId) ? 'visible' : ''}`}
        id={projectId}
        style={{
          transitionDelay: `${index * 0.1}s`
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="project-container">
          {/* Image Card - Back Layer */}
          <div className="project-image-card">
            {project.image ? (
              <img src={project.image} alt={project.title} className="project-image" />
            ) : (
              <div className="project-image-placeholder" style={{
                background: `linear-gradient(135deg, ${project.imageColor} 0%, ${project.imageColor}dd 100%)`
              }}>
                <div className="image-overlay">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="placeholder-icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <p className="placeholder-text">Project Image</p>
                </div>
              </div>
            )}
          </div>

          {/* Content Card - Front Layer */}
          <div className="project-content-card">
            <div className="project-url">{project.url}</div>
            <h3>{project.title}</h3>
            <p className="project-description">{project.description}</p>
            
            <div className="project-tags">
              {project.tags.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>

            <div className="project-links">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-icon-link">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-icon-link">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="portfolio">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=La+Belle+Aurore&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --bg-primary: #ffffff;
          --bg-secondary: #f8f9fa;
          --text-primary: #1a1a1a;
          --text-secondary: #4b5563;
          --text-tertiary: #6b7280;
          --border-color: #e5e7eb;
          --card-bg: #ffffff;
          --nav-bg: rgba(255, 255, 255, 0.95);
          --shadow: rgba(0, 0, 0, 0.1);
          --shadow-hover: rgba(0, 0, 0, 0.15);
          --accent-primary: #FFC800;
          --accent-secondary: #FFD740;
          --accent-dark: #F5A623;
        }

        [data-theme="dark"] {
          --bg-primary: #0f172a;
          --bg-secondary: #1e293b;
          --text-primary: #f1f5f9;
          --text-secondary: #cbd5e1;
          --text-tertiary: #94a3b8;
          --border-color: #334155;
          --card-bg: #1e293b;
          --nav-bg: rgba(15, 23, 42, 0.95);
          --shadow: rgba(0, 0, 0, 0.3);
          --shadow-hover: rgba(0, 0, 0, 0.5);
          --accent-primary: #FFC800;
          --accent-secondary: #FFD740;
          --accent-dark: #F5A623;
        }

        html {
          scroll-behavior: smooth;
          scroll-snap-type: y proximity;
          overflow-y: scroll;
        }

        * {
          scroll-padding-top: 70px;
        }

        @media (prefers-reduced-motion: no-preference) {
          html {
            scroll-snap-type: y mandatory;
          }
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
          line-height: 1.6;
          color: var(--text-primary);
          background: var(--bg-secondary);
          overflow-x: hidden;
          transition: background 0.3s ease, color 0.3s ease;
          min-height: 100vh;
        }

        .portfolio {
          width: 100%;
          overflow-x: hidden;
          background: var(--bg-secondary);
          min-height: 100vh;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Profile Photo */
        .profile-photo {
          margin-top: 20px;
          margin-bottom: 30px;
          animation: fadeInScale 0.8s ease-out 0.1s both;
        }

        .profile-photo-placeholder {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          box-shadow: 0 10px 40px rgba(255, 200, 0, 0.3);
          transition: all 0.3s ease;
        }

        .profile-photo-img {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
          margin: 0 auto;
          display: block;
          box-shadow: 0 10px 40px rgba(255, 200, 0, 0.3);
          transition: all 0.3s ease;
        }

        .profile-photo-placeholder:hover,
        .profile-photo-img:hover {
          transform: scale(1.05);
          box-shadow: 0 15px 50px rgba(255, 200, 0, 0.4);
        }

        .profile-photo-placeholder svg {
          width: 80px;
          height: 80px;
          color: #1a1a1a;
        }

        /* Social Links with Labels */
        .social-links {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 15px;
          margin: 40px auto 40px auto;
          flex-wrap: wrap;
          width: 100%;
          max-width: 600px;
        }

        .social-link-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          transition: all 0.3s ease;
          animation: fadeInScale 0.6s ease-out both;
          width: 110px;
          flex-shrink: 0;
        }

        .social-link-item:nth-child(1) {
          animation-delay: 0.8s;
        }

        .social-link-item:nth-child(2) {
          animation-delay: 0.9s;
        }

        .social-link-item:nth-child(3) {
          animation-delay: 1s;
        }

        .social-link-item:nth-child(4) {
          animation-delay: 1.1s;
        }

        .social-icon {
          width: 56px;
          height: 56px;
          background: var(--card-bg);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          border: 2px solid var(--border-color);
          box-shadow: 0 4px 12px var(--shadow);
        }

        .social-link-item:hover .social-icon {
          background: var(--accent-primary);
          border-color: var(--accent-dark);
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 10px 25px rgba(255, 200, 0, 0.4);
        }

        .social-icon svg {
          width: 26px;
          height: 26px;
          transition: all 0.3s ease;
        }

        /* Colored Social Icons */
        .social-icon-scholar svg {
          color: #4285F4;
        }

        .social-icon-linkedin svg {
          color: #0A66C2;
        }

        .social-icon-github svg {
          color: #181717;
        }

        [data-theme="dark"] .social-icon-github svg {
          color: #ffffff;
        }

        .social-icon-email svg {
          color: #EA4335;
        }

        .social-link-item:hover .social-icon svg {
          color: #1a1a1a;
          transform: scale(1.1);
        }

        .social-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          transition: color 0.3s ease;
          letter-spacing: 0.5px;
        }

        .social-link-item:hover .social-label {
          color: var(--accent-primary);
        }

        /* Modern Scroll Indicator */
        .scroll-indicator {
          margin-top: 20px;
          margin-bottom: 40px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          z-index: 10;
          animation: fadeInUp 1s ease-out 1.2s both;
        }

        .scroll-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--accent-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 30px rgba(255, 200, 0, 0.4);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          animation: floatBounce 3s ease-in-out infinite;
        }

        @keyframes floatBounce {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        .scroll-indicator:hover .scroll-icon {
          background: var(--accent-dark);
          box-shadow: 0 12px 40px rgba(255, 200, 0, 0.6);
          transform: scale(1.15);
          animation: none;
        }

        .scroll-icon svg {
          width: 28px;
          height: 28px;
          color: #1a1a1a;
          transition: transform 0.3s ease;
        }

        .scroll-indicator:hover .scroll-icon svg {
          transform: translateY(3px);
        }

        /* Theme Toggle Button */
        .theme-toggle {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--card-bg);
          border: 2px solid var(--border-color);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 12px var(--shadow);
          animation: fadeInScale 0.6s ease-out 1.2s both;
        }

        .theme-toggle:hover {
          transform: scale(1.15) rotate(10deg);
          box-shadow: 0 8px 20px var(--shadow-hover);
          border-color: var(--accent-primary);
          background: var(--accent-primary);
        }

        .theme-toggle:active {
          transform: scale(0.95) rotate(0deg);
        }

        .theme-toggle svg {
          width: 24px;
          height: 24px;
          color: var(--text-primary);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .theme-toggle:hover svg {
          transform: rotate(180deg) scale(1.1);
          color: #1a1a1a;
        }

        /* Navigation */
        nav {
          background: var(--nav-bg);
          backdrop-filter: blur(10px);
          box-shadow: ${scrolled ? '0 2px 10px var(--shadow)' : 'none'};
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1001;
          transition: all 0.3s ease;
        }

        nav .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px 40px;
        }

        nav .logo {
          font-family: 'La Luxes Script', 'La Belle Aurore', cursive;
          font-size: 2.2rem;
          font-weight: 400;
          color: var(--text-primary);
          letter-spacing: -3px;
          text-decoration: none;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }

        nav .logo:hover {
          opacity: 0.7;
        }


        nav ul {
          display: flex;
          list-style: none;
          gap: 40px;
        }

        nav a {
          color: var(--text-tertiary);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: color 0.3s;
          letter-spacing: 0.3px;
          position: relative;
        }

        nav a::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--accent-primary);
          transition: width 0.3s ease;
        }

        nav a:hover {
          color: var(--text-primary);
        }

        nav a:hover::after {
          width: 100%;
        }

        /* Hero Section */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          padding: 140px 40px 80px;
          text-align: center;
          scroll-snap-align: start;
          scroll-snap-stop: always;
          position: relative;
          width: 100%;
        }

        .hero-content {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .hero h1 {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
          font-size: 4rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 30px;
          line-height: 1.1;
          letter-spacing: -2px;
          position: relative;
          display: inline-block;
          animation: fadeInScale 1s ease-out 0.2s both;
        }

        .hero h1::after {
          content: '';
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 4px;
          background: var(--accent-primary);
          border-radius: 2px;
          animation: expandWidth 0.8s ease-out 1s forwards;
        }

        @keyframes expandWidth {
          to {
            width: 80px;
          }
        }

        .hero .tagline {
          font-size: 1.35rem;
          color: var(--text-secondary);
          margin-bottom: 30px;
          line-height: 1.7;
          font-weight: 400;
          max-width: 750px;
          margin-left: auto;
          margin-right: auto;
          animation: fadeInUp 1s ease-out 0.4s both;
        }



        /* About Content in Hero */
        .about-content-hero {
          max-width: 800px;
          width: 100%;
          margin: 20px auto 30px;
          padding: 0;
          animation: fadeInUp 1s ease-out 0.8s both;
        }

        .about-content-hero p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--text-secondary);
          text-align: justify;
          text-justify: inter-word;
          margin: 0;
        }


        /* Gallery Section */
        .gallery-section {
          min-height: 100vh;
          padding: 80px 60px 80px;
          max-width: 100%;
          margin: 0 auto;
          scroll-snap-align: start;
          scroll-snap-stop: always;
          background: transparent;
          position: relative;
          overflow: visible;
        }

        /* Side Navigation Arrows */
        .gallery-side-nav {
          position: absolute;
          top: 55%;
          transform: translateY(-50%);
          z-index: 100;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(255, 200, 0, 0.6);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 200, 0, 0.8);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          pointer-events: none;
          box-shadow: 0 4px 20px rgba(255, 200, 0, 0.3);
        }

        .gallery-side-nav.visible {
          opacity: 1;
          pointer-events: all;
        }

        .gallery-side-nav:hover {
          background: rgba(255, 200, 0, 0.9);
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 6px 30px rgba(255, 200, 0, 0.5);
        }

        .gallery-side-nav:active {
          transform: translateY(-50%) scale(0.95);
        }

        .gallery-side-nav-left {
          left: 20px;
        }

        .gallery-side-nav-right {
          right: 20px;
        }

        .gallery-side-nav svg {
          width: 28px;
          height: 28px;
          color: #1a1a1a;
          transition: transform 0.3s;
        }

        .gallery-side-nav:hover svg {
          transform: scale(1.2);
        }

        /* Project Navigation Dots */
        .project-dots {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          margin-top: 15px;
          margin-bottom: 20px;
          padding: 20px;
        }

        .project-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--border-color);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid transparent;
        }

        .project-dot:hover {
          background: var(--text-tertiary);
          transform: scale(1.2);
        }

        .project-dot.active {
          background: var(--accent-primary);
          border-color: var(--accent-dark);
          transform: scale(1.3);
          box-shadow: 0 2px 12px rgba(255, 200, 0, 0.4);
        }

        .gallery-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 60px;
          gap: 20px;
        }

        .gallery-section h2 {
          font-size: 3rem;
          margin-bottom: 20px;
          color: var(--text-primary);
          font-weight: 700;
          letter-spacing: -1px;
          position: relative;
          display: inline-block;
          opacity: 0;
          transform: translateX(-30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .gallery-section.visible h2 {
          opacity: 1;
          transform: translateX(0);
        }

        .gallery-section h2::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 0;
          height: 4px;
          background: var(--accent-primary);
          border-radius: 2px;
          transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
        }

        .gallery-section.visible h2::after {
          width: 80px;
        }

        .gallery-subtitle {
          color: var(--text-tertiary);
          font-size: 1.2rem;
          margin-bottom: 0;
          opacity: 0;
          transform: translateX(-30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
        }

        .gallery-section.visible .gallery-subtitle {
          opacity: 1;
          transform: translateX(0);
        }

        /* Gallery Navigation Buttons */
        .gallery-nav-buttons {
          display: flex;
          gap: 12px;
          opacity: 0;
          transform: translateX(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
        }

        .gallery-section.visible .gallery-nav-buttons {
          opacity: 1;
          transform: translateX(0);
        }

        .gallery-nav-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--card-bg);
          border: 2px solid var(--border-color);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 12px var(--shadow);
        }

        .gallery-nav-btn:hover {
          background: var(--accent-primary);
          border-color: var(--accent-dark);
          transform: scale(1.1);
          box-shadow: 0 6px 20px var(--shadow-hover);
        }

        .gallery-nav-btn:active {
          transform: scale(0.95);
        }

        .gallery-nav-btn svg {
          color: var(--text-primary);
          transition: color 0.3s;
        }

        .gallery-nav-btn:hover svg {
          color: #1a1a1a;
        }

        /* Projects List - Horizontal Scroll */
        .projects-list {
          display: flex;
          gap: 60px;
          overflow-x: auto;
          overflow-y: visible;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          padding-bottom: 40px;
          padding-top: 20px;
          padding-left: 40px;
          padding-right: 40px;
          -webkit-overflow-scrolling: touch;
        }

        .projects-list::-webkit-scrollbar {
          display: none;
        }

        .projects-list {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        /* Project Cards with Overlapping Layout */
        .project-wrapper {
          flex: 0 0 calc(100vw - 200px);
          scroll-snap-align: center;
          opacity: 1;
          transform: translateY(0);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          margin-bottom: 0;
          overflow: visible;
        }

        .project-container {
          position: relative;
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 0;
          align-items: center;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          min-height: 500px;
          overflow: visible;
        }

        /* Image Card - Back Layer */
        .project-image-card {
          width: 100%;
          height: 500px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 40px var(--shadow);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 1;
          grid-column: 2;
          grid-row: 1;
        }

        .project-image-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: left 0.5s;
          z-index: 2;
        }

        .project-wrapper:hover .project-image-card {
          transform: scale(1.02);
        }

        .project-wrapper:hover .project-image-card::before {
          left: 100%;
        }

        .project-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .project-image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .image-overlay {
          text-align: center;
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .placeholder-icon {
          width: 100px;
          height: 100px;
          opacity: 0.7;
          stroke-width: 1.5;
        }

        .placeholder-text {
          font-size: 1.3rem;
          opacity: 0.9;
          font-weight: 500;
          margin: 0;
        }

        /* Content Card - Front Layer */
        .project-content-card {
          background: var(--card-bg);
          padding: 50px;
          border-radius: 20px;
          box-shadow: 0 15px 50px var(--shadow);
          border: 1px solid var(--border-color);
          position: relative;
          z-index: 2;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          align-self: center;
          grid-column: 1;
          grid-row: 1;
          transform: translateX(60px);
        }

        .project-content-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 20px;
          width: calc(60% - 20px);
          height: 4px;
          background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 0 4px 0 0;
        }

        .project-wrapper:hover .project-content-card::before {
          transform: scaleX(1);
        }

        .project-wrapper:hover .project-content-card {
          box-shadow: 0 20px 60px var(--shadow-hover);
        }

        .project-wrapper:hover .project-content-card {
          transform: translateX(50px) translateY(-5px);
        }

        .project-content {
          width: 100%;
          max-width: 100%;
        }

        .project-url {
          font-size: 0.9rem;
          color: var(--text-tertiary);
          margin-bottom: 12px;
          font-family: 'Courier New', monospace;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        .project-content-card h3 {
          font-size: 1.6rem;
          color: var(--text-primary);
          margin-bottom: 16px;
          font-weight: 700;
          line-height: 1.2;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        .project-description {
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 1rem;
          margin-bottom: 20px;
          word-wrap: break-word;
          overflow-wrap: break-word;
          max-width: 100%;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 24px;
        }

        .tag {
          background: var(--accent-primary);
          color: #1a1a1a;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .tag:hover {
          background: var(--accent-dark);
          transform: translateY(-2px);
        }

        .project-links {
          display: flex;
          gap: 12px;
        }

        .project-icon-link {
          width: 48px;
          height: 48px;
          background: var(--bg-secondary);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all 0.3s;
          text-decoration: none;
          border: 2px solid transparent;
        }

        .project-icon-link svg {
          width: 22px;
          height: 22px;
        }

        .project-icon-link:hover {
          background: var(--accent-primary);
          color: #1a1a1a;
          transform: scale(1.1);
          border-color: var(--accent-dark);
        }

        /* Footer */
        footer {
          background: transparent;
          padding: 80px 40px 40px;
          margin-top: 0;
          border-top: 1px solid var(--border-color);
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        footer h3 {
          font-family: 'La Luxes Script', 'La Belle Aurore', cursive;
          font-size: 2.5rem;
          margin-bottom: 12px;
          color: var(--text-primary);
          font-weight: 400;
          letter-spacing: -3px;
        }

        footer p {
          color: var(--text-tertiary);
          margin-bottom: 16px;
          line-height: 1.7;
        }

        footer a {
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.3s;
          position: relative;
          padding-bottom: 2px;
        }

        footer a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--accent-primary);
          transition: width 0.3s ease;
        }

        footer a:hover {
          color: var(--text-primary);
        }

        footer a:hover::after {
          width: 100%;
        }

        /* Responsive */
        @media (max-width: 1400px) {
          .project-wrapper {
            flex: 0 0 calc(100vw - 160px);
          }

          .project-content-card {
            transform: translateX(40px);
          }
        }

        @media (max-width: 1200px) {
          .project-wrapper {
            flex: 0 0 calc(100vw - 120px);
          }

          .project-container {
            gap: 20px;
          }

          .project-image-card {
            height: 380px;
          }

          .project-content-card {
            padding: 35px;
            transform: translateX(25px);
          }

          .image-icon {
            font-size: 3.5rem;
          }

          .gallery-section {
            padding: 70px 30px 70px;
          }

          .projects-list {
            padding-left: 30px;
            padding-right: 30px;
            gap: 40px;
          }
        }

        @media (max-width: 1024px) {
          .project-wrapper {
            flex: 0 0 calc(100vw - 100px);
          }

          .project-container {
            gap: 10px;
          }

          .project-image-card {
            height: 350px;
          }

          .project-content-card {
            padding: 30px;
            transform: translateX(10px);
          }

          .gallery-section {
            padding: 70px 40px 70px;
          }

          .projects-list {
            padding-left: 20px;
            padding-right: 20px;
          }

          .project-content-card h3 {
            font-size: 1.25rem;
          }

          .project-description {
            font-size: 0.9rem;
          }

          .project-url {
            font-size: 0.85rem;
          }

          .tag {
            padding: 6px 12px;
            font-size: 0.8rem;
          }

          .project-icon-link {
            width: 40px;
            height: 40px;
          }

          .project-icon-link svg {
            width: 18px;
            height: 18px;
          }

          .image-icon {
            font-size: 3.2rem;
          }

          .image-overlay p {
            font-size: 1rem;
          }

        }

        @media (max-width: 900px) {
          .project-wrapper {
            flex: 0 0 calc(100vw - 80px);
          }

          .project-container {
            gap: 20px;
            grid-template-columns: 1fr !important;
            padding: 0 20px;
            display: flex;
            flex-direction: column;
          }

          .project-image-card {
            display: none;
          }

          .project-content-card {
            transform: translateX(0) !important;
            padding: 35px;
            width: 100%;
            grid-column: 1;
          }

          .project-wrapper:hover .project-content-card {
            transform: translateX(0) translateY(-5px) !important;
          }

          .gallery-section {
            padding: 60px 30px 60px;
          }

          .projects-list {
            padding-left: 15px;
            padding-right: 15px;
            gap: 30px;
          }
        }

        @media (max-width: 640px) {
          .project-wrapper {
            flex: 0 0 calc(100vw - 60px);
          }

          .project-container {
            display: flex !important;
            flex-direction: column;
            position: relative;
            min-height: auto !important;
          }

          .project-image-card {
            display: none;
          }

          .project-content-card {
            position: relative;
            width: 100%;
            max-width: 100%;
            margin: 0 !important;
            padding: 30px;
            z-index: 2;
          }

          .projects-list {
            padding-left: 10px;
            padding-right: 10px;
            gap: 20px;
          }
        }

        @media (max-width: 900px) {
          .gallery-side-nav {
            width: 50px;
            height: 50px;
          }

          .gallery-side-nav-left {
            left: 10px;
          }

          .gallery-side-nav-right {
            right: 10px;
          }

          .gallery-side-nav svg {
            width: 24px;
            height: 24px;
          }

          .project-dots {
            gap: 10px;
            margin-top: 30px;
            padding: 15px;
          }

          .project-dot {
            width: 10px;
            height: 10px;
          }
        }

        @media (max-width: 768px) {
          nav .container {
            flex-direction: column;
            gap: 20px;
            padding: 20px;
          }

          nav .logo {
            font-size: 2.5rem;
          }

          nav ul {
            gap: 25px;
          }

          .hero {
            padding: 140px 30px 40px;
            min-height: auto;
          }

          .profile-photo {
            margin-top: 10px;
          }

          .scroll-indicator {
            margin-top: 30px;
            margin-bottom: 30px;
          }

          .hero h1 {
            font-size: 2.5rem;
            letter-spacing: -1px;
          }

          .hero .tagline {
            font-size: 1.15rem;
          }

          .about-content-hero p {
            font-size: 1rem;
          }

          .gallery-section {
            padding: 60px 20px 60px;
          }

          .gallery-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .gallery-nav-buttons {
            align-self: flex-end;
          }


          footer h3 {
            font-size: 2.2rem;
          }

          .gallery-section h2 {
            font-size: 2rem;
          }

          .project-content-card {
            padding: 25px 20px;
          }

          .project-content-card h3 {
            font-size: 1.2rem;
          }

          .project-description {
            font-size: 0.88rem;
          }

          .project-url {
            font-size: 0.75rem;
          }

          .tag {
            padding: 5px 10px;
            font-size: 0.75rem;
          }

          .project-icon-link {
            width: 38px;
            height: 38px;
          }

          .project-icon-link svg {
            width: 16px;
            height: 16px;
          }

          .image-icon {
            font-size: 3rem;
          }

          .image-overlay p {
            font-size: 1rem;
          }


          .project-image-card {
            height: 250px;
            margin-top: -30px;
          }
        }

        @media (max-width: 480px) {
          .hero {
            min-height: auto;
            padding: 120px 20px 30px;
          }

          .hero h1 {
            font-size: 2rem;
            letter-spacing: -2px;
          }

          .hero .tagline {
            font-size: 1rem;
          }

          .hero-email {
            font-size: 0.95rem;
          }

          .about-content-hero p {
            font-size: 0.95rem;
            line-height: 1.7;
          }

          .scroll-indicator {
            margin-top: 20px;
            margin-bottom: 20px;
          }

          nav ul {
            gap: 20px;
            flex-wrap: wrap;
            justify-content: center;
          }

          nav .logo {
            font-size: 2rem;
          }

          .gallery-nav-btn {
            width: 44px;
            height: 44px;
          }

          .gallery-nav-btn svg {
            width: 20px;
            height: 20px;
          }


          footer h3 {
            font-size: 2rem;
          }

          .project-content-card {
            padding: 20px 15px;
          }

          .project-content-card h3 {
            font-size: 1.1rem;
          }

          .project-description {
            font-size: 0.85rem;
          }

          .project-url {
            font-size: 0.7rem;
          }

          .tag {
            padding: 4px 9px;
            font-size: 0.7rem;
          }

          .project-icon-link {
            width: 36px;
            height: 36px;
          }

          .project-icon-link svg {
            width: 15px;
            height: 15px;
          }

          .image-icon {
            font-size: 2.5rem;
          }

          .image-overlay p {
            font-size: 0.9rem;
          }

          .project-image-card {
            height: 220px;
            margin-top: -25px;
          }

        }
      `}</style>

      {/* Navigation */}
      <nav>
        <div className="container">
          <a href="#" className="logo">Mingqin Yu</a>
          <ul>
            <li><a href="#projects">PROJECTS</a></li>
            <li><a href="#contact">CONTACT</a></li>
          </ul>
        </div>
      </nav>

      {/* Theme Toggle Button */}
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        {isDark ? (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          {/* Profile Photo */}
          <div className="profile-photo">
            {CONFIG.profilePhoto ? (
              <img src={CONFIG.profilePhoto} alt={CONFIG.name} className="profile-photo-img" />
            ) : (
              <div className="profile-photo-placeholder">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            )}
          </div>

          <h1>{CONFIG.name}</h1>
          <p className="tagline">
            {CONFIG.title}
          </p>

          {/* About Me content directly under tagline */}
          <div className="about-content-hero">
            <p>
              {CONFIG.aboutText}
            </p>
          </div>

          <div className="social-links">
            <a href={CONFIG.socialLinks.googleScholar} target="_blank" rel="noopener noreferrer" className="social-link-item">
              <div className="social-icon social-icon-scholar">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 24a7 7 0 110-14 7 7 0 010 14zm0-24L0 9.5l4.838 3.94A8 8 0 0112 9a8 8 0 017.162 4.44L24 9.5z"/>
                </svg>
              </div>
              <span className="social-label">Google Scholar</span>
            </a>
            <a href={CONFIG.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-link-item">
              <div className="social-icon social-icon-linkedin">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <span className="social-label">LinkedIn</span>
            </a>
            <a href={CONFIG.socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-link-item">
              <div className="social-icon social-icon-github">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <span className="social-label">GitHub</span>
            </a>
            <a href={`mailto:${CONFIG.email}`} className="social-link-item">
              <div className="social-icon social-icon-email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <span className="social-label">Email</span>
            </a>
          </div>

          <a href="#projects" className="scroll-indicator">
            <div className="scroll-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </a>
        </div>
      </div>

      {/* Gallery Section */}
      <div className={`gallery-section ${visibleSections.has('projects') ? 'visible' : ''}`} id="projects">
        {/* Side Navigation Arrows */}
        <button
          onClick={() => scrollGallery('left')}
          className={`gallery-side-nav gallery-side-nav-left ${canScrollLeft ? 'visible' : ''}`}
          aria-label="Scroll left"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => scrollGallery('right')}
          className={`gallery-side-nav gallery-side-nav-right ${canScrollRight ? 'visible' : ''}`}
          aria-label="Scroll right"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="gallery-header">
          <div>
            <h2>Projects</h2>
            <p className="gallery-subtitle">A collection of projects I've worked on</p>
          </div>
          <div className="gallery-nav-buttons">
            <button onClick={() => scrollGallery('left')} className="gallery-nav-btn" aria-label="Scroll left">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button onClick={() => scrollGallery('right')} className="gallery-nav-btn" aria-label="Scroll right">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="projects-list" ref={galleryRef}>
          {/* Clone set - end items for seamless left scroll */}
          {projects.map((project, index) => (
            <ProjectCard key={`clone-end-${project.id}`} project={project} index={index} />
          ))}
          {/* Original set */}
          {projects.map((project, index) => (
            <ProjectCard key={`original-${project.id}`} project={project} index={index} />
          ))}
          {/* Clone set - start items for seamless right scroll */}
          {projects.map((project, index) => (
            <ProjectCard key={`clone-start-${project.id}`} project={project} index={index} />
          ))}
        </div>

        {/* Project Navigation Dots */}
        <div className="project-dots">
          {projects.map((project, index) => (
            <div
              key={`dot-${project.id}`}
              className={`project-dot ${currentProjectIndex === index ? 'active' : ''}`}
              onClick={() => scrollToProject(index)}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer id="contact">
        <div className="footer-content">
          <h3>{CONFIG.name}</h3>
          <p>{CONFIG.footerText}</p>
          <p style={{marginTop: '20px'}}>
            📧 <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>
          </p>
          <p style={{marginTop: '30px', fontSize: '0.9rem', opacity: '0.7'}}>
            {CONFIG.copyright}
          </p>
        </div>
      </footer>
    </div>
  );
}