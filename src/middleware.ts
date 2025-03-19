import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./services/AuthService";

// Routes that do not require authentication
const AuthRoutes = ["/login", "/registration"];

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

// Define the Role type based on the keys of roleBaseRoutes
type Role = keyof typeof roleBaseRoutes;

// Helper function to check if the path is a static file
const isStaticFile = (pathname: string) => {
  return /\.(jpg|jpeg|png|gif|ico|css|js|svg)$/.test(pathname);
};

// Helper function to check if the path is a system path
const isSystemPath = (pathname: string) => {
  return (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/public/")
  );
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and system paths
  if (isStaticFile(pathname) || isSystemPath(pathname)) {
    return NextResponse.next();
  }

  // Allow public routes without authentication
  if (AuthRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  try {
    // Get the current logged-in user
    const user = await getCurrentUser();

    // Redirect unauthenticated users to the login page
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Validate role-based access for specific routes
    if (user.role && roleBaseRoutes[user.role as Role]) {
      const allowedRoutes = roleBaseRoutes[user.role as Role];

      // Allow access if the user's role matches the current route
      if (allowedRoutes.some((route) => route.test(pathname))) {
        return NextResponse.next();
      }
    }

    // If the route is not role-based, allow access to authenticated users
    return NextResponse.next();
  } catch (error) {
    // Handle any errors that occur during authentication
    console.error("Middleware authentication error:", error);
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("error", "auth_failed");
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
