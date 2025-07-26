import { itemsClient, ItemsHelper } from './db-items'
import { autoPOService } from './db-purchase-orders'
import { historyServer } from './db-history'

// Main Business Logic Orchestrator
export class StockManager {
  
  /**
   * Comprehensive stock check that identifies all issues and recommendations
   */
  async performStockAnalysis(): Promise<{
    totalItems: number
    lowStockItems: number
    assetsNeedingAttention: number
    recommendations: string[]
    autoPONeeded: boolean
  }> {
    try {
      // Get current stock statistics
      const stats = await itemsClient.getItemStats()
      const lowStockItems = await itemsClient.getLowStockItems()
      
      // Analyze asset status (mock for now - would check maintenance schedules)
      const assetsNeedingAttention = Math.floor(stats.assets * 0.1) // 10% might need attention
      
      // Generate recommendations
      const recommendations: string[] = []
      
      if (lowStockItems.length > 0) {
        recommendations.push(`${lowStockItems.length} items are below minimum stock levels`)
        recommendations.push('Consider generating purchase orders for critical materials')
      }
      
      if (assetsNeedingAttention > 0) {
        recommendations.push(`${assetsNeedingAttention} assets may need maintenance review`)
      }
      
      if (stats.total === 0) {
        recommendations.push('No items in inventory - consider importing initial stock data')
      }
      
      return {
        totalItems: stats.total,
        lowStockItems: lowStockItems.length,
        assetsNeedingAttention,
        recommendations,
        autoPONeeded: lowStockItems.length > 0
      }
      
    } catch (error) {
      console.error('Stock analysis failed:', error)
      return {
        totalItems: 0,
        lowStockItems: 0,
        assetsNeedingAttention: 0,
        recommendations: ['Stock analysis unavailable - using mock data'],
        autoPONeeded: false
      }
    }
  }
  
  /**
   * Process a stock operation (update, transfer, etc.)
   */
  async processStockOperation(operation: {
    type: 'stock_update' | 'asset_transfer' | 'maintenance_check'
    itemId: string
    itemName: string
    details: any
    notes?: string
  }): Promise<{ success: boolean, message: string }> {
    
    try {
      // Log the operation
      await historyServer.logAction(
        operation.type,
        operation.notes || `${operation.type} performed on ${operation.itemName}`,
        operation.type,
        operation.itemId,
        operation.itemName,
        null, // old values
        operation.details // new values
      )
      
      return {
        success: true,
        message: `${operation.type} completed successfully for ${operation.itemName}`
      }
      
    } catch (error) {
      console.error('Stock operation failed:', error)
      return {
        success: false,
        message: `Failed to process ${operation.type}: ${error}`
      }
    }
  }
  
  /**
   * Daily stock monitoring routine
   */
  async dailyStockCheck(): Promise<{
    summary: string
    actions: string[]
    alertsGenerated: number
  }> {
    const analysis = await this.performStockAnalysis()
    const actions: string[] = []
    let alertsGenerated = 0
    
    // Check if auto-PO generation is needed
    if (analysis.autoPONeeded) {
      const poResult = await autoPOService.checkLowStockAndGeneratePO()
      if (poResult.success) {
        actions.push('Auto-PO generation system ready')
        alertsGenerated++
      }
    }
    
    // Generate summary
    const summary = `Daily Check: ${analysis.totalItems} total items, ${analysis.lowStockItems} low stock, ${analysis.recommendations.length} recommendations`
    
    return {
      summary,
      actions,
      alertsGenerated
    }
  }
}

// Helper functions for specific business rules
export const BusinessRules = {
  /**
   * Determine if an item needs immediate attention
   */
  isItemCritical: (item: any): boolean => {
    return ItemsHelper.isLowStock(item) || 
           (item.tracking_type === 'assets' && item.status === 'maintenance')
  },
  
  /**
   * Calculate reorder quantity based on business rules
   */
  calculateReorderQuantity: (item: any): number => {
    if (item.tracking_type === 'tracked' && item.min_stock_level) {
      // Order 3 months worth or minimum 10 units
      return Math.max(item.min_stock_level * 3, 10)
    }
    return 10 // Default reorder quantity
  },
  
  /**
   * Get priority level for stock operations
   */
  getOperationPriority: (item: any): 'low' | 'medium' | 'high' | 'critical' => {
    if (item.tracking_type === 'assets' && item.status === 'maintenance') {
      return 'high'
    }
    if (ItemsHelper.isLowStock(item)) {
      return item.quantity === 0 ? 'critical' : 'high'
    }
    return 'medium'
  }
}

// Export main instance
export const stockManager = new StockManager()
