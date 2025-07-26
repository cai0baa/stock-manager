import { redirect } from 'next/navigation'
import { getUser, signOutAction } from '@/lib/auth-actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HardHat, Package, History, ShoppingCart, LogOut, User, AlertTriangle } from 'lucide-react'
import { itemsClient } from '@/lib/db-items'
import { historyClient, HistoryHelper } from '@/lib/db-history'

export default async function DashboardPage() {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch dashboard data
  const [stats, recentActivity] = await Promise.all([
    itemsClient.getItemStats().catch(() => ({ total: 0, assets: 0, tracked: 0, untracked: 0, lowStock: 0 })),
    historyClient.getRecentActivity(5).catch(() => [])
  ])

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <HardHat className="h-6 w-6 text-amber-600" />
              </div>
              <h1 className="text-xl font-semibold text-slate-900">
                Construction Stock Manager
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <User className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              <form action={signOutAction}>
                <Button 
                  type="submit"
                  variant="outline" 
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Welcome to your Dashboard
          </h2>
          <p className="text-slate-600">
            Manage your construction materials, track inventory, and oversee purchase orders.
          </p>
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
  )
}