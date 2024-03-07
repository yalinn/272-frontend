import type { NextRequest } from "next/server";
import { languageOptions } from "@/lib/constants";

/*
 * Get the preferred locale from the request headers
 * https://nextjs.org/docs/app/building-your-application/routing/internationalization#step-1-get-the-preferred-locale-from-the-request-headers
 * Note: This is a simplified version of the example in the documentation.
 */
function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language");
  const [preferredLocale] = acceptLanguage?.split(",") || ["en"];
  const locale = preferredLocale.split("-")[0]?.toLowerCase() || null;
  return locale || languageOptions.defaultLocale;
}

/*
 * Internationalization routing middleware
 * https://nextjs.org/docs/app/building-your-application/routing/internationalization#routing-overview
 * Extra modules are not necessary for this middleware.
 */
import { NextResponse } from "next/server";
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.includes("/api/")) {
    return NextResponse.next();
  }

  const pathnameHasLocale = languageOptions.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  } else {
    return NextResponse.next();
  }
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes) (gonna be handled by the API routes but also by the middleware later on)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico|brand|assets|auth).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
