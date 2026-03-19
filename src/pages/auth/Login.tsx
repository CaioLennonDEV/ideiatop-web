import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';
import { toast } from 'sonner';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(4, 'Senha deve ter pelo menos 4 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'allan@neoapp.com.br',
      password: 'Jorginho123#',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await api.post('/authenticate', data);
      login(response.data);
      toast.success('Bem-vindo de volta!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Credenciais inválidas. Por favor, verifique seus dados.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
      {/* Vibrant Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[480px] relative z-10"
      >
        <div className="bg-white rounded-[3rem] p-10 md:p-14 space-y-10 shadow-2xl shadow-primary/5 border border-border">
          <div className="text-center space-y-4">
            <div className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/20 mb-2">
              <span className="text-primary text-[10px] font-black uppercase tracking-widest">Área Legal</span>
            </div>
            <h1 className="text-5xl font-black text-foreground tracking-tight">Login.</h1>
            <p className="text-muted-foreground font-medium">Acesse sua conta para gerenciar seu cardápio</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-3">
              <label className="text-xs font-black text-muted-foreground ml-1 uppercase tracking-widest">Seu E-mail</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary group-focus-within:scale-110 transition-transform" />
                <input
                  {...register('email')}
                  type="email"
                  className="w-full bg-muted/30 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30 focus:bg-white transition-all font-bold"
                  placeholder="seu@email.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1 ml-1 font-black">{errors.email.message}</p>}
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black text-muted-foreground ml-1 uppercase tracking-widest">Sua Senha</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary group-focus-within:scale-110 transition-transform" />
                <input
                  {...register('password')}
                  type="password"
                  className="w-full bg-muted/30 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30 focus:bg-white transition-all font-bold"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1 ml-1 font-black">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-secondary hover:bg-secondary/90 text-foreground px-8 py-5 rounded-[2rem] font-black flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-secondary/20 group text-lg"
            >
              {isSubmitting ? 'Entrando...' : 'Entrar Agora'}
              {!isSubmitting && <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="pt-8 border-t border-border/50 text-center">
            <p className="text-muted-foreground text-sm font-medium">
              Esqueceu a senha? <span className="text-primary hover:underline cursor-pointer font-black">Recuperar</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
