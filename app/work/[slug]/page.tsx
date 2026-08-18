import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight, Info } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseEvidence } from "@/components/CaseEvidence";
import { Navigation } from "@/components/Navigation";
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
    title: `${project.name} case study`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.name} case study | ${profile.name}`,
      description: project.summary,
      type: "article",
      url: `/work/${project.slug}`,
      images: [{ url: "/opengraph-image", alt: `${profile.name}, financial analyst` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} case study | ${profile.name}`,
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
      <Navigation />
      <ScrollReveals />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />

      <article id="case-content">
        <header className="case-hero">
          <Link className="back-link" href="/#work">
            <ArrowLeft size={18} weight="bold" aria-hidden="true" />
            Selected work
          </Link>
          <p className="case-type">{project.type}</p>
          <h1>{project.name}</h1>
          <p className="case-summary">{project.summary}</p>
          <div className="case-hero-facts">
            <div><span>Contribution</span><strong>{project.role}</strong></div>
            <div><span>Methods</span><strong>{project.tools.join(" · ")}</strong></div>
            <div><span>Outcome</span><strong>{project.outcome}</strong></div>
          </div>
        </header>

        <div className="case-cover" data-reveal>
          <ProjectVisual type={project.visual} detail />
        </div>

        {project.disclaimer && (
          <aside className="research-notice" data-reveal>
            <Info size={21} weight="light" aria-hidden="true" />
            <p><strong>Research disclosure</strong>{project.disclaimer}</p>
          </aside>
        )}

        <CaseEvidence type={project.visual} />

        <section className="case-framing" data-reveal>
          <div><p>Context</p><h2>The challenge</h2><span>{project.challenge}</span></div>
          <div><p>Objective</p><h2>The goal</h2><span>{project.goal}</span></div>
        </section>

        <section className="case-role" data-reveal>
          <div><p>My contribution</p><h2>The analytical work behind the result.</h2></div>
          <ul>{project.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <section className="case-process">
          <header data-reveal>
            <p>Process and key decisions</p>
            <h2>Build the reasoning so it can be reviewed.</h2>
          </header>
          <div className="case-process-list">
            {project.process.map((step, index) => (
              <article data-reveal key={step.title}>
                <span>0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="case-decisions" data-reveal>
          <div>
            <p>Key decisions</p>
            <ul>{project.decisions.map((decision) => <li key={decision}>{decision}</li>)}</ul>
          </div>
          <div className="case-result">
            <p>Outcome</p>
            <h2>What the system produced</h2>
            <strong>{project.outcome}</strong>
            <blockquote>{project.lessons}</blockquote>
          </div>
        </section>

        <section className="next-project" data-reveal>
          <p>Continue exploring</p>
          <Link href={`/work/${nextProject.slug}`}>
            <span>Next case study</span>
            <strong>{nextProject.name}</strong>
            <ArrowRight size={28} weight="bold" aria-hidden="true" />
          </Link>
        </section>
      </article>

      <footer className="case-footer">
        <p>Interested in the analysis behind the work?</p>
        <a href={`mailto:${profile.email}`}>
          Get in touch
          <ArrowUpRight size={19} weight="bold" aria-hidden="true" />
        </a>
      </footer>
    </main>
  );
}
