import { redirect } from 'next/navigation'
import { getUser } from '@/lib/simple-auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HardHat, Package, History, ShoppingCart, LogOut, User, Search, Filter, Calendar } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { historyClient, HistoryHelper } from '@/lib/db-history'

export default async function HistoricoPage() {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch real data from Supabase
  let historyData: any[] = []
  try {
    historyData = await historyClient.getRecentActivity(50)
  } catch (error) {
    console.error('Failed to fetch history:', error)
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
          <a href="/historico" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
            <History className="h-5 w-5" />
            <span className="font-medium">Histórico</span>
          </a>
          <a href="/pedidos" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <ShoppingCart className="h-5 w-5" />
            <span>Pedidos</span>
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
              <h2 className="text-xl font-semibold text-slate-900">Histórico</h2>
              <p className="text-sm text-slate-600 mt-1">Registro de todas as operações do sistema</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Período</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Filtrar</span>
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
                  placeholder="Buscar por item, ação ou usuário..." 
                  className="pl-10"
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Todas</Button>
                <Button variant="outline" size="sm">Estoque</Button>
                <Button variant="outline" size="sm">Status</Button>
                <Button variant="outline" size="sm">Criação</Button>
                <Button variant="outline" size="sm">Pedidos</Button>
              </div>
            </div>
          </div>

          {/* History Table */}
          <Card>
            <CardHeader>
              <CardTitle>Registro de Atividades</CardTitle>
              <CardDescription>
                Visualização da tabela 'history' do Supabase ({historyData.length} registros)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {historyData.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <History className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                  <p>Nenhum registro de histórico encontrado</p>
                  <p className="text-sm">As atividades aparecerão aqui conforme você usar o sistema</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {historyData.map((entry: any) => (
                    <div key={entry.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="text-2xl mt-1">
                        {HistoryHelper.getActionIcon(entry)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`font-medium ${HistoryHelper.getActionColor(entry)}`}>
                            {HistoryHelper.formatAction(entry)}
                          </p>
                          <span className="text-sm text-slate-500">
                            {HistoryHelper.formatTimestamp(entry.created_at)}
                          </span>
                        </div>
                        <p className="text-slate-900 mt-1">{entry.notes}</p>
                        {entry.item_name && (
                          <p className="text-sm text-slate-600 mt-1">
                            Item: <span className="font-medium">{entry.item_name}</span>
                          </p>
                        )}
                        {entry.old_values && entry.new_values && (
                          <div className="mt-2 grid grid-cols-2 gap-4 text-xs">
                            <div className="bg-red-50 p-2 rounded border">
                              <p className="font-medium text-red-700 mb-1">Antes:</p>
                              <pre className="text-red-600">{JSON.stringify(entry.old_values, null, 2)}</pre>
                            </div>
                            <div className="bg-green-50 p-2 rounded border">
                              <p className="font-medium text-green-700 mb-1">Depois:</p>
                              <pre className="text-green-600">{JSON.stringify(entry.new_values, null, 2)}</pre>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                          <span>ID: {entry.id}</span>
                          <span>Usuário: {entry.created_by}</span>
                          <span>Tipo: {entry.change_type}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Table Footer */}
              <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
                <p>Mostrando {historyData.length} de {historyData.length} registros</p>
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
