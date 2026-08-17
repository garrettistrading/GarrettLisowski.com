import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://garrettlisowski.com"),
  title: {
    default: "Garrett Lisowski | Financial Analyst",
    template: "%s | Garrett Lisowski",
  },
  description:
    "Garrett Lisowski builds financial models, analyzes markets, and translates complex data into clear investment and operating decisions.",
  openGraph: {
    title: "Garrett Lisowski | Financial Analyst",
    description:
      "Financial modeling, investment research, portfolio analytics, forecasting, and reporting.",
    type: "website",
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
