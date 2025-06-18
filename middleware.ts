import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const discordId = request.cookies.get("discordId")?.value;
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

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    try {
      const response = await fetch(`${request.nextUrl.origin}/api/user/dashboard`, {
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      });

      if (!response.ok) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      const userData = await response.json();

      if (userData.rainUsername !== rainUsername || userData.discordId !== discordId) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch (error) {
      console.error("Middleware validation error:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
