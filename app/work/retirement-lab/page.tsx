import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import styles from "../../page.module.css";
export const metadata: Metadata = {
  title: "Retirement Lab — Project",
  description:
    "An independent retirement modeling project by Garrett Lisowski.",
  alternates: { canonical: "/work/retirement-lab" },
};
export default function Page() {
  return (
    <div className={styles.site}>
      <Navigation />
      <main className={styles.document}>
        <header>
          <h1>Retirement Lab</h1>
          <p>
            Interactive models for savings growth, Social Security claiming, and
            retirement withdrawals.
          </p>
        </header>
        <article className={styles.entry}>
          <h2>The question</h2>
          <p>
            How can a financial model make a long-term decision easier to
            understand without hiding the assumptions behind the answer?
          </p>
          <h2>The approach</h2>
          <p>
            Separate the calculation engine from the interface, show annual cash
            flows, and compare strategies using the same assumptions. Include
            negative outcomes and spending shortfalls, not just favorable
            results.
          </p>
          <h2>What I built</h2>
          <p>
            Three browser-based calculators, scenario comparison, optional local
            saving, shareable inputs, and printable reports. This independent
            implementation was inspired by Logan Lisowski’s{" "}
            <a href="https://retirement-architect.vercel.app/">
              Retirement Architect
            </a>
            .
          </p>
          <p>
            <Link href="/retirement-lab">Open Retirement Lab →</Link>
          </p>
          <p>
            <Link href="/retirement-lab/methodology">
              Read the methodology and limitations →
            </Link>
          </p>
        </article>
        <footer className={styles.footer}>
          <Link href="/work">← Back to portfolio</Link>
        </footer>
      </main>
    </div>
  );
}
