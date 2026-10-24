import { treatments } from "@/data/catalog";

const makers = [
  "Allergan Aesthetics",
  "Galderma",
  "Merz Aesthetics",
  "Teoxane",
  "Croma-Pharma",
  "Sofwave",
  "Sciton",
  "Candela",
  "InMode",
  "HydraFacial",
];

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-5 pt-10 pb-6 sm:pt-16">
      <div className="grid items-end gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="hero-rise text-sm font-medium text-moss">Marylebone · Chelsea · sample practice</p>
          <h1 className="hero-rise hero-rise-2 mt-4 font-display text-3xl text-ink">
            Aesthetic medicine, with the label still on the vial.
          </h1>
          <p className="hero-rise hero-rise-3 mt-5 max-w-xl text-lg text-muted">
            Aesthetics Planet is a one-page sample of a doctor-led London practice. Every treatment names
            the manufacturer, the licensed use, the downtime, and a sample Marylebone or Chelsea price —
            before anyone asks you to book.
          </p>
          <div className="hero-rise hero-rise-3 mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#menu"
              className="press inline-flex h-12 items-center justify-center rounded-sm bg-ink px-5 text-sm font-medium text-foam"
            >
              Open the menu
            </a>
            <a
              href="#concerns"
              className="press inline-flex h-12 items-center justify-center rounded-sm border border-line bg-foam px-5 text-sm font-medium text-ink"
            >
              Start from a concern
            </a>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-6">
            <div>
              <dt className="text-xs text-muted">On the menu</dt>
              <dd className="mt-1 font-display text-xl tabular-nums">{treatments.length}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Rooms</dt>
              <dd className="mt-1 font-display text-xl">Two</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Consult</dt>
              <dd className="mt-1 font-display text-xl">45 min</dd>
            </div>
          </dl>
        </div>

        <figure className="lg:col-span-6">
          <div className="overflow-hidden rounded-xl border border-line bg-sand">
            <img
              src="/images/studio.jpg"
              alt="Morning light in a limestone studio with a linen sofa and a single olive branch"
              width={1792}
              height={1008}
              className="aspect-video w-full object-cover"
            />
          </div>
          <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-sm text-muted">
            <span>Wimpole Rooms, morning.</span>
            <span className="shrink-0">No filters on the room, either.</span>
          </figcaption>
        </figure>
      </div>

      <div className="marquee mt-12 border-y border-line py-4">
        <div className="marquee-track gap-10">
          {[...makers, ...makers].map((name, index) => (
            <span key={`${name}-${index}`} className="text-sm text-muted">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
