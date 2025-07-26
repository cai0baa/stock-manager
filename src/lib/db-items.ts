import { createServerSupabase, createClientSupabase, requireAuth, type Database } from '@/lib/supabase'

export type Item = Database['public']['Tables']['items']['Row']
export type ItemInsert = Database['public']['Tables']['items']['Insert']
export type ItemUpdate = Database['public']['Tables']['items']['Update']
export type TrackingType = 'assets' | 'tracked' | 'untracked'
export type AssetStatus = 'in_stock' | 'on_site' | 'maintenance'

// Client-side functions (for use in React components)
export class ItemsClientService {
  private supabase = createClientSupabase()

  async getAllItems(trackingType?: TrackingType): Promise<Item[]> {
    let query = this.supabase
      .from('items')
      .select('*')
      .order('name', { ascending: true })

    if (trackingType) {
      query = query.eq('tracking_type', trackingType)
    }

    const { data, error } = await query

    if (error) {
      throw new Error(`Failed to fetch items: ${error.message}`)
    }

    return data || []
  }

  async getItemById(id: string): Promise<Item | null> {
    const { data, error } = await this.supabase
      .from('items')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null // Not found
      throw new Error(`Failed to fetch item: ${error.message}`)
    }

    return data
  }

  async searchItems(searchTerm: string, trackingType?: TrackingType): Promise<Item[]> {
    let query = this.supabase
      .from('items')
      .select('*')
      .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`)
      .order('name', { ascending: true })

    if (trackingType) {
      query = query.eq('tracking_type', trackingType)
    }

    const { data, error } = await query

    if (error) {
      throw new Error(`Failed to search items: ${error.message}`)
    }

    return data || []
  }

  async getLowStockItems(): Promise<Item[]> {
    const { data, error } = await this.supabase
      .from('items')
      .select('*')
      .eq('tracking_type', 'tracked')
      .not('min_stock_level', 'is', null)
      .not('quantity', 'is', null)
      .filter('quantity', 'lt', 'min_stock_level')
      .order('name', { ascending: true })

    if (error) {
      throw new Error(`Failed to fetch low stock items: ${error.message}`)
    }

    return data || []
  }

  async getItemsByCategory(category: string, trackingType?: TrackingType): Promise<Item[]> {
    let query = this.supabase
      .from('items')
      .select('*')
      .eq('category', category)
      .order('name', { ascending: true })

    if (trackingType) {
      query = query.eq('tracking_type', trackingType)
    }

    const { data, error } = await query

    if (error) {
      throw new Error(`Failed to fetch items by category: ${error.message}`)
    }

    return data || []
  }

  async getItemStats() {
    const { data: allItems, error: allError } = await this.supabase
      .from('items')
      .select('tracking_type')

    if (allError) {
      throw new Error(`Failed to fetch item stats: ${allError.message}`)
    }

    const { data: lowStockItems, error: lowStockError } = await this.supabase
      .from('items')
      .select('id')
      .eq('tracking_type', 'tracked')
      .not('min_stock_level', 'is', null)
      .not('quantity', 'is', null)
      .filter('quantity', 'lt', 'min_stock_level')

    if (lowStockError) {
      throw new Error(`Failed to fetch low stock stats: ${lowStockError.message}`)
    }

    const stats = {
      total: allItems?.length || 0,
      assets: allItems?.filter(item => item.tracking_type === 'assets').length || 0,
      tracked: allItems?.filter(item => item.tracking_type === 'tracked').length || 0,
      untracked: allItems?.filter(item => item.tracking_type === 'untracked').length || 0,
      lowStock: lowStockItems?.length || 0
    }

    return stats
  }
}

// Server-side functions (for use in Server Components and API routes)
export class ItemsServerService {
  private async getSupabase() {
    return await createServerSupabase()
  }

  async createItem(itemData: ItemInsert): Promise<Item> {
    const user = await requireAuth()
    
    const { data, error } = await this.supabase
      .from('items')
      .insert({
        ...itemData,
        created_by: user.id,
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create item: ${error.message}`)
    }

    return data
  }

  async updateItem(id: string, updates: ItemUpdate): Promise<Item> {
    const user = await requireAuth()

    const { data, error } = await this.supabase
      .from('items')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to update item: ${error.message}`)
    }

    return data
  }

  async deleteItem(id: string): Promise<void> {
    await requireAuth()

    const { error } = await this.supabase
      .from('items')
      .delete()
      .eq('id', id)

    if (error) {
      throw new Error(`Failed to delete item: ${error.message}`)
    }
  }

  async updateItemQuantity(id: string, newQuantity: number, notes?: string): Promise<Item> {
    const user = await requireAuth()

    // Get current item to log the change
    const { data: currentItem, error: fetchError } = await this.supabase
      .from('items')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError) {
      throw new Error(`Failed to fetch current item: ${fetchError.message}`)
    }

    // Update the item
    const { data, error } = await this.supabase
      .from('items')
      .update({
        quantity: newQuantity,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to update item quantity: ${error.message}`)
    }

    // Log the change in history
    await this.logItemChange(
      id,
      'quantity_update',
      { quantity: currentItem.quantity },
      { quantity: newQuantity },
      notes || `Quantity updated from ${currentItem.quantity || 0} to ${newQuantity}`,
      user.id
    )

    return data
  }

  async updateAssetStatus(id: string, newStatus: AssetStatus, location?: string, notes?: string): Promise<Item> {
    const user = await requireAuth()

    // Get current item to log the change
    const { data: currentItem, error: fetchError } = await this.supabase
      .from('items')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError) {
      throw new Error(`Failed to fetch current item: ${fetchError.message}`)
    }

    const updateData: ItemUpdate = {
      status: newStatus,
      updated_at: new Date().toISOString()
    }

    if (location !== undefined) {
      updateData.location = location
    }

    // Update the item
    const { data, error } = await this.supabase
      .from('items')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to update asset status: ${error.message}`)
    }

    // Log the change in history
    await this.logItemChange(
      id,
      'status_update',
      { status: currentItem.status, location: currentItem.location },
      { status: newStatus, location: location || currentItem.location },
      notes || `Status updated from ${currentItem.status || 'unknown'} to ${newStatus}`,
      user.id
    )

    return data
  }

  private async logItemChange(
    itemId: string,
    action: string,
    oldValues: any,
    newValues: any,
    notes: string,
    userId: string
  ): Promise<void> {
    const { error } = await this.supabase
      .from('history')
      .insert({
        item_id: itemId,
        action,
        old_values: oldValues,
        new_values: newValues,
        notes,
        created_by: userId,
        change_type: action
      })

    if (error) {
      console.error('Failed to log item change:', error)
      // Don't throw here - we don't want history logging to block the main operation
    }
  }
}

// Helper functions for business logic
export const ItemsHelper = {
  isLowStock: (item: Item): boolean => {
    if (item.tracking_type !== 'tracked' || !item.min_stock_level || item.quantity === null) {
      return false
    }
    return item.quantity < item.min_stock_level
  },

  needsPurchaseOrder: (item: Item): boolean => {
    return ItemsHelper.isLowStock(item)
  },

  getStatusBadgeColor: (item: Item): string => {
    if (item.tracking_type === 'assets') {
      switch (item.status) {
        case 'in_stock': return 'bg-green-100 text-green-800'
        case 'on_site': return 'bg-blue-100 text-blue-800'
        case 'maintenance': return 'bg-yellow-100 text-yellow-800'
        default: return 'bg-gray-100 text-gray-800'
      }
    } else if (item.tracking_type === 'tracked') {
      if (ItemsHelper.isLowStock(item)) {
        return 'bg-red-100 text-red-800'
      }
      return 'bg-green-100 text-green-800'
    }
    return 'bg-gray-100 text-gray-800'
  },

  getStatusText: (item: Item): string => {
    if (item.tracking_type === 'assets') {
      switch (item.status) {
        case 'in_stock': return 'In Stock'
        case 'on_site': return 'On Site'
        case 'maintenance': return 'Maintenance'
        default: return 'Unknown'
      }
    } else if (item.tracking_type === 'tracked') {
      if (ItemsHelper.isLowStock(item)) {
        return 'Low Stock'
      }
      return 'In Stock'
    } else {
      return 'Untracked'
    }
  },

  formatQuantity: (item: Item): string => {
    if (item.tracking_type === 'assets') {
      return '1 unit'
    }
    if (item.quantity === null) {
      return 'N/A'
    }
    return `${item.quantity} ${item.unit}`
  }
}

// Export instances for easy use
export const itemsClient = new ItemsClientService()
export const itemsServer = new ItemsServerService() 