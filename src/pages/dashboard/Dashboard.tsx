import { useState, useEffect } from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { useAuth } from '../../contexts/AuthContext';
import { formatCurrency } from '../../lib/utils';
import { 
  Plus, 
  Settings, 
  LogOut, 
  Package, 
  Users, 
  LayoutDashboard,
  Search,
  MoreVertical,
  Edit,
  Trash2
} from 'lucide-react';
import type { Product } from '../../types';
import api from '../../lib/api';
import { toast } from 'sonner';
import { ProductForm } from '../../components/dashboard/ProductForm';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data.content || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to mock if API fails or not running
        setProducts([
           {
            uid: '1',
            name: 'Pizza Margherita',
            description: 'Molho de tomate, mussarela premium.',
            price: 45.90,
            productType: { uid: 'pizzas', name: 'Pizzas' },
            clientUid: 'client1',
            createdAt: '',
            updatedAt: ''
          }
        ]);
      } finally {
        // setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (uid: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await api.delete(`/products/${uid}`);
        setProducts(products.filter(p => p.uid !== uid));
        toast.success('Produto excluído com sucesso');
      } catch (error) {
        toast.error('Erro ao excluir produto');
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 min-h-[85vh]">
      {/* Sidebar */}
      <aside className="w-full md:w-64 space-y-6">
        <GlassCard className="p-6 sticky top-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">
              {user?.name?.[0].toUpperCase()}
            </div>
            <div>
              <h2 className="text-white font-bold truncate w-32">{user?.name}</h2>
              <p className="text-white/40 text-xs uppercase tracking-wider">{user?.role === 'ADMIN' ? 'Administrador' : 'Usuário'}</p>
            </div>
          </div>

          <nav className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 transition-all">
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 transition-all">
              <Package className="w-5 h-5" />
              <span className="font-medium">Meus Produtos</span>
            </button>
            {user?.role === 'ADMIN' && (
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 transition-all">
                <Users className="w-5 h-5" />
                <span className="font-medium">Usuários</span>
              </button>
            )}
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 transition-all">
              <Settings className="w-5 h-5" />
              <span className="font-medium">Configurações</span>
            </button>
            <button 
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all mt-8"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sair</span>
            </button>
          </nav>
        </GlassCard>
      </aside>

      {/* Main Content */}
      <main className="flex-1 space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Produtos</h1>
            <p className="text-white/40">Gerencie seu cardápio com facilidade</p>
          </div>
          <button 
            onClick={() => {
              setEditingProduct(null);
              setShowForm(true);
            }}
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/80 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Novo Produto
          </button>
        </header>

        <GlassCard className="p-0 overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center gap-4 bg-white/5">
            <Search className="w-5 h-5 text-white/30" />
            <input 
              type="text" 
              placeholder="Filtrar por nome..." 
              className="bg-transparent border-none focus:ring-0 text-white placeholder:text-white/30 w-full font-light"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-white/40 border-b border-white/10">
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Produto</th>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Categoria</th>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Preço</th>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.length > 0 ? products.map((product) => (
                  <tr key={product.uid} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white group-hover:text-primary transition-colors">{product.name}</div>
                      <div className="text-xs text-white/40 truncate w-48 font-light">{product.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-md bg-white/5 text-white/60 text-xs border border-white/10">
                        {product.productType.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-white">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="px-6 py-4 text-white/40">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            setEditingProduct(product);
                            setShowForm(true);
                          }}
                          className="p-2 hover:bg-white/10 rounded-lg transition-all hover:text-white"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.uid)}
                          className="p-2 hover:bg-red-400/10 rounded-lg transition-all hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-20 text-center text-white/20 italic font-light">
                      Nenhum produto encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </main>

      {showForm && (
        <ProductForm 
          product={editingProduct}
          onSave={async (data) => {
            try {
              if (editingProduct) {
                await api.put(`/products/${editingProduct.uid}`, data);
                toast.success('Produto atualizado com sucesso');
              } else {
                await api.post('/products', data);
                toast.success('Produto criado com sucesso');
              }
              setShowForm(false);
              // In real app, we would re-fetch or update state
              window.location.reload(); 
            } catch (error) {
              toast.error('Erro ao salvar produto');
            }
          }}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};
