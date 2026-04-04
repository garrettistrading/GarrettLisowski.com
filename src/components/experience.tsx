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
      "Owned the full sales cycle across a portfolio of **150+ commercial and enterprise accounts** against a **$300K quota**, building trusted relationships with key decision-makers to identify needs and drive SaaS and software solution adoption",
      "Managed pipeline systematically and forecasted revenue on a monthly and quarterly basis, reconciling projections against actuals to deliver accurate sales reporting to leadership",
      "Collaborated cross-functionally with partner managers, solution engineers, and operations teams to streamline the sales process, reducing billing discrepancies and accelerating deal velocity through data-driven account planning",
    ],
  },
  {
    company: "Odoo",
    role: "Business Development Representative",
    location: "Buffalo, NY",
    dates: "Mar 2025 \u2013 Jun 2025",
    bullets: [
      "Generated **$240K in pipeline** by prospecting and nurturing **20+ commercial and enterprise accounts** within Odoo\u2019s SaaS platform, executing high-velocity outreach (**40\u201380 calls, 50\u2013100 emails daily**) and growing revenue per account by **25%** through consultative upselling",
      "Conducted **30+ screen-share demos per quarter** at a **7% close rate**, communicating business value of software solutions to key stakeholders and driving a **90% client satisfaction** rate while reducing churn risk",
      "Partnered cross-functionally with implementation and product teams to engineer custom onboarding configurations, cutting time-to-value by **15%** and ensuring clients realized ROI faster post-close",
    ],
  },
  {
    company: "Tyler Cole Agency",
    role: "Financial Analyst",
    location: "Remote",
    dates: "Aug 2024 \u2013 Apr 2025",
    bullets: [
      "Built time-series trend models across equities, fixed income, digital commodities, and physical commodities to support investment decision-making and deliver actionable insights to key stakeholders",
      "Co-developed a back-tested trading strategy for gold, oil, and Bitcoin that generated **80% YoY gains** across two full liquidity cycles; leveraged data analytics to identify market opportunities and communicate findings to senior leadership",
      "Delivered weekly 1:1 data briefings to the agency founder covering model outputs, market positioning, and strategic observations",
    ],
  },
  {
    company: "B&H Polymers Inc.",
    role: "Sales Executive",
    location: "Remote",
    dates: "May 2022 \u2013 Jul 2023",
    bullets: [
      "Drove over **$500K in revenue** within 12 months by managing the full sales cycle \u2014 prospecting via outbound calls, delivering consultative product presentations, and closing new business while retaining and expanding existing accounts",
      "Managed all NAMER accounts end-to-end, negotiating pricing with airline and logistics partners, preparing competitive quote bids, and analyzing trade files to surface high-value opportunities across the region",
      "Improved accounts receivable efficiency by **97%** and oversaw P&L reporting, customer invoicing, and export customs clearance for grade A/B materials across international markets",
    ],
  },
  {
    company: "SFIN Media",
    role: "Co-Founder & Software Developer",
    location: "Remote",
    dates: "May 2019 \u2013 Aug 2022",
    bullets: [
      "Co-founded digital marketing agency and hunted for new business, generating **30% more inbound leads** through optimized conversion funnels and creative outreach strategies",
      "Built end-to-end CRM automation that cut lead response time from **24 hours to 5 minutes**, increasing close rates by **10%**",
      "Reduced client customer acquisition cost by **35%** via precise audience segmentation and targeted ad refinements",
    ],
  },
];

/* ── Experience section ───────────────────────────────────────── */

export function Experience() {
  return (
    <section id="experience" className="py-14 md:py-20">
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

        <div className="mt-10 relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-[200px] top-0 bottom-0 w-px bg-[#2d464b]/50 hidden md:block" />

          <div className="space-y-8 md:space-y-10">
            {jobs.map((job, i) => (
              <motion.div
                key={i}
                className="relative md:grid md:grid-cols-[200px_1fr] md:gap-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-[200px] top-1 w-2.5 h-2.5 -translate-x-[5px] rounded-full bg-[#2d464b] border-2 border-[#0d1e21]" />

                {/* Date column */}
                <div className="mb-3 md:mb-0 md:text-right md:pr-4">
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
                  <ul className="mt-3 space-y-2">
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
