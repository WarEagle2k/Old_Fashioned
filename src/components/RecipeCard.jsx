import StarRating from './StarRating';

const difficultyColors = {
  Easy: 'bg-success/20 text-success',
  Medium: 'bg-amber/20 text-amber',
  Hard: 'bg-rich-red/20 text-rich-red',
};

export default function RecipeCard({ recipe, onClick }) {
  return (
    <button
      onClick={() => onClick?.(recipe.id)}
      className="group w-full text-left bg-bg-surface rounded-xl border border-bg-elevated/50 hover:border-amber/50 shadow-lg shadow-black/20 hover:shadow-amber/10 transition-all duration-500 overflow-hidden cursor-pointer hover:-translate-y-1"
    >
      {/* Spirit Emoji Header */}
      <div className="relative h-36 flex items-center justify-center bg-gradient-to-b from-bg-elevated/80 to-bg-surface overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="text-7xl group-hover:scale-110 transition-transform duration-500 drop-shadow-lg">
          {recipe.emoji}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-0.5 text-xs font-body font-medium rounded-full bg-amber/15 text-amber capitalize">
            {recipe.spirit}
          </span>
          <span
            className={`px-2.5 py-0.5 text-xs font-body font-medium rounded-full ${
              difficultyColors[recipe.difficulty] || difficultyColors.Easy
            }`}
          >
            {recipe.difficulty}
          </span>
          <span className="ml-auto text-xs text-dusty/70 font-body">
            {recipe.prepTime}
          </span>
        </div>

        {/* Name */}
        <h3 className="font-display text-xl font-bold text-cream group-hover:text-gold transition-colors duration-300 leading-tight">
          {recipe.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-dusty/80 font-body leading-relaxed line-clamp-2">
          {recipe.shortDescription}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 pt-1">
          <StarRating rating={recipe.rating} size="sm" />
          <span className="text-sm text-dusty/60 font-body">
            {recipe.rating} ({recipe.reviewCount})
          </span>
        </div>
      </div>
    </button>
  );
}
