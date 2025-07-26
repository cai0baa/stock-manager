import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Get authorized users from environment variable
const AUTHORIZED_USERS = process.env.AUTHORIZED_USERS?.split(',').map(email => email.trim()) || []

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/api/auth']
  
  // Check if current path is public
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))
  
  if (isPublicRoute) {
    return NextResponse.next()
  }
  
  // Check for authentication cookie
  const userEmail = request.cookies.get('user-email')?.value
  
  // If no user email cookie or user not in authorized list, redirect to login
  if (!userEmail || !AUTHORIZED_USERS.includes(userEmail)) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
} 