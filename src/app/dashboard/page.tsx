import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HardHat, Package, History, ShoppingCart, AlertTriangle, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SupabaseTest from '@/components/SupabaseTest'
import { itemsClient } from '@/lib/db-items'
import { historyClient } from '@/lib/db-history'
import { requireAuth } from '@/lib/simple-auth'

// Mock helper functions
const HistoryHelper = {
  getActionIcon: (entry: any): string => {
    switch (entry.change_type) {
      case 'item_creation': return '➕'
      case 'stock_update': return '📦'
      case 'status_change': return '🔄'
      default: return '📝'
    }
  },
  getActionColor: (entry: any): string => {
    switch (entry.change_type) {
      case 'item_creation': return 'text-green-600'
      case 'stock_update': return 'text-blue-600' 
      case 'status_change': return 'text-amber-600'
      default: return 'text-gray-600'
    }
  },
  formatAction: (entry: any): string => {
    return entry.action
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

export default async function DashboardPage() {
  // Require authentication for this page
  const user = await requireAuth()

  // Fetch real data
  let stats = { total: 0, assets: 0, tracked: 0, untracked: 0, lowStock: 0 }
  let recentActivity: any[] = []

  try {
    stats = await itemsClient.getItemStats()
  } catch (error) {
    console.error('Failed to load stats:', error)
  }

  try {
    recentActivity = await historyClient.getRecentActivity(10)
  } catch (error) {
    console.error('Failed to load recent activity:', error)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        {/* Logo/Header */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <HardHat className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">Stock Manager</h1>
              <p className="text-xs text-slate-500">Construction</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          <a href="/dashboard" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
            <Package className="h-5 w-5" />
            <span className="font-medium">Dashboard</span>
          </a>
          <a href="/estoque" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <Package className="h-5 w-5" />
            <span>Estoque</span>
          </a>
          <a href="/historico" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <History className="h-5 w-5" />
            <span>Histórico</span>
          </a>
          <a href="/pedidos" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <ShoppingCart className="h-5 w-5" />
            <span>Pedidos</span>
          </a>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-amber-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">{user.email}</p>
              <p className="text-xs text-slate-500">Administrator</p>
            </div>
          </div>
          <form action="/api/auth/signout" method="post">
            <Button 
              type="submit"
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-center space-x-2 text-slate-600 hover:text-slate-900"
            >
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header with Actions */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Dashboard</h2>
              <p className="text-sm text-slate-600 mt-1">Visão geral do sistema de estoque</p>
            </div>
            <div />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Welcome to your Dashboard
          </h2>
          <p className="text-slate-600">
            Manage your construction materials, track inventory, and oversee purchase orders.
          </p>
        </div>

        {/* Supabase Connection Test */}
        <div className="mb-8">
          <SupabaseTest />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                Items in inventory
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assets</CardTitle>
              <HardHat className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.assets}</div>
              <p className="text-xs text-muted-foreground">
                Trackable tools
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">{stats.lowStock}</div>
              <p className="text-xs text-muted-foreground">
                Items need restocking
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tracked Items</CardTitle>
              <Package className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.tracked}</div>
              <p className="text-xs text-muted-foreground">
                Consumable materials
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Inventory</CardTitle>
                  <CardDescription>
                    Manage stock levels and item details
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">
                View, add, and update construction materials in your inventory.
              </p>
              <Button variant="outline" className="w-full" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <ShoppingCart className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle>Purchase Orders</CardTitle>
                  <CardDescription>
                    Create and track purchase orders
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">
                Generate purchase orders and track delivery status.
              </p>
              <Button variant="outline" className="w-full" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <History className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle>History</CardTitle>
                  <CardDescription>
                    View transaction history and changes
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">
                Track all inventory movements and modifications.
              </p>
              <Button variant="outline" className="w-full" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest updates to your inventory system
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentActivity.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <History className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                  <p>No recent activity</p>
                  <p className="text-sm">
                    Activity will appear here once you start using the system
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg border bg-slate-50">
                      <div className="text-lg">{HistoryHelper.getActionIcon(activity)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium ${HistoryHelper.getActionColor(activity)}`}>
                            {HistoryHelper.formatAction(activity)}
                          </p>
                          <p className="text-xs text-slate-500">
                            {HistoryHelper.formatTimestamp(activity.created_at)}
                          </p>
                        </div>
                        <p className="text-sm text-slate-600 mt-1">
                          {activity.notes}
                        </p>
                        {activity.item_name && (
                          <p className="text-xs text-slate-500 mt-1">
                            Item: {activity.item_name}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="text-center">
                    <Button variant="outline" size="sm" disabled>
                      View All Activity (Coming Soon)
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        </main>
      </div>
    </div>
  )
}