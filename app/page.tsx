import {
  ArrowDown,
  ArrowUpRight,
  Briefcase,
  ChartLineUp,
  EnvelopeSimple,
  GraduationCap,
  MapPin,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { CareerTimeline } from "@/components/CareerTimeline";
import { Navigation } from "@/components/Navigation";
import { PageIntro } from "@/components/PageIntro";
import { ProjectVisual } from "@/components/ProjectVisual";
import { ScrollReveals } from "@/components/ScrollReveals";
import { education, leadership, profile, projects, skillGroups } from "@/lib/portfolio";

export default function Home() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "Financial Analyst",
    email: `mailto:${profile.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Winter Park",
      addressRegion: "FL",
      addressCountry: "US",
    },
    url: "https://www.garrettlisowski.com/",
    knowsAbout: [
      "Financial modeling",
      "Investment research",
      "Forecasting",
      "Portfolio analytics",
      "Market analysis",
    ],
  };

  return (
    <main className="portfolio-main profile-home" id="top">
      <PageIntro />
      <a className="skip-link" href="#content">Skip to content</a>
      <Navigation />
      <ScrollReveals />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div id="content">
        <section className="portfolio-hero candidate-hero" aria-labelledby="profile-name">
          <figure className="hero-portrait">
            <div className="hero-portrait-frame">
              <Image
                src="/assets/garrett-lisowski-headshot-portrait.webp"
                alt="Garrett Lisowski"
                width={1254}
                height={1254}
                priority
                unoptimized
              />
            </div>
            <figcaption>
              <h1 id="profile-name">Garrett Lisowski</h1>
              <p>Financial analyst focused on investment research.</p>
            </figcaption>
          </figure>

          <nav className="hero-quick-links" aria-label="Profile links">
            <a href={`mailto:${profile.email}`} aria-label="Email Garrett">
              <EnvelopeSimple size={20} weight="regular" aria-hidden="true" />
            </a>
            <a href="#experience" aria-label="View experience">
              <Briefcase size={20} weight="regular" aria-hidden="true" />
            </a>
            <a href="#work" aria-label="View selected work">
              <ChartLineUp size={20} weight="regular" aria-hidden="true" />
            </a>
            <a href="#background" aria-label="View education and skills">
              <GraduationCap size={20} weight="regular" aria-hidden="true" />
            </a>
          </nav>

          <div className="hero-statement">
            <p className="hero-profile-line">
              <strong>Financial modeling and market research</strong>
              <span>{profile.location}</span>
            </p>
            <p className="hero-support">
              I care about the point where a model leaves the spreadsheet and becomes a decision someone can stand behind.
            </p>
            <a className="primary-action" href="#experience">
              View experience
              <ArrowDown size={18} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="experience-section" id="experience">
          <header className="portfolio-section-heading compact-heading" data-reveal>
            <p>Experience</p>
          </header>
          <div className="experience-evidence" aria-label="Selected evidence" data-reveal>
            <div><strong>3.78</strong><span>GPA in Economics</span></div>
            <div><strong>150+</strong><span>Commercial and enterprise accounts</span></div>
            <div><strong>100+</strong><span>Stocks reviewed for an investment committee</span></div>
          </div>
          <CareerTimeline />
        </section>

        <section className="selected-work" id="work">
          <header className="portfolio-section-heading compact-heading" data-reveal>
            <p>Selected work</p>
          </header>

          <div className="project-list">
            {projects.map((project) => (
              <article className="project-feature" data-reveal key={project.slug}>
                <Link className="project-card-link" href={`/work/${project.slug}`} aria-label={`View ${project.name} case study`}>
                  <div className="project-preview">
                    <ProjectVisual type={project.visual} />
                  </div>
                  <div className="project-information">
                    <div>
                      <p className="project-type">{project.type}</p>
                      <h3>{project.name}</h3>
                      <p className="project-summary">{project.summary}</p>
                    </div>
                    <ArrowUpRight size={24} weight="regular" aria-hidden="true" />
                  </div>
                </Link>
                <div className="project-card-meta">
                  <p className="project-role"><span>What I did</span>{project.role}</p>
                  <ul className="project-proof-points">
                    {project.proofPoints.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="background-section" id="background">
          <header className="portfolio-section-heading compact-heading" data-reveal>
            <p>Education and leadership</p>
          </header>

          <div className="credential-grid" data-reveal>
            <article className="credential-card">
              <p>Education</p>
              <h3>{education.school}</h3>
              <strong>{education.degree}</strong>
              <span>{education.minor}</span>
              <ul>{education.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
            </article>
            <article className="credential-card leadership-card">
              <p>Leadership</p>
              <h3>{leadership.organization}</h3>
              <strong>{leadership.role}</strong>
              <ul>{leadership.evidence.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          </div>

          <div className="skills-story" data-reveal>
            <div className="skills-intro">
              <p>Skills</p>
              <h3>Tools I have used on real work.</h3>
            </div>
            <div className="skill-groups">
              {skillGroups.map((group) => (
                <article key={group.title}>
                  <h4>{group.title}</h4>
                  <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-copy" data-reveal>
            <p>Contact</p>
            <h2>Building a finance team that values clear thinking? Let’s talk.</h2>
          </div>
          <div className="contact-details" data-reveal>
            <a href={`mailto:${profile.email}`}>
              <EnvelopeSimple size={22} weight="light" aria-hidden="true" />
              <span><small>Email</small>{profile.email}</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <div>
              <MapPin size={22} weight="light" aria-hidden="true" />
              <span><small>Based in</small>{profile.location}</span>
            </div>
          </div>
        </section>
      </div>

      <footer className="portfolio-footer">
        <a className="wordmark" href="#top" aria-label="Back to top">
          <span className="wordmark-symbol">GL</span>
          <span>{profile.name}</span>
        </a>
        <p>Financial models, market research, and clear communication.</p>
        <span>{new Date().getFullYear()}</span>
      </footer>
    </main>
  );
}
