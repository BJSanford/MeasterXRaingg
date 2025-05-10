import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"

export async function middleware(request: NextRequest) {
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

  // Check verification status if user is logged in
  if (request.nextUrl.pathname.startsWith("/dashboard") && userId) {
    // Fetch user from DB
    const dbUser = await prisma.userVerification.findUnique({
      where: { discordId: userId },
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
