export default function Footer() {
  return (
    <footer className="bg-bg-surface border-t border-bg-elevated/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-xl">🥃</span>
            <span className="font-display text-lg text-cream font-semibold tracking-wide">
              The Old Fashioned
            </span>
          </div>

          {/* Tagline */}
          <p className="text-dusty/70 font-body text-sm max-w-md leading-relaxed">
            Crafted with care for those who appreciate the art of a well-made cocktail.
          </p>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <a href="#home" className="text-dusty/60 hover:text-amber transition-colors duration-300 font-body">
              Home
            </a>
            <a href="#recipes" className="text-dusty/60 hover:text-amber transition-colors duration-300 font-body">
              Recipes
            </a>
            <a href="#builder" className="text-dusty/60 hover:text-amber transition-colors duration-300 font-body">
              Builder
            </a>
            <a href="#about" className="text-dusty/60 hover:text-amber transition-colors duration-300 font-body">
              About
            </a>
          </div>

          {/* Divider */}
          <div className="w-16 h-px bg-amber/30" />

          {/* Responsible notice */}
          <p className="text-dusty/40 text-xs font-body">
            Please drink responsibly. You must be of legal drinking age in your country.
          </p>

          <p className="text-dusty/30 text-xs font-body">
            &copy; {new Date().getFullYear()} The Old Fashioned. Made for cocktail enthusiasts.
          </p>
        </div>
      </div>
    </footer>
  );
}
