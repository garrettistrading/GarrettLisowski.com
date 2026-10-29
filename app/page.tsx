import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { profile } from "@/lib/portfolio";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.site} id="top">
      <a className="skip-link" href="#content">Skip to content</a>
      <Navigation />
      <main className={styles.about} id="content">
        <div className={styles.copy}>
          <h1>Hi! I’m Garrett Lisowski. I’m interested in financial decisions, the people making them, and how to make complicated questions easier to understand.</h1>
          <p>My background connects client-facing sales and financial analysis. I’ve worked on pricing models, investment research, and customer conversations. I enjoy asking the right questions, working through the details, and explaining what those details mean for the decision at hand.</p>
          <section>
            <h2>on a higher level, I like to</h2>
            <ul>
              <li>understand what someone is trying to accomplish</li>
              <li>explain financial tradeoffs in plain language</li>
              <li>check the assumptions and details behind an answer</li>
              <li>turn research into something useful and easy to follow</li>
            </ul>
          </section>
          <section id="work">
            <h2>what I’m building</h2>
            <p><Link href="/retirement-lab">Retirement Lab</Link> explores how savings habits, Social Security timing, and withdrawals affect a retirement scenario. It makes the assumptions visible so the numbers can lead to a better understanding of the tradeoffs.</p>
            <p><Link href="/sales-lab">Sales Lab</Link> brings structure to conversation practice: working through fictional buyer scenarios, reviewing transcripts, and using scorecards to identify what to improve.</p>
            <p>My financial modeling and research projects explore another part of the same work: organizing evidence, tracing calculations, and checking where an answer could go wrong. You can explore the examples in my <Link href="/work">portfolio</Link>.</p>
          </section>
          <section id="experience">
            <h2>a little background</h2>
            <p>I’ve worked as an Account Executive at Ingram Micro and Odoo, and as a Financial Analyst at b+h Polymers and Tyler Cole Agency. That experience spans customer discovery, pricing and forecasting, and investment research.</p>
            <p id="background">I studied Economics at the University at Buffalo, with a minor in International Business, and served as Investment Research Vice-President of the Student Investors Network. <Link href="/experience">More about my experience</Link>.</p>
          </section>
          <section id="contact">
            <h2>let’s connect</h2>
            <ul>
              <li>email me at <a href={`mailto:${profile.email}`}>{profile.email}</a></li>
              <li>take a look at my <Link href="/work">projects and research</Link></li>
            </ul>
            <p>I’m based in {profile.location}. Feel free to reach out.</p>
          </section>
        </div>
        <figure className={styles.portrait}>
          <Image src="/assets/garrett-lisowski-headshot-portrait.webp" alt="Garrett Lisowski" width={1254} height={1254} priority sizes="(max-width: 700px) 180px, 252px" />
          <figcaption>Winter Park, Florida</figcaption>
        </figure>
      </main>
    </div>
  );
}
