"use client";

import React from 'react';
import { Search, Bell, Download, Plus, Filter, Share2 } from 'lucide-react';

export default function Topbar({ searchQuery, setSearchQuery, activeWorkspace }) {
  const handleExport = () => {
    alert("Exportando dados para CSV...");
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20 backdrop-blur-md bg-white/80">
      <div className="flex items-center gap-4 flex-1">
        <h2 className="text-sm font-medium text-slate-500 hidden md:block">
          {activeWorkspace}
        </h2>
        <div className="h-4 w-[1px] bg-slate-200 hidden md:block"></div>
        <div className="relative max-w-sm w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
          <input
            type="text"
            placeholder="Pesquisar tarefas, bugs ou membros..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all outline-none text-slate-700"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={handleExport}
          className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" 
          title="Exportar para CSV"
        >
          <Download size={18} />
        </button>
        <div className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all relative cursor-pointer">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </div>
        <div className="h-6 w-[1px] bg-slate-200 mx-2"></div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-blue-200 shadow-lg hover:-translate-y-0.5 active:translate-y-0">
          <Plus size={16} />
          <span>Novo Ticket</span>
        </button>
      </div>
    </header>
  );
}
