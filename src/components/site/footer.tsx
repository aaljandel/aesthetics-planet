import { studios } from "@/data/catalog";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <p className="font-display text-xl">Aesthetics Planet</p>
          <p className="mt-3 max-w-md text-sm text-muted">
            A sample practice website for aestheticsplanet.com. Product names are trademarks of their
            owners. Nothing here is medical advice, a diagnosis, or an offer to treat.
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Rooms</p>
          {studios.map((studio) => (
            <p key={studio.id} className="mt-2 text-sm text-muted">
              {studio.lines[0]}
              <br />
              {studio.lines[1]}
            </p>
          ))}
        </div>
        <div>
          <p className="text-sm font-medium">On this page</p>
          <ul className="mt-2 space-y-1 text-sm text-muted">
            <li>
              <a href="#menu">Menu</a>
            </li>
            <li>
              <a href="#concerns">Concerns</a>
            </li>
            <li>
              <a href="#pricing">Pricing</a>
            </li>
            <li>
              <a href="#book">Consult slip</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-4 text-xs text-muted">
          Botulinum toxin can rarely spread beyond the injection site. The MHRA treats that risk as
          serious. Individual results vary. Prices include VAT and are illustrative. © {new Date().getFullYear()}{" "}
          Aesthetics Planet, sample site.
        </p>
      </div>
    </footer>
  );
}
