import Link from "next/link";
import { LabNavigation } from "@/components/retirement/LabNavigation";
import "./retirement.css";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="retirement-lab">
      <a className="skip-link" href="#lab-content">
        Skip to content
      </a>
      <header className="rl-header">
        <Link href="/">Garrett Lisowski</Link>
        <Link href="/work">Back to portfolio ↗</Link>
      </header>
      <div className="rl-shell">
        <LabNavigation />
        <main id="lab-content">{children}</main>
        <footer className="rl-footer">
          <span>Retirement Lab by Garrett Lisowski</span>
          <p>
            Educational projections, not investment, tax, or legal advice.
            Results depend on your assumptions.
          </p>
          <Link href="/retirement-lab/methodology">
            Sources, scope &amp; privacy
          </Link>
        </footer>
      </div>
    </div>
  );
}
