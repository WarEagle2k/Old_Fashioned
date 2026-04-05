import { getTopRecipes, spiritTypes } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';

export default function HomePage({ navigate }) {
  const featured = getTopRecipes(3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center px-4">
        {/* Animated mesh background */}
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber/10 rounded-full blur-[150px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-amber/5 rounded-full blur-[100px] animate-float-delayed" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px'}} />

        <div className="relative max-w-5xl mx-auto text-center space-y-8 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-body text-dusty">
            <span className="w-2 h-2 bg-amber rounded-full animate-pulse" />
            The world&apos;s first cocktail, perfected
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-bold text-cream leading-[1.1] tracking-tight">
            The Art of the
            <br />
            <span className="gradient-text">Old Fashioned</span>
          </h1>

          <p className="font-body text-lg sm:text-xl text-dusty max-w-xl mx-auto leading-relaxed">
            Explore recipes, build your own, and master the cocktail
            that started it all.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigate('recipes')}
              className="group px-8 py-3.5 bg-amber hover:bg-gold text-white font-body font-bold text-sm uppercase tracking-widest rounded-full transition-all duration-300 shadow-xl shadow-amber/25 hover:shadow-amber/40 hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
            >
              Explore Recipes
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button
              onClick={() => navigate('builder')}
              className="px-8 py-3.5 glass hover:bg-white/10 text-cream font-body font-medium text-sm uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer"
            >
              Build Your Own
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 sm:gap-12 pt-8">
            {[
              { value: '9+', label: 'Recipes' },
              { value: '7', label: 'Spirit Types' },
              { value: '\u221E', label: 'Combinations' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-display text-2xl sm:text-3xl font-bold gradient-text">{value}</p>
                <p className="text-xs sm:text-sm text-dusty/60 font-body uppercase tracking-wider mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-amber font-body text-sm font-bold uppercase tracking-widest mb-2">Featured</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream">
              Top Rated Recipes
            </h2>
          </div>
          <button
            onClick={() => navigate('recipes')}
            className="hidden sm:flex items-center gap-2 text-sm text-dusty hover:text-amber font-body transition-colors cursor-pointer group"
          >
            View all
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((recipe, idx) => (
            <div key={recipe.id} className="animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
              <RecipeCard recipe={recipe} onClick={(id) => navigate('recipe', id)} />
            </div>
          ))}
        </div>
      </section>

      {/* Choose Your Spirit */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 mesh-gradient opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-amber font-body text-sm font-bold uppercase tracking-widest mb-2">Discover</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream mb-4">
              Choose Your Spirit
            </h2>
            <p className="text-dusty font-body max-w-md mx-auto">
              Every spirit brings its own character to the cocktail
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {spiritTypes.map((spirit) => (
              <button
                key={spirit.id}
                onClick={() => navigate('recipes', spirit.id)}
                className="group glass hover:bg-white/10 rounded-2xl p-6 text-center transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:shadow-amber/10"
              >
                <span className="text-4xl sm:text-5xl block mb-4 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
                  {spirit.emoji}
                </span>
                <span className="font-display text-lg text-cream group-hover:text-amber transition-colors duration-300 block font-semibold">
                  {spirit.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
