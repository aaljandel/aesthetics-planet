import { useEffect, useState } from "react";
import { clinicians, studios, type Studio } from "@/data/catalog";

function readClock(studio: Studio, now: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: studio.timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const map: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const day = map[weekday] ?? 0;
  const close = day === 6 && studio.saturdayClose ? studio.saturdayClose : studio.closeHour;
  const open = studio.openDays.includes(day) && hour >= studio.openHour && hour < close;
  return open;
}

const steps = [
  {
    n: "01",
    title: "Consult, 45 minutes",
    text: "History, photographs, and a written plan that names products. Prescription medicines are prescribed only after a face-to-face consultation. Same-day treatment only when the plan is small and you are not deciding under a deadline.",
  },
  {
    n: "02",
    title: "Treatment",
    text: "Topical anaesthetic where it helps. You leave with aftercare in sentences, not a QR code to a generic PDF.",
  },
  {
    n: "03",
    title: "Two-week review",
    text: "Neuromodulators and filler are judged here. Swelling is not a result, and a touch-up is a decision, not a loyalty perk.",
  },
  {
    n: "04",
    title: "Maintenance",
    text: "Toxin when movement returns. Sculptra on its series. Ultrasound around a year, if it earned a repeat.",
  },
];

export function Visit() {
  const [open, setOpen] = useState<Record<string, boolean | null>>({});

  useEffect(() => {
    const now = new Date();
    setOpen(Object.fromEntries(studios.map((studio) => [studio.id, readClock(studio, now)])));
  }, []);

  return (
    <section id="visit" className="border-t border-line bg-foam">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-sm font-medium text-moss">The visit</p>
            <h2 className="mt-2 font-display text-2xl">A plan you can read before you are numb.</h2>
            <img
              src="/images/room.jpg"
              alt="A quiet treatment room with a linen bed, a folded towel, and serum bottles on a stone tray"
              width={1728}
              height={1152}
              className="mt-6 aspect-video w-full rounded-xl border border-line object-cover"
            />
            <img
              src="/images/hands.jpg"
              alt="Gloved hands holding a glass dropper above a linen drape, face out of frame"
              width={1728}
              height={1152}
              className="mt-3 aspect-video w-full rounded-xl border border-line object-cover"
            />
          </div>
          <ol className="grid content-start gap-4 lg:col-span-7">
            {steps.map((step) => (
              <li key={step.n} className="grid grid-cols-[3rem_1fr] gap-4 rounded-xl border border-line bg-paper p-5">
                <span className="font-display text-lg text-moss tabular-nums">{step.n}</span>
                <div>
                  <h3 className="font-display text-xl">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          {studios.map((studio) => {
            const state = open[studio.id];
            return (
              <article key={studio.id} className="rounded-xl border border-line bg-paper p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl">{studio.name}</h3>
                    <p className="text-sm text-muted">{studio.neighborhood}</p>
                  </div>
                  <p className="text-sm font-medium text-moss">
                    {state === null ? "Hours" : state ? "Open now" : "Closed now"}
                  </p>
                </div>
                <p className="mt-4 text-sm">
                  {studio.lines[0]}
                  <br />
                  {studio.lines[1]}
                </p>
                <p className="mt-2 text-sm text-muted">{studio.hours}</p>
                <a href={studio.phoneHref} className="mt-3 inline-flex h-11 items-center text-sm font-medium">
                  {studio.phone}
                </a>
              </article>
            );
          })}
        </div>

        <div className="mt-14">
          <div className="max-w-2xl">
            <h3 className="font-display text-xl">Who you would see</h3>
            <p className="mt-2 text-sm text-muted">
              Fictional roster for this sample. A London practice like this is staffed by GMC-registered
              doctors and NMC-registered prescribers. These three people are not on either register.
            </p>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {clinicians.map((person) => (
              <li key={person.name} className="rounded-xl border border-line bg-paper p-5">
                <div className="flex size-12 items-center justify-center rounded-sm bg-sage text-sm font-medium text-foam">
                  {person.monogram}
                </div>
                <p className="mt-4 font-display text-lg">{person.name}</p>
                <p className="text-sm text-moss">{person.role}</p>
                <p className="mt-2 text-sm text-muted">{person.credential}</p>
                <p className="mt-2 text-sm">{person.focus}</p>
              </li>
            ))}
          </ul>
        </div>

        <figure className="mt-10 overflow-hidden rounded-xl border border-line">
          <img
            src="/images/storefront.jpg"
            alt="A discreet stone storefront at dusk with fluted glass and a potted olive tree"
            width={1792}
            height={1008}
            className="aspect-video w-full object-cover"
          />
          <figcaption className="bg-paper px-5 py-3 text-sm text-muted">
            Street level is quiet on purpose. The sign is inside.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
