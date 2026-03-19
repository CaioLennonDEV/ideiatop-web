import React, { useState, useEffect } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { formatCurrency } from '../lib/utils';
import { ShoppingCart, Search, Filter, Pizza, Utensils, Cake, MoreHorizontal, Hamburger } from 'lucide-react';
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
      {/* Premium Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/banner.png" 
            alt="Banner" 
            className="w-full h-full object-cover opacity-30 blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/40 to-background" />
        </div>
        
        <div className="relative z-10 text-center space-y-4 px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block"
          >
            <span className="text-primary uppercase tracking-[0.4em] text-xs font-bold mb-4 block">Experiência Gastronômica</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-bold text-foreground leading-tight"
          >
            Nossas Seleções
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto font-light italic"
          >
            A fusão perfeita entre tradição e requinte para o seu paladar.
          </motion.p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20 -mt-12 relative z-20">
        {/* Navigation & Search */}
        <div className="nav-blur p-4 rounded-3xl shadow-xl shadow-black/5 flex flex-col lg:flex-row gap-6 items-center mb-12">
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide w-full lg:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`category-pill ${
                  selectedCategory === cat.id 
                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                    : 'bg-white border-border text-muted-foreground hover:bg-muted/50'
                }`}
              >
                <cat.icon className="w-4 h-4 mr-2 inline-block" />
                {cat.name}
              </button>
            ))}
          </div>
          
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
            <input 
              type="text"
              placeholder="Encontre sua delícia desejada..."
              className="w-full bg-muted/20 border-transparent rounded-2xl py-4 pl-12 pr-4 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all font-light"
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
                className="pro-card group flex flex-col h-full overflow-hidden"
              >
                {/* Product Image */}
                <div className="aspect-[4/3] w-full relative overflow-hidden bg-muted/10">
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Pizza className="w-12 h-12 text-muted-foreground/20" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full border border-black/5 shadow-sm">
                    <span className="text-primary font-bold text-sm tracking-tighter">
                      {formatCurrency(product.price)}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-7 space-y-4 flex flex-col flex-1">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary/60">{product.productType.name}</span>
                    <h3 className="text-2xl font-bold text-foreground leading-tight">
                      {product.name}
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1 font-light italic">
                    "{product.description}"
                  </p>

                  <button className="pro-button mt-4 bg-foreground hover:bg-black w-full flex items-center justify-center gap-2 group-active:scale-95">
                    <ShoppingCart className="w-4 h-4" />
                    Adicionar ao Pedido
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Product Detail Modal (Compact Professional Design) */}
      <AnimatePresence>
        {selectedProduct && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg pro-card p-0 overflow-hidden"
            >
              <div className="relative aspect-[16/10]">
                <img src={selectedProduct.imageUrl} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 bg-black/60 text-white rounded-full p-2 hover:bg-black"
                >
                  &times;
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-primary font-bold">{selectedProduct.productType.name}</span>
                    <h2 className="text-3xl font-bold text-foreground">{selectedProduct.name}</h2>
                  </div>
                  <span className="text-3xl font-serif font-bold text-primary">{formatCurrency(selectedProduct.price)}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg">{selectedProduct.description}</p>
                <button className="pro-button w-full flex items-center justify-center gap-3">
                  <ShoppingCart className="w-5 h-5" />
                  Confirmar Adição
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
