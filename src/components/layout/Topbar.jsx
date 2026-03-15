"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Download, Plus, Filter, Share2, Clock, CheckCircle2, AlertCircle, X, MessageSquare } from 'lucide-react';

export default function Topbar({ searchQuery, setSearchQuery, activeWorkspace, onNewTicket, onExport, tasks = [] }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Simular notificações baseadas nas tarefas recentes
  const notifications = tasks.slice(0, 5).map(task => ({
    id: task.id,
    type: task.status === 'Incidente' ? 'incident' : task.status === 'Em Produção' ? 'success' : 'update',
    title: task.name,
    user: task.owner,
    time: 'Agora mesmo',
    status: task.status
  }));
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
          onClick={onExport}
          className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" 
          title="Exportar para CSV"
        >
          <Download size={18} />
        </button>
        <div 
          ref={notificationRef}
          className="relative"
        >
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2 rounded-lg transition-all relative ${showNotifications ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:text-blue-600 hover:bg-blue-50'}`}
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* Painel de Notificações */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-widest">Centro de Notificações</h3>
                <span className="text-[9px] bg-blue-600 px-2 py-1 rounded-full font-bold uppercase">{notifications.length} Novas</span>
              </div>
              
              <div className="max-h-96 overflow-y-auto custom-scrollbar">
                {notifications.length > 0 ? (
                  notifications.map((n, i) => (
                    <div key={i} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer group">
                      <div className="flex gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          n.type === 'incident' ? 'bg-red-100 text-red-600' : 
                          n.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                        }`}>
                          {n.type === 'incident' ? <AlertCircle size={14} /> : 
                           n.type === 'success' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-bold text-slate-900 leading-tight mb-1 group-hover:text-blue-600 transition-colors">
                            {n.user} atualizou o ticket #{n.id}
                          </p>
                          <p className="text-[10px] text-slate-500 truncate italic">"{n.title}"</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{n.time}</span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                            <span className={`text-[9px] font-black uppercase tracking-tighter ${
                              n.type === 'incident' ? 'text-red-500' : 
                              n.type === 'success' ? 'text-green-500' : 'text-blue-500'
                            }`}>{n.status}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center">
                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-300">
                      <MessageSquare size={20} />
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tudo limpo por aqui</p>
                  </div>
                )}
              </div>
              
              <div className="p-3 bg-slate-50 text-center border-t border-slate-100">
                <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">
                  Marcar todas como lidas
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="h-6 w-[1px] bg-slate-200 mx-2"></div>
        <button 
          onClick={onNewTicket}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-blue-200 shadow-lg hover:-translate-y-0.5 active:translate-y-0"
        >
          <Plus size={16} />
          <span>Novo Ticket</span>
        </button>
      </div>
    </header>
  );
}
