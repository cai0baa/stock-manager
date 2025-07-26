'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

// Hardcoded credentials
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'admin'
const SESSION_COOKIE = 'construction-auth-session'

// Validation schemas
const authSchema = z.object({
  email: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

export type AuthFormData = z.infer<typeof authSchema>

export interface AuthResult {
  success: boolean
  error?: string
  redirectTo?: string
}

export async function signInAction(formData: FormData): Promise<AuthResult> {
  try {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Validate input
    const validatedFields = authSchema.safeParse({ email, password })
    
    if (!validatedFields.success) {
      return {
        success: false,
        error: validatedFields.error.issues[0]?.message || 'Invalid input'
      }
    }

    // Check hardcoded credentials
    if (email === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const cookieStore = await cookies()
      
      // Set session cookie (expires in 7 days)
      cookieStore.set(SESSION_COOKIE, 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
      })
      
      // Successful login - redirect to dashboard
      redirect('/dashboard')
    } else {
      return {
        success: false,
        error: 'Invalid username or password. Use admin/admin to login.'
      }
    }
  } catch (error) {
    console.error('Sign in error:', error)
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    }
  }
}

export async function signUpAction(formData: FormData): Promise<AuthResult> {
  return {
    success: false,
    error: 'Registration is disabled. Use admin/admin to login.'
  }
}

export async function signOutAction(): Promise<void> {
  try {
    const cookieStore = await cookies()
    cookieStore.delete(SESSION_COOKIE)
  } catch (error) {
    console.error('Sign out error:', error)
  }
  
  redirect('/login')
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get(SESSION_COOKIE)
    return session?.value === 'authenticated'
  } catch (error) {
    return false
  }
}

// Helper function to get user for server components
export async function getUser() {
  try {
    const authenticated = await isAuthenticated()
    return authenticated ? { id: 'admin', email: 'admin@construction.com' } : null
  } catch (error) {
    console.error('Get user error:', error)
    return null
  }
}

export async function requireAuth() {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    redirect('/login')
  }
  return { id: 'admin', email: 'admin@construction.com' }
}