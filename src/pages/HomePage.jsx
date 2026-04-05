import { getTopRecipes, spiritTypes } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';

export default function HomePage({ navigate, reviews }) {
  const featured = getTopRecipes(3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40 px-4">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-deep-amber/5 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-gold/5 rounded-full blur-[80px]" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <span className="text-6xl sm:text-7xl block mb-4">🥃</span>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-cream leading-tight tracking-tight">
            The Art of the{' '}
            <span className="text-amber">Old Fashioned</span>
          </h1>
          <p className="font-display text-xl sm:text-2xl text-dusty/80 italic max-w-2xl mx-auto leading-relaxed">
            Where tradition meets craft, and every pour tells a story
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigate('recipes')}
              className="px-8 py-3.5 bg-amber hover:bg-gold text-bg-dark font-body font-bold text-sm uppercase tracking-widest rounded-lg transition-all duration-300 shadow-lg shadow-amber/20 hover:shadow-amber/40 hover:-translate-y-0.5 cursor-pointer"
            >
              Explore Recipes
            </button>
            <button
              onClick={() => navigate('builder')}
              className="px-8 py-3.5 border border-amber/40 text-amber hover:bg-amber/10 font-body font-medium text-sm uppercase tracking-widest rounded-lg transition-all duration-300 cursor-pointer"
            >
              Build Your Own
            </button>
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream mb-3">
            Featured Recipes
          </h2>
          <p className="text-dusty/70 font-body max-w-lg mx-auto">
            Our highest-rated variations, perfected over countless pours
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={(id) => navigate('recipe', id)}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate('recipes')}
            className="inline-flex items-center gap-2 px-8 py-3 border border-amber/30 text-amber hover:bg-amber/10 font-body font-medium text-sm uppercase tracking-wider rounded-lg transition-all duration-300 cursor-pointer group"
          >
            Explore All Recipes
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </section>

      {/* Choose Your Spirit */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Divider */}
        <div className="flex items-center gap-4 mb-12 max-w-xs mx-auto">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-amber/30" />
          <span className="text-amber/50 text-sm tracking-widest font-body uppercase">Choose</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-amber/30" />
        </div>

        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream mb-3">
            Choose Your Spirit
          </h2>
          <p className="text-dusty/70 font-body max-w-lg mx-auto">
            Every spirit brings its own character to the cocktail
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {spiritTypes.map((spirit) => (
            <button
              key={spirit.id}
              onClick={() => {
                navigate('recipes', spirit.id);
              }}
              className="group bg-bg-surface hover:bg-bg-elevated/80 border border-bg-elevated/50 hover:border-amber/30 rounded-xl p-6 text-center transition-all duration-300 cursor-pointer hover:-translate-y-1 shadow-lg shadow-black/10 hover:shadow-amber/10"
            >
              <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform duration-300">
                {spirit.emoji}
              </span>
              <span className="font-display text-lg text-cream group-hover:text-gold transition-colors duration-300 block">
                {spirit.name}
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
