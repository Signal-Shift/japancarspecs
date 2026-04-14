import Link from "next/link"

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/reports", label: "Reports" },
  { href: "/sample", label: "Sample" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/80 bg-card/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-tight text-foreground">
            JapanCar<span className="text-primary">Specs</span>
          </p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Specification reports for Japanese import vehicles — fast, detailed,
            and built for buyers who want certainty before they commit.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} JapanCarSpecs. All rights reserved.
      </div>
    </footer>
  )
}
