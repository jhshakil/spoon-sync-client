import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./services/AuthService";

// Routes that do not require authentication
const AuthRoutes = ["/login", "/registration"];

// Routes that require authentication but are not role-based
const GeneralAuthenticatedRoutes = [
  "/",
  "/about-us",
  "/contact-us",
  "/post",
  "/terms-and-conditions",
  "/privacy-policy",
  "/all-user",
  "/all-group",
  /^\/post(\/[^/]+)?$/,
];

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

    // Allow access to general authenticated routes
    // if (GeneralAuthenticatedRoutes.includes(pathname)) {
    //   return NextResponse.next();
    // }
    const isGeneralAuthenticatedRoute = GeneralAuthenticatedRoutes.some(
      (route) =>
        typeof route === "string" ? route === pathname : route.test(pathname)
    );

    if (isGeneralAuthenticatedRoute) {
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

    // Log unauthorized access attempts
    console.warn(
      `Unauthorized access attempt to ${pathname} by user with role ${user.role}`
    );

    // Redirect unauthorized users to the home page
    return NextResponse.redirect(new URL("/", request.url));
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
