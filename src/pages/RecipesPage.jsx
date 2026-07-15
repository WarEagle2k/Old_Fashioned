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

export default function RecipesPage({ navigate, selectedSpirit, reviews }) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const filtered = useMemo(() => {
    let list = getRecipesBySpirit(selectedSpirit);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((r) => r.name.toLowerCase().includes(q) || r.shortDescription.toLowerCase().includes(q) || r.spirit.toLowerCase().includes(q));
    }
    return [...list].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'difficulty') return (difficultyOrder[a.difficulty] || 0) - (difficultyOrder[b.difficulty] || 0);
      return 0;
    });
  }, [selectedSpirit, search, sortBy]);

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-6 py-8 sm:py-12">
      <div className="mb-8 animate-in">
        <h1 className="font-sans text-2xl sm:text-3xl font-bold text-cream tracking-tight mb-1">Recipes</h1>
        <p className="text-sm text-muted font-sans">
          {filtered.length} variation{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="mb-5">
        <SpiritFilter selected={selectedSpirit} onSelect={(id) => navigate('recipes', id)} />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 bg-bg-surface border border-border text-cream placeholder:text-subtle rounded-lg font-sans text-sm focus:outline-none focus:border-muted transition-colors"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 bg-bg-surface border border-border text-cream rounded-lg font-sans text-sm focus:outline-none focus:border-muted cursor-pointer sm:min-w-[150px]"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-bg-surface">{opt.label}</option>
          ))}
        </select>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              userReviews={reviews?.[recipe.id]}
              onClick={(id) => navigate('recipe', id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-border rounded-xl">
          <p className="font-sans text-lg font-semibold text-cream mb-1">No recipes found</p>
          <p className="text-sm text-muted font-sans">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
