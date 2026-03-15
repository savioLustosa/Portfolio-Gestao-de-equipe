"use client";

import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Activity,
  X,
  Search,
  FileSpreadsheet
} from 'lucide-react';

export default function DashboardView({ tasks, team = [] }) {
  const [showFullLog, setShowFullLog] = useState(false);
  const [logSearch, setLogSearch] = useState('');

  const stats = [
    { label: 'Total de Tarefas', value: tasks.length, icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Em Produção', value: tasks.filter(t => t.status === 'Em Produção').length, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Incidentes', value: tasks.filter(t => t.status === 'Incidente').length, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Time de Elite', value: team.length, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const uniqueGroups = Array.from(new Set(tasks.map(t => t.group))).slice(0, 4);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={20} />
              </div>
              <Activity size={16} className="text-slate-300" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h4 className="text-3xl font-black text-slate-900">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Card */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-2 uppercase tracking-tight">
            <TrendingUp size={20} className="text-blue-500" />
            Performance por Workspace
          </h3>
          <div className="space-y-8">
            {uniqueGroups.map(group => {
              const groupTasks = tasks.filter(t => t.group === group);
              const done = groupTasks.filter(t => t.status === 'Em Produção').length;
              const percent = groupTasks.length ? Math.round((done / groupTasks.length) * 100) : 0;
              
              return (
                <div key={group} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Contexto</span>
                        <span className="text-sm font-bold text-slate-800">{group}</span>
                    </div>
                    <span className="text-sm font-black text-blue-600">{percent}%</span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(37,99,235,0.3)]"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl shadow-blue-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Activity size={120} />
          </div>
          <h3 className="text-lg font-black mb-8 flex items-center gap-2 text-white uppercase tracking-tight relative z-10">
            <Clock size={20} className="text-blue-400" />
            Log de Operações
          </h3>
          <div className="space-y-8 relative z-10">
            {tasks.slice(0, 4).map((task, i) => (
              <div key={i} className="flex gap-4 group cursor-pointer">
                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 group-hover:scale-150 transition-transform ${
                    task.status === 'Em Produção' ? 'bg-green-500' : 
                    task.status === 'Incidente' ? 'bg-red-500' : 'bg-blue-500'
                }`}></div>
                <div>
                  <p className="text-sm font-medium text-slate-300 leading-snug">
                    <span className="font-bold text-white uppercase text-xs">{task.owner}</span> atualizou <span className="text-blue-400 font-bold">#{task.id}</span> para <span className="text-slate-100 font-bold">{task.status}</span>
                  </p>
                  <p className="text-[9px] text-slate-500 mt-1 uppercase font-black tracking-widest">Sincronizado via CSV</p>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setShowFullLog(true)}
            className="w-full mt-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black transition-all uppercase tracking-[0.2em] text-blue-400"
          >
            Ver Auditoria Completa
          </button>
        </div>
      </div>

      {/* Modal de Auditoria Completa */}
      {showFullLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowFullLog(false)}></div>
          
          <div className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
            {/* Modal Header */}
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-900 rounded-2xl text-white shadow-xl">
                  <FileSpreadsheet size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Auditoria de Operações</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rastreabilidade Total via Sincronização CSV</p>
                </div>
              </div>
              <button 
                onClick={() => setShowFullLog(false)}
                className="p-3 hover:bg-slate-200 rounded-full text-slate-400 transition-all active:scale-95"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Search/Filter */}
            <div className="px-8 py-4 border-b border-slate-50 flex items-center gap-3">
              <Search size={18} className="text-slate-400" />
              <input 
                type="text"
                placeholder="Filtrar por nome, responsável ou ID..."
                className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-slate-700"
                value={logSearch}
                onChange={(e) => setLogSearch(e.target.value)}
              />
            </div>

            {/* Modal Content - Scrollable List */}
            <div className="flex-1 overflow-y-auto p-8 space-y-4 custom-scrollbar bg-slate-50/30">
              {tasks
                .filter(t => 
                  !logSearch || 
                  t.name?.toLowerCase().includes(logSearch.toLowerCase()) ||
                  t.owner?.toLowerCase().includes(logSearch.toLowerCase()) ||
                  t.id?.toString().includes(logSearch)
                )
                .map((task, i) => (
                <div key={i} className="flex items-center gap-6 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg shadow-sm ${
                    task.status === 'Em Produção' ? 'bg-green-100 text-green-600' : 
                    task.status === 'Incidente' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {task.owner?.substring(0,1).toUpperCase()}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Ticket #{task.id}</span>
                      <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md font-bold uppercase">{task.env}</span>
                    </div>
                    <p className="text-sm font-bold text-slate-800 leading-snug">
                      <span className="text-blue-600">{task.owner}</span> atualizou o status para <span className="uppercase text-[11px] font-black">{task.status}</span>
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium italic truncate mt-1">"{task.name}"</p>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-1">Sincronizado</p>
                    <div className="flex items-center gap-1.5 justify-end text-[9px] text-slate-400 font-bold uppercase">
                      <Clock size={10} /> {new Date().toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
              {tasks.length === 0 && (
                <div className="py-20 text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                    <Activity size={32} />
                  </div>
                  <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Nenhuma operação registrada no banco</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Fim da Cadeia de Custódia</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
