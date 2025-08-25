import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['tr', 'en'],
  
  // Used when no locale matches
  defaultLocale: 'tr',
  
  // This is a list of all paths that do not require locale routing
  localePrefix: 'as-needed',

  // Skip localization for certain pathnames
  localeDetection: true
});

export const config = {
  // Match all request paths except for the ones starting with:
  // - api (API routes)
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  // - /images, /fonts, etc. (public assets)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|fonts|public).*)']
};
