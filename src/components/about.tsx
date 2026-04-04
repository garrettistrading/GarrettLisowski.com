"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

/* ── Data ─────────────────────────────────────────────────────── */

const principles = [
  {
    title: "Own the outcome",
    body: "I don\u2019t wait to be told what to do.",
  },
  {
    title: "Measure everything",
    body: "Intuition is good; data is better.",
  },
  {
    title: "Build, don\u2019t just sell",
    body: "I create systems, not just transactions.",
  },
  {
    title: "Stay hungry",
    body: "I compete with yesterday\u2019s version of myself.",
  },
];

const interests = [
  "MMA",
  "Skiing",
  "Weightlifting",
  "Quant Trading",
  "AI/ML",
  "Commercial Real Estate",
];

/* ── About section ────────────────────────────────────────────── */

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-medium text-[#899da0] tracking-[0.2em] uppercase mb-3">
            Who I Am
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#d8e6e8]">
            The short version.
          </h2>
        </motion.div>

        {/* Prose */}
        <motion.p
          className="mt-10 text-base md:text-lg text-[#899da0] font-light leading-relaxed max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          I combine a sales operator&rsquo;s intensity with an analyst&rsquo;s
          discipline. I&rsquo;ve sold, built, modeled, and founded&nbsp;&mdash;
          across SaaS, manufacturing, and financial services. Revenue isn&rsquo;t
          a mystery to me; it&rsquo;s a system. Pipeline in, value delivered,
          iterate, improve. Economics-trained thinking applied to commercial
          problems, with the ownership and output to match.
        </motion.p>

        {/* Education callout */}
        <motion.div
          className="mt-8 flex items-start gap-4 p-6 rounded-xl border border-[#2d464b]/40 bg-[#2d464b]/10 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <GraduationCap
            className="w-5 h-5 text-[#899da0] mt-0.5 shrink-0"
            strokeWidth={1.5}
          />
          <div>
            <p className="text-sm font-medium text-[#d8e6e8]">
              University at Buffalo
            </p>
            <p className="text-xs text-[#899da0] font-light mt-0.5">
              B.A. Economics &middot; Minor International Business &middot; 3.78
              GPA &middot; Dean&rsquo;s List 5 consecutive semesters
            </p>
          </div>
        </motion.div>

        {/* Operating principles */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {principles.map((p, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-xl border border-[#2d464b]/40 bg-[#0d1e21]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
            >
              <h4 className="text-sm font-semibold text-[#d8e6e8]">
                &ldquo;{p.title}&rdquo;
              </h4>
              <p className="text-xs text-[#899da0] font-light mt-2 leading-relaxed">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Interests */}
        <motion.div
          className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="text-xs text-[#899da0]/40 font-medium uppercase tracking-wider mr-2">
            Off the clock
          </span>
          {interests.map((item, i) => (
            <span key={i} className="flex items-center gap-4">
              <span className="text-xs text-[#899da0]/50 font-light">
                {item}
              </span>
              {i < interests.length - 1 && (
                <span className="text-[#2d464b] text-[8px]">&#x2022;</span>
              )}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
