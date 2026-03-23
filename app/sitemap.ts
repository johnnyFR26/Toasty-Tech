import type { MetadataRoute } from "next"
import { mockMembers } from "@/lib/mock-members"

const baseUrl = "https://toastytech.com.br"

export default function sitemap(): MetadataRoute.Sitemap {
  // Páginas estáticas principais
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ]

  // Páginas dinâmicas de membros
  const memberPages: MetadataRoute.Sitemap = mockMembers.map((member) => ({
    url: `${baseUrl}/member/${member.uuid}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [...staticPages, ...memberPages]
}
