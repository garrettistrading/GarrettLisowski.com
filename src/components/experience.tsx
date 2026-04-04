"use client";

import { motion } from "framer-motion";

/* ── Bullet renderer (parses **bold** markers) ────────────────── */

function Bullet({ text }: { text: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <li className="text-sm text-[#899da0] font-light leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#2d464b]">
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-white font-medium">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </li>
  );
}

/* ── Data ─────────────────────────────────────────────────────── */

const jobs = [
  {
    company: "Ingram Micro",
    role: "Account Executive",
    location: "Buffalo, NY",
    dates: "Aug 2025 \u2013 Mar 2026",
    bullets: [
      "Owned full sales cycle across **150+ commercial and enterprise accounts** against a **$300K quota**",
      "Built trusted relationships with decision-makers to drive SaaS and software solution adoption",
      "Managed pipeline and forecasted revenue monthly/quarterly, reconciling projections vs. actuals",
      "Collaborated cross-functionally with partner managers, solution engineers, and ops to accelerate deal velocity",
    ],
  },
  {
    company: "Odoo",
    role: "Business Development Representative",
    location: "Buffalo, NY",
    dates: "Mar 2025 \u2013 Jun 2025",
    bullets: [
      "Generated **$240K in pipeline** across **20+ commercial/enterprise** SaaS accounts",
      "Executed high-velocity outreach: **40\u201380 calls** and **50\u2013100 emails** daily",
      "Conducted **30+ demos/quarter** at **7% close rate** with **90% client satisfaction**",
      "Grew revenue per account by **25%** through consultative upselling",
      "Cut client time-to-value by **15%** through custom onboarding configurations",
    ],
  },
  {
    company: "Tyler Cole Agency",
    role: "Financial Analyst",
    location: "Remote",
    dates: "Aug 2024 \u2013 Apr 2025",
    bullets: [
      "Built time-series trend models across equities, fixed income, and commodities",
      "Co-developed a back-tested strategy for gold, oil, and Bitcoin \u2014 **80% YoY gains** across two liquidity cycles",
      "Delivered weekly 1:1 data briefings to the agency founder on market positioning and strategy",
    ],
  },
  {
    company: "B&H Polymers Inc.",
    role: "Sales Executive",
    location: "Remote",
    dates: "May 2022 \u2013 Jul 2023",
    bullets: [
      "Drove **$500K+ in revenue** within 12 months via full-cycle sales: prospecting, presentations, closing, and account expansion",
      "Managed all NAMER accounts end-to-end \u2014 negotiation, quoting, trade analysis",
      "Improved AR efficiency by **97%**; oversaw P&L, invoicing, and international export compliance",
    ],
  },
  {
    company: "SFIN Media",
    role: "Co-Founder",
    location: "Remote",
    dates: "May 2019 \u2013 Aug 2022",
    bullets: [
      "Co-founded digital marketing agency; generated **30% more inbound leads** through optimized conversion funnels",
      "Built CRM automation cutting lead response time from **24 hours to 5 minutes** (+10% close rate)",
      "Reduced client CAC by **35%** through audience segmentation and ad strategy",
    ],
  },
];

/* ── Experience section ───────────────────────────────────────── */

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-medium text-[#899da0] tracking-[0.2em] uppercase mb-3">
            Career
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#d8e6e8]">
            Where I&rsquo;ve delivered.
          </h2>
        </motion.div>

        <div className="mt-16 relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-[200px] top-0 bottom-0 w-px bg-[#2d464b]/50 hidden md:block" />

          <div className="space-y-12 md:space-y-16">
            {jobs.map((job, i) => (
              <motion.div
                key={i}
                className="relative md:grid md:grid-cols-[200px_1fr] md:gap-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-[200px] top-1 w-2.5 h-2.5 -translate-x-[5px] rounded-full bg-[#2d464b] border-2 border-[#0d1e21]" />

                {/* Date column */}
                <div className="mb-4 md:mb-0 md:text-right md:pr-4">
                  <div className="text-xs text-[#899da0] font-medium tracking-wide">
                    {job.dates}
                  </div>
                  <div className="text-xs text-[#899da0]/40 font-light mt-0.5">
                    {job.location}
                  </div>
                </div>

                {/* Details column */}
                <div className="md:pl-8">
                  <h3 className="text-lg font-semibold text-[#d8e6e8]">
                    {job.company}
                  </h3>
                  <p className="text-sm text-[#899da0] font-medium mt-0.5">
                    {job.role}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {job.bullets.map((bullet, j) => (
                      <Bullet key={j} text={bullet} />
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
