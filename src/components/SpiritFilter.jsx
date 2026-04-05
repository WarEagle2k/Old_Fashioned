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
    <div className="w-full overflow-x-auto scrollbar-none pb-2">
      <div className="flex gap-2 min-w-max px-1">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onSelect(filter.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-body font-medium whitespace-nowrap transition-all duration-300 cursor-pointer ${
              selected === filter.id
                ? 'bg-amber text-bg-dark shadow-md shadow-amber/20'
                : 'bg-bg-elevated text-cream/80 hover:bg-bg-elevated/80 hover:text-cream'
            }`}
          >
            {filter.emoji && <span>{filter.emoji}</span>}
            <span>{filter.name}</span>
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full ${
                selected === filter.id
                  ? 'bg-bg-dark/20 text-bg-dark'
                  : 'bg-bg-dark/30 text-dusty/70'
              }`}
            >
              {filter.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
