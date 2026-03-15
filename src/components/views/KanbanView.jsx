"use client";

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { MoreVertical, Plus, Clock, AlertCircle, Rocket } from 'lucide-react';
import { statusColors } from '@/lib/mockData';

export default function KanbanView({ tasks, onTaskClick, onTaskMove, onQuickAdd }) {
  const [enabled, setEnabled] = useState(false);

  // Solução para StrictMode do React 18 com dnd
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  const columns = [
    { id: 'Análise', title: 'ANÁLISE', color: 'bg-purple-500' },
    { id: 'Em Desenvolvimento', title: 'EM DESENVOLVIMENTO', color: 'bg-blue-500' },
    { id: 'Homologação', title: 'HOMOLOGAÇÃO', color: 'bg-orange-500' },
    { id: 'Em Produção', title: 'EM PRODUÇÃO', color: 'bg-green-500' },
    { id: 'Incidente', title: 'INCIDENTE', color: 'bg-red-500' },
  ];

  const onDragEnd = (result) => {
    if (!result.destination) return;
    
    const { draggableId, destination } = result;
    onTaskMove(parseInt(draggableId), destination.droppableId);
  };

  if (!enabled) return null;

  return (
    <div className="h-[calc(100vh-12rem)] overflow-x-auto overflow-y-hidden pb-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 h-full min-w-max px-2">
          {columns.map((column) => (
            <div key={column.id} className="w-80 flex flex-col bg-slate-50/50 rounded-3xl border border-slate-100/50">
              {/* Column Header */}
              <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="text-xs font-black text-slate-900 tracking-widest uppercase">{column.title}</h3>
                  <span className="bg-white border border-slate-200 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    {tasks.filter(t => t.status === column.id).length}
                  </span>
                </div>
                <button 
                    onClick={() => onQuickAdd(column.id)}
                    className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg text-slate-400 hover:text-blue-600 transition-all border border-transparent hover:border-slate-100"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Droppable Area */}
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`flex-1 px-4 pb-4 space-y-4 overflow-y-auto transition-colors duration-200 rounded-b-3xl ${
                      snapshot.isDraggingOver ? 'bg-blue-50/40' : ''
                    }`}
                  >
                    {tasks
                      .filter((t) => t.status === column.id)
                      .map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => onTaskClick(task)}
                              className={`bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing group ${
                                snapshot.isDragging ? 'shadow-2xl ring-2 ring-blue-500/20 rotate-1' : ''
                              }`}
                            >
                              <div className="flex justify-between items-start mb-3">
                                <span className={`text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-400 group-hover:text-blue-500 group-hover:border-blue-100 transition-colors`}>
                                  {task.group}
                                </span>
                                <button className="text-slate-300 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-all">
                                  <MoreVertical size={14} />
                                </button>
                              </div>

                              <h4 className={`text-sm font-bold mb-4 leading-snug line-clamp-2 flex items-center gap-2 ${task.isBlocked ? 'text-red-600' : 'text-slate-800'}`}>
                                {task.isPersonal && <Rocket size={14} className="text-blue-600 flex-shrink-0" />}
                                {task.isBlocked && <AlertCircle size={14} className="text-red-500 flex-shrink-0 animate-pulse" />}
                                {task.name}
                              </h4>

                              <div className="flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-2">
                                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white border-2 border-white shadow-sm">
                                    {task.owner.substring(0, 2).toUpperCase()}
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-slate-600">{task.owner}</span>
                                    <div className="flex items-center gap-1 text-[9px] text-slate-400 font-medium">
                                        <Clock size={10} />
                                        <span>{new Date(task.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className={`text-[10px] font-bold ${
                                    task.priority === 'Crítica' ? 'text-red-500' : 
                                    task.priority === 'Alta' ? 'text-orange-500' : 
                                    'text-blue-500'
                                }`}>
                                    {task.priority === 'Crítica' && <AlertCircle size={12} className="inline mr-1" />}
                                    {task.priority}
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
