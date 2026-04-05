import { useState, useEffect } from 'react';

const navLinks = [
  { page: 'home', label: 'Home' },
  { page: 'recipes', label: 'Recipes' },
  { page: 'builder', label: 'Build Your Own' },
  { page: 'about', label: 'About' },
];

export default function Navbar({ currentPage, navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [currentPage]);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-strong shadow-2xl shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">🥃</span>
            <span className="font-display text-lg sm:text-xl font-bold text-cream leading-tight tracking-wide group-hover:text-amber transition-colors duration-300">
              The Old Fashioned
            </span>
          </button>

          {/* Desktop Nav - pill container */}
          <div className="hidden md:flex items-center gap-1 rounded-full bg-white/5 px-2 py-1.5 border border-white/5">
            {navLinks.map(({ page, label }) => (
              <button
                key={page}
                onClick={() => navigate(page)}
                className={`relative px-4 py-1.5 text-sm font-body font-medium tracking-wide rounded-full transition-all duration-300 cursor-pointer ${
                  currentPage === page
                    ? 'bg-amber text-white shadow-lg shadow-amber/25'
                    : 'text-dusty hover:text-cream hover:bg-white/5'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-cream hover:text-amber transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
              <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-400 ease-out ${menuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pb-4 pt-2 glass space-y-1">
          {navLinks.map(({ page, label }) => (
            <button
              key={page}
              onClick={() => navigate(page)}
              className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-body font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                currentPage === page
                  ? 'text-white bg-amber/20 border-l-2 border-amber'
                  : 'text-dusty hover:text-cream hover:bg-white/5'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
