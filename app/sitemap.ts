import type { MetadataRoute } from "next"

import { getAllPosts } from "@/lib/blog"
import { siteUrl } from "@/lib/site"

export const dynamic = "force-static"

const staticPaths = [
  "",
  "about/",
  "blog/",
  "contact/",
  "faq/",
  "reports/",
  "sample/",
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${siteUrl}/${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "reports/" ? 0.9 : 0.7,
  }))

  const posts = getAllPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}/`,
    lastModified: post.date ? new Date(post.date) : lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticEntries, ...posts]
}
