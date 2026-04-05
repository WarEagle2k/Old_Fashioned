export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-white/5 mb-16 lg:mb-0">
      <div className="absolute inset-0 mesh-gradient opacity-30" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-xl">🥃</span>
            <span className="font-display text-lg text-cream font-semibold tracking-wide">
              The Old Fashioned
            </span>
          </div>

          {/* Links - hidden on mobile since we have bottom tab bar */}
          <div className="hidden lg:flex items-center gap-6 text-sm">
            {['home', 'recipes', 'builder', 'about'].map((page) => (
              <a key={page} href={`#${page}`} className="text-dusty/50 hover:text-amber transition-colors duration-300 font-body capitalize py-2">
                {page}
              </a>
            ))}
          </div>

          <p className="text-dusty/40 text-xs font-body">
            Please drink responsibly &middot; &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
