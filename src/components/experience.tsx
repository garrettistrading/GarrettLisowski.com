"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const roles = [
  {
    co: "Ingram Micro",
    ti: "Account Executive",
    loc: "Buffalo, NY",
    dt: "2025\u20132026",
    hi: "150+ Accounts \u00b7 $300K Quota",
    b: [
      "Owned the full sales cycle across a portfolio of 150+ commercial and enterprise accounts against a $300K quota, building trusted relationships with key decision-makers to identify needs and drive SaaS and software solution adoption.",
      "Managed pipeline systematically and forecasted revenue on a monthly and quarterly basis, reconciling projections against actuals to deliver accurate sales reporting to leadership.",
      "Collaborated cross-functionally with partner managers, solution engineers, and operations teams to streamline the sales process, reducing billing discrepancies and accelerating deal velocity through data-driven account planning.",
    ],
  },
  {
    co: "Odoo",
    ti: "Business Development Representative",
    loc: "Buffalo, NY",
    dt: "2025",
    hi: "$240K Pipeline \u00b7 25% Growth",
    b: [
      "Generated $240K in pipeline by prospecting and nurturing 20+ commercial and enterprise accounts within Odoo\u2019s SaaS platform, executing high-velocity outreach and growing revenue per account by 25% through consultative upselling.",
      "Conducted 30+ screen-share demos per quarter at a 7% close rate, communicating business value of software solutions to key stakeholders and driving a 90% client satisfaction rate while reducing churn risk.",
      "Partnered cross-functionally with implementation and product teams to engineer custom onboarding configurations, cutting time-to-value by 15%.",
    ],
  },
  {
    co: "Tyler Cole Agency",
    ti: "Financial Analyst",
    loc: "Remote",
    dt: "2024\u20132025",
    hi: "80% YoY Gains",
    b: [
      "Built time-series trend models across equities, fixed income, digital commodities, and physical commodities to support investment decision-making and deliver actionable insights.",
      "Co-developed a back-tested trading strategy for gold, oil, and Bitcoin that generated 80% YoY gains across two full liquidity cycles.",
      "Delivered weekly 1:1 data briefings to the agency founder covering model outputs, market positioning, and strategic observations.",
    ],
  },
  {
    co: "B&H Polymers",
    ti: "Sales Executive",
    loc: "Remote",
    dt: "2022\u20132023",
    hi: "$500K+ Revenue \u00b7 97% A/R",
    b: [
      "Drove over $500K in revenue within 12 months by managing the full sales cycle \u2014 prospecting, delivering consultative product presentations, and closing new business while retaining and expanding existing accounts.",
      "Managed all NAMER accounts end-to-end, negotiating pricing with airline and logistics partners, preparing competitive quote bids, and analyzing trade files to surface high-value opportunities.",
      "Improved accounts receivable efficiency by 97% and oversaw P&L reporting, customer invoicing, and export customs clearance for international markets.",
    ],
  },
  {
    co: "SFIN Media",
    ti: "Co-Founder",
    loc: "Remote",
    dt: "2019\u20132022",
    hi: "35% CAC Reduction",
    b: [
      "Co-founded digital marketing agency, generating 30% more inbound leads through optimized conversion funnels and creative outreach strategies.",
      "Built end-to-end CRM automation that cut lead response time from 24 hours to 5 minutes, increasing close rates by 10%.",
      "Reduced client customer acquisition cost by 35% via precise audience segmentation and targeted ad refinements.",
    ],
  },
];

function Row({ r, i }: { r: (typeof roles)[0]; i: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.7, delay: i * 0.06, ease }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left group border-t border-white/[0.06] hover:border-white/[0.1] transition-colors duration-200"
      >
        <div className="py-5 lg:py-6 grid grid-cols-12 items-baseline gap-x-4">
          <span className="col-span-1 hidden lg:block text-[10px] font-mono text-[#2A2A36]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="col-span-12 sm:col-span-4 lg:col-span-3">
            <h3 className="text-[clamp(1rem,2vw,1.35rem)] font-semibold tracking-[-0.02em] text-[#C8C6BE] group-hover:text-[#7B6BFF] transition-colors duration-200">
              {r.co}
            </h3>
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-3 mt-1 sm:mt-0">
            <p className="text-[12px] text-[#5A5A68]">{r.ti}</p>
            <p className="text-[10px] font-mono text-[#7B6BFF]/30 mt-0.5 group-hover:text-[#7B6BFF]/50 transition-colors duration-200">
              {r.hi}
            </p>
          </div>
          <div className="col-span-5 sm:col-span-3 lg:col-span-3 text-right mt-1 sm:mt-0">
            <span className="text-[11px] font-mono text-[#3A3A46]">{r.dt}</span>
          </div>
          <div className="col-span-1 hidden lg:flex justify-end">
            <span
              className={`text-[14px] text-[#3A3A46] group-hover:text-[#7B6BFF]/50 transition-all duration-200 ${
                open ? "rotate-45" : ""
              }`}
            >
              +
            </span>
          </div>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden"
          >
            <div className="pb-7 lg:pl-[8.333%]">
              <ul className="max-w-2xl space-y-4">
                {r.b.map((b, j) => (
                  <li
                    key={j}
                    className="text-[13px] text-[#6A6A78] leading-[1.85] pl-4 relative before:absolute before:left-0 before:top-[10px] before:w-1.5 before:h-px before:bg-[#7B6BFF]/20"
                  >
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[10px] text-[#2A2A36] font-mono">{r.loc}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="experience"
      ref={ref}
      className="relative min-h-screen py-24 lg:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-7 sm:px-10 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease }}
        >
          <p className="text-[9px] tracking-[0.6em] uppercase text-[#7B6BFF]/50 font-mono">
            02 / Experience
          </p>
          <h2 className="mt-8 lg:mt-10 mb-14 lg:mb-16 text-[clamp(2rem,5vw,3.8rem)] font-bold tracking-[-0.04em] text-[#F0EEE8] leading-[1.05]">
            Where I&rsquo;ve{" "}
            <span className="text-[#5A5A68]">delivered</span>
            <span className="text-[#7B6BFF]">.</span>
          </h2>
        </motion.div>
        <div>
          {roles.map((r, i) => (
            <Row key={r.co} r={r} i={i} />
          ))}
          <div className="border-t border-white/[0.06]" />
        </div>
      </div>
    </section>
  );
}
