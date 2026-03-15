"use client";

import React from 'react';
import { statusColors, priorityColors } from '@/lib/mockData';
import { User, Calendar, ExternalLink, Hash, AlertCircle, Rocket } from 'lucide-react';

export default function TableView({ tasks, onTaskClick }) {
  // Agrupar tarefas por grupo
  const groups = Array.from(new Set(tasks.map(t => t.group)));

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm border-dashed">
        <Hash size={48} className="text-slate-200 mb-4" />
        <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tight">Nenhum resultado encontrado</h3>
        <p className="text-sm text-slate-500">Tente ajustar seus filtros ou termos de pesquisa.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {groups.map(group => (
        <div key={group} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 uppercase tracking-tight">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              {group}
            </h3>
            <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
              {tasks.filter(t => t.group === group).length} TAREFAS
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tarefa</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Prioridade</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Responsável</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Entrega</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Ambiente</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {tasks.filter(t => t.group === group).map(task => (
                  <tr 
                    key={task.id} 
                    onClick={() => onTaskClick(task)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                          <Hash size={14} />
                        </div>
                        <div>
                          <p className={`text-sm font-semibold group-hover:text-blue-600 transition-colors flex items-center gap-2 ${task.isBlocked ? 'text-red-600' : 'text-slate-800'}`}>
                            {task.isPersonal && <Rocket size={12} className="text-blue-600" />}
                            {task.name}
                            {task.isBlocked && <AlertCircle size={14} className="text-red-500 animate-pulse" title={task.blockReason} />}
                          </p>
                          <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                            {task.gitPr ? (
                              <span className="flex items-center gap-1 text-green-600">
                                <ExternalLink size={10} /> {task.gitStatus}
                              </span>
                            ) : (
                              'Sem Branch'
                            )}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusColors[task.status] || 'bg-slate-100'}`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className={`text-xs font-medium flex items-center gap-1.5 ${priorityColors[task.priority]}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${priorityColors[task.priority].replace('text', 'bg')}`}></span>
                        {task.priority}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold">
                          {task.owner.substring(0,2).toUpperCase()}
                        </div>
                        {task.owner}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Calendar size={14} className="text-slate-400" />
                        {new Date(task.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-500 rounded uppercase">
                        {task.env}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
