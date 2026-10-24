import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useConsult } from "@/lib/consult";
import { cn } from "@/lib/cn";

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#concerns", label: "Concerns" },
  { href: "#technology", label: "Technology" },
  { href: "#visit", label: "Visit" },
  { href: "#pricing", label: "Pricing" },
];

function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <circle cx="16" cy="16" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <ellipse
        cx="16"
        cy="16"
        rx="13"
        ry="5.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        transform="rotate(-18 16 16)"
      />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const count = useConsult((s) => s.interests.length);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <a href="#top" className="flex items-center gap-2 text-ink">
          <Mark className="size-8" />
          <span className="font-display text-lg leading-none">Aesthetics Planet</span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Page">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-muted hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#book"
            className="press hidden h-11 items-center gap-2 rounded-sm bg-sage px-4 text-sm font-medium text-foam sm:inline-flex"
          >
            Book a consult
            {count > 0 ? (
              <span className="tabular-nums rounded-xs bg-foam px-1.5 py-0.5 text-xs text-ink">{count}</span>
            ) : null}
          </a>
          <button
            type="button"
            className="press inline-flex size-11 items-center justify-center rounded-sm border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "border-t border-line bg-paper lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="mx-auto flex max-w-6xl flex-col px-5 py-3" aria-label="Mobile">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex h-12 items-center border-b border-line text-base"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#book"
            className="press mt-3 inline-flex h-12 items-center justify-center rounded-sm bg-sage text-sm font-medium text-foam"
            onClick={() => setOpen(false)}
          >
            Book a consult{count > 0 ? ` (${count})` : ""}
          </a>
        </nav>
      </div>
    </header>
  );
}
