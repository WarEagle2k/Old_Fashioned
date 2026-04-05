import { spiritTypes, getRecipesBySpirit } from '../data/recipes';

export default function SpiritFilter({ selected, onSelect }) {
  const allCount = getRecipesBySpirit('all').length;

  const filters = [
    { id: 'all', name: 'All', count: allCount },
    ...spiritTypes.map((s) => ({ ...s, count: getRecipesBySpirit(s.id).length })),
  ];

  return (
    <div className="w-full overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
      <div className="flex gap-1.5 min-w-max">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onSelect(filter.id)}
            className={`flex items-center gap-1.5 px-3 py-2 min-h-[36px] rounded-lg text-[13px] font-sans font-medium whitespace-nowrap transition-colors duration-150 cursor-pointer active:scale-95 ${
              selected === filter.id
                ? 'bg-cream text-bg-dark'
                : 'text-muted hover:text-cream hover:bg-bg-elevated'
            }`}
          >
            {filter.emoji && <span className="text-sm">{filter.emoji}</span>}
            <span>{filter.name}</span>
            <span className={`text-[11px] px-1 py-0.5 rounded ${
              selected === filter.id ? 'bg-bg-dark/10' : 'text-subtle'
            }`}>
              {filter.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
