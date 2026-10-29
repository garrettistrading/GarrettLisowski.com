import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { projects } from "@/lib/portfolio";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Practical projects exploring financial decisions, client conversations, and reliable financial analysis by Garrett Lisowski.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const research = projects.filter(project => project.visual !== "deferred-comp");

  return (
    <div className={styles.site}>
      <a className="skip-link" href="#content">Skip to content</a>
      <Navigation />
      <main className={styles.document} id="content">
        <header>
          <h1>portfolio</h1>
          <p>Understanding a decision, explaining it clearly, and checking the work behind it. These projects explore different parts of that process.</p>
          <p>They complement my background in customer conversations and financial analysis. <Link href="/experience">More about my professional experience →</Link></p>
        </header>
        <article className={styles.entry}>
          <h2><Link href="/work/retirement-lab">Retirement Lab</Link></h2>
          <small>Understanding financial tradeoffs</small>
          <p>How much does a change in savings, claiming age, or withdrawal strategy affect a retirement scenario? This lab brings those questions into a set of interactive models with visible assumptions and annual results.</p>
          <p>Compare scenarios, inspect the calculations, and see what changes when an assumption changes. The purpose is to make the tradeoffs easier to understand, with the limits of the model alongside the results.</p>
          <p><small>Independent educational tools. Simplified projections, not personalized financial advice.</small></p>
          <p><Link href="/retirement-lab">Try the calculators →</Link> · <Link href="/work/retirement-lab">Read about the project →</Link></p>
        </article>
        <article className={styles.entry}>
          <h2><Link href="/sales-lab">Sales Lab</Link></h2>
          <small>Practicing conversations and reviewing the details</small>
          <p>A useful conversation starts with understanding what the other person needs. Sales Lab provides six fictional buyer scenarios, transcript review, and custom scorecards for practicing that process.</p>
          <p>Use the guided demo to explore a conversation, then review it against specific criteria. It gives conversation practice a structure: an example to examine and feedback to work from.</p>
          <p><small>Practice scenarios and feedback, separate from actual customer interactions.</small></p>
          <p><Link href="/sales-lab">Explore conversation practice →</Link></p>
        </article>
        <article className={styles.entry}>
          <h2><Link href="/work/executive-deferred-compensation-trs-hedge-model">Financial modeling &amp; controls</Link></h2>
          <small>Executive Deferred Compensation TRS Hedge Model</small>
          <p>When a financial model has several moving parts, how do you know the result holds together? This model follows a fictional deferred-compensation liability through exposure calculations, hedge adjustments, and settlement checks.</p>
          <p>The emphasis is on traceability: connecting outputs to inputs, identifying exceptions, and making the next review step clear.</p>
          <p><small>Independent educational model using fictional plan data and sample values.</small></p>
          <p><Link href="/work/executive-deferred-compensation-trs-hedge-model">Follow the model and its checks →</Link></p>
        </article>
        <section aria-labelledby="research-heading">
          <h2 id="research-heading">additional market research</h2>
          <p>Historical research into conflicting signals and relative strength, including crypto markets. These projects document analytical frameworks and their limitations.</p>
          {research.map(project => (
            <article className={styles.entry} key={project.slug}>
              <h3><Link href={`/work/${project.slug}`}>{project.name}</Link></h3>
              <p>{project.summary}</p>
              <p><Link href={`/work/${project.slug}`}>Read the research →</Link></p>
            </article>
          ))}
        </section>
        <footer className={styles.footer}><Link href="/">← Back to about</Link></footer>
      </main>
    </div>
  );
}
