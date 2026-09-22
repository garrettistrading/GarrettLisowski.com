import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Waveform, ChatCircleText, SlidersHorizontal, ChartLineUp } from "@phosphor-icons/react/dist/ssr";
import { ProjectNavigation } from "@/components/ProjectNavigation";

export const metadata: Metadata = {
  title: { absolute: "Sales Lab — Practice. Review. Improve." },
  description: "Practice buyer conversations, review transcripts, and build a repeatable sales training routine. Try Sales Lab’s guided public demo.",
  alternates: { canonical: "/sales-lab" },
  openGraph: { title: "Sales Lab — Practice. Review. Improve.", description: "A workspace for deliberate sales practice.", url: "/sales-lab", images: [{ url: "/assets/sales-lab-workspace-v2.webp", width: 1425, height: 990 }] },
};

export default function SalesLabPage() {
  return <main className="product-page" id="top">
    <a className="skip-link" href="#product-content">Skip to content</a>
    <ProjectNavigation name="Sales Lab" sales />
    <div id="product-content">
      <section className="product-hero">
        <p className="eyebrow-label"><Waveform size={18} /> A workspace for deliberate sales practice</p>
        <h1>Make your next<br />conversation better.</h1>
        <p className="product-lead">Practice the difficult questions. Review what you missed. Build a routine around the skills that move a conversation forward.</p>
        <div className="product-actions"><Link className="outline-action" href="/sales-lab/app">Try guided practice <ArrowUpRight size={19} /></Link><Link className="underlined-action" href="/sales-lab/app?demo=review">View a sample review <ArrowUpRight size={18} /></Link></div>
        <p className="product-demo-note">Guided public demo · No account required</p>
      </section>
      <figure className="product-screen">
        <div className="screen-label"><span>Sales Lab / Practice studio</span><span>Real workspace</span></div>
        <Link href="/sales-lab/app" aria-label="Explore the Sales Lab workspace"><Image src="/assets/sales-lab-workspace-v2.webp" width={1425} height={990} priority alt="Sales Lab workspace with buyer scenarios, roleplay, and call reviews" sizes="(max-width: 760px) 95vw, 1100px" /></Link>
        <figcaption>Six fictional buyer scenarios. One place to practice, review, and plan your next session.</figcaption>
      </figure>
      <section className="product-section" id="how-it-works">
        <div className="product-section-intro"><p className="eyebrow-label">The practice loop</p><h2>A useful habit,<br />one conversation at a time.</h2></div>
        <div className="practice-steps">
          <article><span>01</span><div><h3>Choose the conversation</h3><p>Start with a fictional buyer and a specific challenge, from discovery to objection handling.</p></div></article>
          <article><span>02</span><div><h3>Review the exchange</h3><p>Read the transcript alongside a scorecard. The guided demo uses transparent checklist criteria.</p></div></article>
          <article><span>03</span><div><h3>Give the next session a purpose</h3><p>Keep notes, revisit past practice, and assign yourself a focused training exercise.</p></div></article>
        </div>
      </section>
      <section className="product-section capabilities" id="capabilities">
        <div className="product-section-intro"><p className="eyebrow-label">Inside the workspace</p><h2>From practice<br />to a clearer next step.</h2><Link className="underlined-action" href="/sales-lab/app">Explore the workspace <ArrowUpRight size={18} /></Link></div>
        <div className="capability-list">
          <article><Waveform size={25} /><h3>Buyer roleplay</h3><p>Practice in guided text mode. Connected AI text and voice modes require a configured service.</p></article>
          <article><ChatCircleText size={25} /><h3>Call review</h3><p>Bring a transcript or explore a sample. See the conversation next to the coaching criteria.</p></article>
          <article><SlidersHorizontal size={25} /><h3>Your own scorecards</h3><p>Define the behaviors you want to practice and the weights used to assess them.</p></article>
          <article><ChartLineUp size={25} /><h3>Progress and training</h3><p>Save sessions in this browser, compare practice results, and keep a personal training plan.</p></article>
        </div>
      </section>
      <section className="product-demo" id="demo"><div><p className="eyebrow-label">Try it for yourself</p><h2>Start with one conversation.</h2><p>The public demo includes guided practice, sample reviews, and local workspace saving. Connected AI features need service configuration. Demo scores are practice feedback, not validated measures of sales performance.</p></div><Link className="outline-action" href="/sales-lab/app">Open Sales Lab <ArrowUpRight size={19} /></Link></section>
    </div>
    <footer className="product-footer"><Link href="/sales-lab">Sales Lab</Link><span>Designed and built by <Link href="/">Garrett Lisowski</Link></span><Link href="/work">Explore all work <ArrowUpRight size={16} /></Link></footer>
  </main>;
}
