import { studios, type StudioId } from "@/data/catalog";
import { useConsult } from "@/lib/consult";
import { cn } from "@/lib/cn";

export function StudioSwitch({ tone = "light" }: { tone?: "light" | "dark" }) {
  const studio = useConsult((s) => s.studio);
  const setStudio = useConsult((s) => s.setStudio);

  return (
    <div
      role="radiogroup"
      aria-label="Rooms"
      className={cn(
        "grid grid-cols-2 rounded-sm p-1",
        tone === "light" ? "border border-line bg-foam" : "border border-ink-2 bg-ink",
      )}
    >
      {studios.map((item) => {
        const on = item.id === studio;
        return (
          <button
            key={item.id}
            type="button"
            role="radio"
            aria-checked={on}
            className={cn(
              "press h-11 rounded-xs px-3 text-sm font-medium transition-colors duration-150",
              on
                ? tone === "light"
                  ? "bg-ink text-foam"
                  : "bg-foam text-ink"
                : tone === "light"
                  ? "text-muted"
                  : "text-mist",
            )}
            onClick={() => setStudio(item.id as StudioId)}
          >
            {item.short}
          </button>
        );
      })}
    </div>
  );
}
