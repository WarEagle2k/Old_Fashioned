export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber/6 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center space-y-6">
          <span className="text-5xl block">🥃</span>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-cream leading-tight">
            The Story Behind <br />
            <span className="text-amber italic">the Glass</span>
          </h1>
          <p className="text-dusty/70 font-body text-lg max-w-xl mx-auto leading-relaxed">
            A drink so fundamental it literally defined the word "cocktail"
          </p>
        </div>
      </section>

      {/* The Original Cocktail */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        {/* Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-amber/30" />
          <span className="text-amber/50 text-xs tracking-[0.2em] font-body uppercase">Origins</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-amber/30" />
        </div>

        <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream mb-8">
          The Original Cocktail
        </h2>

        <div className="space-y-6 text-dusty/80 font-body leading-relaxed text-[15px]">
          <p>
            In 1806, a New York newspaper editor answered a reader&apos;s question about the word
            &ldquo;cocktail&rdquo; with a definition that still holds today:{' '}
            <em className="text-cream/90 font-display">
              &ldquo;a stimulating liquor, composed of spirits of any kind, sugar, water, and
              bitters.&rdquo;
            </em>{' '}
            That, in its purest form, is an Old Fashioned.
          </p>
          <p>
            By the late 1800s, bartenders had begun embellishing cocktails with liqueurs,
            fruit juices, and all manner of additions. Patrons who preferred the original
            simplicity began requesting their drinks &ldquo;the old-fashioned way&rdquo; &mdash;
            and a name was born.
          </p>
          <p>
            The Pendennis Club in Louisville, Kentucky is often credited with popularizing the
            drink in the 1880s, though its true origins are more diffuse. What matters is that
            the Old Fashioned endured &mdash; through Prohibition, through the cocktail dark
            ages of the mid-20th century, and into the craft cocktail renaissance we enjoy today.
          </p>
        </div>
      </section>

      {/* The Craft */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-amber/30" />
          <span className="text-amber/50 text-xs tracking-[0.2em] font-body uppercase">Craft</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-amber/30" />
        </div>

        <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream mb-8">
          What Makes a Great Old Fashioned
        </h2>

        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          {[
            {
              emoji: '⚖️',
              title: 'Balance',
              text: 'The interplay between spirit, sweetness, and bitters. No single element should dominate. The best Old Fashioned is greater than the sum of its parts.',
            },
            {
              emoji: '🤲',
              title: 'Technique',
              text: 'Gentle muddling, patient stirring, proper dilution. An Old Fashioned rewards care and attention. Rush it, and you lose the magic.',
            },
            {
              emoji: '✨',
              title: 'Quality',
              text: 'With only three core ingredients, there is nowhere to hide. Quality spirits, fresh citrus oils, and proper bitters are non-negotiable.',
            },
          ].map(({ emoji, title, text }) => (
            <div
              key={title}
              className="bg-bg-surface rounded-xl border border-bg-elevated/50 p-6 text-center"
            >
              <span className="text-3xl block mb-3">{emoji}</span>
              <h3 className="font-display text-lg font-bold text-cream mb-2">{title}</h3>
              <p className="text-dusty/70 font-body text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="bg-amber/8 border border-amber/20 rounded-xl p-6">
          <p className="text-cream/80 font-body text-sm leading-relaxed italic text-center">
            &ldquo;The Old Fashioned is the most forgiving and the most demanding cocktail
            simultaneously. It is simple enough for anyone to make, yet complex enough that
            bartenders spend careers perfecting.&rdquo;
          </p>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28">
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-amber/30" />
          <span className="text-amber/50 text-xs tracking-[0.2em] font-body uppercase">Philosophy</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-amber/30" />
        </div>

        <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream mb-8">
          Our Philosophy
        </h2>

        <div className="space-y-6 text-dusty/80 font-body leading-relaxed text-[15px]">
          <p className="text-xl text-cream/90 font-display italic leading-relaxed">
            We believe every Old Fashioned tells a story.
          </p>
          <p>
            The spirit you choose says something about you. The way you sweeten it reveals
            your palate. The bitters you reach for reflect your mood. And the care you put
            into building it &mdash; the gentle muddle, the patient stir, the considered
            garnish &mdash; that is a form of meditation.
          </p>
          <p>
            This project exists to celebrate that ritual. Whether you are a bourbon purist
            who has been making the same drink for decades, or a curious newcomer wondering
            what all the fuss is about, you have a place here.
          </p>
          <p>
            We built this guide to be as careful and considered as the drink itself.
            No shortcuts, no gimmicks &mdash; just good ingredients, honest technique,
            and respect for a tradition that has endured for over two centuries.
          </p>
          <p className="text-amber font-display text-lg italic pt-4">
            Here&apos;s to the drink that started it all.
          </p>
        </div>
      </section>
    </div>
  );
}
