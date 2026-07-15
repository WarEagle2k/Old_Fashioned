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
      <div className="max-w-3xl mx-auto px-5 py-20 text-center">
        <h1 className="font-sans text-2xl font-bold text-cream mb-4">Recipe Not Found</h1>
        <button onClick={() => navigate('recipes')} className="text-amber hover:text-gold font-sans text-sm underline cursor-pointer py-2 px-4">Browse all recipes</button>
      </div>
    );
  }

  const spirit = spiritTypes.find((s) => s.id === recipe.spirit);
  const toggleIngredient = (idx) => setCheckedIngredients((prev) => ({ ...prev, [idx]: !prev[idx] }));
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (userRating === 0) return;
    addReview(recipeId, { rating: userRating, name: reviewName.trim() || 'Anonymous', comment: reviewComment.trim() });
    setUserRating(0); setReviewName(''); setReviewComment('');
    setReviewSubmitted(true);
  };

  return (
    <div>
      {/* Header */}
      <section className="border-b border-border">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 py-10 sm:py-14 animate-in">
          <button onClick={() => navigate('recipes')}
            className="inline-flex items-center gap-1 text-muted hover:text-cream text-[13px] font-sans transition-colors py-2 px-1 -ml-1 cursor-pointer active:scale-95 mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
            Recipes
          </button>

          <div className="flex items-start gap-5 sm:gap-6">
            <span className="text-5xl sm:text-6xl shrink-0 mt-1">{recipe.emoji}</span>
            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 text-[11px] font-sans font-medium rounded bg-amber/10 text-amber capitalize">{spirit?.name || recipe.spirit}</span>
                <span className="px-2 py-0.5 text-[11px] font-sans font-medium rounded bg-bg-elevated text-muted">{recipe.difficulty}</span>
                <span className="px-2 py-0.5 text-[11px] font-sans font-medium rounded bg-bg-elevated text-muted">{recipe.prepTime}</span>
              </div>
              <h1 className="font-display text-2xl sm:text-4xl font-bold text-cream leading-tight tracking-tight">{recipe.name}</h1>
              <p className="text-sm sm:text-base text-muted font-sans leading-relaxed max-w-2xl">{recipe.description}</p>
              <div className="flex items-center gap-2">
                <StarRating rating={avgRating} size="sm" />
                <span className="text-[13px] text-muted font-sans">{avgRating.toFixed(1)} ({totalReviews})</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-5 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Ingredients */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-bg-surface border border-border rounded-xl p-5">
              <h2 className="font-sans text-base font-semibold text-cream mb-4">Ingredients</h2>
              <ul className="space-y-0.5">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx}>
                    <label className="flex items-center gap-3 cursor-pointer min-h-[44px] py-1 rounded-lg hover:bg-bg-elevated/50 px-1 -mx-1 transition-colors">
                      <input type="checkbox" checked={!!checkedIngredients[idx]} onChange={() => toggleIngredient(idx)}
                        className="w-4 h-4 rounded border-subtle text-amber accent-amber cursor-pointer shrink-0" />
                      <div className={`transition-opacity duration-150 ${checkedIngredients[idx] ? 'opacity-30 line-through' : ''}`}>
                        <span className="text-amber font-sans font-semibold text-[13px]">{ing.amount}</span>{' '}
                        <span className="text-cream font-sans text-[13px]">{ing.item}</span>
                        {ing.note && <span className="block text-muted text-[11px] font-sans mt-0.5">{ing.note}</span>}
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-bg-surface border border-border rounded-xl p-5 space-y-3">
              {[{ label: 'Garnish', value: recipe.garnish }, { label: 'Ice', value: recipe.ice }, { label: 'Glassware', value: recipe.glassware }].map(({ label, value }) => (
                <div key={label}>
                  <h3 className="text-[11px] uppercase tracking-wider text-muted font-sans font-semibold mb-0.5">{label}</h3>
                  <p className="text-cream font-sans text-[13px]">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="lg:col-span-3 space-y-5">
            <div className="bg-bg-surface border border-border rounded-xl p-5">
              <h2 className="font-sans text-base font-semibold text-cream mb-5">Instructions</h2>
              <ol className="space-y-0">
                {recipe.steps.map((step, idx) => (
                  <li key={idx} className="relative flex gap-3">
                    <div className="flex flex-col items-center">
                      <button onClick={() => setActiveStep(activeStep === idx ? null : idx)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-sans font-semibold shrink-0 transition-colors duration-150 cursor-pointer ${
                          activeStep === idx ? 'bg-amber text-white' : 'bg-bg-elevated text-muted hover:text-cream'
                        }`}>
                        {idx + 1}
                      </button>
                      {idx < recipe.steps.length - 1 && <div className="w-px flex-1 min-h-[12px] bg-border" />}
                    </div>
                    <div className="pb-5 pt-1">
                      <p className={`font-sans text-[13px] leading-relaxed transition-colors duration-150 ${activeStep === idx ? 'text-cream' : 'text-muted'}`}>{step}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {recipe.tips?.length > 0 && (
              <div className="bg-amber/[0.04] border border-amber/10 rounded-xl p-5">
                <h3 className="font-sans text-sm font-semibold text-amber mb-3">Pro Tips</h3>
                <ul className="space-y-2">
                  {recipe.tips.map((tip, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-amber/40 mt-0.5 shrink-0 text-xs">&bull;</span>
                      <span className="text-cream/70 font-sans text-[13px] leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="border-t border-border">
        <div className="max-w-2xl mx-auto px-5 sm:px-6 py-12 sm:py-16 space-y-8">
          <div className="text-center space-y-2">
            <p className="text-3xl font-sans font-bold text-cream">{avgRating.toFixed(1)}</p>
            <StarRating rating={avgRating} size="md" />
            <p className="text-[13px] text-muted font-sans">{totalReviews} reviews</p>
          </div>

          <form onSubmit={handleSubmitReview} className="bg-bg-surface border border-border rounded-xl p-5 space-y-4">
            <h3 className="font-sans text-base font-semibold text-cream">Leave a Review</h3>
            <div>
              <label className="block text-[13px] text-muted font-sans mb-1.5">Rating</label>
              <StarRating
                rating={userRating}
                size="md"
                interactive
                onRate={(r) => { setUserRating(r); setReviewSubmitted(false); }}
              />
            </div>
            <div>
              <label className="block text-[13px] text-muted font-sans mb-1.5">Name</label>
              <input type="text" value={reviewName} onChange={(e) => setReviewName(e.target.value)} placeholder="Anonymous"
                className="w-full px-3 py-2 bg-bg-dark border border-border text-cream placeholder:text-subtle rounded-lg font-sans text-sm focus:outline-none focus:border-muted transition-colors" />
            </div>
            <div>
              <label className="block text-[13px] text-muted font-sans mb-1.5">Comment</label>
              <textarea value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} rows={3} placeholder="Share your thoughts..."
                className="w-full px-3 py-2 bg-bg-dark border border-border text-cream placeholder:text-subtle rounded-lg font-sans text-sm focus:outline-none focus:border-muted transition-colors resize-none" />
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <button type="submit" disabled={userRating === 0}
                className="px-5 py-2 bg-amber hover:bg-gold text-white font-sans font-semibold text-sm rounded-lg transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer active:scale-95">
                Submit
              </button>
              {reviewSubmitted && (
                <p role="status" className="text-success font-sans text-[13px]">Thanks — your review has been added!</p>
              )}
            </div>
          </form>

          {recipeReviews.length > 0 && (
            <div className="space-y-3">
              {recipeReviews.slice().reverse().map((review, idx) => (
                <div key={review.date || idx} className="bg-bg-surface border border-border rounded-xl p-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-cream font-sans font-medium text-[13px]">{review.name || 'Anonymous'}</span>
                    <span className="text-subtle text-[11px] font-sans">{new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <StarRating rating={review.rating} size="sm" />
                  {review.comment && <p className="text-muted font-sans text-[13px] leading-relaxed">{review.comment}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
