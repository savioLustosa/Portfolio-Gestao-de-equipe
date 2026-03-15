"use client";

import React, { useState } from 'react';
import { HelpCircle, User, MessageSquare, Send, CheckCircle, Tag, Calendar, Layers } from 'lucide-react';

export default function RequestView({ workspaces = [], team = [] }) {
  const [formData, setFormData] = useState({
    assignee: '',
    workspace: workspaces[0] || 'DEVOPS & INFRA',
    deadline: new Date().toISOString().split('T')[0],
    priority: 'Média',
    scope: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.assignee) return;
    
    setSubmitted(true);
    setTimeout(() => {
        setSubmitted(false);
        setFormData({
            assignee: '',
            workspace: workspaces[0] || 'DEVOPS & INFRA',
            deadline: new Date().toISOString().split('T')[0],
            priority: 'Média',
            scope: ''
        });
    }, 5000);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
        <div className="bg-slate-900 p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <HelpCircle size={150} />
          </div>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="p-3 bg-blue-500 rounded-2xl shadow-lg shadow-blue-500/30">
              <HelpCircle size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white uppercase">Delegar e Priorizar</h2>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Gestão Direta de Equipe — MASTER ADMIN</p>
            </div>
          </div>
        </div>

        <div className="p-10">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <User size={12} /> Responsável na Equipe
                  </label>
                  <select 
                    value={formData.assignee}
                    onChange={(e) => setFormData({...formData, assignee: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-sm font-bold text-slate-700 h-[58px]"
                  >
                    <option value="">Selecione quem fará...</option>
                    {team.map(m => <option key={m.id} value={m.name}>{m.name} ({m.role})</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Layers size={12} /> Workspace (Área de Trabalho)
                  </label>
                  <select 
                    value={formData.workspace}
                    onChange={(e) => setFormData({...formData, workspace: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-sm font-bold text-slate-700 h-[58px] uppercase tracking-tighter"
                  >
                    {workspaces.map(ws => <option key={ws} value={ws}>{ws}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Calendar size={12} /> Prazo Final Acordado
                  </label>
                  <input 
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-sm font-bold text-slate-700 h-[58px]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Tag size={12} /> Prioridade
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Baixa', 'Média', 'Alta'].map(p => (
                      <button 
                        key={p} 
                        type="button"
                        onClick={() => setFormData({...formData, priority: p})}
                        className={`py-3 rounded-xl border text-xs font-black transition-all shadow-sm uppercase tracking-widest ${
                            formData.priority === p 
                            ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' 
                            : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-blue-300 hover:text-blue-600'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <MessageSquare size={12} /> Escopo e Detalhes
                  </label>
                  <textarea 
                    rows="11"
                    placeholder="Instruções claras para o colaborador, links técnicos ou contexto do ticket..."
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-sm font-bold text-slate-700 resize-none shadow-sm"
                    value={formData.scope}
                    onChange={(e) => setFormData({...formData, scope: e.target.value})}
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={!formData.assignee}
                  className="w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-200 uppercase tracking-widest"
                >
                  <Send size={20} />
                  Confirmar Delegação
                </button>
              </div>
            </form>
          ) : (
            <div className="py-20 flex flex-col items-center text-center space-y-6 animate-in zoom-in-95">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle size={48} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Tarefa Delegada!</h3>
                <p className="text-slate-500 mt-2 font-medium">A notificação foi enviada para <span className="text-blue-600 font-bold">{formData.assignee}</span> e o prazo foi registrado.</p>
              </div>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-xs font-black text-blue-600 hover:underline uppercase tracking-widest"
              >
                Delegar outra demanda
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
