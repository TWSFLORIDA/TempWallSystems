import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, expectedToken } from "@/lib/adminAuth";

/**
 * Gate every /admin route behind the shared password, except the login page
 * itself. Fails closed: if ADMIN_PASSWORD isn't configured, no session token
 * can ever match, so /admin stays locked.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin/login") return NextResponse.next();

  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  const expected = await expectedToken();

  if (expected && token === expected) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*"],
};
