import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight, Info } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseEvidence } from "@/components/CaseEvidence";
import { ProjectNavigation } from "@/components/ProjectNavigation";
import { ProjectVisual } from "@/components/ProjectVisual";
import { ScrollReveals } from "@/components/ScrollReveals";
import { getProject, profile, projects } from "@/lib/portfolio";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.name}`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.name} | ${profile.name}`,
      description: project.summary,
      type: "article",
      url: `/work/${project.slug}`,
      images: [{ url: "/opengraph-image", alt: `${profile.name}, financial analyst` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | ${profile.name}`,
      description: project.summary,
      images: ["/opengraph-image"],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.summary,
    url: `https://www.garrettlisowski.com/work/${project.slug}`,
    author: {
      "@type": "Person",
      name: profile.name,
      url: "https://www.garrettlisowski.com/",
    },
    keywords: project.tools.join(", "),
  };

  return (
    <main className="case-main">
      <a className="skip-link" href="#case-content">Skip to case study</a>
      <ProjectNavigation name={project.visual === "deferred-comp" ? "TRS Hedge Model" : project.visual === "trend" ? "Market Trend Research" : "Relative Strength Research"} />
      <ScrollReveals />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />

      <article id="case-content">
        <header className="case-hero" id="overview">
          <Link className="back-link" href="/work">
            <ArrowLeft size={18} weight="bold" aria-hidden="true" />
            All projects
          </Link>
          <p className="case-type">{project.type}</p>
          <h1>{project.name}</h1>
          <p className="case-summary">{project.summary}</p>
          <div className="case-hero-facts">
            <div><span>What I did</span><strong>{project.role}</strong></div>
            <div><span>Built with</span><strong>{project.tools.join(", ")}</strong></div>
            <div><span>What came out of it</span><strong>{project.outcome}</strong></div>
          </div>
        </header>

        <div className="case-cover" data-reveal>
          <ProjectVisual type={project.visual} detail />
        </div>

        {project.disclaimer && (
          <aside id="limitations" className="research-notice" data-reveal>
            <Info size={21} weight="light" aria-hidden="true" />
            <p><strong>A note on the work</strong>{project.disclaimer}</p>
          </aside>
        )}

        <div id="evidence"><CaseEvidence type={project.visual} /></div>

        <section id="method" className="case-framing" data-reveal>
          <div><p>The question behind it</p><h2>What I was trying to understand</h2><span>{project.challenge}</span></div>
          <div><p>The standard I set</p><h2>What a useful answer needed</h2><span>{project.goal}</span></div>
        </section>

        <section className="case-role" data-reveal>
          <div><p>My part</p><h2>Scope of the work.</h2></div>
          <ul>{project.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <section className="case-process">
          <header data-reveal>
            <p>Process</p>
            <h2>Method, step by step.</h2>
          </header>
          <div className="case-process-list">
            {project.process.map((step) => (
              <article data-reveal key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="case-decisions" data-reveal>
          <div>
            <p>Where judgment entered</p>
            <ul>{project.decisions.map((decision) => <li key={decision}>{decision}</li>)}</ul>
          </div>
          <div className="case-result">
            <p>Takeaway</p>
            <h2>What stayed with me</h2>
            <blockquote>{project.lessons}</blockquote>
          </div>
        </section>

        <section className="next-project" data-reveal>
          <p>More work</p>
          <Link href={`/work/${nextProject.slug}`}>
            <span>Read the next project</span>
            <strong>{nextProject.name}</strong>
            <ArrowRight size={28} weight="bold" aria-hidden="true" />
          </Link>
        </section>
      </article>

      <footer className="case-footer">
        <p>Independent research by <Link href="/">Garrett Lisowski</Link>.</p>
        <a href={`mailto:${profile.email}`}>
          Email me
          <ArrowUpRight size={19} weight="bold" aria-hidden="true" />
        </a>
      </footer>
    </main>
  );
}
