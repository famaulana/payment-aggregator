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
  // Intercept SSO from BRISPOT Web PHP to api/validate.js and rewrite to API
  if (req.method === "POST" && req.nextUrl.pathname === "/validate") {
    return NextResponse.rewrite(new URL("/api/validate", req.url));
  }

  // const { token, username } = getSecuredCookieCredential(
  //   req.cookies.get("token")?.value,
  //   req.cookies.get("username")?.value,
  // );

  let parsedAccessMenu = null;

  const currentPath = req.nextUrl.pathname;

  const isValidAccess =
    parsedAccessMenu && Array.isArray(parsedAccessMenu)
      ? Boolean(parsedAccessMenu.find((item) => currentPath?.startsWith(item)))
      : false;

  const allowedRoutes =
    ["/validate", "/bri.ico", "/verification-access-link"].includes(
      req.nextUrl.pathname,
    ) ||
    req.nextUrl.pathname.startsWith("/tinymce/") ||
    req.nextUrl.pathname.startsWith("/_next/");

  // const isAuthenticated = token && username;

  // if (isAuthenticated && req.nextUrl.pathname !== "/403") {
  //   if (!isValidAccess && !allowedRoutes) {
  //     return NextResponse.redirect(new URL("/webapp/403", req.url));
  //   }

  //   return NextResponse.next();
  // }

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
