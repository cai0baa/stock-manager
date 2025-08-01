import { redirect } from 'next/navigation'
import { getUser } from '@/lib/simple-auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HardHat, Package, History, ShoppingCart, LogOut, User, Search, Filter, Plus, Eye } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { purchaseOrdersClient } from '@/lib/db-purchase-orders'

function getStatusBadge(status: string, autoGenerated: boolean = false) {
  const baseClasses = "px-2 py-1 text-xs rounded-full flex items-center space-x-1"
  
  switch (status) {
    case 'draft':
      return (
        <span className={`${baseClasses} bg-gray-100 text-gray-800`}>
          {autoGenerated && <span>🤖</span>}
          <span>Rascunho</span>
        </span>
      )
    case 'ordered':
      return (
        <span className={`${baseClasses} bg-blue-100 text-blue-800`}>
          {autoGenerated && <span>🤖</span>}
          <span>Pedido</span>
        </span>
      )
    case 'received':
      return (
        <span className={`${baseClasses} bg-green-100 text-green-800`}>
          {autoGenerated && <span>🤖</span>}
          <span>Recebido</span>
        </span>
      )
    default:
      return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>-</span>
  }
}

export default async function PedidosPage() {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch real data from Supabase
  let purchaseOrders: any[] = []
  let purchaseOrderItems: any[] = []
  
  try {
    purchaseOrders = await purchaseOrdersClient.getAllPurchaseOrders()
  } catch (error) {
    console.error('Failed to fetch purchase orders:', error)
  }

  try {
    purchaseOrderItems = await purchaseOrdersClient.getAllPurchaseOrderItems()
  } catch (error) {
    console.error('Failed to fetch purchase order items:', error)
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
          <a href="/dashboard" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <Package className="h-5 w-5" />
            <span>Dashboard</span>
          </a>
          <a href="/estoque" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <Package className="h-5 w-5" />
            <span>Estoque</span>
          </a>
          <a href="/historico" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <History className="h-5 w-5" />
            <span>Histórico</span>
          </a>
          <a href="/pedidos" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
            <ShoppingCart className="h-5 w-5" />
            <span className="font-medium">Pedidos</span>
          </a>
        </nav>

        {/* User Section */}
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
              className="w-full flex items-center justify-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
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
              <h2 className="text-xl font-semibold text-slate-900">Pedidos de Compra</h2>
              <p className="text-sm text-slate-600 mt-1">Gerenciamento de ordens de compra e fornecedores</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Filtrar</span>
              </Button>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Novo Pedido</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Search and Filters */}
          <div className="mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Buscar por número, fornecedor ou item..." 
                  className="pl-10"
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Todos</Button>
                <Button variant="outline" size="sm">Rascunho</Button>
                <Button variant="outline" size="sm">Pedidos</Button>
                <Button variant="outline" size="sm">Recebidos</Button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Purchase Orders Table */}
            <Card>
              <CardHeader>
                <CardTitle>Pedidos de Compra</CardTitle>
                <CardDescription>
                  Tabela 'purchase_orders' do Supabase ({purchaseOrders.length} pedidos)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {purchaseOrders.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                    <p>Nenhum pedido de compra encontrado</p>
                    <p className="text-sm">Os pedidos de compra aparecerão aqui quando você criá-los</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-slate-600">Número</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-600">Fornecedor</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-600">Valor Total</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-600">Criado</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-600">Observações</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-600">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {purchaseOrders.map((po: any) => (
                          <tr key={po.id} className="border-b hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-slate-900">{po.po_number}</span>
                                {po.auto_generated && (
                                  <span className="text-xs bg-purple-100 text-purple-700 px-1 rounded">AUTO</span>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-medium text-slate-900">{po.supplier_name || '-'}</p>
                                <p className="text-sm text-slate-500">{po.supplier_email || '-'}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              {getStatusBadge(po.status, po.auto_generated)}
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-medium text-slate-900">
                                {po.total_amount ? `R$ ${po.total_amount.toFixed(2)}` : '-'}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-sm text-slate-600">
                                {new Date(po.created_at).toLocaleDateString('pt-BR')}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-sm text-slate-600 truncate max-w-xs block">
                                {po.notes || '-'}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <Button variant="outline" size="sm" className="flex items-center space-x-1">
                                <Eye className="h-3 w-3" />
                                <span>Ver</span>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Purchase Order Items Table */}
            <Card>
              <CardHeader>
                <CardTitle>Itens dos Pedidos</CardTitle>
                <CardDescription>
                  Tabela 'purchase_order_items' do Supabase ({purchaseOrderItems.length} itens)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {purchaseOrderItems.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <Package className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                    <p>Nenhum item de pedido encontrado</p>
                    <p className="text-sm">Os itens aparecerão aqui quando você adicionar a pedidos de compra</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-slate-600">Pedido</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-600">Item</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-600">Qtd. Solicitada</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-600">Qtd. Recebida</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-600">Preço Unit.</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-600">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {purchaseOrderItems.map((item: any) => {
                          const po = purchaseOrders.find((p: any) => p.id === item.po_id)
                          const total = item.unit_price && item.requested_quantity ? item.unit_price * item.requested_quantity : 0
                          return (
                            <tr key={item.id} className="border-b hover:bg-slate-50 transition-colors">
                              <td className="py-3 px-4">
                                <span className="text-sm font-medium text-blue-600">
                                  {po?.po_number || item.po_id}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <div>
                                  <p className="font-medium text-slate-900">{item.item_name}</p>
                                  <p className="text-sm text-slate-500">{item.item_description || '-'}</p>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <span className="text-sm text-slate-700">{item.requested_quantity}</span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="text-sm text-slate-700">
                                  {item.received_quantity || '-'}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="text-sm text-slate-700">
                                  {item.unit_price ? `R$ ${item.unit_price.toFixed(2)}` : '-'}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="font-medium text-slate-900">
                                  {total > 0 ? `R$ ${total.toFixed(2)}` : '-'}
                                </span>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
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
