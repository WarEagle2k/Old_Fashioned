import { useState } from 'react';
import { builderOptions } from '../data/recipes';

const steps = [
  { key: 'spirit', title: 'Spirit', options: builderOptions.spirits },
  { key: 'sweetener', title: 'Sweetener', options: builderOptions.sweeteners },
  { key: 'bitters', title: 'Bitters', options: builderOptions.bitters },
  { key: 'garnish', title: 'Finish', options: null },
];

function generateName(s) {
  const names = { bourbon: 'Bourbon', rye: 'Rye', scotch: 'Highland', rum: 'Caribbean', mezcal: 'Oaxacan', tequila: 'Agave', brandy: 'Brandy', applejack: 'Orchard', japanese: 'Tokyo', gin: 'Botanical', cognac: 'Cognac' };
  const mods = { 'sugar-cube': 'Classic', demerara: 'Rich', maple: 'Maple', honey: 'Golden', agave: 'Desert', 'brown-sugar': 'Toffee' };
  return `The ${mods[s.sweetener] ? mods[s.sweetener] + ' ' : ''}${names[s.spirit] || 'Custom'} Old Fashioned`;
}

function generateInstructions(s) {
  const spirit = builderOptions.spirits.find((x) => x.id === s.spirit);
  const sweetener = builderOptions.sweeteners.find((x) => x.id === s.sweetener);
  const bitters = builderOptions.bitters.find((x) => x.id === s.bitters);
  const garnish = builderOptions.garnishes.find((x) => x.id === s.garnish);
  const ice = builderOptions.iceStyles.find((x) => x.id === s.ice);
  return [
    `Combine ${sweetener?.name} and ${bitters?.name} in a ${ice?.id === 'neat' ? 'mixing glass' : 'rocks glass'}.`,
    'Add a small splash of water and stir to dissolve.',
    `Add 2 oz of ${spirit?.name}.`,
    ice?.id !== 'neat' ? `Add ${ice?.name?.toLowerCase()}.` : null,
    'Stir gently for 20-30 seconds.',
    garnish?.id !== 'none' ? `Garnish with ${garnish?.name?.toLowerCase()}.` : 'Serve and enjoy.',
  ].filter(Boolean);
}

