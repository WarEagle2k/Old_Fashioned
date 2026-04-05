export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber/8 rounded-full blur-[120px]" />
        <div className="relative max-w-3xl mx-auto text-center space-y-6 animate-slide-up">
          <span className="text-6xl block animate-float">🥃</span>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-cream leading-tight">
            The Story Behind <br />
            <span className="gradient-text italic">the Glass</span>
          </h1>
          <p className="text-dusty font-body text-lg max-w-xl mx-auto leading-relaxed">
            A drink so fundamental it literally defined the word &ldquo;cocktail&rdquo;
          </p>
        </div>
      </section>

      {/* The Original Cocktail */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10" />
          <span className="text-amber/50 text-xs tracking-[0.2em] font-body uppercase font-semibold">Origins</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10" />
        </div>

        <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream mb-8">
          The Original Cocktail
        </h2>

        <div className="space-y-6 text-dusty font-body leading-relaxed text-[15px]">
          <p>
            In 1806, a New York newspaper editor answered a reader&apos;s question about the word
            &ldquo;cocktail&rdquo; with a definition that still holds today:{' '}
            <em className="text-cream/90 font-display">
              &ldquo;a stimulating liquor, composed of spirits of any kind, sugar, water, and bitters.&rdquo;
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
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10" />
          <span className="text-amber/50 text-xs tracking-[0.2em] font-body uppercase font-semibold">Craft</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10" />
        </div>

        <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream mb-8">
          What Makes a Great Old Fashioned
        </h2>

        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          {[
            { emoji: '\u2696\uFE0F', title: 'Balance', text: 'The interplay between spirit, sweetness, and bitters. No single element should dominate.' },
            { emoji: '\uD83E\uDD32', title: 'Technique', text: 'Gentle muddling, patient stirring, proper dilution. An Old Fashioned rewards care and attention.' },
            { emoji: '\u2728', title: 'Quality', text: 'With only three core ingredients, there is nowhere to hide. Quality spirits and proper bitters are non-negotiable.' },
          ].map(({ emoji, title, text }) => (
            <div key={title} className="glass rounded-2xl p-6 text-center hover:-translate-y-1 transition-transform duration-300">
              <span className="text-3xl block mb-3">{emoji}</span>
              <h3 className="font-display text-lg font-bold text-cream mb-2">{title}</h3>
              <p className="text-dusty/70 font-body text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-8 bg-amber/5 border border-amber/15">
          <p className="text-cream/80 font-display text-lg leading-relaxed italic text-center">
            &ldquo;The Old Fashioned is the most forgiving and the most demanding cocktail
            simultaneously. Simple enough for anyone to make, yet complex enough that
            bartenders spend careers perfecting.&rdquo;
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28">
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10" />
          <span className="text-amber/50 text-xs tracking-[0.2em] font-body uppercase font-semibold">Philosophy</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10" />
        </div>

        <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream mb-8">
          Our Philosophy
        </h2>

        <div className="space-y-6 text-dusty font-body leading-relaxed text-[15px]">
          <p className="text-xl text-cream/90 font-display italic leading-relaxed">
            We believe every Old Fashioned tells a story.
          </p>
          <p>
            The spirit you choose says something about you. The way you sweeten it reveals
            your palate. The bitters you reach for reflect your mood. And the care you put
            into building it &mdash; that is a form of meditation.
          </p>
          <p>
            This project exists to celebrate that ritual. Whether you are a bourbon purist
            or a curious newcomer, you have a place here.
          </p>
          <p className="gradient-text font-display text-xl italic pt-4 inline-block">
            Here&apos;s to the drink that started it all.
          </p>
        </div>
      </section>
    </div>
  );
}
