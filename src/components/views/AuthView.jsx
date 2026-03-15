"use client";

import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Building2, 
  Network, 
  BarChart3, 
  Wrench, 
  ArrowRight, 
  CheckCircle2,
  ShieldCheck,
  Rocket
} from 'lucide-react';

export default function AuthView({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: 'gestor@gestaequipe.com.br',
    password: '1020304050',
    company: '',
    matrix: '',
    level: 'Pleno',
    skills: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulação de delay de rede
    setTimeout(() => {
      setIsLoading(false);
      
      const adminEmail = 'gestor@gestaequipe.com.br';
      const adminPass = '1020304050';

      const isTryingAdmin = formData.email === adminEmail;
      const isAdminPasswordCorrect = formData.password === adminPass;
      
      if (isLogin) {
        // Validação de login
        if (isTryingAdmin) {
          if (isAdminPasswordCorrect) {
            onLogin({
              ...formData,
              name: 'Gestor Admin',
              level: 'Gerente',
              isAdmin: true
            });
          } else {
            setError('Senha administrativa incorreta.');
          }
        } else {
          // Para outros usuários, permite entrar com qualquer senha na simulação
          onLogin({ ...formData, isAdmin: false });
        }
      } else {
        // Cadastro
        if (isTryingAdmin && !isAdminPasswordCorrect) {
            setError('Este email é reservado para administração. Use a senha correta ou outro email.');
        } else {
            onLogin({ ...formData, isAdmin: isTryingAdmin });
        }
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 flex overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-700">
        
        {/* Left Side: Illustration & Value Proposition */}
        <div className="hidden lg:flex w-1/2 bg-slate-900 p-12 flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10"><Rocket size={100} /></div>
                <div className="absolute bottom-20 right-10"><ShieldCheck size={120} /></div>
            </div>

            <div className="relative z-10">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center p-3 shadow-2xl mb-8">
                    <img src="/assets/logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <h2 className="text-4xl font-black text-white tracking-tighter leading-tight mb-6">
                    Sua gestão de equipe <br />
                    <span className="text-blue-500">elevada ao máximo.</span>
                </h2>
                <p className="text-slate-400 text-lg font-medium leading-relaxed">
                    Acompanhe tickets, gerencie prazos e delegue funções com a interface mais rápida do mercado.
                </p>
            </div>

            <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
                        <CheckCircle2 size={20} />
                    </div>
                    <div>
                        <p className="text-white font-bold text-sm uppercase tracking-tight">Performance Real-time</p>
                        <p className="text-slate-500 text-xs">Dados atualizados via CSV em tempo real.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400">
                        <Network size={20} />
                    </div>
                    <div>
                        <p className="text-white font-bold text-sm uppercase tracking-tight">Gestão Multi-Matriz</p>
                        <p className="text-slate-500 text-xs">Conecte diferentes sedes da sua empresa.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
              {isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta Master'}
            </h1>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">
              {isLogin ? 'Acesse o seu Dashboard Operacional' : 'Preencha os dados da sua empresa e perfil'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-xs font-bold animate-in fade-in slide-in-from-top-2">
              <div className="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">!</div>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-4 animate-in slide-in-from-top-4 duration-300">
                <div className="relative group">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    type="text" 
                    required={!isLogin}
                    placeholder="Seu Nome Completo"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all font-bold text-sm"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Empresa"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none text-sm font-bold"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                    />
                  </div>
                  <div className="relative group">
                    <Network size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Matriz"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none text-sm font-bold"
                      value={formData.matrix}
                      onChange={(e) => setFormData({...formData, matrix: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <BarChart3 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none text-sm font-bold appearance-none bg-none"
                      value={formData.level}
                      onChange={(e) => setFormData({...formData, level: e.target.value})}
                    >
                      <option>Junior</option>
                      <option>Pleno</option>
                      <option>Senior</option>
                      <option>Especialista</option>
                      <option>Gerente</option>
                    </select>
                  </div>
                  <div className="relative group">
                    <Wrench size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Skills (ex: SQL, React)"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none text-sm font-bold"
                      value={formData.skills}
                      onChange={(e) => setFormData({...formData, skills: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="relative group">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="email" 
                required
                placeholder="E-mail Corporativo"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all font-bold text-sm"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="relative group">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="password" 
                required
                placeholder="Sua Senha Mestra"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all font-bold text-sm"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-3 active:scale-95 group"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  {isLogin ? 'Entrar no Sistema' : 'Finalizar Cadastro'}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest"
            >
              {isLogin ? 'Não tem conta? Crie uma aqui' : 'Já possui conta? Entre agora'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
