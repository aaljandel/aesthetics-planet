import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/catalog";

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-6xl px-5 pb-16 sm:pb-20">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-sm font-medium text-moss">Questions</p>
          <h2 className="mt-2 font-display text-2xl">The ones that should be answered before you arrive.</h2>
          <img
            src="/images/still.jpg"
            alt="Unlabeled glass serum bottles, a dropper, and an olive sprig on limestone"
            width={1408}
            height={1408}
            className="mt-6 hidden aspect-square w-full rounded-xl border border-line object-cover lg:block"
          />
        </div>
        <Accordion.Root type="single" collapsible className="lg:col-span-8">
          {faqs.map((item) => (
            <Accordion.Item key={item.q} value={item.q} className="border-b border-line">
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-4 text-left">
                  <span className="text-base font-medium">{item.q}</span>
                  <ChevronDown className="size-5 shrink-0 text-muted transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="accordion-content overflow-hidden">
                <p className="pb-5 text-sm text-muted">{item.a}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
