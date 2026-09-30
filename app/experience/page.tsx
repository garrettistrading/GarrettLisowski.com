import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { education, experience, leadership, skillGroups } from "@/lib/portfolio";
import styles from "../page.module.css";
export const metadata: Metadata = { title: "Experience", description: "Garrett Lisowski’s experience in sales, finance, and business.", alternates: { canonical: "/experience" } };
export default function ExperiencePage() {
  return <div className={styles.site}><a className="skip-link" href="#content">Skip to content</a><Navigation />
    <main className={styles.document} id="content"><header><h1>experience</h1><p>My background in sales, financial analysis, and building businesses.</p></header>
      {experience.map(job => <article className={styles.entry} key={job.organization}><h2>{job.role} · {job.organization}</h2><small>{job.period} · {job.location}</small><p>{job.summary}</p><ul>{job.evidence.map(item => <li key={item}>{item}</li>)}</ul></article>)}
      <article className={styles.entry}><h2>education</h2><p>{education.school}</p><p>{education.degree} · {education.minor}</p><ul>{education.details.map(item => <li key={item}>{item}</li>)}</ul></article>
      <article className={styles.entry}><h2>leadership</h2><p>{leadership.role} · {leadership.organization}</p><ul>{leadership.evidence.map(item => <li key={item}>{item}</li>)}</ul></article>
      {skillGroups.map(group => <article className={styles.entry} key={group.title}><h2>{group.title.toLowerCase()}</h2><p>{group.skills.join(" · ")}</p></article>)}
      <footer className={styles.footer}><Link href="/">← Back to about</Link></footer>
    </main></div>;
}
