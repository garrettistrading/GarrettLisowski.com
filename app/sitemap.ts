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
    ...projects.map((project) => ({
      url: `${baseUrl}/work/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
