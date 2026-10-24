import { useEffect, useState } from "react";
import { z } from "zod";
import { studioById, studios, treatmentById, treatments } from "@/data/catalog";
import { useConsult } from "@/lib/consult";
import { cn } from "@/lib/cn";

const schema = z.object({
  first: z.string().trim().min(2, "First name is too short."),
  last: z.string().trim().min(2, "Last name is too short."),
  email: z.string().trim().email("Use a real email shape."),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+().\-\s]{7,20}$/, "Use a phone number we could actually dial."),
  window: z.enum(["am", "pm", "sat"], { message: "Choose a time of day." }),
  consent: z.literal(true, { message: "The sample-site note has to be acknowledged." }),
});

type Slip = {
  ref: string;
  name: string;
  studio: string;
  window: string;
  interests: string[];
  when: string;
};

const STORAGE_KEY = "aesthetics-planet-slips";
const windows = [
  { id: "am" as const, label: "Weekday morning" },
  { id: "pm" as const, label: "Weekday afternoon" },
  { id: "sat" as const, label: "Saturday" },
];

export function Book() {
  const studio = useConsult((s) => s.studio);
  const setStudio = useConsult((s) => s.setStudio);
  const interests = useConsult((s) => s.interests);
  const toggleInterest = useConsult((s) => s.toggleInterest);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [window, setWindow] = useState<"am" | "pm" | "sat" | "">("");
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [slips, setSlips] = useState<Slip[]>([]);
  const [latest, setLatest] = useState<Slip | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSlips(JSON.parse(raw) as Slip[]);
    } catch {
      setSlips([]);
    }
  }, []);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const parsed = schema.safeParse({ first, last, email, phone, window, consent });
    const next: Record<string, string> = {};
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!next[key]) next[key] = issue.message;
      }
    }
    if (interests.length === 0) next.interests = "Add at least one treatment from the menu.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const slip: Slip = {
      ref: `AP-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      name: `${first.trim()} ${last.trim()}`,
      studio: studioById(studio).name,
      window: windows.find((item) => item.id === window)?.label ?? "",
      interests: interests.map((id) => treatmentById(id)?.name ?? id),
      when: new Date().toISOString(),
    };
    const saved = [slip, ...slips].slice(0, 6);
    setSlips(saved);
    setLatest(slip);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  }

  function clearSlips() {
    setSlips([]);
    setLatest(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <section id="book" className="bg-sage text-foam">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-20 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-sm font-medium text-mist">Consult slip</p>
          <h2 className="mt-2 font-display text-2xl">Ask for a time. Nothing is sent.</h2>
          <p className="mt-3 text-mist">
            This form keeps a slip on this device so you can see the shape of a booking. Aesthetics Planet
            does not have a front desk, a mailbox, or a calendar. The telephone numbers use Ofcom’s
            reserved 020 7946 range.
          </p>
          {latest ? (
            <div className="mt-6 rounded-xl border border-foam/20 bg-ink p-5 text-foam">
              <p className="text-xs text-mist">Saved on this device</p>
              <p className="mt-2 font-display text-xl tabular-nums">{latest.ref}</p>
              <p className="mt-2 text-sm">
                {latest.name} · {latest.studio}
              </p>
              <p className="text-sm text-mist">{latest.window}</p>
              <p className="mt-2 text-sm">{latest.interests.join(" · ")}</p>
            </div>
          ) : null}
        </div>

        <form onSubmit={submit} className="rounded-xl bg-foam p-5 text-ink sm:p-6 lg:col-span-7" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="First name" error={errors.first}>
              <input
                value={first}
                onChange={(e) => setFirst(e.target.value)}
                autoComplete="given-name"
                className="field"
              />
            </Field>
            <Field label="Last name" error={errors.last}>
              <input
                value={last}
                onChange={(e) => setLast(e.target.value)}
                autoComplete="family-name"
                className="field"
              />
            </Field>
            <Field label="Email" error={errors.email}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                inputMode="email"
                className="field"
              />
            </Field>
            <Field label="Phone" error={errors.phone}>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                inputMode="tel"
                className="field"
              />
            </Field>
          </div>

          <fieldset className="mt-5">
            <legend className="text-sm font-medium">Rooms</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {studios.map((item) => (
                <label
                  key={item.id}
                  className={cn(
                    "flex min-h-11 cursor-pointer items-center gap-3 rounded-sm border px-3 py-2 text-sm",
                    studio === item.id ? "border-sage bg-paper" : "border-line",
                  )}
                >
                  <input
                    type="radio"
                    name="studio"
                    checked={studio === item.id}
                    onChange={() => setStudio(item.id)}
                  />
                  <span>
                    {item.name}
                    <span className="block text-xs text-muted">{item.hours}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-5">
            <legend className="text-sm font-medium">Preferred window</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {windows.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={window === item.id}
                  className={cn(
                    "press h-11 rounded-sm px-3 text-sm",
                    window === item.id ? "bg-ink text-foam" : "border border-line",
                  )}
                  onClick={() => setWindow(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            {errors.window ? <p className="mt-2 text-sm text-danger">{errors.window}</p> : null}
          </fieldset>

          <fieldset className="mt-5">
            <legend className="text-sm font-medium">Treatments on this slip</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {treatments.map((item) => {
                const on = interests.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={on}
                    className={cn(
                      "press h-11 rounded-sm px-3 text-sm",
                      on ? "bg-sage text-foam" : "border border-line text-ink",
                    )}
                    onClick={() => toggleInterest(item.id)}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
            {errors.interests ? <p className="mt-2 text-sm text-danger">{errors.interests}</p> : null}
          </fieldset>

          <label className="mt-5 block text-sm font-medium">
            Notes
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="field mt-2 resize-y"
              placeholder="Optional. Event date, prior filler, questions."
            />
          </label>

          <label className="mt-4 flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 size-4"
            />
            <span>I understand this is a sample site. Submitting stores a slip in this browser and does not request a real appointment.</span>
          </label>
          {errors.consent ? <p className="mt-2 text-sm text-danger">{errors.consent}</p> : null}

          <button
            type="submit"
            className="press mt-5 inline-flex h-12 items-center rounded-sm bg-ink px-5 text-sm font-medium text-foam"
          >
            Save consult slip
          </button>
        </form>
      </div>

      {slips.length > 0 ? (
        <div className="mx-auto max-w-6xl px-5 pb-16">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-xl">Slips on this device</h3>
            <button type="button" className="h-11 text-sm text-mist underline" onClick={clearSlips}>
              Clear
            </button>
          </div>
          <ul className="mt-3 divide-y divide-foam/20 border-y border-foam/20">
            {slips.map((slip) => (
              <li key={slip.ref} className="flex flex-wrap items-baseline justify-between gap-2 py-3 text-sm">
                <span className="tabular-nums">{slip.ref}</span>
                <span>{slip.studio}</span>
                <span className="text-mist">{slip.interests.join(", ")}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <div className="mt-2">{children}</div>
      {error ? <span className="mt-1 block font-normal text-danger">{error}</span> : null}
    </label>
  );
}
