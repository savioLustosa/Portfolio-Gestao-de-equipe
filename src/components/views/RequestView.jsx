"use client";

import React, { useState } from 'react';
import { HelpCircle, User, Building, MessageSquare, Send, CheckCircle } from 'lucide-react';

export default function RequestView() {
  const [department, setDepartment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const departments = [
    { id: 'eng', name: 'Engenharia de Dados', owners: ['Carlos Silva', 'Ana Jones'] },
    { id: 'devops', name: 'Infraestrutura / Cloud', owners: ['Savio Dev', 'Marcos DevOps'] },
    { id: 'sec', name: 'Segurança / SecOps', owners: ['Julia Cyber', 'Bob Sec'] }
  ];

  const currentDept = departments.find(d => d.id === department);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
        <div className="bg-slate-900 p-10 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-500 rounded-2xl shadow-lg shadow-blue-500/30">
              <HelpCircle size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">Portal de Solicitações</h2>
              <p className="text-slate-400 font-medium">Internal Helpdesk & Service Request</p>
            </div>
          </div>
        </div>

        <div className="p-10">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Building size={12} /> Departamento Destino
                  </label>
                  <select 
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-sm font-medium"
                  >
                    <option value="">Selecione um depto...</option>
                    {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </div>

                <div className={`space-y-2 transition-all duration-500 ${!department ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <User size={12} /> Solicitante Responsável
                  </label>
                  <select className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-sm font-medium">
                    <option value="">Selecione o técnico...</option>
                    {currentDept?.owners.map(owner => <option key={owner} value={owner}>{owner}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Prioridade do Negócio</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Baixa', 'Média', 'Alta'].map(p => (
                      <button 
                        key={p} 
                        type="button"
                        className="py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 hover:bg-slate-50 hover:border-blue-300 transition-all"
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
                    <MessageSquare size={12} /> Escopo da Solicitação
                  </label>
                  <textarea 
                    rows="8"
                    placeholder="Descreva o que você precisa, contexto técnico e prazos sugeridos..."
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-sm font-medium resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={!department}
                  className="w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-200 mt-2"
                >
                  <Send size={20} />
                  Criar Solicitação
                </button>
              </div>
            </form>
          ) : (
            <div className="py-20 flex flex-col items-center text-center space-y-6 animate-in zoom-in-95">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle size={48} />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">Solicitação Enviada!</h3>
                <p className="text-slate-500 mt-2">Um novo ticket foi gerado no workspace de {currentDept?.name}.</p>
              </div>
              <button 
                onClick={() => {setSubmitted(false); setDepartment('');}}
                className="text-sm font-bold text-blue-600 hover:underline"
              >
                Fazer novo pedido
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
