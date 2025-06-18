import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const discordUsername = request.cookies.get("discordUsername")?.value;
  const rainUsername = request.cookies.get("rainUsername")?.value;
  const rainId = request.cookies.get("rainId")?.value;
  const verified = request.cookies.get("verified")?.value;

  // Ensure proper redirection to dashboard
  if (
    request.nextUrl.pathname.startsWith("/dashboard") &&
    (!discordUsername || !rainUsername || verified !== "true" || !rainId)
  ) {
    if (!discordUsername || !rainUsername) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (verified !== "true") {
      return NextResponse.redirect(new URL("/verification-pending", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
