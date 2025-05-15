import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"

export async function middleware(request: NextRequest) {
  const discordUsername = request.cookies.get("discordUsername")?.value
  const rainUsername = request.cookies.get("rainUsername")?.value

  // If accessing dashboard without being logged in, redirect to login
  if (
    request.nextUrl.pathname.startsWith("/dashboard") &&
    !discordUsername &&
    !rainUsername
  ) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Check verification status if user is logged in
  if (request.nextUrl.pathname.startsWith("/dashboard") && discordUsername) {
    // Fetch user from DB by discordUsername
    const dbUser = await prisma.userVerification.findFirst({
      where: { discordUsername },
    })
    if (!dbUser || !dbUser.verified) {
      // Not verified, redirect to a "pending verification" page
      return NextResponse.redirect(new URL("/verification-pending", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
