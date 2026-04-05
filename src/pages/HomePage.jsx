import { getTopRecipes, spiritTypes } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';

export default function HomePage({ navigate }) {
  const featured = getTopRecipes(3);

  return (
    <div>
      {/* Hero */}
      <section className="relative px-5 sm:px-6 pt-16 sm:pt-24 pb-20 sm:pb-32">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber/[0.04] rounded-full blur-[150px] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center space-y-6 animate-in">
          <p className="text-[13px] font-sans font-medium text-muted tracking-wide uppercase">
            The world&apos;s first cocktail
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
            <span className="font-sans text-cream">The Art of the </span>
            <span className="font-display gradient-text italic">Old Fashioned</span>
          </h1>

          <p className="text-base sm:text-lg text-muted font-sans max-w-lg mx-auto leading-relaxed">
            17 recipes, 11 spirits, and an interactive builder to craft your perfect drink.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate('recipes')}
              className="w-full sm:w-auto px-6 py-2.5 bg-amber hover:bg-gold text-white font-sans font-semibold text-sm rounded-lg transition-colors duration-200 active:scale-95 cursor-pointer"
            >
              Explore Recipes
            </button>
            <button
              onClick={() => navigate('builder')}
              className="w-full sm:w-auto px-6 py-2.5 bg-bg-surface border border-border hover:border-subtle text-cream font-sans font-medium text-sm rounded-lg transition-colors duration-200 active:scale-95 cursor-pointer"
            >
              Build Your Own
            </button>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pb-20 sm:pb-28">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <h2 className="font-sans text-xl sm:text-2xl font-bold text-cream tracking-tight">Top Rated</h2>
          </div>
          <button
            onClick={() => navigate('recipes')}
            className="text-[13px] text-muted hover:text-cream font-sans transition-colors cursor-pointer"
          >
            View all &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onClick={(id) => navigate('recipe', id)} />
          ))}
        </div>
      </section>

      {/* Spirits */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-16 sm:py-20">
          <div className="mb-8">
            <h2 className="font-sans text-xl sm:text-2xl font-bold text-cream tracking-tight mb-2">
              Browse by Spirit
            </h2>
            <p className="text-sm text-muted font-sans">Every spirit brings its own character</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {spiritTypes.map((spirit) => (
              <button
                key={spirit.id}
                onClick={() => navigate('recipes', spirit.id)}
                className="group bg-bg-surface border border-border hover:border-subtle rounded-xl p-4 text-left transition-colors duration-200 cursor-pointer active:scale-[0.98]"
              >
                <span className="text-2xl block mb-2">{spirit.emoji}</span>
                <span className="font-sans text-sm font-semibold text-cream block">{spirit.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
