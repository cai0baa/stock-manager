import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

// Database types for TypeScript
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

// Client-side Supabase client for use in React components
export const createClientSupabase = () => {
  return createClientComponentClient<Database>()
}

// Server-side Supabase client for use in Server Components and API routes
export const createServerSupabase = () => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
}

// Admin client (for server-side operations that need elevated permissions)
export const createAdminSupabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase admin configuration')
  }
  
  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

// Helper function to get current user
export const getCurrentUser = async () => {
  const supabase = createServerSupabase()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return null
  }
  
  return user
}

// Helper function to require authentication
export const requireAuth = async () => {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error('Authentication required')
  }
  
  return user
}