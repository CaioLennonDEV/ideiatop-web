import { useState, useEffect } from 'react';
import { formatCurrency } from '../lib/utils';
import { ShoppingCart, Search, Filter, Pizza, Cake, MoreHorizontal, Hamburger } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '../types';

const CATEGORIES = [
  { id: 'all', name: 'Todos', icon: Filter },
  { id: 'pizzas', name: 'Pizzas', icon: Pizza },
  { id: 'lanches', name: 'Lanches', icon: Hamburger },
  { id: 'bolos', name: 'Bolos', icon: Cake },
  { id: 'outros', name: 'Outros', icon: MoreHorizontal },
];

export const PublicMenu = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProducts([
          {
            uid: '1',
            name: 'Pizza Margherita',
            description: 'Molho de tomate de San Marzano, muçarela de búfala premium, manjericão fresco e azeite extra virgem.',
            price: 45.90,
            productType: { uid: 'pizzas', name: 'Pizzas' },
            imageUrl: '/assets/pizza.png',
            clientUid: 'client1',
            createdAt: '',
            updatedAt: ''
          },
          {
            uid: '2',
            name: 'X-Burguer Artesanal',
            description: 'Blend de 180g grelhado no fogo, queijo cheddar inglês derretido, alface crespa e molho secreto no pão brioche.',
            price: 32.50,
            productType: { uid: 'lanches', name: 'Lanches' },
            imageUrl: '/assets/burger.png',
            clientUid: 'client1',
            createdAt: '',
            updatedAt: ''
          },
          {
            uid: '3',
            name: 'Bolo Belga Clássico',
            description: 'Massa úmida de cacau com generoso recheio de brigadeiro gourmet e cobertura de ganache belga.',
            price: 18.00,
            productType: { uid: 'bolos', name: 'Bolos' },
            imageUrl: '/assets/cake.png',
            clientUid: 'client1',
            createdAt: '',
            updatedAt: ''
          }
        ]);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.productType.uid === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Simple & Vibrant Hero Section */}
      <section className="relative px-4 py-20 flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="relative z-10 space-y-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20"
          >
            <span className="text-primary uppercase tracking-widest text-xs font-black">Sabor & Qualidade</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black text-foreground leading-tight"
          >
            Nosso <span className="text-primary italic">Cardápio</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-xl max-w-2xl mx-auto font-medium"
          >
            Escolha sua delícia favorita e faça seu pedido agora mesmo!
          </motion.p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20 relative z-20">
        {/* Navigation & Search - Simplified */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-border flex flex-col lg:flex-row gap-6 items-center mb-12">
          <div className="flex gap-3 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide w-full lg:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`category-pill flex items-center gap-2 px-6 py-3 rounded-2xl transition-all font-bold text-sm ${
                  selectedCategory === cat.id 
                    ? 'bg-secondary text-foreground shadow-lg shadow-secondary/20 scale-105' 
                    : 'bg-muted/30 border-transparent text-muted-foreground hover:bg-muted/60'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.name}
              </button>
            ))}
          </div>
          
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
            <input 
              type="text"
              placeholder="Estou procurando por..."
              className="w-full bg-muted/40 border-transparent rounded-2xl py-4 pl-12 pr-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-bold"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.uid}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden flex flex-col group hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                {/* Product Image */}
                <div className="aspect-[4/3] w-full relative overflow-hidden bg-muted/20">
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Pizza className="w-12 h-12 text-muted-foreground/20" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-primary text-white font-black px-4 py-2 rounded-2xl shadow-lg ring-4 ring-white">
                    {formatCurrency(product.price)}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-8 space-y-4 flex flex-col flex-1">
                  <div className="space-y-1">
                    <span className="text-xs font-black text-primary/80 uppercase tracking-widest">{product.productType.name}</span>
                    <h3 className="text-2xl font-black text-foreground">
                      {product.name}
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1 font-medium">
                    {product.description}
                  </p>

                  <button className="w-full bg-secondary hover:bg-secondary/90 text-foreground px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-secondary/20">
                    <ShoppingCart className="w-5 h-5" />
                    Fazer Pedido
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-md"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-white rounded-[3rem] border border-border shadow-2xl overflow-hidden"
            >
              <div className="relative aspect-[16/10]">
                <img src={selectedProduct.imageUrl} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-6 right-6 bg-white/90 text-foreground rounded-2xl p-2 hover:bg-white shadow-xl font-bold"
                >
                  &times;
                </button>
              </div>
              <div className="p-10 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm font-black text-primary uppercase tracking-widest">{selectedProduct.productType.name}</span>
                    <h2 className="text-4xl font-black text-foreground">{selectedProduct.name}</h2>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg font-medium">{selectedProduct.description}</p>
                <div className="flex items-center justify-between pt-4">
                  <span className="text-3xl font-black text-primary">{formatCurrency(selectedProduct.price)}</span>
                  <button className="bg-secondary text-foreground px-10 py-4 rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl shadow-secondary/20 hover:scale-105 transition-transform active:scale-95">
                    <ShoppingCart className="w-6 h-6" />
                    Adicionar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
