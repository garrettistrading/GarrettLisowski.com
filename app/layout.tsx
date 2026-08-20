import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.garrettlisowski.com"),
  title: {
    default: "Garrett Lisowski | Financial Analyst",
    template: "%s | Garrett Lisowski",
  },
  description:
    "Financial analyst Garrett Lisowski shares his experience, market research, and financial modeling work.",
  authors: [{ name: "Garrett Lisowski", url: "https://www.garrettlisowski.com/" }],
  creator: "Garrett Lisowski",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Garrett Lisowski | Financial Analyst",
    description:
      "Financial analyst focused on modeling, investment research, forecasting, and reporting.",
    type: "website",
    url: "/",
    siteName: "Garrett Lisowski",
  },
  twitter: {
    card: "summary_large_image",
    title: "Garrett Lisowski | Financial Analyst",
    description: "Financial analyst focused on modeling, investment research, forecasting, and reporting.",
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
