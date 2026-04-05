import StarRating from './StarRating';

const difficultyColors = {
  Easy: 'bg-success/20 text-success border-success/20',
  Medium: 'bg-amber/20 text-amber border-amber/20',
  Hard: 'bg-rich-red/20 text-rich-red border-rich-red/20',
};

export default function RecipeCard({ recipe, onClick }) {
  return (
    <button
      onClick={() => onClick?.(recipe.id)}
      className="group w-full text-left glass rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-amber/10 hover:border-amber/20"
    >
      {/* Emoji Header */}
      <div className="relative h-36 sm:h-40 flex items-center justify-center bg-gradient-to-b from-white/5 to-transparent overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="text-6xl sm:text-7xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
          {recipe.emoji}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 text-xs font-body font-semibold rounded-full bg-amber/10 text-amber capitalize border border-amber/20">
            {recipe.spirit}
          </span>
          <span className={`px-2.5 py-1 text-xs font-body font-semibold rounded-full border ${difficultyColors[recipe.difficulty] || difficultyColors.Easy}`}>
            {recipe.difficulty}
          </span>
          <span className="ml-auto text-xs text-dusty/60 font-body">
            {recipe.prepTime}
          </span>
        </div>

        {/* Name */}
        <h3 className="font-display text-lg sm:text-xl font-bold text-cream group-hover:text-amber transition-colors duration-300 leading-tight">
          {recipe.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-dusty font-body leading-relaxed line-clamp-2">
          {recipe.shortDescription}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 pt-2 border-t border-white/5">
          <StarRating rating={recipe.rating} size="sm" />
          <span className="text-sm text-dusty/70 font-body ml-1">{recipe.rating}</span>
          <span className="text-xs text-dusty/50 font-body">({recipe.reviewCount})</span>
        </div>
      </div>
    </button>
  );
}
