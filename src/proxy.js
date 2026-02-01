import { NextResponse } from "next/server";
// import { getSecuredCookieCredential } from "./utils/cookies";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images|icons|js).*)",
  ],
};

export default function middleware(req) {
  const token = req.cookies.get("auth_token")?.value;
  const isLoginPage = req.nextUrl.pathname === "/login";

  // only redirect to dashboard if the token is actually valid.
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // If NO token and NOT on login page, go to login
  if (!token && !isLoginPage) {
    const response = NextResponse.redirect(new URL("/login", req.url));
    // Force clear just in case
    response.cookies.set("auth_token", "", { path: "/", maxAge: 0 });
    return response;
  }

  if (token && req.nextUrl.pathname !== "/403") {
    return NextResponse.next();
  }

  /* === BELOW IS USER WHO NOT UNATHORIZED OR NOT HAVING ACCESS === */

  /* === PUBLIC ROUTE === */
  if (["/login", "/setting-role"].includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  /* === PROTECTED ROUTE === */
  const response = NextResponse.redirect(new URL("/login", req.url));

  response.cookies.delete("token");
  response.cookies.delete("username");
  response.cookies.delete("accessMenu");

  return response;
}
