import { createBrowserClient } from '@supabase/ssr'
import { createServerClient } from '@supabase/ssr'

// Keep your existing Database types (they're good!)
export type Database = {
  public: {
    Tables: {
      items: {
        Row: {
          id: string
          name: string
          description: string | null
          unit: string
          category: string
          tracking_type: 'assets' | 'tracked' | 'untracked'
          quantity: number | null
          min_stock_level: number | null
          status: 'in_stock' | 'on_site' | 'maintenance' | null
          location: string | null
          created_at: string
          updated_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          unit: string
          category: string
          tracking_type: 'assets' | 'tracked' | 'untracked'
          quantity?: number | null
          min_stock_level?: number | null
          status?: 'in_stock' | 'on_site' | 'maintenance' | null
          location?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          unit?: string
          category?: string
          tracking_type?: 'assets' | 'tracked' | 'untracked'
          quantity?: number | null
          min_stock_level?: number | null
          status?: 'in_stock' | 'on_site' | 'maintenance' | null
          location?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
      }
      history: {
        Row: {
          id: string
          item_id: string | null
          action: string
          old_values: any | null
          new_values: any | null
          notes: string | null
          created_at: string
          created_by: string | null
          item_name: string | null
          change_type: string | null
        }
        Insert: {
          id?: string
          item_id?: string | null
          action: string
          old_values?: any | null
          new_values?: any | null
          notes?: string | null
          created_at?: string
          created_by?: string | null
          item_name?: string | null
          change_type?: string | null
        }
        Update: {
          id?: string
          item_id?: string | null
          action?: string
          old_values?: any | null
          new_values?: any | null
          notes?: string | null
          created_at?: string
          created_by?: string | null
          item_name?: string | null
          change_type?: string | null
        }
      }
      purchase_orders: {
        Row: {
          id: string
          po_number: string
          status: 'draft' | 'ordered' | 'received'
          supplier_name: string | null
          supplier_email: string | null
          total_amount: number | null
          notes: string | null
          created_at: string
          ordered_at: string | null
          received_at: string | null
          created_by: string | null
          auto_generated: boolean | null
        }
        Insert: {
          id?: string
          po_number: string
          status?: 'draft' | 'ordered' | 'received'
          supplier_name?: string | null
          supplier_email?: string | null
          total_amount?: number | null
          notes?: string | null
          created_at?: string
          ordered_at?: string | null
          received_at?: string | null
          created_by?: string | null
          auto_generated?: boolean | null
        }
        Update: {
          id?: string
          po_number?: string
          status?: 'draft' | 'ordered' | 'received'
          supplier_name?: string | null
          supplier_email?: string | null
          total_amount?: number | null
          notes?: string | null
          created_at?: string
          ordered_at?: string | null
          received_at?: string | null
          created_by?: string | null
          auto_generated?: boolean | null
        }
      }
      purchase_order_items: {
        Row: {
          id: string
          po_id: string | null
          item_id: string | null
          requested_quantity: number
          received_quantity: number | null
          unit_price: number | null
          item_name: string
          item_description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          po_id?: string | null
          item_id?: string | null
          requested_quantity: number
          received_quantity?: number | null
          unit_price?: number | null
          item_name: string
          item_description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          po_id?: string | null
          item_id?: string | null
          requested_quantity?: number
          received_quantity?: number | null
          unit_price?: number | null
          item_name?: string
          item_description?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      tracking_type: 'assets' | 'tracked' | 'untracked'
      asset_status: 'in_stock' | 'on_site' | 'maintenance'
      po_status: 'draft' | 'ordered' | 'received'
    }
  }
}

// 1. Client-side client (for React components)
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables:', {
      url: supabaseUrl ? 'Set' : 'Missing',
      key: supabaseKey ? 'Set' : 'Missing'
    })
    throw new Error('Missing Supabase environment variables')
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseKey)
}

// 2. Server-side client (for Server Components, Server Actions, Route Handlers)
export async function createServerSupabaseClient() {
  const { cookies } = await import('next/headers')
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables:', {
      url: supabaseUrl ? 'Set' : 'Missing',
      key: supabaseKey ? 'Set' : 'Missing'
    })
    throw new Error('Missing Supabase environment variables')
  }

  const cookieStore = await cookies()

  return createServerClient<Database>(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

// Note: Middleware client removed as middleware.ts was deleted

// Simple admin client for your current simple auth system
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.warn('Missing Supabase environment variables - using mock mode:', {
      url: supabaseUrl ? 'Set' : 'Missing',
      key: supabaseKey ? 'Set' : 'Missing'
    })
    return null
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseKey)
}

// Legacy compatibility - update your existing code gradually
export const createAdminSupabase = createAdminClient

// Helper function for authentication (simplified)
export async function getCurrentUser() {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return null
    }
    
    return user
  } catch {
    return null
  }
}

// Helper function to require authentication
export async function requireAuth() {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error('Authentication required')
  }
  
  return user
}