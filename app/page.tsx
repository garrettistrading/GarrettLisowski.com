import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Calculator,
  ChartLineUp,
  EnvelopeSimple,
  Handshake,
  MapPin,
  PresentationChart,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { CareerTimeline } from "@/components/CareerTimeline";
import { HeroSystem } from "@/components/HeroSystem";
import { Navigation } from "@/components/Navigation";
import { ProjectVisual } from "@/components/ProjectVisual";
import { ScrollReveals } from "@/components/ScrollReveals";
import { education, leadership, profile, projects, skillGroups } from "@/lib/portfolio";

const candidateProof = [
  {
    title: "Financial modeling",
    body: "Pricing, capital expenditure, forecasting, scenario analysis, and valuation.",
    icon: Calculator,
  },
  {
    title: "Investment research",
    body: "Time-series, cross-asset, relative-strength, beta, and correlation analysis.",
    icon: ChartLineUp,
  },
  {
    title: "Decision reporting",
    body: "Variance, forecast, market, and leadership reporting built for fast review.",
    icon: PresentationChart,
  },
  {
    title: "Commercial judgment",
    body: "Account planning, pipeline forecasting, client discovery, and stakeholder coordination.",
    icon: Handshake,
  },
];

export default function Home() {
  return (
    <main className="portfolio-main" id="top">
      <a className="skip-link" href="#content">Skip to content</a>
      <Navigation />
      <ScrollReveals />

      <div id="content">
        <section className="portfolio-hero">
          <div className="hero-statement">
            <p className="intro-line">Investment research · Financial analysis · Strategy</p>
            <h1>Financial analysis for clearer investment and operating decisions.</h1>
            <p className="hero-support">
              I build models, test market signals, and turn complex data into decision-ready research, forecasts, and reporting.
            </p>
            <div className="hero-cta-row">
              <a className="primary-action" href="#experience">
                Review experience
                <ArrowDown size={18} weight="bold" aria-hidden="true" />
              </a>
              <a className="text-action" href="#contact">
                Email Garrett
                <ArrowRight size={18} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </div>
          <HeroSystem />
          <div className="hero-evidence" aria-label="Selected evidence">
            <div><strong>3.78</strong><span>Economics GPA</span></div>
            <div><strong>150+</strong><span>Commercial and enterprise accounts managed</span></div>
            <div><strong>100+</strong><span>Equities covered in investment-committee research</span></div>
          </div>
        </section>

        <section className="experience-section" id="experience">
          <header className="portfolio-section-heading" data-reveal>
            <p>Experience</p>
            <h2>Evidence across analysis and execution.</h2>
            <span>
              Select a role to review the work, scope, and measured outcomes.
            </span>
          </header>
          <CareerTimeline />
        </section>

        <section className="selected-work" id="work">
          <header className="portfolio-section-heading" data-reveal>
            <p>Selected work</p>
            <h2>Research tools built for real decisions.</h2>
            <span>
              Source-backed examples of how I structure market evidence, test signals, and make analytical reasoning reviewable.
            </span>
          </header>

          <div className="project-list">
            {projects.map((project, index) => (
              <article className={`project-feature ${index % 2 === 1 ? "project-feature-reversed" : ""}`} data-reveal key={project.slug}>
                <Link className="project-preview" href={`/work/${project.slug}`} aria-label={`View ${project.name} case study`}>
                  <ProjectVisual type={project.visual} />
                  <span className="project-number">0{index + 1}</span>
                </Link>
                <div className="project-information">
                  <p className="project-type">{project.type}</p>
                  <h3>{project.name}</h3>
                  <p className="project-summary">{project.summary}</p>
                  <p className="project-role"><span>Contribution</span>{project.role}</p>
                  <ul className="project-proof-points">
                    {project.proofPoints.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                  {project.disclaimer && <p className="project-disclaimer">Research and tools, not investment advice.</p>}
                  <Link className="case-study-link" href={`/work/${project.slug}`}>
                    Review the evidence
                    <ArrowUpRight size={19} weight="bold" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="capability-section" aria-labelledby="capability-title">
          <header className="capability-heading" data-reveal>
            <p>What I bring</p>
            <h2 id="capability-title">Analysis that holds up in the room.</h2>
          </header>
          <div className="capability-grid">
            {candidateProof.map((item) => {
              const Icon = item.icon;
              return (
                <article data-reveal key={item.title}>
                  <Icon size={25} weight="light" aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="background-section" id="background">
          <header className="portfolio-section-heading" data-reveal>
            <p>Education and leadership</p>
            <h2>Economics, research, and the tools to execute.</h2>
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
              <p>Skills and tools</p>
              <h3>The working toolkit.</h3>
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
            <h2>Let’s discuss opportunities in investment research, financial analysis, portfolio analytics, or strategy.</h2>
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
        <p>Financial analysis · Investment research · Strategy</p>
        <span>{new Date().getFullYear()}</span>
      </footer>
    </main>
  );
}
