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
          <h1>Hi! I’m Garrett Lisowski. I’m interested in financial markets, business, and building useful things.</h1>
          <p>My background connects sales and financial analysis. I’ve worked on pricing models, investment research, and customer conversations. I like understanding how a business works, then finding a practical way to make it better.</p>
          <section>
            <h2>on a higher level, I like to</h2>
            <ul>
              <li>make sense of complicated questions</li>
              <li>study markets and the decisions behind them</li>
              <li>connect analytical thinking with real conversations</li>
              <li>turn an idea into something I can actually use</li>
            </ul>
          </section>
          <section id="work">
            <h2>what I’m building</h2>
            <p><Link href="/sales-lab">Sales Lab</Link> is a workspace I built for practicing buyer conversations, reviewing calls, and creating custom scorecards.</p>
            <p>I’ve also built research tools for comparing market signals, studying relative strength, and understanding how a hedge tracks a changing liability. You can explore them in my <Link href="/work">portfolio</Link>.</p>
          </section>
          <section id="experience">
            <h2>a little background</h2>
            <p>I’ve worked as an Account Executive at Ingram Micro and Odoo, and as a Financial Analyst at b+h Polymers and Tyler Cole Agency.</p>
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
