import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

// Define locales
const locales = ['en', 'ru', 'uz', 'tr'];
const defaultLocale = 'en';

// Set up the i18n middleware
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale
});

// Define which routes are public (don’t need auth)
const isPublicRoute = createRouteMatcher([
  '/:lng', 
  '/:lng/courses', 
  '/:lng/courses/:slug', 
  '/:lng/blogs', 
  '/:lng/blogs/:slug', 
  '/:lng/contacts', 
  '/:lng/contacts',
  '/:lng/instructors',
  '/:lng/instructors/:instructorId',
  '/:lng/shopping/cart',
]);

export default clerkMiddleware(async (authPromise, req: NextRequest) => {
  const pathname = req.nextUrl.pathname

  if (pathname === '/en/api/webhook') {
    return NextResponse.next(); // ✅ Return valid response
  }

  // Handle i18n routing
  const intlResponse = intlMiddleware(req);
  if (intlResponse) return intlResponse;

  // Wait for Clerk auth
  const auth = await authPromise;

  // If it's not a public route, protect it
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  return NextResponse.next()

  // Allow request to proceed
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)', '/:lng/instructor/settings(.*)',
  ],
};

