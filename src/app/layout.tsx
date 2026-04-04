import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Garrett Lisowski — Sales Execution Meets Analytical Precision",
  description:
    "Account Executive with a track record across SaaS, manufacturing, and financial services. Full-cycle sales execution with an economics-trained, data-driven approach to growth.",
  openGraph: {
    title: "Garrett Lisowski",
    description: "I turn pipeline into revenue.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} dark antialiased`}>
      <body className="bg-[#0d1e21] text-[#d8e6e8]">{children}</body>
    </html>
  );
}
