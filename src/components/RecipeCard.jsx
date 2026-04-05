import StarRating from './StarRating';

const spiritColors = {
  bourbon: 'from-amber-900/40 to-amber-800/20',
  rye: 'from-yellow-900/40 to-yellow-800/20',
  scotch: 'from-orange-900/40 to-orange-800/20',
  japanese: 'from-rose-900/40 to-rose-800/20',
  rum: 'from-amber-900/40 to-yellow-800/20',
  mezcal: 'from-emerald-900/40 to-emerald-800/20',
  brandy: 'from-purple-900/40 to-purple-800/20',
  cognac: 'from-orange-900/40 to-amber-800/20',
  tequila: 'from-lime-900/40 to-lime-800/20',
  gin: 'from-teal-900/40 to-teal-800/20',
  applejack: 'from-red-900/40 to-red-800/20',
};

export default function RecipeCard({ recipe, onClick }) {
  const gradient = spiritColors[recipe.spirit] || spiritColors.bourbon;

  return (
    <button
      onClick={() => onClick?.(recipe.id)}
      className="group w-full text-left bg-bg-surface border border-border rounded-xl overflow-hidden cursor-pointer transition-colors duration-200 hover:border-subtle hover:bg-bg-elevated active:scale-[0.99]"
    >
      {/* Color header */}
      <div className={`relative h-28 sm:h-32 flex items-center justify-center bg-gradient-to-br ${gradient}`}>
        <span className="text-5xl sm:text-6xl opacity-90">{recipe.emoji}</span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2.5">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 text-[11px] font-sans font-medium rounded bg-amber/10 text-amber capitalize">
            {recipe.spirit}
          </span>
          <span className="px-2 py-0.5 text-[11px] font-sans font-medium rounded bg-bg-elevated text-muted">
            {recipe.difficulty}
          </span>
          <span className="ml-auto text-[11px] text-muted font-sans">{recipe.prepTime}</span>
        </div>

        <h3 className="font-display text-lg font-bold text-cream leading-snug tracking-tight">
          {recipe.name}
        </h3>

        <p className="text-[13px] text-muted font-sans leading-relaxed line-clamp-2">
          {recipe.shortDescription}
        </p>

        <div className="flex items-center gap-1.5 pt-1">
          <StarRating rating={recipe.rating} size="sm" />
          <span className="text-[13px] text-muted font-sans">{recipe.rating}</span>
          <span className="text-[11px] text-subtle font-sans">({recipe.reviewCount})</span>
        </div>
      </div>
    </button>
  );
}
