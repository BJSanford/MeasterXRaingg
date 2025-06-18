import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { handler as dashboardHandler } from "./pages/api/user/dashboard";

export async function middleware(request: NextRequest) {
  const discordId = request.cookies.get("discordId")?.value;
  const discordUsername = request.cookies.get("discordUsername")?.value;
  const rainUsername = request.cookies.get("rainUsername")?.value;
  const rainId = request.cookies.get("rainId")?.value;
  const verified = request.cookies.get("verified")?.value;

  console.log("Middleware validation started:", { discordId, rainUsername });

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
      const req = {
        cookies: request.cookies,
        headers: request.headers,
      };

      const res = {
        status: (code) => ({ json: (data) => ({ code, data }) }),
      };

      const userData = await dashboardHandler(req, res);

      console.log("User data from API handler:", userData);

      if (userData.rainUsername !== rainUsername || userData.discordId !== discordId) {
        console.log("Redirecting to login due to mismatched user data.");
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch (error) {
      console.error("Middleware validation error:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  console.log("Middleware validation passed.");
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
