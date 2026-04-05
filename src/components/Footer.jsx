export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-white/5">
      <div className="absolute inset-0 mesh-gradient opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-xl">🥃</span>
            <span className="font-display text-lg text-cream font-semibold tracking-wide">
              The Old Fashioned
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            {['home', 'recipes', 'builder', 'about'].map((page) => (
              <a
                key={page}
                href={`#${page}`}
                className="text-dusty/50 hover:text-amber transition-colors duration-300 font-body capitalize"
              >
                {page}
              </a>
            ))}
          </div>

          {/* Notice */}
          <p className="text-dusty/30 text-xs font-body">
            &copy; {new Date().getFullYear()} &middot; Drink responsibly
          </p>
        </div>
      </div>
    </footer>
  );
}
