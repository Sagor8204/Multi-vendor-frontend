import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 1. Define routes that don't require authentication
const publicRoutes = ['/', '/products', '/cart', '/categories'];
const publicPrefixes = ['/category/', '/products/', '/vendors/'];

// 2. Define routes for authentication (redirect to home if already logged in)
const authRoutes = ['/login', '/register'];

// 3. Define routes that require specific roles
const vendorRoutes = ['/vendor'];

export function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const path = nextUrl.pathname;

  // Get tokens from cookies
  const accessToken = cookies.get('access_token')?.value;
  const hasValidToken = !!accessToken && accessToken !== '';

  // Check route types
  const isPublicRoute = publicRoutes.includes(path) || 
                        publicPrefixes.some(prefix => path.startsWith(prefix));
  const isAuthRoute = authRoutes.includes(path);
  const isVendorRoute = vendorRoutes.some(route => path.startsWith(route));

  // Redirect Logic:

  // A. If accessing auth routes while logged in -> Redirect to home
  if (isAuthRoute && hasValidToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // B. If accessing private/vendor routes while logged out -> Redirect to login
  const isPrivateRoute = !isPublicRoute && !isAuthRoute;
  if (isPrivateRoute && !hasValidToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', path);
    return NextResponse.redirect(loginUrl);
  }

  // C. Role-Based Access Control (RBAC) for Vendor Dashboard
  if (isVendorRoute && hasValidToken) {
    try {
      // Basic JWT decoding in middleware (Edge Runtime compatible)
      const payload = JSON.parse(atob(accessToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      if (payload.role !== 'vendor') {
        // Not a vendor? Send them to profile or show 403
        return NextResponse.redirect(new URL('/profile', request.url));
      }
    } catch (e) {
      // Invalid token? Clear it and send to login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('access_token');
      response.cookies.delete('refresh_token');
      return response;
    }
  }

  return NextResponse.next();
}

// Routes Middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|public).*)',
  ],
};