export default function BuilderPage() {
  const [step, setStep] = useState(0);
  const [sel, setSel] = useState({ spirit: null, sweetener: null, bitters: null, garnish: null, ice: null });
  const [done, setDone] = useState(false);
  const [saved, setSaved] = useState(false);

  const pick = (k, v) => setSel((p) => ({ ...p, [k]: v }));
  const canNext = () => step === 0 ? !!sel.spirit : step === 1 ? !!sel.sweetener : step === 2 ? !!sel.bitters : !!sel.garnish && !!sel.ice;
  const next = () => { if (step < 3) setStep(step + 1); else setDone(true); };
  const back = () => { if (done) setDone(false); else if (step > 0) setStep(step - 1); };
  const save = () => {
    try {
      const fav = JSON.parse(localStorage.getItem('of-favorites') || '[]');
      fav.push({ id: Date.now(), name: generateName(sel), selections: { ...sel }, createdAt: new Date().toISOString() });
      localStorage.setItem('of-favorites', JSON.stringify(fav));
      setSaved(true);
    } catch {}
  };
  const reset = () => { setDone(false); setStep(0); setSel({ spirit: null, sweetener: null, bitters: null, garnish: null, ice: null }); setSaved(false); };

  // Result
  if (done) {
    const name = generateName(sel);
    const instr = generateInstructions(sel);
    const items = [
      { label: 'Spirit', item: builderOptions.spirits.find((x) => x.id === sel.spirit) },
      { label: 'Sweet', item: builderOptions.sweeteners.find((x) => x.id === sel.sweetener) },
      { label: 'Bitters', item: builderOptions.bitters.find((x) => x.id === sel.bitters) },
      { label: 'Garnish', item: builderOptions.garnishes.find((x) => x.id === sel.garnish) },
    ];
    const ice = builderOptions.iceStyles.find((x) => x.id === sel.ice);

    return (
      <div className="max-w-2xl mx-auto px-5 sm:px-6 py-8 sm:py-14 animate-in">
        <button onClick={back} className="inline-flex items-center gap-1 text-muted hover:text-cream text-[13px] font-sans transition-colors py-2 px-1 -ml-1 cursor-pointer active:scale-95 mb-6">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
          Back
        </button>

        <div className="bg-bg-surface border border-border rounded-xl overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-border">
            <p className="text-[11px] font-sans font-medium text-muted uppercase tracking-wider mb-2">Your Creation</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-cream tracking-tight">{name}</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-border">
            {items.map(({ label, item }) => (
              <div key={label} className="p-4 text-center border-r border-border last:border-r-0">
                <span className="text-xl block mb-1">{item?.emoji}</span>
                <p className="text-[11px] text-muted font-sans uppercase tracking-wider">{label}</p>
                <p className="text-[13px] text-cream font-sans font-medium">{item?.name}</p>
              </div>
            ))}
          </div>

          <div className="p-4 text-center text-[13px] text-muted font-sans border-b border-border">
            {ice?.emoji} {ice?.name}
          </div>

          <div className="p-6 sm:p-8">
            <h3 className="font-sans text-sm font-semibold text-cream mb-4">Instructions</h3>
            <ol className="space-y-2.5">
              {instr.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-bg-elevated text-[11px] flex items-center justify-center shrink-0 font-sans font-semibold text-muted">{i + 1}</span>
                  <span className="text-muted font-sans text-[13px] leading-relaxed pt-0.5">{s}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="p-5 border-t border-border flex flex-col sm:flex-row gap-3">
            <button onClick={save} disabled={saved}
              className={`flex-1 px-5 py-2.5 rounded-lg font-sans font-semibold text-sm transition-colors duration-200 cursor-pointer active:scale-95 ${
                saved ? 'bg-success/10 text-success border border-success/20' : 'bg-amber hover:bg-gold text-white'}`}>
              {saved ? 'Saved!' : 'Save to Favorites'}
            </button>
            <button onClick={reset} className="flex-1 px-5 py-2.5 bg-bg-elevated hover:bg-bg-hover text-cream rounded-lg font-sans font-medium text-sm transition-colors duration-200 cursor-pointer active:scale-95">
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Wizard
  const s = steps[step];
  const isFinish = step === 3;

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-6 py-8 sm:py-12">
      <div className="mb-8 animate-in">
        <h1 className="font-sans text-2xl sm:text-3xl font-bold text-cream tracking-tight mb-1">Build Your Own</h1>
        <p className="text-sm text-muted font-sans">Step {step + 1} of {steps.length}</p>
      </div>

      {/* Progress */}
      <div className="h-1 bg-bg-elevated rounded-full overflow-hidden mb-8">
        <div className="h-full bg-amber rounded-full transition-all duration-500 ease-out" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
      </div>

      {/* Preview strip */}
      <div className="flex items-center gap-2 mb-6 text-lg">
        {sel.spirit && <span>{builderOptions.spirits.find((x) => x.id === sel.spirit)?.emoji}</span>}
        {sel.sweetener && <><span className="text-subtle text-sm">+</span><span>{builderOptions.sweeteners.find((x) => x.id === sel.sweetener)?.emoji}</span></>}
        {sel.bitters && <><span className="text-subtle text-sm">+</span><span>{builderOptions.bitters.find((x) => x.id === sel.bitters)?.emoji}</span></>}
        {sel.garnish && <><span className="text-subtle text-sm">+</span><span>{builderOptions.garnishes.find((x) => x.id === sel.garnish)?.emoji}</span></>}
        {!sel.spirit && <span className="text-muted text-sm font-sans">Select ingredients below</span>}
      </div>

      <h2 className="font-sans text-lg font-semibold text-cream mb-4">{s.title}</h2>

      {isFinish ? (
        <div className="space-y-6">
          <div>
            <h3 className="font-sans text-sm font-medium text-muted mb-3">Garnish</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {builderOptions.garnishes.map((o) => <OptCard key={o.id} o={o} on={sel.garnish === o.id} pick={() => pick('garnish', o.id)} />)}
            </div>
          </div>
          <div>
            <h3 className="font-sans text-sm font-medium text-muted mb-3">Ice</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {builderOptions.iceStyles.map((o) => <OptCard key={o.id} o={o} on={sel.ice === o.id} pick={() => pick('ice', o.id)} />)}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {s.options.map((o) => <OptCard key={o.id} o={o} on={sel[s.key] === o.id} pick={() => pick(s.key, o.id)} />)}
        </div>
      )}

      <div className="flex items-center justify-between mt-8 pt-5 border-t border-border">
        <button onClick={back} disabled={step === 0} className="px-4 py-2 text-sm font-sans font-medium text-muted hover:text-cream transition-colors disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer min-h-[44px]">Back</button>
        <button onClick={next} disabled={!canNext()}
          className="px-6 py-2 bg-amber hover:bg-gold text-white font-sans font-semibold text-sm rounded-lg transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer active:scale-95 min-h-[44px]">
          {step === 3 ? 'Create' : 'Next'}
        </button>
      </div>
    </div>
  );
}

function OptCard({ o, on, pick }) {
  return (
    <button onClick={pick}
      className={`text-left p-3 rounded-xl border transition-colors duration-150 cursor-pointer active:scale-[0.98] ${
        on ? 'bg-amber/[0.08] border-amber/30' : 'bg-bg-surface border-border hover:border-subtle'
      }`}>
      <span className="text-xl block mb-1.5">{o.emoji}</span>
      <p className={`font-sans font-semibold text-[13px] mb-0.5 ${on ? 'text-amber' : 'text-cream'}`}>{o.name}</p>
      <p className="text-[11px] text-muted font-sans leading-relaxed">{o.description}</p>
    </button>
  );
}
