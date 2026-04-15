import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

export default async function proxy(req: NextRequest) {
  const session = await auth();

  const { pathname } = req.nextUrl;

  // allow these routes always
  const publicRoutes = ["/signin", "/signup", "/api/auth"];

  const isPublic = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // not logged in → force signin
  if (!session && !isPublic) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // already logged in → prevent going back to auth pages
  if (session && (pathname === "/signin" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
