"use client";

import React, { useState } from 'react';
import GenericModal from './GenericModal';
import EditableSelect from './EditableSelect';
import { Plus, User, Hash, Tag, Globe, Calendar } from 'lucide-react';

export default function NewTaskModal({ isOpen, onClose, onAdd, workspaces, onWorkspacesChange, team, currentUser }) {
  const [formData, setFormData] = useState({
    name: '',
    group: workspaces[0] || 'DEVOPS & INFRA',
    status: 'Análise',
    priority: 'Média',
    owner: currentUser?.name || 'Savio Dev',
    env: 'Dev',
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    date: new Date().toISOString().split('T')[0],
    isPersonal: false,
    isOngoing: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...formData, id: Math.floor(Math.random() * 10000) });
    setFormData({
      name: '',
      group: workspaces[0] || 'DEVOPS & INFRA',
      status: 'Análise',
      priority: 'Média',
      owner: currentUser?.name || 'Savio Dev',
      env: 'Dev',
      description: '',
      startDate: new Date().toISOString().split('T')[0],
      date: new Date().toISOString().split('T')[0],
      isPersonal: false,
      isOngoing: false
    });
    onClose();
  };

  const handleAddWorkspace = (newWs) => {
    if (!workspaces.includes(newWs)) {
      onWorkspacesChange([...workspaces, newWs]);
    }
  };

  const handleDeleteWorkspace = (wsToDelete) => {
    onWorkspacesChange(workspaces.filter(w => w !== wsToDelete));
  };

  return (
    <GenericModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="🚀 Criar Novo Ticket"
      footer={
        <>
          <button 
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-200 rounded-xl transition-all"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSubmit}
            className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95"
          >
            Criar Tarefa
          </button>
        </>
      }
    >
      <form className="space-y-5">
        <div className="flex flex-col gap-5">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Hash size={12} /> Nome da Tarefa
            </label>
            <input 
              type="text" 
              placeholder="Ex: Migrar banco para RDS"
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-sm font-medium"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <label className="flex items-center gap-3 p-4 bg-blue-50/50 border border-blue-100/50 rounded-2xl cursor-pointer hover:bg-blue-50 transition-all group">
            <input 
              type="checkbox"
              className="w-5 h-5 rounded-lg border-blue-200 text-blue-600 focus:ring-blue-100 transition-all"
              checked={formData.isPersonal}
              onChange={(e) => setFormData({...formData, isPersonal: e.target.checked})}
            />
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-black text-blue-700 uppercase tracking-tight">Iniciativa Própria / Projeto Pessoal</span>
              <span className="text-[10px] text-blue-500 font-medium italic">Marque se este projeto nasceu de uma ideia sua para melhoria.</span>
            </div>
          </label>

          <label className="flex items-center gap-3 p-4 bg-emerald-50/50 border border-emerald-100/50 rounded-2xl cursor-pointer hover:bg-emerald-50 transition-all group">
            <input 
              type="checkbox"
              className="w-5 h-5 rounded-lg border-emerald-200 text-emerald-600 focus:ring-emerald-100 transition-all"
              checked={formData.isOngoing}
              onChange={(e) => setFormData({...formData, isOngoing: e.target.checked})}
            />
            <div className="flex flex-col">
              <span className="text-[11px] font-black text-emerald-700 uppercase tracking-tight">Tarefa em Andamento</span>
              <span className="text-[10px] text-emerald-500 font-medium italic">Data de entrega será atualizada automaticamente para hoje.</span>
            </div>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex-1 min-w-0">
            <EditableSelect 
              label="Workspace"
              options={workspaces}
              selected={formData.group}
              onSelect={(val) => setFormData({...formData, group: val})}
              onAdd={handleAddWorkspace}
              onDelete={handleDeleteWorkspace}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <User size={12} /> Responsável
            </label>
            <select 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-100 font-medium h-[46px]"
              value={formData.owner}
              onChange={(e) => setFormData({...formData, owner: e.target.value})}
            >
              {team.map(member => (
                <option key={member.id} value={member.name}>{member.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Calendar size={12} /> Início / Delegação
            </label>
            <input 
              type="date"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-100 font-bold"
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Calendar size={12} /> Entrega Final
            </label>
            <input 
              type="date"
              disabled={formData.isOngoing}
              className={`w-full px-4 py-3 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-100 font-bold transition-all ${formData.isOngoing ? 'bg-slate-100 text-slate-400 opacity-60 cursor-not-allowed' : 'bg-slate-50'}`}
              value={formData.isOngoing ? new Date().toISOString().split('T')[0] : formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Tag size={12} /> Prioridade
            </label>
            <select 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-100 font-bold h-[42px]"
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value})}
            >
              <option>Crítica</option>
              <option>Alta</option>
              <option>Média</option>
              <option>Baixa</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Globe size={12} /> Ambiente
            </label>
            <select 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-100 font-bold h-[42px]"
              value={formData.env}
              onChange={(e) => setFormData({...formData, env: e.target.value})}
            >
              <option>Prod</option>
              <option>Hml</option>
              <option>Dev</option>
              <option>None</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Descrição detalhada</label>
          <textarea 
            rows="3"
            placeholder="Detalhes técnicos da tarefa..."
            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 transition-all text-sm resize-none"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          ></textarea>
        </div>
      </form>
    </GenericModal>
  );
}
