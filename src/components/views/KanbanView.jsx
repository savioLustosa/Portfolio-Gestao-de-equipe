"use client";

import React from 'react';
import { statusColors, priorityColors } from '@/lib/mockData';
import { MoreVertical, Plus, User, Clock } from 'lucide-react';

export default function KanbanView({ tasks, onSelectTask }) {
  const statuses = ['Análise', 'Em Desenvolvimento', 'Homologação', 'Em Produção', 'Incidente'];

  return (
    <div className="flex gap-6 overflow-x-auto pb-6 h-[calc(100vh-14rem)] scroll-smooth px-2">
      {statuses.map(status => {
        const columnTasks = tasks.filter(t => t.status === status);
        return (
          <div key={status} className="flex-shrink-0 w-80 flex flex-col group">
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">{status}</h3>
                <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold">
                  {columnTasks.length}
                </span>
              </div>
              <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <Plus size={16} />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto no-scrollbar pr-2">
              {columnTasks.map(task => (
                <div 
                  key={task.id}
                  onClick={() => onSelectTask(task)}
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group/card animate-in fade-in zoom-in-95 duration-300"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{task.group.split(' ')[0]}</span>
                    <button className="text-slate-300 hover:text-slate-600">
                      <MoreVertical size={14} />
                    </button>
                  </div>
                  
                  <h4 className="text-sm font-semibold text-slate-800 mb-3 group-hover/card:text-blue-600 transition-colors">
                    {task.name}
                  </h4>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex -space-x-2">
                      <div className="w-7 h-7 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-blue-600">
                        {task.owner.substring(0,2).toUpperCase()}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold ${priorityColors[task.priority]}`}>
                        {task.priority}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <Clock size={12} />
                        {new Date(task.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {columnTasks.length === 0 && (
                <div className="h-24 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-300 text-xs">
                  Nenhum ticket
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
