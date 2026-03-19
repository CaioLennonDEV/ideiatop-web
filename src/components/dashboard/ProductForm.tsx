import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { GlassCard } from '../ui/GlassCard';
import { X, Save } from 'lucide-react';
import type { Product } from '../../types';

const productSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  price: z.number().min(0.01, 'Preço deve ser maior que zero'),
  category: z.string().min(1, 'Selecione uma categoria'),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  product?: Product | null;
  onSave: (data: ProductFormData) => void;
  onClose: () => void;
}

export const ProductForm = ({ product, onSave, onClose }: ProductFormProps) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product ? {
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.productType.uid,
    } : undefined,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl">
        <GlassCard className="p-8 space-y-6 relative overflow-visible">
          <button 
            onClick={onClose}
            className="absolute -top-3 -right-3 p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-2xl font-bold text-white">
            {product ? 'Editar Produto' : 'Novo Produto'}
          </h2>

          <form onSubmit={handleSubmit(onSave)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 col-span-2">
              <label className="text-sm text-white/60 font-medium ml-1">Nome do Produto</label>
              <input
                {...register('name')}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-light"
                placeholder="Ex: Pizza Calabresa"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1 ml-1">{errors.name.message}</p>}
            </div>

            <div className="space-y-2 col-span-2">
              <label className="text-sm text-white/60 font-medium ml-1">Descrição</label>
              <textarea
                {...register('description')}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-light resize-none"
                placeholder="Descreva os ingredientes e detalhes..."
              />
              {errors.description && <p className="text-red-400 text-xs mt-1 ml-1">{errors.description.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/60 font-medium ml-1">Preço (R$)</label>
              <input
                {...register('price', { valueAsNumber: true })}
                type="number"
                step="0.01"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-light"
                placeholder="0,00"
              />
              {errors.price && <p className="text-red-400 text-xs mt-1 ml-1">{errors.price.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/60 font-medium ml-1">Categoria</label>
              <select
                {...register('category')}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-light appearance-none"
              >
                <option value="" className="bg-slate-900">Selecione...</option>
                <option value="pizzas" className="bg-slate-900">Pizzas</option>
                <option value="lanches" className="bg-slate-900">Lanches</option>
                <option value="bolos" className="bg-slate-900">Bolos</option>
                <option value="outros" className="bg-slate-900">Outros</option>
              </select>
              {errors.category && <p className="text-red-400 text-xs mt-1 ml-1">{errors.category.message}</p>}
            </div>

            <div className="col-span-2 pt-4 border-t border-white/10 flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-xl text-white/60 hover:bg-white/5 transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};
