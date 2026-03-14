"use client";

import React from 'react';
import { 
  X, 
  MessageSquare, 
  Paperclip, 
  Github, 
  CheckCircle2, 
  Clock, 
  User, 
  Tag, 
  AlertCircle 
} from 'lucide-react';
import { statusColors, priorityColors } from '@/lib/mockData';

export default function TaskDetailPanel({ task, onClose, onSave }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end transition-all">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>
      
      {/* Panel */}
      <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span className="text-slate-900">SyncSaaS</span>
            <span>/</span>
            <span>{task.group}</span>
            <span>/</span>
            <span>#{task.id}</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-10">
          {/* Title and Badge Section */}
          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {task.name}
            </h2>
            <div className="flex flex-wrap gap-2">
              <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${statusColors[task.status]}`}>
                {task.status}
              </span>
              <span className={`px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 border border-slate-200 text-slate-600 ${priorityColors[task.priority]}`}>
                Prioridade {task.priority}
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-50 border border-indigo-100 text-indigo-700">
                {task.env}
              </span>
            </div>
          </div>

          {/* Grid Information */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <User size={12} /> Responsável
              </label>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-200 to-slate-100 border border-white shadow-sm flex items-center justify-center font-bold text-xs">
                  {task.owner.substring(0,2).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-slate-700">{task.owner}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Clock size={12} /> Data de Entrega
              </label>
              <div className="text-sm font-medium text-slate-700">
                {new Date(task.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Descrição detalhada</label>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-600 leading-relaxed min-h-[120px]">
              {task.description || "Nenhuma descrição fornecida."}
            </div>
          </div>

          {/* GitHub / Tech Context */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Github size={12} /> Vínculos Técnicos
            </label>
            <div className="border border-slate-200 rounded-xl p-4 flex items-center justify-between hover:border-blue-300 transition-colors group cursor-pointer bg-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <Github size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Pull Request de Integração</p>
                  <p className="text-[11px] text-blue-500 hover:underline">{task.gitPr || 'Aguardando abertura de PR'}</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-green-50 text-green-600 text-[10px] font-bold border border-green-100">
                {task.gitStatus || 'Waiting'}
              </span>
            </div>
          </div>

          {/* Comments Section (Mocked) */}
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <MessageSquare size={12} /> Discussão (2)
            </label>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex-shrink-0 flex items-center justify-center font-bold text-[10px]">SV</div>
                <div className="bg-slate-50 p-3 rounded-2xl rounded-tl-none border border-slate-100 text-xs text-slate-600">
                  <p className="font-bold text-slate-900 mb-1">Savio Dev <span className="text-[10px] font-normal text-slate-400 ml-2">Há 2 horas</span></p>
                  O deploy na infraestrutura de testes foi concluído. Falta apenas validar o consumo de memória.
                </div>
              </div>
            </div>
            
            {/* Comment Input */}
            <div className="flex gap-3 mt-6">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0"></div>
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  placeholder="Escreva um comentário..."
                  className="w-full text-xs px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                  <CheckCircle2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-red-500 transition-colors">
            <AlertCircle size={14} />
            Marcar como Impedimento
          </button>
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-lg transition-all"
            >
              Cancelar
            </button>
            <button 
              onClick={() => onSave(task)}
              className="px-6 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-all shadow-lg"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
