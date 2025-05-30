import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Paths that require authentication
const protectedPaths = [
  "/profile",
  "/admin",
  "/admin/dashboard"
]

// Paths that should redirect to dashboard if user is already authenticated
const authPaths = [
  "/auth"
]

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value
  const { pathname } = request.nextUrl

  // Check if it's a protected path
  if (protectedPaths.some(path => pathname.startsWith(path))) {
    if (!token) {
      // Redirect to auth page if no token is present
      const url = new URL("/auth", request.url)
      url.searchParams.set("from", pathname)
      return NextResponse.redirect(url)
    }

    // For admin routes, verify admin role
    if (pathname.startsWith("/admin")) {
      try {
        // In a real app, you would decode and verify the JWT token
        // This is a simplified example
        const isAdmin = true // Replace with actual admin check
        if (!isAdmin) {
          return NextResponse.redirect(new URL("/", request.url))
        }
      } catch {
        return NextResponse.redirect(new URL("/auth", request.url))
      }
    }
  }

  // Redirect authenticated users away from auth pages
  if (token && authPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/profile", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all protected routes
    "/profile/:path*",
    "/admin/:path*",
    // Match authentication routes
    "/auth"
  ]
}
