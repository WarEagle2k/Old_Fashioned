import { useState } from 'react';
import { builderOptions } from '../data/recipes';

const steps = [
  { key: 'spirit', title: 'Choose Your Spirit', subtitle: 'The foundation of your drink', options: builderOptions.spirits },
  { key: 'sweetener', title: 'Choose Your Sweetener', subtitle: 'Balance the spirit', options: builderOptions.sweeteners },
  { key: 'bitters', title: 'Choose Your Bitters', subtitle: 'Add complexity and depth', options: builderOptions.bitters },
  { key: 'garnish', title: 'Garnish & Ice', subtitle: 'The finishing touches', options: null },
];

function generateName(selections) {
  const spiritNames = { bourbon: 'Bourbon', rye: 'Rye', scotch: 'Highland', rum: 'Caribbean', mezcal: 'Oaxacan', tequila: 'Agave', brandy: 'Brandy', applejack: 'Orchard' };
  const modifiers = { 'sugar-cube': 'Classic', demerara: 'Rich', maple: 'Maple', honey: 'Golden', agave: 'Desert', 'brown-sugar': 'Toffee' };
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
  const [selections, setSelections] = useState({ spirit: null, sweetener: null, bitters: null, garnish: null, ice: null });
  const [showResult, setShowResult] = useState(false);
  const [saved, setSaved] = useState(false);

  const select = (key, value) => setSelections((prev) => ({ ...prev, [key]: value }));

  const canAdvance = () => {
    if (currentStep === 0) return !!selections.spirit;
    if (currentStep === 1) return !!selections.sweetener;
    if (currentStep === 2) return !!selections.bitters;
    if (currentStep === 3) return !!selections.garnish && !!selections.ice;
    return false;
  };

  const next = () => { if (currentStep < 3) setCurrentStep(currentStep + 1); else setShowResult(true); };
  const back = () => { if (showResult) setShowResult(false); else if (currentStep > 0) setCurrentStep(currentStep - 1); };

  const saveFavorite = () => {
    try {
      const favorites = JSON.parse(localStorage.getItem('of-favorites') || '[]');
      favorites.push({ id: Date.now(), name: generateName(selections), selections: { ...selections }, createdAt: new Date().toISOString() });
      localStorage.setItem('of-favorites', JSON.stringify(favorites));
      setSaved(true);
    } catch { /* ignore */ }
  };

  const drinkEmoji = () => builderOptions.spirits.find((sp) => sp.id === selections.spirit)?.emoji || '🥃';

  // Result
  if (showResult) {
    const name = generateName(selections);
    const instructions = generateInstructions(selections);
    const spirit = builderOptions.spirits.find((s) => s.id === selections.spirit);
    const sweetener = builderOptions.sweeteners.find((s) => s.id === selections.sweetener);
    const bitters = builderOptions.bitters.find((b) => b.id === selections.bitters);
    const garnish = builderOptions.garnishes.find((g) => g.id === selections.garnish);
    const ice = builderOptions.iceStyles.find((i) => i.id === selections.ice);

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 animate-slide-up">
        <button onClick={back} className="inline-flex items-center gap-1 text-dusty/60 hover:text-amber text-sm font-body transition-colors mb-8 cursor-pointer">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back to Builder
        </button>

        <div className="glass rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="relative py-14 text-center overflow-hidden">
            <div className="absolute inset-0 mesh-gradient" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber/15 rounded-full blur-[80px]" />
            <div className="relative">
              <span className="text-8xl block mb-4 animate-float">{drinkEmoji()}</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream">{name}</h2>
              <p className="text-dusty/60 font-body text-sm mt-2">Your custom creation</p>
            </div>
          </div>

          {/* Selections */}
          <div className="px-6 py-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/5">
            {[
              { label: 'Spirit', item: spirit },
              { label: 'Sweet', item: sweetener },
              { label: 'Bitters', item: bitters },
              { label: 'Garnish', item: garnish },
            ].map(({ label, item }) => (
              <div key={label} className="text-center">
                <span className="text-2xl block mb-1">{item?.emoji}</span>
                <p className="text-xs text-amber/60 font-body uppercase tracking-wider font-semibold">{label}</p>
                <p className="text-sm text-cream font-body font-medium">{item?.name}</p>
              </div>
            ))}
          </div>

          <div className="px-6 py-3 border-t border-white/5 flex items-center justify-center gap-2">
            <span>{ice?.emoji}</span>
            <span className="text-sm text-cream font-body">{ice?.name}</span>
          </div>

          {/* Instructions */}
          <div className="px-6 py-6 border-t border-white/5">
            <h3 className="font-display text-xl font-bold text-cream mb-4">How to Make It</h3>
            <ol className="space-y-3">
              {instructions.map((step, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="w-7 h-7 rounded-full bg-amber/10 text-amber text-xs flex items-center justify-center shrink-0 font-body font-bold border border-amber/20">
                    {idx + 1}
                  </span>
                  <span className="text-dusty font-body text-sm leading-relaxed pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Actions */}
          <div className="px-6 py-6 border-t border-white/5 flex flex-col sm:flex-row gap-3">
            <button
              onClick={saveFavorite}
              disabled={saved}
              className={`flex-1 px-6 py-3 rounded-full font-body font-bold text-sm transition-all duration-300 cursor-pointer ${
                saved ? 'bg-success/20 text-success border border-success/30' : 'bg-amber hover:bg-gold text-white shadow-lg shadow-amber/20'
              }`}
            >
              {saved ? 'Saved to Favorites!' : 'Save to Favorites'}
            </button>
            <button
              onClick={() => { setShowResult(false); setCurrentStep(0); setSelections({ spirit: null, sweetener: null, bitters: null, garnish: null, ice: null }); setSaved(false); }}
              className="flex-1 px-6 py-3 glass hover:bg-white/10 text-cream rounded-full font-body font-medium text-sm transition-all duration-300 cursor-pointer"
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
      <div className="text-center mb-10 animate-slide-up">
        <p className="text-amber font-body text-sm font-bold uppercase tracking-widest mb-2">Customize</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-cream mb-3">
          Build Your Own
        </h1>
        <p className="text-dusty font-body text-lg">
          Craft your perfect Old Fashioned, step by step
        </p>
      </div>

      {/* Progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          {steps.map((s, idx) => (
            <div key={s.key} className="flex items-center gap-2">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-body font-bold transition-all duration-500 border ${
                idx < currentStep ? 'bg-amber text-white border-amber shadow-lg shadow-amber/20'
                  : idx === currentStep ? 'bg-amber/10 text-amber border-amber'
                  : 'glass border-white/5 text-dusty/40'
              }`}>
                {idx < currentStep ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : idx + 1}
              </div>
              {idx < steps.length - 1 && (
                <div className={`hidden sm:block w-16 md:w-24 h-0.5 rounded transition-colors duration-500 ${idx < currentStep ? 'bg-amber' : 'bg-white/5'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-amber to-gold rounded-full transition-all duration-700 ease-out" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
        </div>
      </div>

      {/* Step Title */}
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-cream mb-1">{step.title}</h2>
        <p className="text-dusty/50 font-body text-sm">{step.subtitle}</p>
      </div>

      {/* Drink preview */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-2 px-5 py-2.5 glass rounded-full">
          {selections.spirit && <span className="text-lg">{builderOptions.spirits.find((s) => s.id === selections.spirit)?.emoji}</span>}
          {selections.sweetener && <><span className="text-dusty/20">+</span><span className="text-lg">{builderOptions.sweeteners.find((s) => s.id === selections.sweetener)?.emoji}</span></>}
          {selections.bitters && <><span className="text-dusty/20">+</span><span className="text-lg">{builderOptions.bitters.find((b) => b.id === selections.bitters)?.emoji}</span></>}
          {selections.garnish && <><span className="text-dusty/20">+</span><span className="text-lg">{builderOptions.garnishes.find((g) => g.id === selections.garnish)?.emoji}</span></>}
          {!selections.spirit && <span className="text-dusty/30 text-sm font-body">Your drink builds here</span>}
        </div>
      </div>

      {/* Options */}
      {isGarnishStep ? (
        <div className="space-y-8">
          <div>
            <h3 className="font-display text-lg text-cream mb-4">Garnish</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {builderOptions.garnishes.map((opt) => (
                <OptionCard key={opt.id} option={opt} selected={selections.garnish === opt.id} onSelect={() => select('garnish', opt.id)} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display text-lg text-cream mb-4">Ice Style</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {builderOptions.iceStyles.map((opt) => (
                <OptionCard key={opt.id} option={opt} selected={selections.ice === opt.id} onSelect={() => select('ice', opt.id)} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {step.options.map((opt) => (
            <OptionCard key={opt.id} option={opt} selected={selections[step.key] === opt.id} onSelect={() => select(step.key, opt.id)} />
          ))}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/5">
        <button onClick={back} disabled={currentStep === 0} className="px-6 py-2.5 text-sm font-body font-medium text-dusty/60 hover:text-cream transition-colors disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer">
          Back
        </button>
        <button
          onClick={next}
          disabled={!canAdvance()}
          className="px-8 py-2.5 bg-amber hover:bg-gold text-white font-body font-bold text-sm rounded-full transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-amber/20 flex items-center gap-2"
        >
          {currentStep === 3 ? 'Create My Drink' : 'Next Step'}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
}

function OptionCard({ option, selected, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className={`group text-left p-4 rounded-2xl border transition-all duration-300 cursor-pointer hover:-translate-y-1 ${
        selected
          ? 'bg-amber/10 border-amber/40 shadow-lg shadow-amber/10'
          : 'glass hover:bg-white/5 hover:border-white/10'
      }`}
    >
      <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform duration-300">{option.emoji}</span>
      <p className={`font-body font-bold text-sm mb-1 transition-colors ${selected ? 'text-amber' : 'text-cream'}`}>{option.name}</p>
      <p className="text-xs text-dusty/50 font-body leading-relaxed">{option.description}</p>
    </button>
  );
}
