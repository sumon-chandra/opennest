import { JwtPayload } from "jsonwebtoken"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { jwtUtils } from "./utilities/jwt"
import { getNewAccessToken } from "./services/refresh-token"

const AUTH_ROUTES = ["/login", "/signup"]
const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/properties",
  "/categories",
  "/faq",
  "/contact",
]

const roleDashboard: Record<string, string> = {
  TENANT: "/dashboard/tenant",
  LANDLORD: "/dashboard/landlord",
  ADMIN: "/dashboard/admin",
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  let accessToken = request.cookies.get("accessToken")?.value
  const refreshToken = request.cookies.get("refreshToken")?.value

  let decodedAccessToken = accessToken
    ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
    : null

  const decodedRefreshToken = refreshToken
    ? jwtUtils.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string
      )
    : null

  const response = NextResponse.next()

  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    const result = await getNewAccessToken()

    if (result.success) {
      accessToken = result.data.accessToken
      decodedAccessToken = jwtUtils.verifyToken(
        accessToken!,
        process.env.JWT_ACCESS_SECRET as string
      )

      // set on the response that actually reaches the browser
      response.cookies.set("accessToken", accessToken!, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
      })
    }
  }

  const tokenValid = !!decodedAccessToken?.success

  if (!tokenValid) {
    response.cookies.delete("accessToken")
  }

  const userRole = tokenValid
    ? ((decodedAccessToken!.data as JwtPayload).role as string | undefined)
    : undefined

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  )
  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  )

  // Logged-in user hitting /login or /signup -> send to their dashboard
  if (tokenValid && isAuthRoute) {
    const target = userRole && roleDashboard[userRole]
    return NextResponse.redirect(new URL(target ?? "/", request.url))
  }

  // Not authenticated (missing OR invalid token) trying to hit a protected route
  if (!tokenValid && !isPublicRoute && !isAuthRoute) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirectTo", pathname)
    const redirectResponse = NextResponse.redirect(loginUrl)
    redirectResponse.cookies.delete("accessToken")
    return redirectResponse
  }

  // Bare /dashboard -> role-specific dashboard
  if (pathname === "/dashboard") {
    const target = userRole && roleDashboard[userRole]
    return NextResponse.redirect(new URL(target ?? "/login", request.url))
  }

  // Role-based access to each dashboard
  if (pathname.startsWith("/dashboard/")) {
    const target = userRole && roleDashboard[userRole]
    if (!target || !pathname.startsWith(target)) {
      return NextResponse.redirect(new URL("/not-found", request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)",
  ],
}
