import type { Metadata } from "next";
import { Workbench } from "@/components/retirement/Workbench";
export const metadata: Metadata = {
  title: "Savings Growth | Retirement Lab",
  description:
    "Explore savings growth with transparent assumptions and scenario comparisons.",
  alternates: { canonical: "/retirement-lab/savings-growth" },
  openGraph: {
    title: "Savings Growth | Retirement Lab",
    url: "/retirement-lab/savings-growth",
  },
};
export default function Page() {
  return <Workbench tool="savings-growth" />;
}
