import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

// Route configurations
const PUBLIC_ROUTES = ["/", "/auth", "/unauthorized"];
const CUSTOMER_ONLY_ROUTES = ["/customer"];
const OWNER_ONLY_ROUTES = ["/owner"];
const SHARED_ROUTES = ["/dashboard", "/orders", "/profile"];

type UserRole = "owner" | "manager" | "worker" | "customer";

interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth-token")?.value;

  // Allow public routes without authentication
  if (
    PUBLIC_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(route + "/"),
    )
  ) {
    return NextResponse.next();
  }

  // Check if route requires authentication
  const isCustomerRoute = CUSTOMER_ONLY_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  const isOwnerRoute = OWNER_ONLY_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  const isSharedRoute = SHARED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  // If no authentication required for this route
  if (!isCustomerRoute && !isOwnerRoute && !isSharedRoute) {
    return NextResponse.next();
  }

  // No token - redirect to auth
  if (!token) {
    const url = new URL("/auth", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // Verify token and extract user info
  let payload: JWTPayload;
  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    payload = verified.payload as unknown as JWTPayload;
  } catch (_error) {
    // Invalid token - clear cookie and redirect to auth
    const response = NextResponse.redirect(new URL("/auth", request.url));
    response.cookies.delete("auth-token");
    return response;
  }

  // Role-based access control
  if (isCustomerRoute && payload.role !== "customer") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (isOwnerRoute && payload.role !== "owner") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (isSharedRoute) {
    const allowedRoles: UserRole[] = ["customer", "owner"];
    if (!allowedRoles.includes(payload.role)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // Add user info to headers for downstream use
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-id", payload.userId);
  requestHeaders.set("x-user-email", payload.email);
  requestHeaders.set("x-user-role", payload.role);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
