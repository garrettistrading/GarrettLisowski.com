"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, ExternalLink, MapPin } from "lucide-react";

/* ── Contact form ─────────────────────────────────────────────── */

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(
      `${message}\n\n---\nFrom: ${name}\nEmail: ${email}`
    );
    window.location.href = `mailto:Garrett@GarrettLisowski.com?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div>
        <label htmlFor="name" className="block text-xs text-[#899da0] font-medium mb-1.5">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-[#0d1e21] border border-[#2d464b] text-[#d8e6e8] text-sm font-light placeholder:text-[#899da0]/30 focus:outline-none focus:border-[#899da0]/60 focus:ring-1 focus:ring-[#899da0]/20 transition-all duration-200"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-xs text-[#899da0] font-medium mb-1.5">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-[#0d1e21] border border-[#2d464b] text-[#d8e6e8] text-sm font-light placeholder:text-[#899da0]/30 focus:outline-none focus:border-[#899da0]/60 focus:ring-1 focus:ring-[#899da0]/20 transition-all duration-200"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-xs text-[#899da0] font-medium mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-[#0d1e21] border border-[#2d464b] text-[#d8e6e8] text-sm font-light placeholder:text-[#899da0]/30 focus:outline-none focus:border-[#899da0]/60 focus:ring-1 focus:ring-[#899da0]/20 transition-all duration-200 resize-none"
          placeholder="What would you like to discuss?"
        />
      </div>
      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#d8e6e8] text-[#0d1e21] font-semibold text-sm rounded-lg hover:bg-white transition-colors duration-300"
      >
        <Send className="w-4 h-4" strokeWidth={2} />
        Send Message
      </button>
    </form>
  );
}

/* ── Contact section ──────────────────────────────────────────── */

export function Contact() {
  return (
    <section id="contact" className="py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#d8e6e8]">
              Let&rsquo;s talk.
            </h2>
            <p className="mt-4 text-base text-[#899da0] font-light leading-relaxed">
              Currently focused on Account Executive and Business Development
              roles. Always open to a good conversation.
            </p>
          </motion.div>

          {/* Contact form */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <ContactForm />
          </motion.div>

          {/* Secondary links */}
          <motion.div
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <a
              href="mailto:Garrett@GarrettLisowski.com"
              className="inline-flex items-center gap-2 text-xs text-[#899da0] hover:text-[#d8e6e8] transition-colors duration-300"
            >
              <Mail className="w-3.5 h-3.5" strokeWidth={1.5} />
              Garrett@GarrettLisowski.com
            </a>
            <span className="hidden sm:inline text-[#2d464b] text-[10px]">&#x2022;</span>
            <a
              href="https://www.linkedin.com/in/garrettlisowski/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-[#899da0] hover:text-[#d8e6e8] transition-colors duration-300"
            >
              <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
              LinkedIn
            </a>
          </motion.div>

          {/* Location */}
          <motion.div
            className="mt-6 flex items-center justify-center gap-2 text-xs text-[#899da0]/50"
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
        <div className="mt-16 pt-6 border-t border-[#2d464b]/30 text-center">
          <p className="text-xs text-[#899da0]/30 font-light">
            &copy; {new Date().getFullYear()} Garrett Lisowski
          </p>
        </div>
      </div>
    </section>
  );
}
