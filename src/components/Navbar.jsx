import { useState, useEffect } from 'react';

const navLinks = [
  { page: 'home', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { page: 'recipes', label: 'Recipes', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { page: 'builder', label: 'Builder', icon: 'M12 4v16m8-8H4' },
  { page: 'about', label: 'About', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
];

export default function Navbar({ currentPage, navigate, theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Desktop top nav */}
      <nav className={`sticky top-0 z-50 transition-all duration-500 hidden md:block ${
        scrolled ? 'glass-strong shadow-2xl shadow-black/20' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            <button onClick={() => navigate('home')} className="flex items-center gap-2.5 group cursor-pointer">
              <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">🥃</span>
              <span className="font-display text-xl font-bold text-cream tracking-wide group-hover:text-amber transition-colors duration-300">
                The Old Fashioned
              </span>
            </button>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-full bg-white/5 px-2 py-1.5 border border-white/5">
                {navLinks.map(({ page, label }) => (
                  <button
                    key={page}
                    onClick={() => navigate(page)}
                    className={`px-5 py-2 text-sm font-body font-medium tracking-wide rounded-full transition-all duration-300 cursor-pointer ${
                      currentPage === page
                        ? 'bg-amber text-white shadow-lg shadow-amber/25'
                        : 'text-dusty hover:text-cream hover:bg-white/5'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile top bar (logo only) */}
      <div className={`sticky top-0 z-50 md:hidden transition-all duration-500 ${
        scrolled ? 'glass-strong shadow-xl shadow-black/20' : 'bg-transparent'
      }`} style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="px-5 h-14 flex items-center justify-between">
          <button onClick={() => navigate('home')} className="flex items-center gap-2 cursor-pointer">
            <span className="text-xl">🥃</span>
            <span className="font-display text-lg font-bold text-cream tracking-wide">
              The Old Fashioned
            </span>
          </button>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>

      {/* Mobile bottom tab bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass-strong border-t border-white/10"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="flex items-stretch justify-around h-16">
          {navLinks.map(({ page, label, icon }) => (
            <button
              key={page}
              onClick={() => navigate(page)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 min-h-[48px] transition-colors duration-200 cursor-pointer active:scale-95 ${
                currentPage === page ? 'text-amber' : 'text-dusty/60'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={currentPage === page ? 2.5 : 1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
              </svg>
              <span className="text-[10px] font-body font-semibold tracking-wide">{label}</span>
              {currentPage === page && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-amber rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Spacer for bottom tab bar on mobile */}
      <div className="h-16 md:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} />
    </>
  );
}

function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full glass cursor-pointer active:scale-95 transition-all duration-300 flex items-center"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className={`absolute w-6 h-6 rounded-full bg-amber shadow-lg shadow-amber/30 flex items-center justify-center transition-all duration-300 ${
        theme === 'dark' ? 'left-1' : 'left-7'
      }`}>
        {theme === 'dark' ? (
          <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        )}
      </div>
    </button>
  );
}
