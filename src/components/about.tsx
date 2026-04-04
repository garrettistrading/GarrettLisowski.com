"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Swords,
  Mountain,
  Dumbbell,
  TrendingUp,
  Brain,
  Building2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

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

const interests: { label: string; icon: LucideIcon }[] = [
  { label: "MMA", icon: Swords },
  { label: "Skiing", icon: Mountain },
  { label: "Weightlifting", icon: Dumbbell },
  { label: "Quant Trading", icon: TrendingUp },
  { label: "AI / ML", icon: Brain },
  { label: "Commercial Real Estate", icon: Building2 },
];

/* ── About section ────────────────────────────────────────────── */

export function About() {
  return (
    <section id="about" className="py-14 md:py-20">
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
          className="mt-8 text-base md:text-lg text-[#899da0] font-light leading-relaxed max-w-3xl"
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
          className="mt-6 flex items-start gap-4 p-5 rounded-xl border border-[#2d464b]/40 bg-[#2d464b]/10 max-w-3xl"
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
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {principles.map((p, i) => (
            <motion.div
              key={i}
              className="p-5 rounded-xl border border-[#2d464b]/40 bg-[#0d1e21]"
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

        {/* Interests — icon pill cards */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-xs text-[#899da0]/40 font-medium uppercase tracking-[0.2em] mb-4">
            Off the clock
          </p>
          <div className="flex flex-wrap gap-3">
            {interests.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#2d464b]/50 bg-[#2d464b]/10 hover:border-[#899da0]/30 hover:bg-[#2d464b]/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.25 + i * 0.06 }}
                >
                  <Icon className="w-3.5 h-3.5 text-[#899da0]" strokeWidth={1.5} />
                  <span className="text-xs text-[#899da0] font-medium">
                    {item.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
