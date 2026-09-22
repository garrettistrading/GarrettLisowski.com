import type { Metadata } from "next";
import { SalesLab } from "@/components/sales-lab/SalesLab";
import "./sales-lab.css";
export const metadata: Metadata = {
  title: "Sales Lab | Practice. Review. Improve.",
  description:
    "An interactive sales training project by Garrett Lisowski. Practice buyer conversations, review calls, build scorecards, and track your progress.",
  alternates: { canonical: "/sales-lab" },
  twitter: {
    card: "summary",
    title: "Sales Lab by Garrett Lisowski",
    description:
      "Practice buyer conversations, review calls, and build sales skills.",
    images: [],
  },
  openGraph: {
    title: "Sales Lab by Garrett Lisowski",
    description:
      "Sales conversations, deliberate practice, and actionable coaching.",
    url: "/sales-lab",
  },
};
export default function SalesLabPage() {
  return <SalesLab />;
}
