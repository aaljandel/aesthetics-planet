import { devices, treatmentById } from "@/data/catalog";

export function Technology() {
  return (
    <section id="technology" className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-sm font-medium text-moss">Technology</p>
          <h2 className="mt-2 font-display text-2xl">Devices are tools. The indication is the decision.</h2>
          <p className="mt-3 text-muted">
            Energy platforms on this menu are UKCA- or CE-marked devices. That is a different bar from an
            MHRA medicine licence, and it is not a promise of a facelift.
          </p>
          <img
            src="/images/leaf.jpg"
            alt="A single olive leaf on still water"
            width={1600}
            height={1200}
            className="mt-8 aspect-video w-full rounded-xl border border-line object-cover"
          />
        </div>
        <ul className="grid gap-3 lg:col-span-7">
          {devices.map((device) => {
            const treatment = treatmentById(device.treatmentId);
            return (
              <li key={device.id} className="rounded-xl border border-line bg-foam p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl">{device.name}</h3>
                  <p className="text-sm text-muted">{device.maker}</p>
                </div>
                <p className="mt-3 text-sm">{device.fact}</p>
                {treatment ? (
                  <a href="#menu" className="mt-4 inline-flex h-11 items-center text-sm font-medium text-sage">
                    {treatment.name} on the menu
                  </a>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
