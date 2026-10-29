import type { Metadata } from "next";
import { Workbench } from "@/components/retirement/Workbench";
export const metadata: Metadata = {
  title: "Income Sequencing | Retirement Lab",
  description:
    "Explore income sequencing with transparent assumptions and scenario comparisons.",
  alternates: { canonical: "/retirement-lab/income-sequencer" },
  openGraph: {
    title: "Income Sequencing | Retirement Lab",
    url: "/retirement-lab/income-sequencer",
  },
};
export default function Page() {
  return <Workbench tool="income-sequencer" />;
}
