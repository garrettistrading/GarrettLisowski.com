import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Wins } from "@/components/wins";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Nav />

      {/* Subtle grain texture */}
      <div
        className="fixed inset-0 z-30 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence baseFrequency=\'.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }}
      />

      <main
        id="scroll-container"
        className="relative z-10 h-screen overflow-y-auto bg-gradient-to-b from-[#0D0D10] to-[#12121A]"
      >
        <Hero />
        <About />
        <Experience />
        <Wins />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
