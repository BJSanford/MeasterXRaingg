import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const discordId = request.cookies.get("discordId")?.value;
  const rainUsername = request.cookies.get("rainUsername")?.value;

  console.log("Middleware validation started:", { discordId, rainUsername });

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    try {
      const apiBaseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
      const response = await fetch(`${apiBaseUrl}/api/user/dashboard`, {
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      });

      console.log("API response status:", response.status);

      if (!response.ok) {
        console.log("Redirecting to login due to API response failure.");
        return NextResponse.redirect(new URL("/login", request.url));
      }

      const userData = await response.json();

      console.log("User data from API:", userData);

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
