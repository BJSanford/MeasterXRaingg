import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if user is logged in
  const userId = request.cookies.get("userId")?.value

  // If accessing dashboard without being logged in, redirect to login
  if (request.nextUrl.pathname.startsWith("/dashboard") && !userId) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
