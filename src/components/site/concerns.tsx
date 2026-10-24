import { toast } from "sonner";
import { concerns, signatures, treatmentById } from "@/data/catalog";
import { useConsult } from "@/lib/consult";
import { cn } from "@/lib/cn";

export function Concerns() {
  const interests = useConsult((s) => s.interests);
  const toggleInterest = useConsult((s) => s.toggleInterest);
  const addMany = useConsult((s) => s.addMany);
  const selected = useConsult((s) => s.concerns);
  const toggleConcern = useConsult((s) => s.toggleConcern);

  return (
    <section id="concerns" className="bg-ink text-foam">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <p className="text-sm font-medium text-mist">Concern planner</p>
        <h2 className="mt-2 max-w-2xl font-display text-2xl">Start from the line, not from a device you saw on a reel.</h2>
        <p className="mt-3 max-w-2xl text-mist">
          Choose what actually bothers you. Matches stay inside the licensed use where that licence is specific.
          Off-label ideas, if they belong in the room at all, belong in a consult — not in a recommendation
          engine.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {concerns.map((concern) => {
            const on = selected.includes(concern.id);
            return (
              <button
                key={concern.id}
                type="button"
                aria-pressed={on}
                className={cn(
                  "press h-11 rounded-sm px-3 text-sm",
                  on ? "bg-foam text-ink" : "border border-ink-2 text-foam",
                )}
                onClick={() => toggleConcern(concern.id)}
              >
                {concern.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {selected.length === 0 ? (
            <div className="rounded-xl border border-ink-2 bg-ink-2 p-6 lg:col-span-2">
              <p className="font-display text-xl">Nothing selected.</p>
              <p className="mt-2 text-sm text-mist">
                Pick one or several. A full face is rarely one product, and it is rarely five.
              </p>
            </div>
          ) : (
            selected.map((id) => {
              const concern = concerns.find((item) => item.id === id);
              if (!concern) return null;
              return (
                <article key={concern.id} className="rounded-xl border border-ink-2 p-5">
                  <h3 className="font-display text-xl">{concern.label}</h3>
                  <p className="mt-1 text-sm text-mist">{concern.detail}</p>
                  <ul className="mt-4 space-y-3">
                    {concern.matches.map((match) => {
                      const treatment = treatmentById(match.id);
                      if (!treatment) return null;
                      const added = interests.includes(treatment.id);
                      return (
                        <li key={match.id} className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium">{treatment.name}</p>
                            <p className="text-sm text-mist">{match.why}</p>
                          </div>
                          <button
                            type="button"
                            className={cn(
                              "press h-11 shrink-0 rounded-sm px-3 text-sm",
                              added ? "bg-foam text-ink" : "border border-mist/40 text-foam",
                            )}
                            onClick={() => {
                              toggleInterest(treatment.id);
                              toast(added ? `Removed ${treatment.name}` : `Added ${treatment.name}`);
                            }}
                          >
                            {added ? "Added" : "Add"}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </article>
              );
            })
          )}
        </div>

        <div className="mt-12">
          <h3 className="font-display text-xl">Signature plans</h3>
          <p className="mt-2 max-w-2xl text-sm text-mist">
            Four honest starting points. Adding a plan puts those treatments on your consult slip. It does
            not book them.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {signatures.map((plan) => (
              <li key={plan.id} className="rounded-xl border border-ink-2 p-5">
                <p className="font-display text-lg">{plan.name}</p>
                <p className="mt-2 text-sm text-mist">{plan.blurb}</p>
                <button
                  type="button"
                  className="press mt-4 inline-flex h-11 items-center rounded-sm bg-foam px-4 text-sm font-medium text-ink"
                  onClick={() => {
                    addMany(plan.ids);
                    toast(`Added ${plan.name}`);
                  }}
                >
                  Add this plan
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
