import { NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

// Create the next-intl middleware
const intlMiddleware = createIntlMiddleware({
  locales: ['fr', 'ar'],
  defaultLocale: 'fr'
});

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const cookies = request.cookies;

  // Check if the path is for a static asset (e.g., images, CSS, JS)
  const isStaticAsset = /\.(jpg|jpeg|png|gif|css|js|svg|ico|woff|woff2|ttf|eot|mp4|webm)$/.test(pathname);

  if (isStaticAsset) {
    // If the request is for a static asset, don't modify the path
    return NextResponse.next();
  }

  // Retrieve the NEXT_LOCALE cookie value
  const nextLocaleCookie = cookies.get('NEXT_LOCALE');
  const nextLocale = nextLocaleCookie ? nextLocaleCookie.value : 'fr';

  // Validate and sanitize the locale
  const locale = (nextLocale && typeof nextLocale === 'string' && nextLocale.trim())
    ? nextLocale.trim()
    : 'fr';

  // Ensure the locale is supported
  const validLocale = ['fr', 'ar'].includes(locale) ? locale : 'fr';

  // Check if the URL path already includes a locale (e.g., /fr or /ar)
  const isLocaleInPath = /^\/(fr|ar)(\/|$)/.test(pathname);

  if (!isLocaleInPath) {
    // If no locale is in the path, prepend the locale from the cookie or default to 'fr'
    const url = request.nextUrl.clone();
    url.pathname = `/${validLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // Proceed with the next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/((?!_next|api).*)'],
};
