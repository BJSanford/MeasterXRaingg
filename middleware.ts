import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function middleware(request: NextRequest) {
  const discordId = request.cookies.get("discordId")?.value;
  const rainUsername = request.cookies.get("rainUsername")?.value;

  console.log("Middleware validation started:", { discordId, rainUsername });

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    try {
      // Query the database directly for validation
      const user = await prisma.userVerification.findUnique({
        where: { discordId },
      });

      if (!user || user.rainUsername !== rainUsername || !user.verified) {
        console.log("Redirecting to login due to mismatched user data.");
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
