import { useState } from 'react';
import { builderOptions } from '../data/recipes';

function loadFavorites() {
  try {
    const stored = JSON.parse(localStorage.getItem('of-favorites') || '[]');
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function persistFavorites(favorites) {
  try {
    localStorage.setItem('of-favorites', JSON.stringify(favorites));
  } catch {
    // Storage unavailable — favorites stay in memory for this session.
  }
}

const steps = [
  { key: 'spirit', title: 'Choose Your Spirit', options: builderOptions.spirits },
  { key: 'sweetener', title: 'Choose Your Sweetener', options: builderOptions.sweeteners },
  { key: 'bitters', title: 'Choose Your Bitters', options: builderOptions.bitters },
  { key: 'garnish', title: 'Garnish & Ice', options: null },
];

function generateName(selections) {
  const spiritNames = {
    bourbon: 'Bourbon',
    rye: 'Rye',
    scotch: 'Highland',
    rum: 'Caribbean',
    mezcal: 'Oaxacan',
    tequila: 'Agave',
    brandy: 'Brandy',
    applejack: 'Orchard',
  };
  const modifiers = {
    'sugar-cube': 'Classic',
    demerara: 'Rich',
    maple: 'Maple',
    honey: 'Golden',
    agave: 'Desert',
    'brown-sugar': 'Toffee',
  };
  const base = spiritNames[selections.spirit] || 'Custom';
  const mod = modifiers[selections.sweetener] || '';
  return `The ${mod ? mod + ' ' : ''}${base} Old Fashioned`;
}

function generateInstructions(selections) {
  const spirit = builderOptions.spirits.find((s) => s.id === selections.spirit);
  const sweetener = builderOptions.sweeteners.find((s) => s.id === selections.sweetener);
  const bitters = builderOptions.bitters.find((b) => b.id === selections.bitters);
  const garnish = builderOptions.garnishes.find((g) => g.id === selections.garnish);
  const ice = builderOptions.iceStyles.find((i) => i.id === selections.ice);

  return [
    `Combine ${sweetener?.name || 'sweetener'} and ${bitters?.name || 'bitters'} in a ${ice?.id === 'neat' ? 'mixing glass' : 'rocks glass'}.`,
    'Add a small splash of water and stir to dissolve.',
    `Add 2 oz of ${spirit?.name || 'your chosen spirit'}.`,
    ice?.id !== 'neat' ? `Add ${ice?.name?.toLowerCase() || 'ice'}.` : null,
    'Stir gently for 20-30 seconds until well-chilled.',
    garnish?.id !== 'none'
      ? `Garnish with ${garnish?.name?.toLowerCase() || 'garnish'}. Express any citrus peel over the drink.`
      : 'Serve as is and enjoy.',
  ].filter(Boolean);
}

export default function BuilderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({
    spirit: null,
    sweetener: null,
    bitters: null,
    garnish: null,
    ice: null,
  });
  const [showResult, setShowResult] = useState(false);
  const [saved, setSaved] = useState(false);
  const [favorites, setFavorites] = useState(loadFavorites);

  const select = (key, value) => {
    setSelections((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const canAdvance = () => {
    if (currentStep === 0) return !!selections.spirit;
    if (currentStep === 1) return !!selections.sweetener;
    if (currentStep === 2) return !!selections.bitters;
    if (currentStep === 3) return !!selections.garnish && !!selections.ice;
    return false;
  };

  const next = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
    else setShowResult(true);
  };

  const back = () => {
    if (showResult) {
      setShowResult(false);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const saveFavorite = () => {
    const entry = {
      id: Date.now(),
      name: generateName(selections),
      selections: { ...selections },
      createdAt: new Date().toISOString(),
    };
    const updated = [...favorites, entry];
    setFavorites(updated);
    persistFavorites(updated);
    setSaved(true);
  };

  const deleteFavorite = (id) => {
    const updated = favorites.filter((f) => f.id !== id);
    setFavorites(updated);
    persistFavorites(updated);
  };

  const drinkEmoji = () => {
    const s = builderOptions.spirits.find((sp) => sp.id === selections.spirit);
    return s?.emoji || '🥃';
  };

  // Render the result card
  if (showResult) {
    const name = generateName(selections);
    const instructions = generateInstructions(selections);
    const spirit = builderOptions.spirits.find((s) => s.id === selections.spirit);
    const sweetener = builderOptions.sweeteners.find((s) => s.id === selections.sweetener);
    const bitters = builderOptions.bitters.find((b) => b.id === selections.bitters);
    const garnish = builderOptions.garnishes.find((g) => g.id === selections.garnish);
    const ice = builderOptions.iceStyles.find((i) => i.id === selections.ice);

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Back */}
        <button
          onClick={back}
          className="inline-flex items-center gap-1 text-dusty/60 hover:text-amber text-sm font-body transition-colors mb-8 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Builder
        </button>

        {/* Result Card */}
        <div className="bg-bg-surface rounded-2xl border border-amber/20 shadow-xl shadow-amber/5 overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-b from-bg-elevated to-bg-surface py-12 text-center">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-amber/10 rounded-full blur-[60px]" />
            </div>
            {/* Drink Visual */}
            <div className="relative mb-4">
              <span className="text-8xl">{drinkEmoji()}</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream">{name}</h2>
            <p className="text-dusty/60 font-body text-sm mt-2">Your custom creation</p>
          </div>

          {/* Selections Summary */}
          <div className="px-6 py-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-bg-elevated/50">
            {[
              { label: 'Spirit', item: spirit },
              { label: 'Sweet', item: sweetener },
              { label: 'Bitters', item: bitters },
              { label: 'Garnish', item: garnish },
            ].map(({ label, item }) => (
              <div key={label} className="text-center">
                <span className="text-2xl block mb-1">{item?.emoji}</span>
                <p className="text-xs text-dusty/50 font-body uppercase tracking-wider">{label}</p>
                <p className="text-sm text-cream font-body font-medium">{item?.name}</p>
              </div>
            ))}
          </div>

          {/* Ice */}
          <div className="px-6 py-3 border-b border-bg-elevated/50 flex items-center justify-center gap-2">
            <span>{ice?.emoji}</span>
            <span className="text-sm text-cream font-body">{ice?.name}</span>
          </div>

          {/* Instructions */}
          <div className="px-6 py-6">
            <h3 className="font-display text-xl font-bold text-cream mb-4">How to Make It</h3>
            <ol className="space-y-3">
              {instructions.map((step, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber/15 text-amber text-xs flex items-center justify-center shrink-0 font-body font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-dusty/80 font-body text-sm leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Actions */}
          <div className="px-6 py-6 border-t border-bg-elevated/50 flex flex-col sm:flex-row gap-3">
            <button
              onClick={saveFavorite}
              disabled={saved}
              className={`flex-1 px-6 py-3 rounded-lg font-body font-bold text-sm transition-all duration-300 cursor-pointer ${
                saved
                  ? 'bg-success/20 text-success border border-success/30'
                  : 'bg-amber hover:bg-gold text-bg-dark shadow-md shadow-amber/15'
              }`}
            >
              {saved ? 'Saved to Favorites!' : 'Save to Favorites'}
            </button>
            <button
              onClick={() => {
                setShowResult(false);
                setCurrentStep(0);
                setSelections({ spirit: null, sweetener: null, bitters: null, garnish: null, ice: null });
                setSaved(false);
              }}
              className="flex-1 px-6 py-3 border border-amber/30 text-amber hover:bg-amber/10 rounded-lg font-body font-medium text-sm transition-all duration-300 cursor-pointer"
            >
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Wizard
  const step = steps[currentStep];
  const isGarnishStep = currentStep === 3;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-cream mb-3">
          Build Your Own
        </h1>
        <p className="text-dusty/60 font-body text-lg">
          Craft your perfect Old Fashioned, step by step
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          {steps.map((s, idx) => (
            <div key={s.key} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-body font-bold transition-all duration-500 ${
                  idx < currentStep
                    ? 'bg-amber text-bg-dark'
                    : idx === currentStep
                    ? 'bg-amber/20 text-amber border-2 border-amber'
                    : 'bg-bg-elevated text-dusty/50'
                }`}
              >
                {idx < currentStep ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  idx + 1
                )}
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`hidden sm:block w-16 md:w-24 h-0.5 rounded transition-colors duration-500 ${
                    idx < currentStep ? 'bg-amber' : 'bg-bg-elevated'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="h-1 bg-bg-elevated rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber to-gold rounded-full transition-all duration-700 ease-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Title */}
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-cream mb-2 text-center">
        {step.title}
      </h2>
      <p className="text-dusty/50 font-body text-center mb-8">
        Step {currentStep + 1} of {steps.length}
      </p>

      {/* Drink preview */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-2 px-4 py-2 bg-bg-surface rounded-full border border-bg-elevated/50">
          {selections.spirit && (
            <span className="text-lg">{builderOptions.spirits.find((s) => s.id === selections.spirit)?.emoji}</span>
          )}
          {selections.sweetener && (
            <>
              <span className="text-dusty/30">+</span>
              <span className="text-lg">{builderOptions.sweeteners.find((s) => s.id === selections.sweetener)?.emoji}</span>
            </>
          )}
          {selections.bitters && (
            <>
              <span className="text-dusty/30">+</span>
              <span className="text-lg">{builderOptions.bitters.find((b) => b.id === selections.bitters)?.emoji}</span>
            </>
          )}
          {selections.garnish && (
            <>
              <span className="text-dusty/30">+</span>
              <span className="text-lg">{builderOptions.garnishes.find((g) => g.id === selections.garnish)?.emoji}</span>
            </>
          )}
          {!selections.spirit && <span className="text-dusty/30 text-sm font-body">Your drink builds here</span>}
        </div>
      </div>

      {/* Options Grid */}
      {isGarnishStep ? (
        <div className="space-y-8">
          {/* Garnishes */}
          <div>
            <h3 className="font-display text-lg text-cream mb-4">Garnish</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {builderOptions.garnishes.map((opt) => (
                <OptionCard
                  key={opt.id}
                  option={opt}
                  selected={selections.garnish === opt.id}
                  onSelect={() => select('garnish', opt.id)}
                />
              ))}
            </div>
          </div>
          {/* Ice */}
          <div>
            <h3 className="font-display text-lg text-cream mb-4">Ice Style</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {builderOptions.iceStyles.map((opt) => (
                <OptionCard
                  key={opt.id}
                  option={opt}
                  selected={selections.ice === opt.id}
                  onSelect={() => select('ice', opt.id)}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {step.options.map((opt) => (
            <OptionCard
              key={opt.id}
              option={opt}
              selected={selections[step.key] === opt.id}
              onSelect={() => select(step.key, opt.id)}
            />
          ))}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-bg-elevated/50">
        <button
          onClick={back}
          disabled={currentStep === 0}
          className="px-6 py-2.5 text-sm font-body font-medium text-dusty/60 hover:text-cream transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          Back
        </button>
        <button
          onClick={next}
          disabled={!canAdvance()}
          className="px-8 py-2.5 bg-amber hover:bg-gold text-bg-dark font-body font-bold text-sm rounded-lg transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-amber/15"
        >
          {currentStep === 3 ? 'Create My Drink' : 'Next Step'}
        </button>
      </div>

      {/* Saved Creations */}
      {favorites.length > 0 && (
        <div className="mt-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-amber/20" />
            <span className="text-amber/50 text-xs tracking-widest font-body uppercase">
              Your Saved Creations
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-amber/20" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {favorites
              .slice()
              .reverse()
              .map((fav) => (
                <div
                  key={fav.id}
                  className="bg-bg-surface rounded-xl border border-bg-elevated/50 p-5 flex items-start gap-4"
                >
                  <span className="text-3xl">{selectionEmojis(fav.selections)[0] || '🥃'}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-base font-bold text-cream truncate">{fav.name}</p>
                    <p className="text-lg mt-1" aria-hidden="true">
                      {selectionEmojis(fav.selections).join(' + ')}
                    </p>
                    <p className="text-dusty/40 text-xs font-body mt-1">
                      {new Date(fav.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteFavorite(fav.id)}
                    className="p-1.5 text-dusty/40 hover:text-rich-red transition-colors cursor-pointer shrink-0"
                    aria-label={`Delete ${fav.name}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

function selectionEmojis(selections = {}) {
  const lookups = [
    ['spirit', builderOptions.spirits],
    ['sweetener', builderOptions.sweeteners],
    ['bitters', builderOptions.bitters],
    ['garnish', builderOptions.garnishes],
    ['ice', builderOptions.iceStyles],
  ];
  return lookups
    .map(([key, list]) => list.find((o) => o.id === selections[key])?.emoji)
    .filter(Boolean);
}

function OptionCard({ option, selected, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className={`group text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
        selected
          ? 'bg-amber/10 border-amber/50 shadow-md shadow-amber/10'
          : 'bg-bg-surface border-bg-elevated/50 hover:border-amber/20 hover:bg-bg-elevated/40'
      }`}
    >
      <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform duration-300">
        {option.emoji}
      </span>
      <p
        className={`font-body font-bold text-sm mb-1 transition-colors ${
          selected ? 'text-amber' : 'text-cream'
        }`}
      >
        {option.name}
      </p>
      <p className="text-xs text-dusty/50 font-body leading-relaxed">{option.description}</p>
    </button>
  );
}
