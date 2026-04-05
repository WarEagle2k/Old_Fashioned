import { useState } from 'react';

let starIdCounter = 0;

const iconSizeMap = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-5 h-5' };

function StarIcon({ fill = 'full', className = '', gradientId }) {
  if (fill === 'empty') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  }
  if (fill === 'half') {
    return (
      <svg viewBox="0 0 24 24" className={className}>
        <defs>
          <linearGradient id={gradientId}>
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={`url(#${gradientId})`} stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function StarRating({ rating = 0, maxStars = 5, size = 'md', interactive = false, onRate }) {
  const [hovered, setHovered] = useState(0);
  const [baseId] = useState(() => `star-${++starIdCounter}`);
  const displayRating = interactive && hovered > 0 ? hovered : rating;

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxStars }, (_, i) => {
        const idx = i + 1;
        let fill = 'empty';
        if (idx <= Math.floor(displayRating)) fill = 'full';
        else if (idx - 0.5 <= displayRating && !interactive) fill = 'half';

        return (
          <button
            key={idx}
            type="button"
            disabled={!interactive}
            className={`flex items-center justify-center ${interactive ? 'min-w-[44px] min-h-[44px] cursor-pointer' : 'cursor-default'} transition-colors duration-150 ${
              fill === 'empty' ? 'text-subtle' : 'text-amber'
            }`}
            onClick={() => interactive && onRate?.(idx)}
            onMouseEnter={() => interactive && setHovered(idx)}
            onMouseLeave={() => interactive && setHovered(0)}
            aria-label={`${idx} star${idx !== 1 ? 's' : ''}`}
          >
            <StarIcon fill={fill} className={iconSizeMap[size]} gradientId={`${baseId}-half-${idx}`} />
          </button>
        );
      })}
    </div>
  );
}
