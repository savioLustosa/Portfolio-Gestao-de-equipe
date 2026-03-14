"use client";

import React, { useState } from 'react';
import { Bug, Send, AlertTriangle, Lightbulb, MessageSquare } from 'lucide-react';

export default function BugView({ tasks }) {
  const [formData, setFormData] = useState({ title: '', description: '', severity: 'Medium' });
  const bugs = tasks.filter(t => t.status === 'Incidente');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-500">
      {/* Report Form */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Bug size={24} className="text-red-500" />
            Reportar Bug ou Sugestão
          </h3>
          <p className="text-sm text-slate-500">Ajude-nos a melhorar o sistema enviando feedbacks detalhados.</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Título do Problema</label>
            <input 
              type="text" 
              placeholder="Ex: Erro ao carregar Dashboard de Analytics"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tipo</label>
              <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm">
                <option>Bug Crítico</option>
                <option>Melhoria Técnico</option>
                <option>Sugestão UX</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Severidade</label>
              <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm">
                <option>Alta</option>
                <option>Média</option>
                <option>Baixa</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Descrição detalhada</label>
            <textarea 
              rows="4"
              placeholder="Descreva os passos para reproduzir o erro..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm resize-none"
            ></textarea>
          </div>

          <button className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-200">
            <Send size={18} />
            Enviar Report
          </button>
        </div>
      </div>

      {/* List of Open Bugs */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Incidentes em Aberto ({bugs.length})</h3>
          <span className="text-xs font-medium text-blue-600 hover:underline cursor-pointer">Ver Histórico</span>
        </div>

        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 no-scrollbar">
          {bugs.map(bug => (
            <div key={bug.id} className="bg-red-50/50 p-5 rounded-2xl border border-red-100 hover:shadow-md transition-all group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-xl text-red-500 shadow-sm group-hover:bg-red-500 group-hover:text-white transition-all">
                  <AlertTriangle size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-slate-900">INC-{bug.id}: {bug.name}</h4>
                    <span className="text-[10px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">ALTA</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-3 line-clamp-2">{bug.description}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                      <User size={12} /> {bug.owner}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                      <MessageSquare size={12} /> 3 Comments
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {bugs.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full py-20 text-slate-400 space-y-3">
              <CheckCircle2 size={48} className="text-slate-200" />
              <p className="text-sm font-medium">Nenhum incidente ativo. Bom trabalho!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
