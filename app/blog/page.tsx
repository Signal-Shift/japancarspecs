import Link from "next/link"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllPosts } from "@/lib/blog"

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Blog
        </h1>
        <p className="mt-3 text-muted-foreground">
          Practical notes on Japanese imports, chassis research, and getting
          reliable specs before you buy.
        </p>
      </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block h-full">
              <Card className="h-full rounded-xl border-border/80 bg-card/60 transition-colors group-hover:border-primary/40">
                <CardHeader>
                  <p className="text-xs text-muted-foreground">
                    {new Date(post.date).toLocaleDateString("en-IE", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <CardTitle className="text-lg font-semibold leading-snug group-hover:text-primary">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
