import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export function ProjectNavigation({ name, sales = false }: { name: string; sales?: boolean }) {
  return <header className="project-header">
    <nav aria-label={`${name} navigation`}>
      <Link className="project-brand" href={sales ? "/sales-lab" : "#overview"}>{name}<span>{sales ? "Practice. Review. Improve." : "Independent research"}</span></Link>
      <div className="project-links">
        <a href={sales ? "#how-it-works" : "#overview"}>{sales ? "How it works" : "Overview"}</a>
        <a href={sales ? "#capabilities" : "#evidence"}>{sales ? "Capabilities" : "Evidence"}</a>
        <a href={sales ? "#demo" : "#method"}>{sales ? "Public demo" : "Method"}</a>
        {!sales && <a href="#limitations">Limitations</a>}
      </div>
      <Link className="project-nav-action" href={sales ? "/sales-lab/app" : "/work"}>{sales ? "Open workspace" : "All projects"}<ArrowUpRight size={16} aria-hidden="true" /></Link>
    </nav>
  </header>;
}
