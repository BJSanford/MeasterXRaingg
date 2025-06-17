import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verify } from "cookie-signature";

export async function middleware(request: NextRequest) {
  const discordUsername = request.cookies.get("discordUsername")?.value
  const rainUsernameCookie = request.cookies.get("rainUsername")?.value;
  const rainIdCookie = request.cookies.get("rainId")?.value;
  const verified = request.cookies.get("verified")?.value

  // Validate signed cookies
  const rainUsername = rainUsernameCookie && verify(rainUsernameCookie, process.env.COOKIE_SECRET);
  const rainId = rainIdCookie && verify(rainIdCookie, process.env.COOKIE_SECRET);

  // Ensure proper redirection to dashboard
  if (
    request.nextUrl.pathname.startsWith("/dashboard") &&
    (!discordUsername || !rainUsername || verified !== "true" || !rainId)
  ) {
    if (!discordUsername || !rainUsername) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    if (verified !== "true") {
      return NextResponse.redirect(new URL("/verification-pending", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
