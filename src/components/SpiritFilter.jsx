import { spiritTypes, getRecipesBySpirit } from '../data/recipes';

export default function SpiritFilter({ selected, onSelect }) {
  const allCount = getRecipesBySpirit('all').length;

  const filters = [
    { id: 'all', name: 'All', count: allCount },
    ...spiritTypes.map((s) => ({
      ...s,
      count: getRecipesBySpirit(s.id).length,
    })),
  ];

  return (
    <div className="w-full overflow-x-auto -mx-5 px-5" style={{ scrollbarWidth: 'none' }}>
      <div className="flex gap-2.5 min-w-max snap-x snap-mandatory">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onSelect(filter.id)}
            className={`snap-start flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-full text-sm font-body font-medium whitespace-nowrap transition-all duration-300 cursor-pointer active:scale-95 border ${
              selected === filter.id
                ? 'bg-amber text-white shadow-lg shadow-amber/20 border-amber'
                : 'glass border-white/5 text-cream/80 hover:bg-white/10 hover:text-cream'
            }`}
          >
            {filter.emoji && <span className="text-base">{filter.emoji}</span>}
            <span>{filter.name}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              selected === filter.id ? 'bg-white/20 text-white' : 'bg-white/5 text-dusty/50'
            }`}>
              {filter.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
