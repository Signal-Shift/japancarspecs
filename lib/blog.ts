import fs from "fs"
import path from "path"
import matter from "gray-matter"

const contentDirectory = path.join(process.cwd(), "content/blog")

export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
}

export interface BlogPost extends BlogPostMeta {
  content: string
}

function getMarkdownSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return []
  }
  return fs
    .readdirSync(contentDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
}

export function getAllPosts(): BlogPostMeta[] {
  const slugs = getMarkdownSlugs()
  const posts = slugs.map((slug) => {
    const fullPath = path.join(contentDirectory, `${slug}.md`)
    const raw = fs.readFileSync(fullPath, "utf8")
    const { data } = matter(raw)
    return {
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? ""),
      excerpt: String(data.excerpt ?? ""),
    }
  })
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(contentDirectory, `${slug}.md`)
  if (!fs.existsSync(fullPath)) {
    return null
  }
  const raw = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(raw)
  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    excerpt: String(data.excerpt ?? ""),
    content: content.trim(),
  }
}
