import { redirect } from 'next/navigation'
import { signIn, getUser } from '@/lib/simple-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HardHat, AlertCircle } from 'lucide-react'

async function handleLogin(formData: FormData) {
  'use server'
  
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  if (!email || !password) {
    redirect('/login?error=missing')
  }
  
  const success = await signIn(email, password)
  
  if (success) {
    redirect('/dashboard')
  } else {
    redirect('/login?error=invalid')
  }
}

export default async function LoginPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ error?: string }> 
}) {
  // If already logged in, redirect to dashboard
  const user = await getUser()
  if (user) {
    redirect('/dashboard')
  }

  const params = await searchParams
  const error = params.error

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
              <HardHat className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Stock Manager</CardTitle>
          <CardDescription className="text-center">
            Sistema de gestão de estoque para construção civil
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email autorizado
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                required
                className="w-full"
                autoComplete="email"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-700">
                Senha
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Digite sua senha"
                required
                className="w-full"
                autoComplete="current-password"
              />
            </div>
            
            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-md">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">
                  {error === 'invalid' && 'Email não autorizado ou senha incorreta'}
                  {error === 'missing' && 'Email e senha são obrigatórios'}
                </span>
              </div>
            )}
            
            <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">
              Entrar no sistema
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500">
              Acesso restrito apenas a usuários autorizados
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 