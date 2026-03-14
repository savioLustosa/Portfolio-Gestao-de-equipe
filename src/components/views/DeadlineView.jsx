"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, List, Clock, CheckCircle } from 'lucide-react';

export default function DeadlineView({ tasks }) {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Lógica de agenciamento por atraso (Mock simplificado)
  const sortedTasks = {
    atrasados: tasks.filter(t => new Date(t.date) < new Date() && t.status !== 'Em Produção'),
    estaSemana: tasks.filter(t => {
      const d = new Date(t.date);
      const today = new Date();
      const diff = (d - today) / (1000 * 60 * 60 * 24);
      return diff >= 0 && diff <= 7;
    }),
    futuros: tasks.filter(t => {
        const d = new Date(t.date);
        const today = new Date();
        const diff = (d - today) / (1000 * 60 * 60 * 24);
        return diff > 7;
    })
  };

  const renderListComponent = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      {Object.entries(sortedTasks).map(([key, items]) => (
        <div key={key}>
          <h3 className={`text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2 ${
            key === 'atrasados' ? 'text-red-500' : key === 'estaSemana' ? 'text-orange-500' : 'text-blue-500'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
            {key.replace(/([A-Z])/g, ' $1')} ({items.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(task => (
              <div key={task.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all group">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-bold text-slate-400">{task.group}</span>
                  <div className={`p-1.5 rounded-lg ${key === 'atrasados' ? 'bg-red-50 text-red-500' : 'bg-slate-100 text-slate-500'}`}>
                    <Clock size={14} />
                  </div>
                </div>
                <h4 className="text-sm font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors uppercase truncate">
                  {task.name}
                </h4>
                <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 text-[10px] flex items-center justify-center font-bold">{task.owner[0]}</div>
                    <span className="text-[10px] font-medium text-slate-500">{task.owner}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-600">{new Date(task.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderCalendarComponent = () => (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-in zoom-in-95 duration-500">
      <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h3 className="text-xl font-bold text-slate-900">
          {currentMonth.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
        </h3>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-white rounded-lg border border-slate-200 transition-all shadow-sm">
            <ChevronLeft size={20} />
          </button>
          <button className="p-2 hover:bg-white rounded-lg border border-slate-200 transition-all shadow-sm">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 border-b border-slate-100">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
          <div key={d} className="py-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">{d}</div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 h-[600px]">
        {Array.from({ length: 35 }).map((_, i) => {
          const day = i - 2; // Mock simplificado para preencher o grid
          const dayTasks = tasks.filter(t => new Date(t.date).getDate() === day && new Date(t.date).getMonth() === 2);
          
          return (
            <div key={i} className={`border-r border-b border-slate-50 p-3 flex flex-col gap-1 hover:bg-slate-50/50 transition-colors ${day <= 0 ? 'bg-slate-50/30 opacity-50' : ''}`}>
              <span className={`text-xs font-bold ${dayTasks.length > 0 ? 'text-blue-600' : 'text-slate-400'}`}>
                {day > 0 && day <= 31 ? day : ''}
              </span>
              <div className="flex-1 overflow-y-auto no-scrollbar space-y-1">
                {dayTasks.map(task => (
                  <div key={task.id} className={`p-1.5 rounded-lg text-[9px] font-bold truncate border shadow-sm ${
                    task.status === 'Incidente' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    {task.name}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 bg-white p-1 rounded-xl shadow-sm border border-slate-200">
          <button 
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'list' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <List size={14} /> Lista
          </button>
          <button 
            onClick={() => setViewMode('calendar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'calendar' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Calendar size={14} /> Calendário
          </button>
        </div>
      </div>

      {viewMode === 'list' ? renderListComponent() : renderCalendarComponent()}
    </div>
  );
}
