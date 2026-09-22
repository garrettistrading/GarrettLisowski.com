import type { Metadata } from "next";
import "./globals.css";
import "./professional.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.garrettlisowski.com"),
  title: {
    default: "Garrett Lisowski | Sales, Research & Products",
    template: "%s | Garrett Lisowski",
  },
  description:
    "Explore Garrett Lisowski’s commercial experience, financial research, and Sales Lab training workspace.",
  authors: [{ name: "Garrett Lisowski", url: "https://www.garrettlisowski.com/" }],
  creator: "Garrett Lisowski",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Garrett Lisowski | Sales, Research & Products",
    description:
      "Commercial experience, financial research, and practical tools by Garrett Lisowski.",
    type: "website",
    url: "/",
    siteName: "Garrett Lisowski",
  },
  twitter: {
    card: "summary_large_image",
    title: "Garrett Lisowski | Sales, Research & Products",
    description: "Commercial experience, financial research, and practical tools by Garrett Lisowski.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
