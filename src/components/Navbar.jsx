import { useState, useEffect } from 'react';

const navLinks = [
  { page: 'home', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { page: 'recipes', label: 'Recipes', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { page: 'builder', label: 'Builder', icon: 'M12 4v16m8-8H4' },
  { page: 'about', label: 'About', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
];

export default function Navbar({ currentPage, navigate }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Desktop top nav */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 hidden lg:block border-b ${
        scrolled ? 'bg-bg-dark/80 backdrop-blur-lg border-border' : 'bg-transparent border-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => navigate('home')} className="flex items-center gap-2 cursor-pointer">
              <span className="text-lg">🥃</span>
              <span className="font-sans text-sm font-semibold text-cream tracking-tight">The Old Fashioned</span>
            </button>

            <div className="flex items-center gap-1">
              {navLinks.map(({ page, label }) => (
                <button
                  key={page}
                  onClick={() => navigate(page)}
                  className={`px-3 py-1.5 text-[13px] font-sans font-medium rounded-md transition-colors duration-200 cursor-pointer ${
                    currentPage === page
                      ? 'text-cream bg-bg-elevated'
                      : 'text-muted hover:text-cream'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile top bar */}
      <div className={`sticky top-0 z-50 lg:hidden transition-all duration-300 border-b ${
        scrolled ? 'bg-bg-dark/80 backdrop-blur-lg border-border' : 'bg-transparent border-transparent'
      }`} style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="px-5 h-14 flex items-center">
          <button onClick={() => navigate('home')} className="flex items-center gap-2 cursor-pointer">
            <span className="text-lg">🥃</span>
            <span className="font-sans text-sm font-semibold text-cream tracking-tight">The Old Fashioned</span>
          </button>
        </div>
      </div>

      {/* Mobile bottom tab bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-bg-surface border-t border-border"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="flex items-stretch justify-around h-14">
          {navLinks.map(({ page, label, icon }) => (
            <button
              key={page}
              onClick={() => navigate(page)}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 min-h-[48px] transition-colors duration-150 cursor-pointer active:scale-95 ${
                currentPage === page ? 'text-amber' : 'text-muted'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={currentPage === page ? 2 : 1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
              </svg>
              <span className="text-[10px] font-sans font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-14 lg:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} />
    </>
  );
}
