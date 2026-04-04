"use client";

import { motion } from "framer-motion";
import { Rocket, TrendingUp } from "lucide-react";

/* ── Skills data ──────────────────────────────────────────────── */

const categories = [
  {
    label: "Sales & Revenue",
    items: [
      "Full-Cycle Sales",
      "Pipeline Development",
      "Account Management",
      "Consultative Selling",
      "Negotiation",
      "Quota Attainment",
    ],
  },
  {
    label: "Tools & Platforms",
    items: [
      "HubSpot",
      "Odoo ERP",
      "Bloomberg Terminal",
      "FactSet",
      "Excel (Pearson Certified)",
      "Python",
    ],
  },
  {
    label: "Analysis",
    items: [
      "DCF Modeling",
      "Revenue Forecasting",
      "Market Analysis",
      "Data-Driven Account Planning",
    ],
  },
  {
    label: "Certifications",
    items: [
      "SIE (Feb 2026)",
      "HubSpot Inbound",
      "Inbound Sales",
      "Frictionless Sales",
      "Revenue Operations",
      "Sales Hub Software",
    ],
  },
  {
    label: "Languages",
    items: ["English (Native)", "Spanish (Intermediate)"],
  },
];

/* ── Ventures data ────────────────────────────────────────────── */

const ventures = [
  {
    icon: TrendingUp,
    name: "EdgeFinder",
    role: "Co-Founder",
    period: "Aug 2024 \u2013 Present",
    description:
      "Retail trading analytics platform processing 10+ years of data across 500+ equities. Python screeners evaluating 200+ technical indicators with a 72% backtested win rate. Integrated REIT and sector rotation data.",
  },
  {
    icon: Rocket,
    name: "UB Student Investors Network",
    role: "VP, Investment Research",
    period: "Jan 2024 \u2013 Present",
    description:
      "Led sector analysis across 8+ industries. Simulated portfolio outperformed the S&P 500 by 12%. Screened 100+ equities via Bloomberg and FactSet for weekly committee reports.",
  },
];

/* ── Skills & Ventures section ────────────────────────────────── */

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Sub-section A — Skills & Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-medium text-[#899da0] tracking-[0.2em] uppercase mb-3">
            Capabilities
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#d8e6e8]">
            Skills &amp; certifications.
          </h2>
        </motion.div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <h3 className="text-xs font-semibold text-[#d8e6e8] tracking-[0.15em] uppercase mb-3">
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item, j) => (
                  <span
                    key={j}
                    className="text-xs text-[#899da0] font-light px-3 py-1.5 rounded-md border border-[#2d464b]/40 bg-[#2d464b]/10"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sub-section B — Ventures & Initiatives */}
        <motion.div
          className="mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-medium text-[#899da0] tracking-[0.2em] uppercase mb-3">
            Initiative
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#d8e6e8]">
            Ventures &amp; projects.
          </h2>
        </motion.div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {ventures.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={i}
                className="p-8 rounded-xl border border-[#2d464b]/50 bg-[#0d1e21] hover:border-[#899da0]/30 hover:bg-[#122a2e] transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <Icon
                  className="w-5 h-5 text-[#899da0] mb-4"
                  strokeWidth={1.5}
                />
                <h3 className="text-lg font-semibold text-[#d8e6e8]">
                  {v.name}
                </h3>
                <p className="text-sm text-[#899da0] font-medium mt-0.5">
                  {v.role} &middot; {v.period}
                </p>
                <p className="text-sm text-[#899da0] font-light leading-relaxed mt-3">
                  {v.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
