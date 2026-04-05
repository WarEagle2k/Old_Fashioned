import { useState, useMemo } from 'react';
import { getRecipesBySpirit } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';
import SpiritFilter from '../components/SpiritFilter';

const sortOptions = [
  { value: 'rating', label: 'Highest Rated' },
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'difficulty', label: 'Difficulty' },
];

const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };

export default function RecipesPage({ navigate, selectedSpirit, setSelectedSpirit }) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const filtered = useMemo(() => {
    let list = getRecipesBySpirit(selectedSpirit);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((r) => r.name.toLowerCase().includes(q) || r.shortDescription.toLowerCase().includes(q) || r.spirit.toLowerCase().includes(q));
    }
    list = [...list].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'difficulty') return (difficultyOrder[a.difficulty] || 0) - (difficultyOrder[b.difficulty] || 0);
      return 0;
    });
    return list;
  }, [selectedSpirit, search, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8 sm:py-14">
      {/* Header */}
      <div className="mb-8 animate-slide-up">
        <p className="text-amber font-body text-xs sm:text-sm font-bold uppercase tracking-widest mb-2">Collection</p>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-cream mb-2">Recipes</h1>
        <p className="text-dusty font-body text-base sm:text-lg">
          {filtered.length} variation{filtered.length !== 1 ? 's' : ''} of the world&apos;s first cocktail
        </p>
      </div>

      {/* Filter Bar */}
      <div className="mb-5">
        <SpiritFilter selected={selectedSpirit} onSelect={setSelectedSpirit} />
      </div>

      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dusty/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search recipes..."
            className="w-full pl-10 pr-4 py-3 glass text-cream placeholder:text-dusty/30 rounded-xl font-body text-sm focus:outline-none focus:border-amber/30 focus:ring-1 focus:ring-amber/20 transition-all"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-3 glass text-cream rounded-xl font-body text-sm focus:outline-none focus:border-amber/30 appearance-none cursor-pointer sm:min-w-[160px]"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-bg-surface">{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Grid - single column on mobile */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map((recipe, idx) => (
            <div key={recipe.id} className="animate-slide-up" style={{ animationDelay: `${idx * 50}ms` }}>
              <RecipeCard recipe={recipe} onClick={(id) => navigate('recipe', id)} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass rounded-2xl">
          <span className="text-5xl block mb-4">🔍</span>
          <p className="font-display text-xl text-cream mb-2">No recipes found</p>
          <p className="text-dusty/60 font-body text-sm">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
