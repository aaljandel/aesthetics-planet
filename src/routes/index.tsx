import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { TreatmentMenu } from "@/components/site/menu";
import { Concerns } from "@/components/site/concerns";
import { Technology } from "@/components/site/technology";
import { Visit } from "@/components/site/visit";
import { Pricing } from "@/components/site/pricing";
import { Faq } from "@/components/site/faq";
import { Book } from "@/components/site/book";
import { Footer } from "@/components/site/footer";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TreatmentMenu />
        <Concerns />
        <Technology />
        <Visit />
        <Pricing />
        <Faq />
        <Book />
      </main>
      <Footer />
    </>
  );
}
