import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Navigation } from "@/components/Navigation";
import { projects } from "@/lib/portfolio";
export const metadata: Metadata = { title: "Work", description: "Sales Lab and independent financial research by Garrett Lisowski.", alternates: { canonical: "/work" } };
const outputs = [
  { label: "Illustrative model output", value: "92%", detail: "Target hedge ratio", rows: [["Plan exposure", "$12.48m"], ["Target notional", "$11.48m"], ["Plan options", "4"]], note: "Fictional plan data · Educational model" },
  { label: "Research framework", value: "15", detail: "Inputs, considered together", rows: [["Categories", "5"], ["Observations", "24"], ["Snapshot", "Jan–Feb 2025"]], note: "Historical research · Not a live signal" },
  { label: "Research workflow", value: "Compare.", detail: "Relative strength in context", rows: [["01", "Pairwise comparisons"], ["02", "Trend confirmation"], ["03", "Candidate screening"]], note: "Historical examples · Not current holdings" },
];
export default function WorkPage() {
 return <main className="work-directory"><a className="skip-link" href="#work-content">Skip to content</a><Navigation />
  <div className="directory-content" id="work-content"><header className="directory-hero"><p className="eyebrow-label">Products &amp; independent research</p><h1>Work worth<br />looking into.</h1><p>Tools for practice. Models for understanding. A closer look at the questions I’ve worked on and how I approached them.</p></header>
  <article className="directory-flagship"><div><p className="eyebrow-label">01 / Interactive product</p><h2>Sales Lab</h2><p>A dedicated workspace for practicing buyer conversations, reviewing transcripts, and building a more deliberate training routine.</p><p className="directory-contribution"><strong>My contribution</strong>Product design, practice workflows, scorecards, and application development.</p><Link className="outline-action" href="/sales-lab">Explore Sales Lab <ArrowUpRight size={18} /></Link></div><Link href="/sales-lab" className="directory-screen" aria-label="Explore Sales Lab"><Image src="/assets/sales-lab-workspace-v2.webp" width={1425} height={990} alt="Sales Lab practice workspace" sizes="(max-width: 760px) 90vw, 700px" /></Link></article>
  <div className="directory-research">{projects.map((project,i)=><article className="directory-project" key={project.slug}><div className="directory-project-copy"><p className="eyebrow-label">0{i+2} / {project.type}</p><h2>{project.name}</h2><p>{project.summary}</p><p className="directory-contribution"><strong>My contribution</strong>{project.role}</p><Link className="underlined-action" href={`/work/${project.slug}`}>Explore the research <ArrowUpRight size={18} /></Link></div><div className="research-output"><p className="eyebrow-label">{outputs[i].label}</p><strong className="output-value">{outputs[i].value}</strong><p>{outputs[i].detail}</p><dl>{outputs[i].rows.map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><small>{outputs[i].note}</small></div></article>)}</div>
  </div><footer className="product-footer"><Link href="/">Garrett Lisowski</Link><span>Sales, research, and practical tools.</span><a href="mailto:Garrett@GarrettLisowski.com">Get in touch <ArrowUpRight size={16} /></a></footer></main>;
}
