// Simple auth system with environment-variable user control
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// Get authorized users from environment variable
const AUTHORIZED_USERS = process.env.AUTHORIZED_USERS?.split(',').map(email => email.trim()) || []
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

export async function getUser() {
  const cookieStore = await cookies()
  const userEmail = cookieStore.get('user-email')?.value
  
  if (userEmail && AUTHORIZED_USERS.includes(userEmail)) {
    return { 
      email: userEmail, 
      name: userEmail.split('@')[0].charAt(0).toUpperCase() + userEmail.split('@')[0].slice(1)
    }
  }
  
  return null
}

export async function signIn(email: string, password: string) {
  // Check if email is in authorized list and password matches
  if (AUTHORIZED_USERS.includes(email.trim()) && password === ADMIN_PASSWORD) {
    const cookieStore = await cookies()
    cookieStore.set('user-email', email.trim(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
      sameSite: 'lax'
    })
    return true
  }
  return false
}

export async function signOut() {
  const cookieStore = await cookies()
  cookieStore.delete('user-email')
}

export async function requireAuth() {
  const user = await getUser()
  if (!user) {
    redirect('/login')
  }
  return user
} 