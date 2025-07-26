import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // Check for session cookie
  const session = req.cookies.get('construction-auth-session')
  const isAuthenticated = session?.value === 'authenticated'

  // Protected routes that require authentication
  const protectedPaths = [
    '/dashboard',
    '/stock',
    '/history',
    '/purchase-orders',
    '/profile'
  ]

  const isProtectedPath = protectedPaths.some(path => 
    req.nextUrl.pathname.startsWith(path)
  )

  // If user is not authenticated and trying to access protected route
  if (isProtectedPath && !isAuthenticated) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/login'
    redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If user is authenticated and trying to access login page, redirect to dashboard
  if (req.nextUrl.pathname === '/login' && isAuthenticated) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/dashboard'
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}