export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-6 py-10 sm:py-16">
      {/* Header */}
      <div className="mb-12 animate-in">
        <p className="text-[13px] font-sans font-medium text-muted tracking-wide uppercase mb-3">About</p>
        <h1 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight mb-4">
          <span className="font-sans text-cream">The Story Behind </span>
          <span className="font-display text-amber italic">the Glass</span>
        </h1>
        <p className="text-base text-muted font-sans leading-relaxed">
          A drink so fundamental it literally defined the word &ldquo;cocktail.&rdquo;
        </p>
      </div>

      {/* Origins */}
      <section className="mb-12">
        <h2 className="font-sans text-lg font-semibold text-cream mb-4 tracking-tight">The Original Cocktail</h2>
        <div className="space-y-4 text-[15px] text-muted font-sans leading-relaxed">
          <p>
            In 1806, a New York newspaper editor answered a reader&apos;s question about the word
            &ldquo;cocktail&rdquo; with a definition that still holds today:{' '}
            <em className="text-cream font-medium">
              &ldquo;a stimulating liquor, composed of spirits of any kind, sugar, water, and bitters.&rdquo;
            </em>{' '}
            That is an Old Fashioned.
          </p>
          <p>
            By the late 1800s, bartenders had begun embellishing cocktails with liqueurs and fruit juices.
            Patrons who preferred the original simplicity began requesting their drinks
            &ldquo;the old-fashioned way&rdquo; &mdash; and a name was born.
          </p>
          <p>
            The Pendennis Club in Louisville, Kentucky is often credited with popularizing
            the drink in the 1880s. What matters is that the Old Fashioned endured &mdash;
            through Prohibition, through the cocktail dark ages, and into the craft renaissance we enjoy today.
          </p>
        </div>
      </section>

      <div className="border-t border-border mb-12" />

      {/* Craft */}
      <section className="mb-12">
        <h2 className="font-sans text-lg font-semibold text-cream mb-6 tracking-tight">What Makes a Great One</h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            { title: 'Balance', text: 'Spirit, sweetness, and bitters in harmony. No single element should dominate.' },
            { title: 'Technique', text: 'Gentle muddling, patient stirring, proper dilution. It rewards care.' },
            { title: 'Quality', text: 'Three ingredients, nowhere to hide. Quality spirits and proper bitters are essential.' },
          ].map(({ title, text }) => (
            <div key={title} className="bg-bg-surface border border-border rounded-xl p-4">
              <h3 className="font-sans text-sm font-semibold text-cream mb-1.5">{title}</h3>
              <p className="text-[13px] text-muted font-sans leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <blockquote className="border-l-2 border-amber pl-5 py-1">
          <p className="text-cream/80 font-sans text-[15px] leading-relaxed italic">
            &ldquo;The Old Fashioned is the most forgiving and the most demanding cocktail
            simultaneously. Simple enough for anyone, complex enough that bartenders
            spend careers perfecting it.&rdquo;
          </p>
        </blockquote>
      </section>

      <div className="border-t border-border mb-12" />

      {/* Philosophy */}
      <section>
        <h2 className="font-sans text-lg font-semibold text-cream mb-4 tracking-tight">Our Philosophy</h2>
        <div className="space-y-4 text-[15px] text-muted font-sans leading-relaxed">
          <p className="text-cream font-medium text-base">We believe every Old Fashioned tells a story.</p>
          <p>
            The spirit you choose says something about you. The way you sweeten it reveals your palate.
            The bitters you reach for reflect your mood. And the care you put into building it &mdash;
            that is a form of meditation.
          </p>
          <p>
            Whether you are a bourbon purist or a curious newcomer, you have a place here.
            We built this guide to be as careful and considered as the drink itself.
          </p>
          <p className="text-amber font-medium pt-2">Here&apos;s to the drink that started it all.</p>
        </div>
      </section>
    </div>
  );
}
