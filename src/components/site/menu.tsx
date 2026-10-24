import { useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Check, Search, X } from "lucide-react";
import { toast } from "sonner";
import {
  categories,
  categoryLabel,
  formatMoney,
  treatments,
  type Category,
  type Treatment,
} from "@/data/catalog";
import { useConsult } from "@/lib/consult";
import { cn } from "@/lib/cn";
import { StudioSwitch } from "./studio-switch";

export function TreatmentMenu() {
  const [category, setCategory] = useState<Category | "all">("all");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Treatment | null>(null);
  const studio = useConsult((s) => s.studio);
  const interests = useConsult((s) => s.interests);
  const toggleInterest = useConsult((s) => s.toggleInterest);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return treatments.filter((item) => {
      const inCat = category === "all" || item.category === category;
      if (!inCat) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.maker.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q)
      );
    });
  }, [category, query]);

  function add(item: Treatment) {
    const had = interests.includes(item.id);
    toggleInterest(item.id);
    toast(had ? `Removed ${item.name}` : `Added ${item.name} to your consult`);
  }

  return (
    <section id="menu" className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-moss">The menu</p>
          <h2 className="mt-2 font-display text-2xl">Named products, not a category called “tox.”</h2>
          <p className="mt-3 text-muted">
            Prices are sample 2026 London ranges, including VAT, written as “from” because dose and
            syringes change the visit. They are not a quote. Switch rooms and the numbers follow. Toxin
            brands are listed for this sample only — a real UK clinic cannot advertise prescription-only
            medicines to the public.
          </p>
        </div>
        <StudioSwitch />
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Treatment categories">
          {categories.map((item) => {
            const on = category === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={on}
                className={cn(
                  "press h-11 rounded-sm px-3 text-sm",
                  on ? "bg-ink text-foam" : "border border-line bg-foam text-ink",
                )}
                onClick={() => setCategory(item.id)}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <label className="relative block sm:w-64">
          <span className="sr-only">Search the menu</span>
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Botox, Galderma…"
            className="h-11 w-full rounded-sm border border-line bg-foam pr-3 pl-9 text-sm outline-none"
          />
        </label>
      </div>

      <p className="mt-4 text-sm text-muted tabular-nums">
        {visible.length} {visible.length === 1 ? "treatment" : "treatments"}
      </p>

      {visible.length === 0 ? (
        <div className="mt-6 rounded-xl border border-line bg-foam p-8">
          <p className="font-display text-xl">Nothing on the menu matches that.</p>
          <p className="mt-2 text-muted">Try a manufacturer, or start from the concern you actually have.</p>
          <a href="#concerns" className="mt-4 inline-flex h-11 items-center text-sm font-medium text-sage">
            Open the concern planner
          </a>
        </div>
      ) : (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {visible.map((item) => {
            const added = interests.includes(item.id);
            return (
              <li key={item.id} className="rounded-xl border border-line bg-foam p-5">
                <button type="button" className="w-full text-left" onClick={() => setActive(item)}>
                  <span className="text-xs font-medium text-moss">{categoryLabel[item.category]}</span>
                  <span className="mt-2 block font-display text-xl">{item.name}</span>
                  <span className="mt-1 block text-sm text-muted">{item.maker}</span>
                  <span className="mt-3 block text-sm text-ink">{item.summary}</span>
                </button>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
                  <div>
                    <p className="text-sm font-medium tabular-nums">
                      From {formatMoney(item.from[studio])}
                    </p>
                    <p className="text-xs text-muted">
                      {item.unit} · {item.pause}
                    </p>
                  </div>
                  <button
                    type="button"
                    className={cn(
                      "press inline-flex h-11 items-center gap-2 rounded-sm px-3 text-sm font-medium",
                      added ? "bg-sage text-foam" : "border border-line bg-paper text-ink",
                    )}
                    aria-pressed={added}
                    onClick={() => add(item)}
                  >
                    {added ? <Check className="size-4" /> : null}
                    {added ? "Added" : "Add"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <Dialog.Root open={active !== null} onOpenChange={(next) => !next && setActive(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="overlay-fade fixed inset-0 z-50" />
          <Dialog.Content className="dialog-panel fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-line bg-foam p-5 sm:p-7">
            {active ? <TreatmentDetail item={active} onAdd={() => add(active)} added={interests.includes(active.id)} /> : null}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}

function TreatmentDetail({
  item,
  onAdd,
  added,
}: {
  item: Treatment;
  onAdd: () => void;
  added: boolean;
}) {
  const studio = useConsult((s) => s.studio);
  const price = item.from[studio];
  const frown = item.glabellaUnits ? item.glabellaUnits * price : null;

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <Dialog.Description className="text-xs font-medium text-moss">
            {categoryLabel[item.category]} · {item.maker}
          </Dialog.Description>
          <Dialog.Title className="mt-2 font-display text-2xl">{item.name}</Dialog.Title>
        </div>
        <Dialog.Close className="press inline-flex size-11 shrink-0 items-center justify-center rounded-sm border border-line">
          <span className="sr-only">Close</span>
          <X className="size-5" />
        </Dialog.Close>
      </div>

      <p className="mt-4 text-muted">{item.indication}</p>
      <p className="mt-3">{item.how}</p>

      <dl className="mt-6 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
        {[
          ["Onset", item.onset],
          ["How long", item.lasts],
          ["Downtime", item.downtime],
          ["Plan", item.sessions],
          ["If you change your mind", item.reversible],
          ["Starting price", `${formatMoney(price)} ${item.unit}`],
        ].map(([label, value]) => (
          <div key={label} className="bg-foam p-4">
            <dt className="text-xs text-muted">{label}</dt>
            <dd className="mt-1 text-sm">{value}</dd>
          </div>
        ))}
      </dl>

      {frown !== null && item.glabellaUnits ? (
        <div className="mt-4 rounded-lg border border-line bg-paper p-4">
          <p className="text-sm font-medium">Labeled frown-line dose, for orientation only</p>
          <p className="mt-2 text-sm text-muted">
            {item.glabellaUnits} units × {formatMoney(price)} ={" "}
            <span className="font-medium text-ink tabular-nums">{formatMoney(frown)}</span> at this room’s
            starting rate. Crow’s feet, forehead, and other areas are separate. This is not a prescription, and
            your dose can differ.
          </p>
        </div>
      ) : null}

      {item.caution ? <p className="mt-4 text-sm text-muted">{item.caution}</p> : null}

      <ol className="mt-6 space-y-3">
        {item.timeline.map((step) => (
          <li key={step.at} className="grid grid-cols-[6.5rem_1fr] gap-3 text-sm">
            <span className="font-medium text-moss">{step.at}</span>
            <span>{step.text}</span>
          </li>
        ))}
      </ol>

      <button
        type="button"
        className="press mt-6 inline-flex h-12 items-center rounded-sm bg-sage px-5 text-sm font-medium text-foam"
        onClick={onAdd}
      >
        {added ? "Remove from consult" : "Add to consult"}
      </button>
    </div>
  );
}
