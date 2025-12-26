import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const intlMiddleware = createMiddleware(routing);

const isProtectedRoute = createRouteMatcher([]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();

  return intlMiddleware(req);
});

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: [
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
