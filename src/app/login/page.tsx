'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { signInAction, signUpAction } from '@/lib/auth-actions'
import { AlertCircle, Loader2, HardHat } from 'lucide-react'

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  const searchParams = useSearchParams()
  const redirectedFrom = searchParams.get('redirectedFrom')

  // Clear messages when switching between modes
  useEffect(() => {
    setError(null)
    setSuccess(null)
  }, [isSignUp])

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Add the redirectedFrom parameter for sign-in
      if (!isSignUp && redirectedFrom) {
        formData.append('redirectedFrom', redirectedFrom)
      }

      const result = isSignUp 
        ? await signUpAction(formData)
        : await signInAction(formData)

      if (result.success) {
        if (result.error) {
          // This is for successful signup with email confirmation message
          setSuccess(result.error)
        }
        // For successful sign-in, the action will handle the redirect
      } else {
        setError(result.error || 'An unexpected error occurred')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      console.error('Auth error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-amber-100 rounded-full">
              <HardHat className="h-8 w-8 text-amber-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">
            Construction Stock Manager
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Manage your construction materials and inventory
          </p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </CardTitle>
            <CardDescription className="text-center">
              {isSignUp 
                ? 'Registration is disabled for this demo'
                : 'Use admin/admin to login to the system'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Show redirect message */}
            {redirectedFrom && !isSignUp && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-800">
                  Please sign in to access your dashboard
                </p>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Success message */}
            {success && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-800">{success}</p>
              </div>
            )}

            {/* Auth Form */}
            <form action={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="admin"
                  required
                  disabled={isLoading}
                  className="h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="admin"
                  required
                  disabled={isLoading}
                  className="h-11"
                  minLength={1}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 bg-amber-600 hover:bg-amber-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isSignUp ? 'Creating Account...' : 'Signing In...'}
                  </>
                ) : (
                  <>
                    {isSignUp ? 'Create Account' : 'Sign In'}
                  </>
                )}
              </Button>
            </form>

            {/* Toggle between sign in and sign up */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                disabled={isLoading}
                className="text-sm text-amber-600 hover:text-amber-700 font-medium disabled:opacity-50"
              >
                {isSignUp 
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign up"
                }
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-slate-500">
            Secure access to your construction inventory system
          </p>
        </div>
      </div>
    </div>
  )
}