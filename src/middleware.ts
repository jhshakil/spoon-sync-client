import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./services/AuthService";

// Routes that do not require authentication
const AuthRoutes = ["/login", "/registration"];

// Routes that require authentication but are not role-based
const GeneralAuthenticatedRoutes = ["/", "/about-us", "/contact-us", "/post"];

type Role = keyof typeof roleBaseRoutes;

// Role-based access control for specific routes
const roleBaseRoutes = {
  user: [/^\/user/],
  admin: [/^\/admin\/dashboard/, /^\/admin\/profile/, /^\/admin\/user-list/],
  superAdmin: [
    /^\/admin\/dashboard/,
    /^\/admin\/create-admin/,
    /^\/admin\/user-list/,
    /^\/admin\/admin-list/,
  ],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes without authentication
  if (AuthRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Get the current logged-in user
  const user = await getCurrentUser();

  // Redirect unauthenticated users to the login page
  if (!user) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }

  // Allow access to general authenticated routes
  if (GeneralAuthenticatedRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Validate role-based access
  if (user.role && roleBaseRoutes[user.role as Role]) {
    const allowedRoutes = roleBaseRoutes[user.role as Role];

    // Allow access if the user's role matches the current route
    if (allowedRoutes.some((route) => route.test(pathname))) {
      return NextResponse.next();
    }
  }

  // Redirect unauthorized users to the home page
  return NextResponse.redirect(new URL("/", request.url));
}

// Middleware applies to all routes except static assets
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public).*)", // Exclude static assets
  ],
};
