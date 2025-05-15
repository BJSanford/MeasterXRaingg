import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const discordUsername = request.cookies.get("discordUsername")?.value
  const rainUsername = request.cookies.get("rainUsername")?.value
  const verified = request.cookies.get("verified")?.value

  // If accessing dashboard without being logged in, redirect to login
  if (
    request.nextUrl.pathname.startsWith("/dashboard") &&
    !discordUsername &&
    !rainUsername
  ) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If not verified, redirect to pending page
  if (
    request.nextUrl.pathname.startsWith("/dashboard") &&
    verified !== "true"
  ) {
    return NextResponse.redirect(new URL("/verification-pending", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
