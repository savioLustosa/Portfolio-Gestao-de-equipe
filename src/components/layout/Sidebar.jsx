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
  Database,
  Cloud,
  ChevronRight,
  Settings,
  LogOut
} from 'lucide-react';

export default function Sidebar({ activeWorkspace, setActiveWorkspace, currentView, setCurrentView }) {
  const workspaces = [
    { id: 'Data & Analytics', icon: Database, color: 'text-blue-500' },
    { id: 'DevOps & Infra', icon: Cloud, color: 'text-purple-500' },
    { id: 'Engineering', icon: Settings, color: 'text-slate-500' },
  ];

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
    <aside className="w-64 bg-white border-right border-slate-200 flex flex-col h-full shadow-sm z-30">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-100 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
          S
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
          SyncSaaS
        </h1>
      </div>

      {/* Workspace Switcher */}
      <div className="px-4 py-6">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2 block">
          Área de Trabalho
        </label>
        <div className="space-y-1">
          {workspaces.map((ws) => (
            <button
              key={ws.id}
              onClick={() => setActiveWorkspace(ws.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                activeWorkspace === ws.id 
                ? 'bg-blue-50 text-blue-700 font-medium shadow-sm' 
                : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <ws.icon size={18} className={activeWorkspace === ws.id ? 'text-blue-600' : 'text-slate-400'} />
              <span className="text-sm truncate">{ws.id}</span>
              {activeWorkspace === ws.id && <ChevronRight size={14} className="ml-auto" />}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 overflow-y-auto">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2 block">
          Menu Principal
        </label>
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                currentView === item.id 
                ? 'bg-slate-900 text-white font-medium shadow-md' 
                : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon size={18} className={currentView === item.id ? 'text-white' : 'text-slate-400'} />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Footer / User Profile */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white transition-colors cursor-pointer group">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-medium border-2 border-white shadow-sm">
            S
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">Savio Dev</p>
            <p className="text-[10px] text-slate-500 truncate">Plano Enterprise</p>
          </div>
          <LogOut size={16} className="text-slate-400 group-hover:text-red-500 transition-colors" />
        </div>
      </div>
    </aside>
  );
}
