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
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (page) => {
    setMenuOpen(false);
    navigate(page);
  };

  return (
    <nav
      className={`sticky top-0 z-50 border-b border-amber/30 transition-all duration-300 ${
        scrolled ? 'bg-bg-surface/95 backdrop-blur-md shadow-lg shadow-black/30' : 'bg-bg-surface'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <button
            onClick={() => go('home')}
            className="flex items-center gap-2 group cursor-pointer"
            aria-label="The Old Fashioned — home"
          >
            <span className="text-2xl">🥃</span>
            <span className="font-display text-xl sm:text-2xl font-bold text-cream tracking-wide group-hover:text-gold transition-colors duration-300">
              The Old Fashioned
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ page, label }) => (
              <button
                key={page}
                onClick={() => go(page)}
                aria-current={currentPage === page ? 'page' : undefined}
                className={`relative px-4 py-2 text-sm font-body font-medium tracking-wide transition-colors duration-300 cursor-pointer ${
                  currentPage === page
                    ? 'text-amber'
                    : 'text-dusty hover:text-cream'
                }`}
              >
                {label}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-amber rounded-full transition-all duration-300 ${
                    currentPage === page ? 'w-3/4' : 'w-0'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-cream hover:text-amber transition-colors cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`block h-0.5 bg-current rounded transition-all duration-300 origin-center ${
                  menuOpen ? 'rotate-45 translate-y-[9px]' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-current rounded transition-all duration-300 ${
                  menuOpen ? 'opacity-0 scale-x-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-current rounded transition-all duration-300 origin-center ${
                  menuOpen ? '-rotate-45 -translate-y-[9px]' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 pt-2 bg-bg-surface border-t border-bg-elevated/50 space-y-1">
          {navLinks.map(({ page, label }) => (
            <button
              key={page}
              onClick={() => go(page)}
              aria-current={currentPage === page ? 'page' : undefined}
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-body font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                currentPage === page
                  ? 'text-amber bg-bg-elevated/60 border-l-2 border-amber'
                  : 'text-dusty hover:text-cream hover:bg-bg-elevated/30'
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
