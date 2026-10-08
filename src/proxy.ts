import { NextResponse, type NextRequest } from "next/server";
import { legacyPrefixes, legacyRedirects } from "@/content/redirects";

// 301 пренасочвания от адресите на стария WordPress сайт и премахване на „/“ в края.
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  let path: string;
  try {
    path = decodeURIComponent(pathname);
  } catch {
    path = pathname;
  }
  const key = path.replace(/\/+$/, "") || "/";

  const lower = key.toLowerCase();
  const target = legacyRedirects[lower] ?? (legacyPrefixes.some((p) => (lower + "/").startsWith(p)) ? "/" : undefined);
  if (target) {
    return NextResponse.redirect(new URL(target, request.url), 301);
  }
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return NextResponse.redirect(new URL(pathname.replace(/\/+$/, "") + search, request.url), 301);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|api/|img/|favicon|icon|apple-icon|opengraph-image|robots.txt|sitemap.xml).*)"],
};
