"use client";

import { motion } from "framer-motion";
import { Target, BarChart3, Wrench } from "lucide-react";

/* ── Data ─────────────────────────────────────────────────────── */

const cards = [
  {
    icon: Target,
    title: "Full-Cycle Sales Execution",
    body: "I don\u2019t hand off deals\u00a0\u2014\u00a0I own them. From cold outreach and pipeline generation through demos, negotiation, and close. I\u2019ve managed 150+ accounts, hit quota, and built revenue across SaaS, manufacturing, and services.",
  },
  {
    icon: BarChart3,
    title: "Analytical Rigor",
    body: "Economics degree. Bloomberg Terminal. FactSet. Python. DCF modeling. I bring a quantitative lens to pipeline management, forecasting, and strategic account planning\u00a0\u2014\u00a0not just intuition.",
  },
  {
    icon: Wrench,
    title: "Builder Mentality",
    body: "I\u2019ve co-founded two companies, built CRM automations from scratch, created analytics platforms, and optimized conversion funnels. I understand how revenue systems work because I\u2019ve built them.",
  },
];

/* ── Positioning section ──────────────────────────────────────── */

export function Positioning() {
  return (
    <section className="py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-medium text-[#899da0] tracking-[0.2em] uppercase mb-3">
            What Sets Me Apart
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#d8e6e8]">
            Built different.
          </h2>
        </motion.div>

        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                className="group p-7 rounded-xl border border-[#2d464b]/50 bg-[#0d1e21] hover:border-[#899da0]/30 hover:bg-[#122a2e] transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <Icon
                  className="w-6 h-6 text-[#899da0] group-hover:text-[#d8e6e8] transition-colors duration-300 mb-4"
                  strokeWidth={1.5}
                />
                <h3 className="text-lg font-semibold text-[#d8e6e8] mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-[#899da0] leading-relaxed font-light">
                  {card.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
