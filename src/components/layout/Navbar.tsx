import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              HIMAFI Career Center
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/opportunities"
              className="transition-colors hover:text-foreground/80"
            >
              Opportunities
            </Link>
            <Link
              href="/articles"
              className="transition-colors hover:text-foreground/80"
            >
              Articles
            </Link>
            <Link
              href="/alumni"
              className="transition-colors hover:text-foreground/80"
            >
              Alumni
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-foreground/80"
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button variant="outline" className="relative h-9 w-full justify-start text-sm font-normal md:w-40 lg:w-64">
              <span className="hidden lg:inline-flex">Search opportunities...</span>
              <span className="inline-flex lg:hidden">Search...</span>
            </Button>
          </div>
          <Button variant="ghost" className="h-9">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  )
}
