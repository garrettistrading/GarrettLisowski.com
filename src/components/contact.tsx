"use client";

import { motion } from "framer-motion";
import { Mail, Phone, ExternalLink, MapPin } from "lucide-react";

/* ── Contact section ──────────────────────────────────────────── */

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#d8e6e8]">
              Let&rsquo;s talk.
            </h2>
            <p className="mt-5 text-base text-[#899da0] font-light leading-relaxed">
              Currently focused on Account Executive and Business Development
              roles. Always open to a good conversation.
            </p>
          </motion.div>

          {/* Contact actions */}
          <motion.div
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <a
              href="mailto:Garrett@GarrettLisowski.com"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#d8e6e8] text-[#0d1e21] font-semibold text-sm rounded-lg hover:bg-white transition-colors duration-300"
            >
              <Mail className="w-4 h-4" strokeWidth={2} />
              Email Me
            </a>
            <a
              href="tel:+17164795959"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 border border-[#2d464b] text-[#d8e6e8] font-medium text-sm rounded-lg hover:border-[#899da0]/60 hover:bg-[#2d464b]/20 transition-all duration-300"
            >
              <Phone className="w-4 h-4" strokeWidth={2} />
              (716) 479-5959
            </a>
            <a
              href="https://www.linkedin.com/in/garrettlisowski/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 border border-[#2d464b] text-[#d8e6e8] font-medium text-sm rounded-lg hover:border-[#899da0]/60 hover:bg-[#2d464b]/20 transition-all duration-300"
            >
              <ExternalLink className="w-4 h-4" strokeWidth={2} />
              LinkedIn
            </a>
          </motion.div>

          {/* Location */}
          <motion.div
            className="mt-10 flex items-center justify-center gap-2 text-xs text-[#899da0]/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <MapPin className="w-3 h-3" strokeWidth={1.5} />
            <span className="font-light">Winter Park, FL</span>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-[#2d464b]/30 text-center">
          <p className="text-xs text-[#899da0]/30 font-light">
            &copy; {new Date().getFullYear()} Garrett Lisowski
          </p>
        </div>
      </div>
    </section>
  );
}
