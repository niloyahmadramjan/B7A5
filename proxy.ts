import { NextRequest, NextResponse } from "next/server";
import { JwtPayload } from "jsonwebtoken";
import { jwtUtils } from "./utils/jwt";
import { getNewAccessToken } from "./service/refreshToken";

const AUTH_ROUTES = ["/login", "/register", "/forgot-password", "/reset-password", "/verify-email"];

const PUBLIC_ROUTES = ["/", "/services","/categories", "/about", "/contact", "/faq", "/privacy-policy", "/terms-of-service"];

function redirect(request: NextRequest, path: string, response?: NextResponse) {
  const redirectResponse = NextResponse.redirect(new URL(path, request.url));

  if (response) {
    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie);
    });
  }

  return redirectResponse;
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let response = NextResponse.next();

  const accessToken = request.cookies.get("accessToken")?.value;

  const refreshToken = request.cookies.get("refreshToken")?.value;

  let decodedAccessToken = accessToken
    ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
    : null;

  const decodedRefreshToken = refreshToken
    ? jwtUtils.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string,
      )
    : null;

  /**
   * Refresh access token
   */

  if (
    !decodedAccessToken?.success &&
    decodedRefreshToken?.success &&
    refreshToken
  ) {
    const result = await getNewAccessToken(refreshToken);

    if (result.success) {
      const newAccessToken = result.data.accessToken;

      response.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
        path: "/",
      });

      decodedAccessToken = jwtUtils.verifyToken(
        newAccessToken,
        process.env.JWT_ACCESS_SECRET as string,
      );
    }
  }

  /**
   * Remove invalid token
   */

  if (!decodedAccessToken?.success) {
    response.cookies.delete("accessToken");
  }

  let userRole: string | null = null;

  if (decodedAccessToken?.success && decodedAccessToken.data) {
    userRole = (decodedAccessToken.data as JwtPayload).role as string;
  }

  /**
   * Logged user trying login/register page
   */

  if (decodedAccessToken?.success && AUTH_ROUTES.includes(pathname)) {
    if (userRole === "CUSTOMER") {
      return redirect(request, "/dashboard", response);
    }

    if (userRole === "ADMIN") {
      return redirect(request, "/admin-dashboard", response);
    }

    if (userRole === "TECHNICIAN") {
      return redirect(request, "/technician-dashboard", response);
    }

    return redirect(request, "/", response);
  }

  /**
   * Public route check
   */

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  /**
   * Guest access private route
   */

  if (!decodedAccessToken?.success && !isPublicRoute && !isAuthRoute) {
    return redirect(request, "/login", response);
  }

  /**
   * Role based protection
   */

  if (pathname.startsWith("/dashboard") && userRole !== "CUSTOMER") {
    return redirect(request, "/not-found", response);
  }

  if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
    return redirect(request, "/not-found", response);
  }

  if (
    pathname.startsWith("/technician-dashboard") &&
    userRole !== "TECHNICIAN"
  ) {
    return redirect(request, "/not-found", response);
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)"],
};
