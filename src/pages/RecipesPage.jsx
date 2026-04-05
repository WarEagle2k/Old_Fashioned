import { useState, useMemo } from 'react';
import { recipes, getRecipesBySpirit } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';
import SpiritFilter from '../components/SpiritFilter';

const sortOptions = [
  { value: 'rating', label: 'Highest Rated' },
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'difficulty', label: 'Difficulty' },
];

const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };

export default function RecipesPage({ navigate, selectedSpirit, setSelectedSpirit, reviews }) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const filtered = useMemo(() => {
    let list = getRecipesBySpirit(selectedSpirit);

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.shortDescription.toLowerCase().includes(q) ||
          r.spirit.toLowerCase().includes(q)
      );
    }

    list = [...list].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'difficulty')
        return (difficultyOrder[a.difficulty] || 0) - (difficultyOrder[b.difficulty] || 0);
      return 0;
    });

    return list;
  }, [selectedSpirit, search, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-cream mb-2">
          Recipes
        </h1>
        <p className="text-dusty/70 font-body text-lg">
          {filtered.length} variation{filtered.length !== 1 ? 's' : ''} of the world&apos;s first cocktail
        </p>
      </div>

      {/* Filter Bar */}
      <div className="mb-6">
        <SpiritFilter selected={selectedSpirit} onSelect={setSelectedSpirit} />
      </div>

      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dusty/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search recipes..."
            className="w-full pl-10 pr-4 py-2.5 bg-bg-elevated/60 border border-bg-elevated text-cream placeholder:text-dusty/40 rounded-lg font-body text-sm focus:outline-none focus:border-amber/50 focus:ring-1 focus:ring-amber/20 transition-all"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2.5 bg-bg-elevated/60 border border-bg-elevated text-cream rounded-lg font-body text-sm focus:outline-none focus:border-amber/50 appearance-none cursor-pointer min-w-[160px]"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={(id) => navigate('recipe', id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <span className="text-5xl block mb-4">🔍</span>
          <p className="font-display text-xl text-cream mb-2">No recipes found</p>
          <p className="text-dusty/60 font-body text-sm">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
}
