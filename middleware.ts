import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if user is logged in
  // Try both cookie and localStorage fallback for SSR/CSR mismatch
  const userId = request.cookies.get("userId")?.value
  const rainUsername = request.cookies.get("rainUsername")?.value

  // If accessing dashboard without being logged in, redirect to login
  if (
    request.nextUrl.pathname.startsWith("/dashboard") &&
    !userId &&
    !rainUsername
  ) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
