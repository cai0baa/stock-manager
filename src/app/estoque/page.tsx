// No authentication needed
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HardHat, Package, History, ShoppingCart, Search, Plus, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { itemsClient, ItemsHelper } from '@/lib/db-items'

function getStatusBadge(item: any) {
  const statusText = ItemsHelper.getStatusText(item)
  const colorClass = ItemsHelper.getStatusBadgeColor(item)
  return <span className={`px-2 py-1 text-xs rounded-full ${colorClass}`}>{statusText}</span>
}

function getTrackingTypeBadge(trackingType: string) {
  switch (trackingType) {
    case 'assets':
      return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Ativo</span>
    case 'tracked':
      return <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">Controlado</span>
    case 'untracked':
      return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Não Controlado</span>
    default:
      return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">-</span>
  }
}

export default async function EstoquePage() {

  // Fetch data from Supabase
  let itemsData: any[] = []
  try {
    itemsData = await itemsClient.getAllItems()
  } catch (error) {
    console.error('Failed to fetch items:', error)
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
          <a href="/estoque" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
            <Package className="h-5 w-5" />
            <span className="font-medium">Estoque</span>
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

        {/* Footer placeholder */}
        <div className="p-4 border-t border-slate-200 text-xs text-slate-500">Guest mode</div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header with Actions */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Estoque</h2>
              <p className="text-sm text-slate-600 mt-1">Gerenciamento de materiais e ferramentas</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Filtrar</span>
              </Button>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Novo Item</span>
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
                  placeholder="Buscar por nome, categoria ou descrição..." 
                  className="pl-10"
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Todos</Button>
                <Button variant="outline" size="sm">Ativos</Button>
                <Button variant="outline" size="sm">Controlados</Button>
                <Button variant="outline" size="sm">Não Controlados</Button>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <Card>
            <CardHeader>
              <CardTitle>Itens do Estoque</CardTitle>
              <CardDescription>
                Dados da tabela 'items' do Supabase ({itemsData.length} itens)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Nome</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Categoria</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Tipo</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Quantidade</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Local</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Atualizado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemsData.map((item: any) => (
                      <tr key={item.id} className="border-b hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-slate-900">{item.name}</p>
                            <p className="text-sm text-slate-500 truncate max-w-xs">{item.description}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-slate-700">{item.category}</span>
                        </td>
                        <td className="py-3 px-4">
                          {getTrackingTypeBadge(item.tracking_type)}
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-slate-700">
                            {ItemsHelper.formatQuantity(item)}
                          </span>
                          {item.min_stock_level && (
                            <p className="text-xs text-slate-500">Min: {item.min_stock_level}</p>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {getStatusBadge(item)}
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-slate-600">{item.location}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-slate-500">
                            {new Date(item.updated_at).toLocaleDateString('pt-BR')}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Table Footer */}
              <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                <p>Mostrando {itemsData.length} de {itemsData.length} itens</p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" disabled>Anterior</Button>
                  <Button variant="outline" size="sm" disabled>Próximo</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
