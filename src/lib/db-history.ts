import { createServerSupabase, createClientSupabase, requireAuth, type Database } from '@/lib/supabase'

export type HistoryEntry = Database['public']['Tables']['history']['Row']
export type HistoryInsert = Database['public']['Tables']['history']['Insert']

// Client-side functions (for use in React components)
export class HistoryClientService {
  private supabase = createClientSupabase()

  async getRecentActivity(limit: number = 10): Promise<HistoryEntry[]> {
    const { data, error } = await this.supabase
      .from('history')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      throw new Error(`Failed to fetch recent activity: ${error.message}`)
    }

    return data || []
  }

  async getItemHistory(itemId: string): Promise<HistoryEntry[]> {
    const { data, error } = await this.supabase
      .from('history')
      .select('*')
      .eq('item_id', itemId)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch item history: ${error.message}`)
    }

    return data || []
  }

  async searchHistory(searchTerm: string, limit: number = 50): Promise<HistoryEntry[]> {
    const { data, error } = await this.supabase
      .from('history')
      .select('*')
      .or(`action.ilike.%${searchTerm}%,notes.ilike.%${searchTerm}%,item_name.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      throw new Error(`Failed to search history: ${error.message}`)
    }

    return data || []
  }

  async getHistoryByDateRange(startDate: string, endDate: string): Promise<HistoryEntry[]> {
    const { data, error } = await this.supabase
      .from('history')
      .select('*')
      .gte('created_at', startDate)
      .lte('created_at', endDate)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch history by date range: ${error.message}`)
    }

    return data || []
  }

  async getHistoryByType(changeType: string): Promise<HistoryEntry[]> {
    const { data, error } = await this.supabase
      .from('history')
      .select('*')
      .eq('change_type', changeType)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch history by type: ${error.message}`)
    }

    return data || []
  }
}

// Server-side functions (for use in Server Components and API routes)
export class HistoryServerService {
  private supabase = createServerSupabase()

  async logAction(
    action: string,
    notes: string,
    changeType?: string,
    itemId?: string,
    itemName?: string,
    oldValues?: any,
    newValues?: any
  ): Promise<HistoryEntry> {
    const user = await requireAuth()

    const { data, error } = await this.supabase
      .from('history')
      .insert({
        action,
        notes,
        change_type: changeType || action,
        item_id: itemId || null,
        item_name: itemName || null,
        old_values: oldValues || null,
        new_values: newValues || null,
        created_by: user.id
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to log action: ${error.message}`)
    }

    return data
  }

  async logItemCreation(item: any): Promise<void> {
    await this.logAction(
      'item_created',
      `Created new ${item.tracking_type} item: ${item.name}`,
      'item_creation',
      item.id,
      item.name,
      null,
      {
        name: item.name,
        tracking_type: item.tracking_type,
        quantity: item.quantity,
        category: item.category
      }
    )
  }

  async logItemDeletion(item: any): Promise<void> {
    await this.logAction(
      'item_deleted',
      `Deleted ${item.tracking_type} item: ${item.name}`,
      'item_deletion',
      item.id,
      item.name,
      {
        name: item.name,
        tracking_type: item.tracking_type,
        quantity: item.quantity,
        status: item.status
      },
      null
    )
  }

  async logStockUpdate(itemId: string, itemName: string, oldQuantity: number | null, newQuantity: number, notes?: string): Promise<void> {
    await this.logAction(
      'stock_updated',
      notes || `Stock updated from ${oldQuantity || 0} to ${newQuantity}`,
      'stock_update',
      itemId,
      itemName,
      { quantity: oldQuantity },
      { quantity: newQuantity }
    )
  }

  async logAssetStatusChange(
    itemId: string, 
    itemName: string, 
    oldStatus: string | null, 
    newStatus: string,
    oldLocation?: string | null,
    newLocation?: string | null,
    notes?: string
  ): Promise<void> {
    await this.logAction(
      'asset_status_changed',
      notes || `Asset status changed from ${oldStatus || 'unknown'} to ${newStatus}`,
      'status_change',
      itemId,
      itemName,
      { status: oldStatus, location: oldLocation },
      { status: newStatus, location: newLocation }
    )
  }

  async logPurchaseOrderCreated(poId: string, poNumber: string, itemCount: number): Promise<void> {
    await this.logAction(
      'purchase_order_created',
      `Created purchase order ${poNumber} with ${itemCount} items`,
      'po_creation',
      undefined,
      undefined,
      null,
      { po_id: poId, po_number: poNumber, item_count: itemCount }
    )
  }

  async logPurchaseOrderStatusChange(poId: string, poNumber: string, oldStatus: string, newStatus: string): Promise<void> {
    await this.logAction(
      'purchase_order_status_changed',
      `Purchase order ${poNumber} status changed from ${oldStatus} to ${newStatus}`,
      'po_status_change',
      undefined,
      undefined,
      { status: oldStatus },
      { status: newStatus, po_id: poId }
    )
  }
}

// Helper functions for history formatting
export const HistoryHelper = {
  formatAction: (entry: HistoryEntry): string => {
    switch (entry.change_type) {
      case 'item_creation':
        return 'Item Created'
      case 'item_deletion':
        return 'Item Deleted'
      case 'stock_update':
        return 'Stock Updated'
      case 'status_change':
        return 'Status Changed'
      case 'po_creation':
        return 'Purchase Order Created'
      case 'po_status_change':
        return 'PO Status Changed'
      default:
        return entry.action || 'Unknown Action'
    }
  },

  getActionIcon: (entry: HistoryEntry): string => {
    switch (entry.change_type) {
      case 'item_creation':
        return '➕'
      case 'item_deletion':
        return '🗑️'
      case 'stock_update':
        return '📦'
      case 'status_change':
        return '🔄'
      case 'po_creation':
        return '🛒'
      case 'po_status_change':
        return '📋'
      default:
        return '📝'
    }
  },

  getActionColor: (entry: HistoryEntry): string => {
    switch (entry.change_type) {
      case 'item_creation':
        return 'text-green-600'
      case 'item_deletion':
        return 'text-red-600'
      case 'stock_update':
        return 'text-blue-600'
      case 'status_change':
        return 'text-amber-600'
      case 'po_creation':
        return 'text-purple-600'
      case 'po_status_change':
        return 'text-indigo-600'
      default:
        return 'text-gray-600'
    }
  },

  formatTimestamp: (timestamp: string): string => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} minutes ago`
    if (diffHours < 24) return `${diffHours} hours ago`
    if (diffDays < 7) return `${diffDays} days ago`
    
    return date.toLocaleDateString()
  }
}

// Export instances for easy use
export const historyClient = new HistoryClientService()
export const historyServer = new HistoryServerService() 