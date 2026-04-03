"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const tech = [
  "CRM / Sales Tools (HubSpot, Odoo ERP)",
  "Bloomberg Terminal",
  "FactSet",
  "MS Excel (Pearson Certified)",
  "Python",
  "DCF Modeling",
];

const certs = [
  { n: "SIE", d: "Feb 2026" },
  { n: "HubSpot Inbound", d: "Mar 2026" },
  { n: "Inbound Sales", d: "Mar 2026" },
  { n: "Frictionless Sales", d: "Mar 2026" },
  { n: "Revenue Operations", d: "Mar 2026" },
  { n: "Sales Hub Software", d: "Mar 2026" },
];

const langs = [
  { n: "English", l: "Native" },
  { n: "Spanish", l: "Intermediate" },
];

const interests = [
  "SaaS & Cloud Technology",
  "AI / ML Applications",
  "Quant Trading Strategies",
  "CRE",
  "MMA",
  "Skiing",
  "Weightlifting",
];

export function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="toolkit"
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
            04 / Toolkit
          </p>
          <h2 className="mt-8 lg:mt-10 mb-16 lg:mb-20 text-[clamp(2rem,5vw,3.8rem)] font-bold tracking-[-0.04em] text-[#F0EEE8] leading-[1.05]">
            Skills &amp;{" "}
            <span className="text-[#5A5A68]">background</span>
            <span className="text-[#7B6BFF]">.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-y-16 gap-x-16">
          {/* Column 1: Technical + Languages + Interests */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="lg:col-span-4"
          >
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#5A5A68] mb-5">
              Technical
            </p>
            <div className="space-y-3">
              {tech.map((t) => (
                <p
                  key={t}
                  className="text-[13px] text-[#8A8A9A] pb-3 border-b border-white/[0.04]"
                >
                  {t}
                </p>
              ))}
            </div>

            <p className="text-[10px] tracking-[0.2em] uppercase text-[#5A5A68] mb-3 mt-10">
              Languages
            </p>
            <div className="space-y-2">
              {langs.map((l) => (
                <div key={l.n} className="flex justify-between text-[13px]">
                  <span className="text-[#8A8A9A]">{l.n}</span>
                  <span className="text-[#3A3A46] font-mono text-[11px]">
                    {l.l}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[10px] tracking-[0.2em] uppercase text-[#5A5A68] mb-3 mt-10">
              Interests
            </p>
            <p className="text-[12px] text-[#5A5A68] leading-relaxed">
              {interests.join(" \u00b7 ")}
            </p>
          </motion.div>

          {/* Column 2: Education + Ventures */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="lg:col-span-4"
          >
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#5A5A68] mb-5">
              Education
            </p>
            <div className="pb-6 border-b border-white/[0.04]">
              <h3 className="text-[16px] font-semibold text-[#C8C6BE]">
                University at Buffalo
              </h3>
              <p className="text-[11px] text-[#3A3A46] font-mono mt-1">
                SUNY &middot; 2018&ndash;2022
              </p>
              <p className="text-[13px] text-[#6A6A78] mt-2">
                B.A. Economics &middot; Minor International Business
              </p>
              <div className="mt-2 flex gap-5 text-[12px] font-mono">
                <span>
                  <span className="text-[#F0EEE8] font-semibold">3.78</span>{" "}
                  <span className="text-[#3A3A46]">GPA</span>
                </span>
                <span>
                  <span className="text-[#F0EEE8] font-semibold">5&times;</span>{" "}
                  <span className="text-[#3A3A46]">Dean&rsquo;s List</span>
                </span>
              </div>
            </div>

            <div className="pt-6 pb-6 border-b border-white/[0.04]">
              <h3 className="text-[16px] font-semibold text-[#C8C6BE]">
                UB Student Investors Network
              </h3>
              <p className="text-[11px] text-[#3A3A46] font-mono mt-1">
                Investment Research VP
              </p>
              <p className="text-[12px] text-[#6A6A78] mt-2 leading-relaxed">
                Sector analysis across 8+ industries, simulated portfolio
                outperforming S&amp;P 500 by 12%.
              </p>
            </div>

            <div className="pt-6">
              <h3 className="text-[16px] font-semibold text-[#C8C6BE]">
                EdgeFinder
              </h3>
              <p className="text-[11px] text-[#3A3A46] font-mono mt-1">
                Co-Founder &amp; Developer &middot; 2024&ndash;Present
              </p>
              <p className="text-[12px] text-[#6A6A78] mt-2 leading-relaxed">
                Retail trading analytics platform processing 10+ years of data
                across 500+ equities. 72% backtested win rate.
              </p>
            </div>
          </motion.div>

          {/* Column 3: Certifications */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="lg:col-span-4"
          >
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#5A5A68] mb-5">
              Certifications
            </p>
            {certs.map((c) => (
              <div
                key={c.n}
                className="flex items-center justify-between py-4 border-b border-white/[0.04]"
              >
                <span className="text-[14px] text-[#8A8A9A]">{c.n}</span>
                <span className="text-[11px] font-mono text-[#3A3A46]">
                  {c.d}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
