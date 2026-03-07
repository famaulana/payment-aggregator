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
  const token = req.cookies.get("access_token")?.value;
  const user = req.cookies.get("user")?.value;
  const isLoginPage = req.nextUrl.pathname === "/login";

  // only redirect to dashboard if the token is actually valid.
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (token && req.nextUrl.pathname !== "/403") {
    return NextResponse.next();
  }

  /* === BELOW IS USER WHO NOT UNATHORIZED OR NOT HAVING ACCESS === */
  // If NO token and NOT on login page, go to login
  if ((!token || !user) && !isLoginPage) {
    const response = NextResponse.redirect(new URL("/login", req.url));
    // Force clear just in case
    response.cookies.delete("user");
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
    response.cookies.delete("token_type");
    return response;
  }

  /* === PUBLIC ROUTE === */
  if (["/login"].includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  /* === PROTECTED ROUTE === */
  const response = NextResponse.redirect(new URL("/login", req.url));

  response.cookies.delete("access_token");
  response.cookies.delete("refresh_token");
  response.cookies.delete("token_type");

  return response;
}
