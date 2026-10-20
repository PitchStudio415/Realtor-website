import { TrailPage, PageHero, Acts, TextMeButton, BookButton, Section, Ways, Rows, Trailheads, CityHoverProvider, CloseBand, PtkCallout } from "@/components/trail/Parts";
import { ptkPhaseCounts } from "@/lib/ptk";

export default function Buy() {
  return (
    <TrailPage>
      <PageHero
        title="Buying a home in the East Bay"
        lede="First home or a move to the area, I take you from the first call to the keys with real numbers and a plan for every offer."
      >
        <Acts>
          <TextMeButton />
          <BookButton />
        </Acts>
      </PageHero>

      <PtkCallout counts={ptkPhaseCounts()} />

      <Section title="What I bring to your side">
        <Ways
          items={[
            { icon: "house", title: "Inspection read", body: "15 years in construction. I tell you what a finding means and what it costs to fix." },
            { icon: "route", title: "Offer strategy", body: "The best price may not always win. We plan terms and timing around what the seller needs." },
            { icon: "data", title: "Negotiation", body: "Repair credits and price changes backed by real repair numbers, not guesses." },
            { icon: "focus", title: "Full attention", body: "I keep my client list small, so your calls and texts get answered." },
          ]}
        />
      </Section>

      <Section title="Buyer guides" id="guides">
        <Rows
          items={[
            { title: "First-time buyer guide", meta: "Start to finish", href: "/first-time-home-buyer" },
            { title: "Pre-approval", meta: "What lenders look for", href: "/buyer-hub/financing" },
            { title: "Offer basics", meta: "Price, contingencies, closing date", href: "/buyer-hub/offer-basics" },
            { title: "Closing costs", meta: "What to budget for", href: "/buyer-hub/closing-costs" },
            { title: "Affordability calculator", meta: "What can you afford?", href: "/calculator" },
          ]}
        />
      </Section>

      <CityHoverProvider>
        <Section title="Pick a city" intro="Every city has a one-page playbook with the numbers and how offers win there.">
          <Trailheads style={{ border: "none", marginTop: 28 }} />
        </Section>
      </CityHoverProvider>

      <CloseBand title="Ready to start your search?" />
    </TrailPage>
  );
}
