import type { Metadata } from "next";
import { Workbench } from "@/components/retirement/Workbench";
export const metadata: Metadata = {
  title: "Social Security | Retirement Lab",
  description:
    "Explore social security with transparent assumptions and scenario comparisons.",
  alternates: { canonical: "/retirement-lab/social-security" },
  openGraph: {
    title: "Social Security | Retirement Lab",
    url: "/retirement-lab/social-security",
  },
};
export default function Page() {
  return <Workbench tool="social-security" />;
}
