import type { MetadataRoute } from "next";
import { projects } from "@/lib/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.garrettlisowski.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    { url: `${baseUrl}/sales-lab`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/work`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/experience`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    ...["/retirement-lab", "/retirement-lab/savings-growth", "/retirement-lab/social-security", "/retirement-lab/income-sequencer", "/retirement-lab/methodology", "/work/retirement-lab"].map(path => ({ url: `${baseUrl}${path}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...projects.map((project) => ({
      url: `${baseUrl}/work/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
