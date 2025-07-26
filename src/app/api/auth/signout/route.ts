import { signOut } from '@/lib/simple-auth'
import { redirect } from 'next/navigation'

export async function POST() {
  await signOut()
  redirect('/login')
} 