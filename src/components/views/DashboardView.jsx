"use client";

import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Activity
} from 'lucide-react';

export default function DashboardView({ tasks }) {
  const stats = [
    { label: 'Total de Tarefas', value: tasks.length, icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Em Produção', value: tasks.filter(t => t.status === 'Em Produção').length, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Incidentes', value: tasks.filter(t => t.status === 'Incidente').length, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Membros Ativos', value: 4, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

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
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
              <h4 className="text-2xl font-bold text-slate-900">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Card */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-blue-500" />
            Progresso Geral do Workspace
          </h3>
          <div className="space-y-6">
            {['Data & Analytics', 'DevOps & Infra'].map(group => {
              const groupTasks = tasks.filter(t => t.group === group);
              const done = groupTasks.filter(t => t.status === 'Em Produção').length;
              const percent = groupTasks.length ? Math.round((done / groupTasks.length) * 100) : 0;
              
              return (
                <div key={group} className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-slate-700">{group}</span>
                    <span className="text-slate-500">{percent}%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl shadow-slate-200">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
            <Clock size={20} className="text-blue-400" />
            Atividade Recente
          </h3>
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-4 group cursor-pointer">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0 group-hover:scale-150 transition-transform"></div>
                <div>
                  <p className="text-sm font-medium text-slate-200">
                    <span className="font-bold text-white">Savio</span> moveu <span className="text-blue-400">#432</span> para Homologação
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-widest">Há 15 minutos</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-xs font-bold transition-all uppercase tracking-widest">
            Ver Log Completo
          </button>
        </div>
      </div>
    </div>
  );
}
