"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const links = [
  ["/retirement-lab", "Overview"],
  ["/retirement-lab/savings-growth", "Savings growth"],
  ["/retirement-lab/social-security", "Social Security"],
  ["/retirement-lab/income-sequencer", "Income sequencing"],
  ["/retirement-lab/methodology", "Methodology"],
];
export function LabNavigation() {
  const path = usePathname();
  return (
    <nav className="rl-nav" aria-label="Retirement Lab">
      {links.map(([href, label]) => (
        <Link
          key={href}
          href={href}
          aria-current={path === href ? "page" : undefined}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
