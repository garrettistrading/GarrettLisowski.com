import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
export const metadata: Metadata = {
  title: "Retirement Lab",
  description:
    "Explore savings growth, Social Security claiming, and retirement withdrawal strategies with transparent assumptions.",
  alternates: { canonical: "/retirement-lab" },
  openGraph: {
    title: "Retirement Lab | Garrett Lisowski",
    url: "/retirement-lab",
    description: "Three tools for thinking through a longer financial horizon.",
  },
};
const tools = [
  {
    number: "01",
    title: "Savings growth",
    question: "What could starting now change?",
    body: "See the effect of time, monthly contributions, and inflation. Compare starting today with waiting five or ten years.",
    href: "savings-growth",
    tag: "Build the foundation",
  },
  {
    number: "02",
    title: "Social Security",
    question: "When does waiting pay off?",
    body: "Compare claiming ages, lifetime benefits, and present value. Add a spouse to explore household tradeoffs.",
    href: "social-security",
    tag: "Choose your timing",
  },
  {
    number: "03",
    title: "Income sequencing",
    question: "How do you fund the years ahead?",
    body: "Follow withdrawals, Roth conversions, taxes, and spending shortfalls through retirement, one year at a time.",
    href: "income-sequencer",
    tag: "Plan the withdrawals",
  },
];
export default function Page() {
  return (
    <>
      <header className="rl-hero rl-home-hero">
        <p className="rl-eyebrow">Interactive financial research</p>
        <h1>
          A little clarity.
          <br />A longer horizon.
        </h1>
        <p>
          Three tools for exploring the decisions that shape retirement. Change
          an assumption. See what follows.
        </p>
        <Link className="rl-primary" href="/retirement-lab/savings-growth">
          Start with your savings <ArrowUpRight aria-hidden="true" />
        </Link>
      </header>
      <section className="rl-tools" aria-label="Explore the tools">
        {tools.map((t) => (
          <Link
            href={`/retirement-lab/${t.href}`}
            className="rl-tool"
            key={t.href}
          >
            <span className="rl-tool-number">{t.number}</span>
            <div>
              <small>{t.tag}</small>
              <h2>{t.title}</h2>
            </div>
            <div>
              <h3>{t.question}</h3>
              <p>{t.body}</p>
            </div>
            <ArrowUpRight size={25} aria-hidden="true" />
          </Link>
        ))}
      </section>
      <section className="rl-principles">
        <h2>Useful models show their work.</h2>
        <div>
          <p>
            Every result comes with its assumptions. Compare scenarios, inspect
            the annual numbers, and see when a strategy costs more instead of
            saving money.
          </p>
          <p>
            No account needed. Calculations run in your browser, with optional
            saving on your device.
          </p>
          <Link href="/retirement-lab/methodology">How the models work →</Link>
        </div>
      </section>
    </>
  );
}
