import { formatMoney, treatments } from "@/data/catalog";
import { useConsult } from "@/lib/consult";
import { StudioSwitch } from "./studio-switch";

export function Pricing() {
  const studio = useConsult((s) => s.studio);

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-moss">Pricing</p>
          <h2 className="mt-2 font-display text-2xl">Starting numbers, in the open.</h2>
          <p className="mt-3 text-muted">
            Sample London ranges for 2026, including VAT. A lip is rarely one syringe forever, a toxin visit
            is a unit count, and CoolSculpting is sold by the cycle. Credit does not make a treatment
            medically appropriate.
          </p>
        </div>
        <StudioSwitch />
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-line">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Starting prices by treatment and room</caption>
          <thead className="bg-sand text-ink">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">
                Treatment
              </th>
              <th scope="col" className="hidden px-4 py-3 font-medium sm:table-cell">
                Maker
              </th>
              <th scope="col" className="px-4 py-3 text-right font-medium">
                From
              </th>
            </tr>
          </thead>
          <tbody>
            {treatments.map((item) => (
              <tr key={item.id} className="border-t border-line bg-foam">
                <th scope="row" className="px-4 py-3 font-medium">
                  {item.name}
                  <span className="mt-0.5 block font-normal text-muted sm:hidden">{item.unit}</span>
                </th>
                <td className="hidden px-4 py-3 text-muted sm:table-cell">{item.maker}</td>
                <td className="px-4 py-3 text-right tabular-nums">
                  {formatMoney(item.from[studio])}
                  <span className="hidden text-muted sm:inline"> {item.unit}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted">
        Allē and ASPIRE Galderma Rewards apply only where the product qualifies. CareCredit and Cherry are
        discussed at checkout, not during consent.
      </p>
    </section>
  );
}
