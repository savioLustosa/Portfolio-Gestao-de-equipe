"use client";

import React from 'react';
import { statusColors } from '@/lib/mockData';

export default function TimelineView({ tasks }) {
  const groups = Array.from(new Set(tasks.map(t => t.group)));
  
  // Função para simular posição X baseada na data (Mock simplificado)
  const getXPosition = (dateStr) => {
    const day = new Date(dateStr).getDate();
    return (day - 1) * 30; // 30px por dia
  };

  const getWidth = (start, end) => {
    const diff = (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24);
    return Math.max((diff + 1) * 30, 100);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Planejamento Estratégico</h3>
        <div className="flex gap-2">
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> DESENVOLVIMENTO
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                <span className="w-2 h-2 rounded-full bg-green-500"></span> PRODUÇÃO
            </span>
        </div>
      </div>

      <div className="overflow-x-auto p-6">
        <div className="min-w-[1200px] space-y-12">
          {groups.map(group => (
            <div key={group} className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-l-4 border-blue-500 pl-3">
                {group}
              </h4>
              
              <div className="relative h-40 bg-slate-50/50 rounded-xl border border-slate-100 p-4">
                {/* Grade de fundo */}
                <div className="absolute inset-0 flex justify-between px-4">
                    {Array.from({length: 12}).map((_, i) => (
                        <div key={i} className="w-[1px] h-full bg-slate-200/50"></div>
                    ))}
                </div>

                {/* Bars */}
                <div className="relative space-y-3">
                  {tasks.filter(t => t.group === group).map((task, idx) => (
                    <div 
                      key={task.id}
                      className={`h-8 rounded-lg shadow-sm border flex items-center px-3 text-[10px] font-bold text-white transition-all hover:scale-[1.02] cursor-pointer ${
                        task.status === 'Em Produção' ? 'bg-green-500 border-green-600' : 'bg-blue-600 border-blue-700'
                      }`}
                      style={{ 
                        marginLeft: `${getXPosition(task.startDate)}px`,
                        width: `${getWidth(task.startDate, task.date)}px`
                      }}
                    >
                      <span className="truncate">{task.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-400 font-medium text-center uppercase tracking-widest">
        Março 2024 • Visualização de Roadmap
      </div>
    </div>
  );
}
