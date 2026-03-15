"use client";

import React, { useState } from 'react';
import { 
  X, 
  MessageSquare, 
  Plus,
  Github, 
  CheckCircle2, 
  Clock, 
  User, 
  Tag, 
  AlertCircle,
  Calendar,
  Layers,
  Rocket,
  Trash2
} from 'lucide-react';
import { statusColors, priorityColors } from '@/lib/mockData';
import EditableSelect from './EditableSelect';

export default function TaskDetailPanel({ task, onClose, onSave, workspaces, onWorkspacesChange, team, currentUser, onDelete }) {
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleSave = () => {
    onSave(editedTask);
  };

  const handleDelete = () => {
    if (confirm('Tem certeza que deseja excluir este ticket? Esta ação não pode ser desfeita.')) {
      onDelete(task.id);
    }
  };

  const canDelete = editedTask.isPersonal || (currentUser && currentUser.name !== editedTask.owner);

  const handleAddWorkspace = (newWs) => {
    if (!workspaces.includes(newWs)) {
      onWorkspacesChange([...workspaces, newWs]);
    }
  };

  const handleDeleteWorkspace = (wsToDelete) => {
    onWorkspacesChange(workspaces.filter(w => w !== wsToDelete));
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end transition-all">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>
      
      {/* Panel */}
      <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span className="text-slate-900">Muito mais que dados</span>
            <span>/</span>
            <span>{editedTask.group}</span>
            <span>/</span>
            <span>#{editedTask.id}</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-10">
          {/* Title Section */}
          <div className="space-y-4">
            <input 
              className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight w-full bg-transparent border-none focus:ring-0 p-0"
              value={editedTask.name}
              onChange={(e) => setEditedTask({...editedTask, name: e.target.value})}
            />
            <div className="flex flex-wrap gap-2">
              <select 
                className={`px-3 py-1 rounded-full text-[11px] font-bold border outline-none ${statusColors[editedTask.status] || 'bg-slate-100 text-slate-700'}`}
                value={editedTask.status}
                onChange={(e) => setEditedTask({...editedTask, status: e.target.value})}
              >
                {Object.keys(statusColors).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              
              <select 
                className={`px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 border border-slate-200 text-slate-600 outline-none`}
                value={editedTask.priority}
                onChange={(e) => setEditedTask({...editedTask, priority: e.target.value})}
              >
                <option>Crítica</option>
                <option>Alta</option>
                <option>Média</option>
                <option>Baixa</option>
              </select>

              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-50 border border-indigo-100 text-indigo-700">
                {editedTask.env}
              </span>

              {editedTask.isPersonal && (
                <span className="px-3 py-1 rounded-full text-[11px] font-black bg-blue-600 text-white shadow-sm shadow-blue-200 flex items-center gap-1.5 antialiased">
                  <Rocket size={12} /> Iniciativa Própria
                </span>
              )}

              {editedTask.isOngoing && (
                <span className="px-3 py-1 rounded-full text-[11px] font-black bg-emerald-600 text-white shadow-sm shadow-emerald-200 flex items-center gap-1.5 antialiased">
                  ⚡ Em Andamento
                </span>
              )}
            </div>
          </div>

          {/* Management Grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <User size={12} /> Delegar Para
              </label>
              <select 
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm h-[42px]"
                value={editedTask.owner}
                onChange={(e) => setEditedTask({...editedTask, owner: e.target.value})}
              >
                {team.map(m => (
                  <option key={m.id} value={m.name}>{m.name}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Calendar size={12} /> Prazo Final
              </label>
              <input 
                type="date"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm h-[42px]"
                value={editedTask.date}
                onChange={(e) => setEditedTask({...editedTask, date: e.target.value})}
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Clock size={12} /> Início / Delegação
              </label>
              <input 
                type="date"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm h-[42px]"
                value={editedTask.startDate}
                onChange={(e) => setEditedTask({...editedTask, startDate: e.target.value})}
              />
            </div>

            <div className="space-y-3">
              <EditableSelect 
                label="Mudar Workspace"
                options={workspaces}
                selected={editedTask.group}
                onSelect={(val) => setEditedTask({...editedTask, group: val})}
                onAdd={handleAddWorkspace}
                onDelete={handleDeleteWorkspace}
              />
            </div>
          </div>

          {/* Block Alert */}
          {editedTask.isBlocked && (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-5 flex gap-4 animate-in slide-in-from-top-2 duration-300">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
                <AlertCircle size={20} />
              </div>
              <div className="flex-1 space-y-2">
                <p className="text-xs font-black text-red-700 uppercase tracking-widest">Tarefa Bloqueada / Com Impedimento</p>
                <textarea 
                  className="w-full bg-transparent border-none p-0 text-sm text-red-900 placeholder:text-red-300 focus:ring-0 font-medium resize-none shadow-none"
                  placeholder="Descreva o que está travando esta tarefa..."
                  value={editedTask.blockReason || ''}
                  onChange={(e) => setEditedTask({...editedTask, blockReason: e.target.value})}
                  autoFocus
                />
                <button 
                  onClick={() => setEditedTask({...editedTask, isBlocked: false, blockReason: ''})}
                  className="text-[10px] font-bold text-red-600 hover:text-red-800 underline decoration-red-200"
                >
                  Resolver Impedimento e Liberar Tarefa
                </button>
              </div>
            </div>
          )}

          {/* Project Plan Checklist */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <CheckCircle2 size={12} /> Plano de Execução & Checklist
              </label>
              <button 
                onClick={() => {
                  const newItem = { id: Date.now(), text: '', completed: false, isAlternative: false };
                  setEditedTask({ ...editedTask, checklist: [...(editedTask.checklist || []), newItem] });
                }}
                className="text-[10px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <Plus size={10} /> Add Etapa
              </button>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-100 divide-y divide-slate-100 overflow-hidden">
              {(editedTask.checklist || []).length === 0 && (
                <div className="p-8 text-center space-y-2">
                  <Layers className="mx-auto text-slate-200" size={32} />
                  <p className="text-xs text-slate-400 font-medium italic">Nenhum plano definido. Clique em "Add Etapa" para planejar.</p>
                </div>
              )}
              
              {(editedTask.checklist || []).map((item, index) => {
                const replacingItem = item.replacesItemId ? editedTask.checklist.find(i => i.id === item.replacesItemId) : null;
                const isItemReplaced = editedTask.checklist.some(i => i.replacesItemId === item.id && i.status === 'approved');

                return (
                  <div key={item.id} className={`p-4 transition-all ${item.isAlternative ? 'bg-amber-50/50' : 'bg-white'} ${isItemReplaced ? 'opacity-50 grayscale-[0.5]' : ''}`}>
                    <div className="flex items-start gap-3">
                      <input 
                        type="checkbox"
                        checked={item.completed}
                        onChange={(e) => {
                          const newChecklist = [...editedTask.checklist];
                          newChecklist[index].completed = e.target.checked;
                          setEditedTask({ ...editedTask, checklist: newChecklist });
                        }}
                        className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-100 transition-all cursor-pointer"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-col gap-1">
                          {replacingItem && (
                            <span className="text-[10px] font-bold text-amber-600 flex items-center gap-1">
                              <AlertCircle size={10} /> Substitui: "{replacingItem.text}"
                            </span>
                          )}
                          <div className="flex items-start gap-2">
                            <textarea 
                              rows="1"
                              placeholder="Descreva a etapa do plano..."
                              className={`w-full bg-transparent border-none p-0 text-sm focus:ring-0 resize-none font-medium ${item.completed || isItemReplaced ? 'text-slate-400 line-through' : 'text-slate-700'}`}
                              value={item.text}
                              onChange={(e) => {
                                const newChecklist = [...editedTask.checklist];
                                newChecklist[index].text = e.target.value;
                                setEditedTask({ ...editedTask, checklist: newChecklist });
                              }}
                            />
                            {item.isAlternative && (
                              <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase whitespace-nowrap ${
                                item.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 
                                item.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                              }`}>
                                {item.status === 'approved' ? 'Aprovado' : item.status === 'rejected' ? 'Recusado' : 'Sugestão'}
                              </span>
                            )}
                          </div>
                        </div>

                        {item.isAlternative && (
                          <div className="relative group">
                            <textarea 
                              placeholder="Explique por que esta mudança é melhor que o plano original..."
                              className="w-full p-3 bg-white border border-dashed border-amber-200 rounded-xl text-[11px] text-amber-700 italic outline-none focus:ring-2 focus:ring-amber-50 shadow-sm"
                              value={item.annotation || ''}
                              onChange={(e) => {
                                const newChecklist = [...editedTask.checklist];
                                newChecklist[index].annotation = e.target.value;
                                setEditedTask({ ...editedTask, checklist: newChecklist });
                              }}
                            />
                            {!item.status && (
                              <div className="flex gap-2 mt-2">
                                <button 
                                  onClick={() => {
                                    const newChecklist = [...editedTask.checklist];
                                    newChecklist[index].status = 'approved';
                                    setEditedTask({ ...editedTask, checklist: newChecklist });
                                  }}
                                  className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-bold rounded-lg hover:bg-emerald-700 transition-all shadow-sm"
                                >
                                  Aprovar Mudança
                                </button>
                                <button 
                                  onClick={() => {
                                    const newChecklist = [...editedTask.checklist];
                                    newChecklist[index].status = 'rejected';
                                    setEditedTask({ ...editedTask, checklist: newChecklist });
                                  }}
                                  className="px-3 py-1 bg-slate-200 text-slate-600 text-[10px] font-bold rounded-lg hover:bg-slate-300 transition-all"
                                >
                                  Manter Original
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        {!item.isAlternative && !isItemReplaced && (
                          <button 
                            onClick={() => {
                              const newItem = { 
                                id: Date.now(), 
                                text: '', 
                                completed: false, 
                                isAlternative: true, 
                                status: null,
                                annotation: '',
                                replacesItemId: item.id
                              };
                              setEditedTask({ ...editedTask, checklist: [...(editedTask.checklist || []), newItem] });
                            }}
                            title="Sugerir mudança para esta etapa"
                            className="p-1 text-slate-300 hover:text-amber-500 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        )}
                        <button 
                          onClick={() => {
                            setEditedTask({ ...editedTask, checklist: editedTask.checklist.filter(i => i.id !== item.id) });
                          }}
                          className="p-1 text-slate-300 hover:text-red-500 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <button 
              onClick={() => {
                const newItem = { 
                  id: Date.now(), 
                  text: '', 
                  completed: false, 
                  isAlternative: true, 
                  status: null,
                  annotation: '' 
                };
                setEditedTask({ ...editedTask, checklist: [...(editedTask.checklist || []), newItem] });
              }}
              className="w-full py-3 border-2 border-dashed border-slate-100 rounded-2xl text-[11px] font-bold text-slate-400 hover:border-amber-200 hover:text-amber-600 hover:bg-amber-50 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={14} /> Sugerir Melhoria / Fora do Plano Inicial
            </button>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Breve resumo / Contexto</label>
            <textarea 
              rows="3"
              className="w-full p-4 bg-white rounded-xl border border-slate-200 text-sm text-slate-600 leading-relaxed outline-none focus:ring-2 focus:ring-blue-100 transition-all resize-none shadow-sm"
              value={editedTask.description}
              onChange={(e) => setEditedTask({...editedTask, description: e.target.value})}
            ></textarea>
          </div>

          {/* Discussion */}
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <MessageSquare size={12} /> Atividades Recentes
            </label>
            <div className="space-y-4">
                {editedTask.isBlocked && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex-shrink-0 flex items-center justify-center font-bold text-[10px] animate-pulse">
                            <AlertCircle size={14} />
                        </div>
                        <div className="bg-red-50 p-3 rounded-2xl rounded-tl-none border border-red-100 text-xs text-red-700 shadow-sm">
                            <p className="font-bold mb-1 text-red-900">Impedimento Identificado <span className="text-[10px] font-normal text-red-400 ml-2">Agora</span></p>
                            Status: Bloqueado por "{editedTask.blockReason || 'Motivo não especificado'}"
                        </div>
                    </div>
                )}
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex-shrink-0 flex items-center justify-center font-bold text-[10px]">SD</div>
                    <div className="bg-slate-50 p-3 rounded-2xl rounded-tl-none border border-slate-100 text-xs text-slate-600 shadow-sm">
                        <p className="font-bold text-slate-900 mb-1">Savio Dev <span className="text-[10px] font-normal text-slate-400 ml-2">Hoje</span></p>
                        Ajustou o planejamento e delegou para {editedTask.owner}.
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => {
                if (editedTask.isBlocked) {
                  setEditedTask({...editedTask, isBlocked: false, blockReason: ''});
                } else {
                  setEditedTask({...editedTask, isBlocked: true});
                }
              }}
              className={`flex items-center gap-2 text-xs font-bold transition-colors ${editedTask.isBlocked ? 'text-red-600' : 'text-slate-400 hover:text-red-500'}`}
            >
              <AlertCircle size={14} />
              {editedTask.isBlocked ? 'Limpar Impedimento' : 'Marcar Impedimento'}
            </button>

            {canDelete && (
              <button 
                onClick={handleDelete}
                className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-red-600 transition-colors"
                title={editedTask.isPersonal ? "Excluir projeto pessoal" : "Excluir projeto (Solicitante)"}
              >
                <Trash2 size={14} />
                Excluir Ticket
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-lg transition-all"
            >
              Cancelar
            </button>
            <button 
              onClick={handleSave}
              className="px-8 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-lg shadow-blue-200"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
