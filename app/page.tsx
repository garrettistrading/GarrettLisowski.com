import { ArrowDown, ArrowUpRight, EnvelopeSimple, MapPin, Waveform } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { CareerTimeline } from "@/components/CareerTimeline";
import { Navigation } from "@/components/Navigation";
import { ProjectVisual } from "@/components/ProjectVisual";
import { ScrollReveals } from "@/components/ScrollReveals";
import { education, leadership, profile, projects, skillGroups } from "@/lib/portfolio";
import styles from "./page.module.css";

export default function Home() {
  const personSchema = {
    "@context": "https://schema.org", "@type": "Person", name: profile.name,
    jobTitle: "Financial Analyst", email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Winter Park", addressRegion: "FL", addressCountry: "US" },
    url: "https://www.garrettlisowski.com/",
    knowsAbout: ["Financial modeling", "Investment research", "Forecasting", "Portfolio analytics", "Market analysis"],
  };

  return (
    <main className={styles.home} id="top">
      <a className="skip-link" href="#content">Skip to content</a>
      <Navigation />
      <ScrollReveals />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <div id="content">
        <section className={styles.hero} aria-labelledby="profile-name">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Financial analyst · Investment research</p>
            <h1 id="profile-name">Garrett<br /><span>Lisowski.</span></h1>
            <p className={styles.heroDescription}>I care about the point where a model leaves the spreadsheet and becomes a decision someone can stand behind.</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#experience">View experience <ArrowDown size={19} aria-hidden="true" /></a>
              <a className={styles.textButton} href="#work">Selected work <ArrowUpRight size={19} aria-hidden="true" /></a>
            </div>
          </div>
          <figure className={styles.portrait}>
            <div className={styles.portraitFrame}>
              <Image src="/assets/garrett-lisowski-headshot-portrait.webp" alt="Garrett Lisowski" width={1254} height={1254} priority sizes="(max-width: 760px) 90vw, 42vw" />
            </div>
            <figcaption><span>Financial modeling &amp; market research</span><span><MapPin size={15} aria-hidden="true" />{profile.location}</span></figcaption>
          </figure>
        </section>

        <section className={styles.experience} id="experience" aria-labelledby="experience-title">
          <div className={styles.evidence} aria-label="Selected evidence">
            <div><strong>3.78<span>/4.0</span></strong><span>GPA in Economics</span></div>
            <div><strong>150<span>+</span></strong><span>Commercial and enterprise accounts</span></div>
            <div><strong>100<span>+</span></strong><span>Stocks reviewed for an investment committee</span></div>
          </div>
          <header className={styles.sectionHeading} data-reveal><h2 id="experience-title">Experience.</h2></header>
          <CareerTimeline />
        </section>

        <section className={styles.work} id="work" aria-labelledby="work-title">
          <header className={styles.sectionHeading} data-reveal><h2 id="work-title">Selected work.</h2></header>
          <article className={styles.spotlight} data-reveal>
            <div className={styles.spotlightCopy}>
              <span className={styles.projectCategory}><Waveform size={19} aria-hidden="true" /> Interactive sales training workspace</span>
              <h3>Sales Lab</h3>
              <p>A place to practice discovery, handle objections, and turn conversations into specific coaching. Explore fictional buyer scenarios and build your own scorecards.</p>
              <ul className={styles.proof}><li>6 buyer scenarios</li><li>Custom scorecards</li><li>Guided demo available</li></ul>
              <Link className={styles.primaryButton} href="/sales-lab" aria-label="Try Sales Lab sales training workspace">Explore Sales Lab <ArrowUpRight size={19} aria-hidden="true" /></Link>
              <p className={styles.role}><strong>What I built</strong>Practice workflows, scoring criteria, and a coaching workspace</p>
            </div>
            <Link className={styles.salesPreview} href="/sales-lab" aria-label="Open the Sales Lab practice studio">
              <Image src="/assets/sales-lab-workspace.webp" alt="Sales Lab practice studio with buyer roleplay scenarios and call coaching" width={1265} height={712} sizes="(max-width: 760px) 100vw, 65vw" />
            </Link>
          </article>
          <div className={styles.researchGrid}>
            {projects.map((project, index) => (
              <article className={`${styles.researchCard} ${index === 0 ? styles.featuredResearch : ""}`} data-reveal key={project.slug}>
                <Link className={styles.researchLink} href={`/work/${project.slug}`} aria-label={`View ${project.name} case study`}>
                  <div className={styles.researchVisual}><ProjectVisual type={project.visual} /></div>
                  <div className={styles.researchCopy}>
                    <p className={styles.projectCategory}>{project.type}</p>
                    <h3>{project.name}<ArrowUpRight size={23} aria-hidden="true" /></h3>
                    <p>{project.summary}</p>
                  </div>
                </Link>
                <div className={styles.researchMeta}><p className={styles.role}><strong>What I did</strong>{project.role}</p><ul className={styles.proof}>{project.proofPoints.map((point) => <li key={point}>{point}</li>)}</ul></div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.background} id="background" aria-labelledby="background-title">
          <header className={styles.sectionHeading} data-reveal><h2 id="background-title">Education and leadership.</h2></header>
          <div className={styles.credentials} data-reveal>
            <article><p className={styles.projectCategory}>Education</p><h3>{education.school}</h3><strong>{education.degree}</strong><span>{education.minor}</span><ul>{education.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></article>
            <article><p className={styles.projectCategory}>Leadership</p><h3>{leadership.organization}</h3><strong>{leadership.role}</strong><ul>{leadership.evidence.map((item) => <li key={item}>{item}</li>)}</ul></article>
          </div>
          <div className={styles.skills} data-reveal>
            <h3>Tools I have used<br />on real work.</h3>
            <div>{skillGroups.map((group) => <article key={group.title}><h4>{group.title}</h4><ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></article>)}</div>
          </div>
        </section>

        <section className={styles.contact} id="contact" aria-labelledby="contact-title" data-reveal>
          <p className={styles.projectCategory}>Contact</p><h2 id="contact-title">Building a finance team that values clear thinking?<br /><span>Let’s talk.</span></h2>
          <a className={styles.emailLink} href={`mailto:${profile.email}`}><EnvelopeSimple size={22} aria-hidden="true" />{profile.email}<ArrowUpRight size={22} aria-hidden="true" /></a>
          <p className={styles.location}><MapPin size={16} aria-hidden="true" />{profile.location}</p>
        </section>
      </div>
      <footer className={styles.footer}><a className="wordmark" href="#top" aria-label="Back to top"><span className="wordmark-symbol">GL</span><span>{profile.name}</span></a><p>Financial models, market research, and clear communication.</p><span>{new Date().getFullYear()}</span></footer>
    </main>
  );
}
