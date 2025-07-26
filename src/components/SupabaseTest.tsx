'use client'

import { createClient } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export default function SupabaseTest() {
  const [connectionStatus, setConnectionStatus] = useState('🔄 Testing...')
  const [itemCount, setItemCount] = useState<number | null>(null)
  const [sampleItems, setSampleItems] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    testConnection()
  }, [])

  async function testConnection() {
    try {
      setConnectionStatus('🔄 Connecting to Supabase...')
      const supabase = createClient()
      
      // Test basic connection with count
      const { count, error: countError } = await supabase
        .from('items')
        .select('*', { count: 'exact', head: true })
      
      if (countError) {
        setError(`Connection failed: ${countError.message}`)
        setConnectionStatus('❌ Failed')
        return
      }
      
      setItemCount(count)
      setConnectionStatus('✅ Connected')
      
      // Get sample items if any exist
      if (count && count > 0) {
        const { data: samples, error: sampleError } = await supabase
          .from('items')
          .select('id, name, category, tracking_type, quantity')
          .limit(3)
        
        if (!sampleError && samples) {
          setSampleItems(samples)
        }
      }
      
    } catch (err: any) {
      setError(`Test failed: ${err.message}`)
      setConnectionStatus('❌ Error')
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg border border-slate-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-slate-900">Database Connection</h3>
        <button 
          onClick={testConnection}
          className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded hover:bg-amber-200"
        >
          Refresh
        </button>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-600">Status:</span>
          <span>{connectionStatus}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-slate-600">Items Count:</span>
          <span className="font-medium">
            {itemCount !== null ? `${itemCount} items` : 'Loading...'}
          </span>
        </div>
        
        {itemCount === 0 && (
          <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded text-xs">
            <strong>⚠️ Database is empty!</strong><br/>
            Need to run import script to add 205 construction items.
          </div>
        )}
        
        {sampleItems.length > 0 && (
          <div className="mt-3">
            <div className="text-xs text-slate-500 mb-1">Sample items:</div>
            {sampleItems.map((item, i) => (
              <div key={item.id} className="text-xs text-slate-700">
                {i + 1}. {item.name} ({item.category})
              </div>
            ))}
          </div>
        )}
        
        {error && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-600">
            {error}
          </div>
        )}
      </div>
    </div>
  )
} 