import { useState } from 'react';
import { getRecipeById, getCombinedRating, spiritTypes } from '../data/recipes';
import StarRating from '../components/StarRating';

export default function RecipeDetailPage({ recipeId, navigate, reviews, addReview }) {
  const recipe = getRecipeById(recipeId);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [activeStep, setActiveStep] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [reviewName, setReviewName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const recipeReviews = reviews?.[recipeId] || [];
  const { rating: avgRating, count: totalReviews } = getCombinedRating(recipe, recipeReviews);

  if (!recipe) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <span className="text-6xl block mb-4">🥃</span>
        <h1 className="font-display text-3xl text-cream mb-4">Recipe Not Found</h1>
        <button
          onClick={() => navigate('recipes')}
          className="text-amber hover:text-gold font-body underline cursor-pointer"
        >
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
    setReviewSubmitted(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative py-16 sm:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber/6 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center space-y-4">
          <button
            onClick={() => navigate('recipes')}
            className="inline-flex items-center gap-1 text-dusty/60 hover:text-amber text-sm font-body transition-colors mb-4 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Recipes
          </button>
          <span className="text-6xl sm:text-7xl block">{recipe.emoji}</span>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="px-3 py-1 text-xs font-body font-medium rounded-full bg-amber/15 text-amber capitalize">
              {spirit?.name || recipe.spirit}
            </span>
            <span className="px-3 py-1 text-xs font-body font-medium rounded-full bg-bg-elevated text-dusty">
              {recipe.difficulty}
            </span>
            <span className="px-3 py-1 text-xs font-body font-medium rounded-full bg-bg-elevated text-dusty">
              {recipe.prepTime}
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-cream leading-tight">
            {recipe.name}
          </h1>
          <p className="text-dusty/80 font-body text-lg max-w-2xl mx-auto leading-relaxed">
            {recipe.description}
          </p>
          <div className="flex items-center justify-center gap-2 pt-2">
            <StarRating rating={avgRating} size="md" />
            <span className="text-dusty/60 font-body text-sm">
              {avgRating.toFixed(1)} ({totalReviews} reviews)
            </span>
          </div>
        </div>
      </section>

      {/* Two-column content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left: Ingredients */}
          <div className="lg:col-span-2 space-y-6">
            {/* Ingredients */}
            <div className="bg-bg-surface rounded-xl border border-bg-elevated/50 p-6">
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
                      <div className={`transition-opacity duration-200 ${checkedIngredients[idx] ? 'opacity-40 line-through' : ''}`}>
                        <span className="text-gold font-body font-bold text-sm">{ing.amount}</span>{' '}
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

            {/* Details */}
            <div className="bg-bg-surface rounded-xl border border-bg-elevated/50 p-6 space-y-4">
              <div>
                <h3 className="text-xs uppercase tracking-wider text-dusty/50 font-body mb-1">Garnish</h3>
                <p className="text-cream font-body text-sm">{recipe.garnish}</p>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-wider text-dusty/50 font-body mb-1">Ice</h3>
                <p className="text-cream font-body text-sm">{recipe.ice}</p>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-wider text-dusty/50 font-body mb-1">Glassware</h3>
                <p className="text-cream font-body text-sm">{recipe.glassware}</p>
              </div>
            </div>
          </div>

          {/* Right: Instructions */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-bg-surface rounded-xl border border-bg-elevated/50 p-6">
              <h2 className="font-display text-2xl font-bold text-cream mb-6">Instructions</h2>
              <ol className="space-y-0">
                {recipe.steps.map((step, idx) => (
                  <li key={idx} className="relative flex gap-4">
                    {/* Stepper line */}
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => setActiveStep(activeStep === idx ? null : idx)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-body font-bold shrink-0 transition-all duration-300 cursor-pointer ${
                          activeStep === idx
                            ? 'bg-amber text-bg-dark shadow-md shadow-amber/30'
                            : 'bg-bg-elevated text-dusty hover:bg-amber/20 hover:text-amber'
                        }`}
                      >
                        {idx + 1}
                      </button>
                      {idx < recipe.steps.length - 1 && (
                        <div className="w-px flex-1 min-h-[16px] bg-bg-elevated/80" />
                      )}
                    </div>
                    <div className="pb-6 pt-1">
                      <p
                        className={`font-body text-sm leading-relaxed transition-colors duration-200 ${
                          activeStep === idx ? 'text-cream' : 'text-dusty/80'
                        }`}
                      >
                        {step}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Pro Tips */}
            {recipe.tips && recipe.tips.length > 0 && (
              <div className="bg-amber/8 border border-amber/20 rounded-xl p-6">
                <h3 className="font-display text-lg font-bold text-amber mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Pro Tips
                </h3>
                <ul className="space-y-3">
                  {recipe.tips.map((tip, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-amber/60 mt-1 shrink-0">&#8226;</span>
                      <span className="text-cream/80 font-body text-sm leading-relaxed">{tip}</span>
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
        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-amber/20" />
          <span className="text-amber/40 text-xs tracking-widest font-body uppercase">Reviews</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-amber/20" />
        </div>

        {/* Current Rating */}
        <div className="text-center">
          <p className="text-5xl font-display font-bold text-cream mb-2">{avgRating.toFixed(1)}</p>
          <StarRating rating={avgRating} size="lg" />
          <p className="text-dusty/50 font-body text-sm mt-2">
            {totalReviews} reviews
          </p>
        </div>

        {/* Submit Review */}
        <form
          onSubmit={handleSubmitReview}
          className="bg-bg-surface rounded-xl border border-bg-elevated/50 p-6 space-y-5"
        >
          <h3 className="font-display text-xl font-bold text-cream">Leave a Review</h3>

          <div>
            <label className="block text-sm text-dusty/70 font-body mb-2">Your Rating</label>
            <StarRating
              rating={userRating}
              size="lg"
              interactive
              onRate={(r) => {
                setUserRating(r);
                setReviewSubmitted(false);
              }}
            />
          </div>

          <div>
            <label className="block text-sm text-dusty/70 font-body mb-2">Name (optional)</label>
            <input
              type="text"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              placeholder="Anonymous"
              className="w-full px-4 py-2.5 bg-bg-elevated/60 border border-bg-elevated text-cream placeholder:text-dusty/30 rounded-lg font-body text-sm focus:outline-none focus:border-amber/50 focus:ring-1 focus:ring-amber/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm text-dusty/70 font-body mb-2">Comment</label>
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              rows={3}
              placeholder="Share your thoughts on this recipe..."
              className="w-full px-4 py-2.5 bg-bg-elevated/60 border border-bg-elevated text-cream placeholder:text-dusty/30 rounded-lg font-body text-sm focus:outline-none focus:border-amber/50 focus:ring-1 focus:ring-amber/20 transition-all resize-none"
            />
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <button
              type="submit"
              disabled={userRating === 0}
              className="px-6 py-2.5 bg-amber hover:bg-gold text-bg-dark font-body font-bold text-sm rounded-lg transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-amber/15"
            >
              Submit Review
            </button>
            {reviewSubmitted && (
              <p role="status" className="text-success font-body text-sm">
                Thanks — your review has been added!
              </p>
            )}
          </div>
        </form>

        {/* Review List */}
        {recipeReviews.length > 0 && (
          <div className="space-y-4">
            {recipeReviews
              .slice()
              .reverse()
              .map((review, idx) => (
                <div
                  key={review.date || idx}
                  className="bg-bg-surface rounded-xl border border-bg-elevated/50 p-5 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-cream font-body font-medium text-sm">
                      {review.name || 'Anonymous'}
                    </span>
                    <span className="text-dusty/40 text-xs font-body">
                      {new Date(review.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
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
