export default function Footer({ navigate }) {
  return (
    <footer className="mt-auto border-t border-border mb-14 lg:mb-0">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-base">🥃</span>
            <span className="font-sans text-sm font-semibold text-cream tracking-tight">The Old Fashioned</span>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {['home', 'recipes', 'builder', 'about'].map((page) => (
              <button key={page} onClick={() => navigate?.(page)} className="text-[13px] text-muted hover:text-cream transition-colors font-sans capitalize cursor-pointer py-1">
                {page}
              </button>
            ))}
          </div>

          <p className="text-muted text-xs font-sans">
            Drink responsibly &middot; &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
