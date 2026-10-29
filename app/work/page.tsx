import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { projects } from "@/lib/portfolio";
import styles from "../page.module.css";
export const metadata: Metadata = { title: "Portfolio", description: "Projects and financial research by Garrett Lisowski.", alternates: { canonical: "/work" } };
export default function WorkPage() {
  return <div className={styles.site}><a className="skip-link" href="#content">Skip to content</a><Navigation />
    <main className={styles.document} id="content">
      <header><h1>portfolio</h1><p>A few things I’ve built, and the questions that led me to them.</p></header>
      <article className={styles.entry}><h2><Link href="/sales-lab">Sales Lab</Link></h2><small>Interactive sales training workspace</small><p>A place to practice buyer conversations, review transcripts, and build custom scorecards. Includes six fictional buyer scenarios and a guided practice demo.</p><p><Link href="/sales-lab">Explore Sales Lab →</Link></p></article>
      <article className={styles.entry}><h2><Link href="/work/retirement-lab">Retirement Lab</Link></h2><small>Interactive financial modeling tools</small><p>Explore savings growth, Social Security claiming, and retirement withdrawals with visible assumptions, scenario comparisons, and annual cash flows.</p><p><Link href="/retirement-lab">Explore Retirement Lab →</Link></p></article>
      {projects.map(project => <article className={styles.entry} key={project.slug}><h2><Link href={`/work/${project.slug}`}>{project.name}</Link></h2><small>{project.type}</small><p>{project.summary}</p><p>{project.role}.</p><p><Link href={`/work/${project.slug}`}>Explore the research →</Link></p></article>)}
      <footer className={styles.footer}><Link href="/">← Back to about</Link></footer>
    </main></div>;
}
