import { useState, useId } from 'react';

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-7 h-7',
};

const STAR_PATH = 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';

function StarIcon({ fill = 'full', className = '', gradientId }) {
  if (fill === 'empty') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d={STAR_PATH} />
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
        <path d={STAR_PATH} fill={`url(#${gradientId})`} stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" stroke="currentColor" strokeWidth="0.5">
      <path d={STAR_PATH} />
    </svg>
  );
}

export default function StarRating({
  rating = 0,
  maxStars = 5,
  size = 'md',
  interactive = false,
  onRate,
}) {
  const [hovered, setHovered] = useState(0);
  const gradientId = useId();

  const displayRating = interactive && hovered > 0 ? hovered : rating;

  const stars = [];
  for (let i = 1; i <= maxStars; i++) {
    let fill = 'empty';
    if (i <= Math.floor(displayRating)) {
      fill = 'full';
    } else if (i - 0.5 <= displayRating && !interactive) {
      fill = 'half';
    }

    const colorClass = fill === 'empty' ? 'text-dusty/50' : 'text-gold';
    const icon = <StarIcon fill={fill} className="w-full h-full" gradientId={`${gradientId}-${i}`} />;

    // Read-only ratings render as plain spans — StarRating is often nested
    // inside clickable cards, where <button> children are invalid HTML.
    stars.push(
      interactive ? (
        <button
          key={i}
          type="button"
          className={`cursor-pointer hover:scale-125 transition-transform duration-150 ${colorClass} ${sizeMap[size]}`}
          onClick={() => onRate?.(i)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          aria-label={`Rate ${i} star${i !== 1 ? 's' : ''}`}
        >
          {icon}
        </button>
      ) : (
        <span key={i} aria-hidden="true" className={`${colorClass} ${sizeMap[size]}`}>
          {icon}
        </span>
      )
    );
  }

  return (
    <div
      className="flex items-center gap-0.5"
      {...(!interactive && {
        role: 'img',
        'aria-label': `Rated ${Number(rating).toFixed(1)} out of ${maxStars} stars`,
      })}
    >
      {stars}
    </div>
  );
}
