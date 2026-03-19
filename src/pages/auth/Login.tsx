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
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[480px] relative z-10"
      >
        <div className="pro-card p-10 md:p-14 space-y-10">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold text-foreground">Acesso Restrito</h1>
            <p className="text-muted-foreground font-light italic">Gestão de Experiência Gastronômica</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">E-mail Corporativo</label>
              <div className="relative">
                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <input
                  {...register('email')}
                  type="email"
                  className="w-full bg-transparent border-b border-border py-4 pl-8 pr-4 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary transition-all font-light"
                  placeholder="exemplo@empresa.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-[10px] mt-1 ml-1 font-bold italic">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <input
                  {...register('password')}
                  type="password"
                  className="w-full bg-transparent border-b border-border py-4 pl-8 pr-4 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary transition-all font-light"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="text-red-500 text-[10px] mt-1 ml-1 font-bold italic">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="pro-button w-full flex items-center justify-center gap-3 mt-4"
            >
              {isSubmitting ? 'Verificando...' : 'Entrar no Sistema'}
              {!isSubmitting && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <div className="pt-6 border-t border-border mt-10">
            <p className="text-center text-muted-foreground text-xs font-light">
              Problemas com acesso? <span className="text-primary hover:underline cursor-pointer font-bold">Suporte Técnico</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
