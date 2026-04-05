import { useState, useMemo } from 'react';
import { getRecipeById, spiritTypes } from '../data/recipes';
import StarRating from '../components/StarRating';

export default function RecipeDetailPage({ recipeId, navigate, reviews, addReview }) {
  const recipe = getRecipeById(recipeId);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [activeStep, setActiveStep] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [reviewName, setReviewName] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  const recipeReviews = reviews?.[recipeId] || [];

  const avgRating = useMemo(() => {
    const allRatings = [
      ...Array(recipe?.reviewCount || 0).fill(recipe?.rating || 0),
      ...recipeReviews.map((r) => r.rating),
    ];
    if (allRatings.length === 0) return 0;
    return allRatings.reduce((a, b) => a + b, 0) / allRatings.length;
  }, [recipe, recipeReviews]);

  if (!recipe) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <span className="text-6xl block mb-4">🥃</span>
        <h1 className="font-display text-3xl text-cream mb-4">Recipe Not Found</h1>
        <button onClick={() => navigate('recipes')} className="text-amber hover:text-gold font-body underline cursor-pointer">
          Browse all recipes
        </button>
      </div>
    );
  }

  const spirit = spiritTypes.find((s) => s.id === recipe.spirit);

  const toggleIngredient = (idx) => {
    setCheckedIngredients((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (userRating === 0) return;
    addReview(recipeId, {
      rating: userRating,
      name: reviewName.trim() || 'Anonymous',
      comment: reviewComment.trim(),
    });
    setUserRating(0);
    setReviewName('');
    setReviewComment('');
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative py-16 sm:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber/8 rounded-full blur-[120px]" />

        <div className="relative max-w-4xl mx-auto text-center space-y-5 animate-slide-up">
          <button
            onClick={() => navigate('recipes')}
            className="inline-flex items-center gap-1 text-dusty/60 hover:text-amber text-sm font-body transition-colors mb-4 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Recipes
          </button>

          <span className="text-6xl sm:text-8xl block animate-float">{recipe.emoji}</span>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="px-3 py-1.5 text-xs font-body font-semibold rounded-full bg-amber/10 text-amber capitalize border border-amber/20">
              {spirit?.name || recipe.spirit}
            </span>
            <span className="px-3 py-1.5 text-xs font-body font-semibold rounded-full glass">
              {recipe.difficulty}
            </span>
            <span className="px-3 py-1.5 text-xs font-body font-semibold rounded-full glass">
              {recipe.prepTime}
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-cream leading-tight">
            {recipe.name}
          </h1>

          <p className="text-dusty font-body text-lg max-w-2xl mx-auto leading-relaxed">
            {recipe.description}
          </p>

          <div className="flex items-center justify-center gap-2 pt-2">
            <StarRating rating={avgRating} size="md" />
            <span className="text-dusty/60 font-body text-sm">
              {avgRating.toFixed(1)} ({recipe.reviewCount + recipeReviews.length} reviews)
            </span>
          </div>
        </div>
      </section>

      {/* Two-column content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left: Ingredients */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass rounded-2xl p-6">
              <h2 className="font-display text-2xl font-bold text-cream mb-5">Ingredients</h2>
              <ul className="space-y-3">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx}>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={!!checkedIngredients[idx]}
                        onChange={() => toggleIngredient(idx)}
                        className="mt-1 w-4 h-4 rounded border-dusty/30 text-amber focus:ring-amber/30 accent-amber cursor-pointer"
                      />
                      <div className={`transition-opacity duration-200 ${checkedIngredients[idx] ? 'opacity-30 line-through' : ''}`}>
                        <span className="text-amber font-body font-bold text-sm">{ing.amount}</span>{' '}
                        <span className="text-cream font-body text-sm">{ing.item}</span>
                        {ing.note && (
                          <span className="block text-dusty/50 text-xs font-body mt-0.5">{ing.note}</span>
                        )}
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-2xl p-6 space-y-4">
              {[
                { label: 'Garnish', value: recipe.garnish },
                { label: 'Ice', value: recipe.ice },
                { label: 'Glassware', value: recipe.glassware },
              ].map(({ label, value }) => (
                <div key={label}>
                  <h3 className="text-xs uppercase tracking-wider text-amber/60 font-body font-semibold mb-1">{label}</h3>
                  <p className="text-cream font-body text-sm">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Instructions */}
          <div className="lg:col-span-3 space-y-6">
            <div className="glass rounded-2xl p-6">
              <h2 className="font-display text-2xl font-bold text-cream mb-6">Instructions</h2>
              <ol className="space-y-0">
                {recipe.steps.map((step, idx) => (
                  <li key={idx} className="relative flex gap-4">
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => setActiveStep(activeStep === idx ? null : idx)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-body font-bold shrink-0 transition-all duration-300 cursor-pointer ${
                          activeStep === idx
                            ? 'bg-amber text-white shadow-lg shadow-amber/30 scale-110'
                            : 'glass text-dusty hover:text-amber hover:border-amber/30'
                        }`}
                      >
                        {idx + 1}
                      </button>
                      {idx < recipe.steps.length - 1 && (
                        <div className="w-px flex-1 min-h-[16px] bg-white/5" />
                      )}
                    </div>
                    <div className="pb-6 pt-1.5">
                      <p className={`font-body text-sm leading-relaxed transition-colors duration-200 ${
                        activeStep === idx ? 'text-cream' : 'text-dusty/80'
                      }`}>
                        {step}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Pro Tips */}
            {recipe.tips && recipe.tips.length > 0 && (
              <div className="rounded-2xl p-6 bg-amber/5 border border-amber/15">
                <h3 className="font-display text-lg font-bold text-amber mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Pro Tips
                </h3>
                <ul className="space-y-3">
                  {recipe.tips.map((tip, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-amber/40 mt-0.5 shrink-0">&#9670;</span>
                      <span className="text-cream/70 font-body text-sm leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Rating + Reviews */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20 space-y-10">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10" />
          <span className="text-amber/40 text-xs tracking-[0.2em] font-body uppercase">Reviews</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10" />
        </div>

        <div className="text-center">
          <p className="text-5xl font-display font-bold gradient-text mb-2">{avgRating.toFixed(1)}</p>
          <StarRating rating={avgRating} size="lg" />
          <p className="text-dusty/50 font-body text-sm mt-2">
            {recipe.reviewCount + recipeReviews.length} reviews
          </p>
        </div>

        {/* Submit Review */}
        <form onSubmit={handleSubmitReview} className="glass rounded-2xl p-6 space-y-5">
          <h3 className="font-display text-xl font-bold text-cream">Leave a Review</h3>

          <div>
            <label className="block text-sm text-dusty/70 font-body mb-2">Your Rating</label>
            <StarRating rating={userRating} size="lg" interactive onRate={setUserRating} />
          </div>

          <div>
            <label className="block text-sm text-dusty/70 font-body mb-2">Name (optional)</label>
            <input
              type="text"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              placeholder="Anonymous"
              className="w-full px-4 py-2.5 glass text-cream placeholder:text-dusty/30 rounded-xl font-body text-sm focus:outline-none focus:border-amber/30 focus:ring-1 focus:ring-amber/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm text-dusty/70 font-body mb-2">Comment</label>
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              rows={3}
              placeholder="Share your thoughts on this recipe..."
              className="w-full px-4 py-2.5 glass text-cream placeholder:text-dusty/30 rounded-xl font-body text-sm focus:outline-none focus:border-amber/30 focus:ring-1 focus:ring-amber/20 transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={userRating === 0}
            className="px-6 py-2.5 bg-amber hover:bg-gold text-white font-body font-bold text-sm rounded-full transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-amber/20"
          >
            Submit Review
          </button>
        </form>

        {/* Review List */}
        {recipeReviews.length > 0 && (
          <div className="space-y-4">
            {recipeReviews.slice().reverse().map((review, idx) => (
              <div key={idx} className="glass rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-cream font-body font-medium text-sm">{review.name || 'Anonymous'}</span>
                  <span className="text-dusty/30 text-xs font-body">
                    {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <StarRating rating={review.rating} size="sm" />
                {review.comment && (
                  <p className="text-dusty/70 font-body text-sm leading-relaxed">{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
