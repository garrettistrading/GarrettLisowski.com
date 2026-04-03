"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center py-24 lg:py-0 bg-[#14141C]"
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.06]" />

      <div className="mx-auto max-w-[1400px] px-7 sm:px-10 lg:px-14 w-full">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left — CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease }}
            className="lg:col-span-6"
          >
            <p className="text-[9px] tracking-[0.6em] uppercase text-[#7B6BFF]/50 font-mono">
              05 / Connect
            </p>
            <h2 className="mt-8 lg:mt-10 text-[clamp(2.8rem,7vw,5.5rem)] font-bold tracking-[-0.04em] text-[#F0EEE8] leading-[0.95]">
              Let&rsquo;s connect
              <span className="text-[#7B6BFF]">.</span>
            </h2>
            <p className="mt-8 max-w-[400px] text-[14px] text-[#6A6A78] leading-[1.85]">
              I&rsquo;m exploring opportunities in sales, business development,
              and strategy. If you value pipeline discipline, analytical depth,
              and relentless execution&nbsp;&mdash; I&rsquo;d like to talk.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <a
                href="mailto:Garrett@GarrettLisowski.com"
                className="group flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-[#7B6BFF]/70 hover:text-[#7B6BFF] transition-colors duration-200"
              >
                Email
                <span className="block w-5 h-px bg-[#7B6BFF]/20 transition-all duration-200 group-hover:w-10 group-hover:bg-[#7B6BFF]/40" />
              </a>
              <a
                href="https://www.linkedin.com/in/garrettlisowski"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] tracking-[0.2em] uppercase text-[#5A5A68] hover:text-[#8A8A9A] transition-colors duration-200"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-[11px] tracking-[0.2em] uppercase text-[#5A5A68] hover:text-[#8A8A9A] transition-colors duration-200"
              >
                Resume
              </a>
            </div>
          </motion.div>

          {/* Right — Details */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="lg:col-span-5 lg:col-start-8 lg:flex lg:flex-col lg:justify-end"
          >
            <div className="space-y-8">
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#2A2A36] mb-2">
                  Email
                </p>
                <a
                  href="mailto:Garrett@GarrettLisowski.com"
                  className="text-[17px] sm:text-[19px] text-[#8A8A9A] hover:text-[#F0EEE8] transition-colors duration-200 font-light tracking-[-0.01em]"
                >
                  Garrett@GarrettLisowski.com
                </a>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#2A2A36] mb-2">
                  Phone
                </p>
                <a
                  href="tel:+17164795959"
                  className="text-[17px] sm:text-[19px] text-[#8A8A9A] hover:text-[#F0EEE8] transition-colors duration-200 font-light tracking-[-0.01em]"
                >
                  +1 (716) 479-5959
                </a>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#2A2A36] mb-2">
                  Location
                </p>
                <p className="text-[17px] sm:text-[19px] text-[#5A5A68] font-light tracking-[-0.01em]">
                  Winter Park, FL
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="mx-auto max-w-[1400px] px-7 sm:px-10 lg:px-14 pb-6 pt-6 border-t border-white/[0.04]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[10px] text-[#2A2A36] font-mono">
              &copy; {new Date().getFullYear()} Garrett Lisowski
            </p>
            <div className="flex gap-8 text-[10px] text-[#2A2A36]">
              {[
                { l: "Email", h: "mailto:Garrett@GarrettLisowski.com" },
                { l: "Phone", h: "tel:+17164795959" },
                {
                  l: "LinkedIn",
                  h: "https://www.linkedin.com/in/garrettlisowski",
                },
                { l: "Resume", h: "#" },
              ].map((lk) => (
                <a
                  key={lk.l}
                  href={lk.h}
                  className="hover:text-[#5A5A68] transition-colors duration-200"
                >
                  {lk.l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
