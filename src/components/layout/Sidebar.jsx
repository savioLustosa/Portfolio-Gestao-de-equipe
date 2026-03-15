"use client";

import React from 'react';
import { 
  LayoutDashboard, 
  Table, 
  Kanban, 
  Clock, 
  Bug, 
  CalendarDays, 
  HelpCircle,
  Hash,
  ChevronRight,
  LogOut,
  FolderOpen
} from 'lucide-react';

export default function Sidebar({ activeWorkspace, setActiveWorkspace, currentView, setCurrentView, workspaces = [], user, onLogout }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'table', label: 'Tabela de Tarefas', icon: Table },
    { id: 'kanban', label: 'Kanban Box', icon: Kanban },
    { id: 'timeline', label: 'Timeline / Gantt', icon: Clock },
    { id: 'bugs', label: 'Bugs & Sugestões', icon: Bug },
    { id: 'deadlines', label: 'Prazos / Calendário', icon: CalendarDays },
    { id: 'requests', label: 'Solicitações', icon: HelpCircle },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full shadow-sm z-30">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center p-2 shadow-lg shadow-slate-200">
          <img src="/assets/logo.png" alt="Logo" className="w-full h-full object-contain" />
        </div>
        <h1 className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 tracking-tight">
          Muito mais que dados
        </h1>
      </div>

      {/* Workspace Switcher */}
      <div className="px-4 py-6">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-3 block">
          Área de Trabalho
        </label>
        <div className="space-y-1 max-h-48 overflow-y-auto custom-scrollbar">
          <button
            onClick={() => setActiveWorkspace('Todos Projetos')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
              activeWorkspace === 'Todos Projetos' 
              ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-100' 
              : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <FolderOpen size={16} />
            <span className="text-xs uppercase tracking-tight">Todos Projetos</span>
          </button>
          
          {workspaces.map((ws) => (
            <button
              key={ws}
              onClick={() => setActiveWorkspace(ws)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                activeWorkspace === ws
                ? 'bg-blue-50 text-blue-700 font-bold border border-blue-100' 
                : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Hash size={16} className={activeWorkspace === ws ? 'text-blue-500' : 'text-slate-400'} />
              <span className="text-xs font-bold uppercase tracking-tight truncate">{ws}</span>
              {activeWorkspace === ws && <ChevronRight size={14} className="ml-auto" />}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 overflow-y-auto">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-3 block">
          Visualizações
        </label>
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                currentView === item.id 
                ? 'bg-slate-900 text-white font-bold shadow-lg' 
                : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon size={18} className={currentView === item.id ? 'text-white' : 'text-slate-400'} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Footer / User Profile */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div 
          onClick={onLogout}
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-white transition-colors cursor-pointer group"
        >
          <div className="w-9 h-9 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-sm">
            {user?.name?.substring(0,2).toUpperCase() || 'SD'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-800 truncate uppercase">{user?.name || 'Savio Dev'}</p>
            <p className="text-[10px] text-slate-500 truncate font-bold">{user?.level?.toUpperCase() || 'MASTER ADMIN'}</p>
          </div>
          <LogOut size={16} className="text-slate-400 group-hover:text-red-500 transition-colors" />
        </div>
      </div>
    </aside>
  );
}
