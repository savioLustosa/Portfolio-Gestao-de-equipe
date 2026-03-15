"use client";

import React, { useState, useRef, useEffect } from 'react';
import { AlertCircle, Rocket, ChevronLeft, ChevronRight } from 'lucide-react';

// Estilo para a barra listrada de impedimento
const blockedStyle = `
  .blocked-stripe {
    background-image: linear-gradient(
      45deg, 
      rgba(255, 255, 255, 0.15) 25%, 
      transparent 25%, 
      transparent 50%, 
      rgba(255, 255, 255, 0.15) 50%, 
      rgba(255, 255, 255, 0.15) 75%, 
      transparent 75%, 
      transparent
    );
    background-size: 20px 20px;
    animation: stripe-move 2s linear infinite;
  }

  @keyframes stripe-move {
    0% { background-position: 0 0; }
    100% { background-position: 40px 0; }
  }
`;

export default function TimelineView({ tasks, onTaskUpdate, onTaskClick }) {
  // Estado para o mês visualizado
  const [viewDate, setViewDate] = useState(new Date(2026, 2, 1)); // Março 2026
  
  // Constantes de layout
  const DAY_WIDTH = 45; 
  const SIDEBAR_WIDTH = 300; 
  const ROW_HEIGHT = 56; 

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();
  
  // Calcular dias no mês selecionado
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Estado para Drag and Drop
  const [draggingTask, setDraggingTask] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);
  const scrollRef = useRef(null);

  const getStatusDotColor = (status) => {
    switch(status) {
      case 'Em Produção': return 'bg-emerald-500';
      case 'Incidente': return 'bg-red-500';
      case 'Homologação': return 'bg-orange-500';
      case 'Em Desenvolvimento': return 'bg-blue-500';
      case 'Análise': return 'bg-purple-500';
      default: return 'bg-slate-400';
    }
  };

  const getBarColor = (status) => {
    switch(status) {
      case 'Em Produção': return 'bg-emerald-500 text-white shadow-sm';
      case 'Incidente': return 'bg-red-500 text-white shadow-sm';
      case 'Homologação': return 'bg-amber-500 text-white shadow-sm';
      case 'Em Desenvolvimento': return 'bg-blue-500 text-white shadow-sm';
      default: return 'bg-indigo-500 text-white shadow-sm';
    }
  };

  // Funções de posicionamento dinâmico
  const getXPosition = (startDateStr) => {
    const start = new Date(startDateStr);
    const startOfView = new Date(viewYear, viewMonth, 1);
    
    if (start < startOfView) return 0;
    
    return (start.getDate() - 1) * DAY_WIDTH;
  };

  const getBarWidth = (startDateStr, endDateStr) => {
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);
    const startOfView = new Date(viewYear, viewMonth, 1);
    const endOfView = new Date(viewYear, viewMonth, daysInMonth);
    
    const visibleStart = start < startOfView ? startOfView : start;
    const visibleEnd = end > endOfView ? endOfView : end;
    
    if (visibleEnd < visibleStart) return 0;
    
    const diffTime = Math.abs(visibleEnd - visibleStart);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays * DAY_WIDTH;
  };

  const isTaskVisible = (task) => {
    const start = new Date(task.startDate);
    const end = new Date(task.date);
    const startOfView = new Date(viewYear, viewMonth, 1);
    const endOfView = new Date(viewYear, viewMonth, daysInMonth);
    
    return start <= endOfView && end >= startOfView;
  };

  const filteredTasks = tasks.filter(isTaskVisible);
  const groups = Array.from(new Set(filteredTasks.map(t => t.group)));

  // Navegação
  const nextMonth = () => setViewDate(new Date(viewYear, viewMonth + 1, 1));
  const prevMonth = () => setViewDate(new Date(viewYear, viewMonth - 1, 1));

  const monthName = viewDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });

  // Handlers para Drag
  const handleMouseDown = (e, task) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setDraggingTask({ ...task, originalX: getXPosition(task.startDate) });
    setDragOffset(x);
    setHasMoved(false);
    e.stopPropagation();
  };

  const handleMouseMove = (e) => {
    if (!draggingTask) return;

    const containerRect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left + e.currentTarget.scrollLeft;
    const newX = mouseX - dragOffset;
    
    const newStartDay = Math.max(1, Math.min(daysInMonth, Math.round(newX / DAY_WIDTH) + 1));
    const currentStartDay = new Date(draggingTask.startDate).getDate();

    if (newStartDay !== currentStartDay && new Date(draggingTask.startDate).getMonth() === viewMonth) {
        setHasMoved(true);
        const diff = newStartDay - currentStartDay;
        const newStartDate = new Date(draggingTask.startDate);
        newStartDate.setDate(newStartDate.getDate() + diff);
        
        const newEndDate = new Date(draggingTask.date);
        newEndDate.setDate(newEndDate.getDate() + diff);

        setDraggingTask({
            ...draggingTask,
            startDate: newStartDate.toISOString().split('T')[0],
            date: newEndDate.toISOString().split('T')[0]
        });
    }
  };

  const handleMouseUp = () => {
    if (draggingTask) {
        if (!hasMoved) {
            onTaskClick(draggingTask);
        } else {
            onTaskUpdate(draggingTask.id, {
                startDate: draggingTask.startDate,
                date: draggingTask.date
            });
        }
        setDraggingTask(null);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-12rem)] animate-in fade-in duration-500 select-none">
      <style>{blockedStyle}</style>
      
      {/* Header Fixo com Navegação */}
      <div className="flex border-b border-slate-200 bg-slate-50/30">
        <div style={{ width: SIDEBAR_WIDTH }} className="p-4 border-r border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 tracking-tight">Timeline Operacional</h3>
          <div className="flex items-center gap-1">
            <button onClick={prevMonth} className="p-1 hover:bg-slate-200 rounded-md text-slate-400 hover:text-slate-600 transition-all">
                <ChevronLeft size={16} />
            </button>
            <button onClick={nextMonth} className="p-1 hover:bg-slate-200 rounded-md text-slate-400 hover:text-slate-600 transition-all">
                <ChevronRight size={16} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="flex flex-col">
            <div className="px-4 py-2 text-[10px] font-black text-slate-400 border-b border-slate-100 uppercase tracking-widest flex items-center justify-between">
              <span className="capitalize text-slate-600 font-bold">{monthName}</span>
              <span className="opacity-50">Muito mais que dados Timeline Engine</span>
            </div>
            <div className="flex">
              {days.map(day => (
                <div 
                  key={day} 
                  style={{ width: DAY_WIDTH }} 
                  className="flex-shrink-0 text-[10px] font-bold text-slate-400 py-2 border-r border-slate-100/50 text-center"
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid de Conteúdo */}
      <div 
        className="flex-1 overflow-y-auto overflow-x-auto relative"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        ref={scrollRef}
      >
        <div className="flex min-h-full">
          
          {/* Coluna da Esquerda */}
          <div style={{ width: SIDEBAR_WIDTH }} className="flex-shrink-0 border-r border-slate-200 bg-white sticky left-0 z-20">
            {groups.length === 0 ? (
                <div className="p-8 text-center space-y-2">
                    <p className="text-xs font-bold text-slate-300 uppercase tracking-widest italic">Nenhuma atividade neste período</p>
                </div>
            ) : groups.map(group => (
              <div key={group}>
                <div className="bg-slate-50/80 px-4 py-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-100 italic">
                  {group}
                </div>
                {filteredTasks.filter(t => t.group === group).map(task => (
                    <div 
                      key={task.id} 
                      style={{ height: ROW_HEIGHT }}
                      onClick={() => onTaskClick(task)}
                      className={`px-4 flex items-center gap-3 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer group ${task.isBlocked ? 'bg-red-50/30' : ''}`}
                    >
                      <div className={`w-2 h-2 rounded-full ${getStatusDotColor(task.status)} group-hover:scale-150 transition-transform`}></div>
                      <span className={`text-[11px] font-bold truncate group-hover:text-blue-600 transition-colors ${task.isBlocked ? 'text-red-600' : 'text-slate-700'}`}>
                        {task.isPersonal && <Rocket size={10} className="inline mr-1 text-blue-500" />}
                        {task.name}
                      </span>
                      {task.isBlocked && <AlertCircle size={14} className="text-red-500 flex-shrink-0 animate-pulse" />}
                    </div>
                ))}
              </div>
            ))}
          </div>

          {/* Área do Gantt */}
          <div className="flex-1 relative bg-white" style={{ width: days.length * DAY_WIDTH }}>
            <div className="absolute inset-0 flex pointer-events-none">
              {days.map(day => (
                <div 
                  key={day} 
                  style={{ width: DAY_WIDTH }} 
                  className="h-full border-r border-slate-100/40"
                ></div>
              ))}
            </div>

            <div className="relative">
              {groups.map(group => (
                <div key={`${group}-gantt`}>
                  <div className="h-[31px] border-b border-slate-100/50 bg-slate-50/20"></div>
                  {filteredTasks.filter(t => t.group === group).map(task => {
                    const isDraggingThis = draggingTask?.id === task.id;
                    const displayTask = isDraggingThis ? draggingTask : task;

                    const barWidth = getBarWidth(displayTask.startDate, displayTask.date);
                    if (barWidth <= 0) return null;

                    return (
                      <div 
                        key={`${task.id}-row`} 
                        style={{ height: ROW_HEIGHT }}
                        className="relative border-b border-slate-50 flex items-center"
                      >
                        <div 
                          onMouseDown={(e) => handleMouseDown(e, task)}
                          className={`absolute h-9 rounded-xl flex items-center px-4 text-[10px] font-black text-white transition-shadow cursor-grab active:cursor-grabbing z-10 truncate border-2 border-white/20 gap-2 ${getBarColor(displayTask.status)} ${displayTask.isBlocked ? 'blocked-stripe !bg-red-500 shadow-lg shadow-red-100' : ''} ${isDraggingThis ? 'opacity-90 shadow-2xl scale-[1.02] z-30' : 'hover:shadow-lg hover:brightness-110 active:scale-95'}`}
                          style={{ 
                            left: `${getXPosition(displayTask.startDate)}px`,
                            width: `${barWidth}px`,
                            minWidth: '20px'
                          }}
                        >
                           {displayTask.isPersonal && <Rocket size={12} className="flex-shrink-0 text-white fill-white/20" />}
                           {displayTask.isBlocked && <AlertCircle size={14} className="flex-shrink-0" title={displayTask.blockReason} />}
                           <span className="truncate">{barWidth > 70 ? displayTask.name : ''}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legenda */}
      <div className="px-6 py-3 bg-slate-900 border-t border-slate-800 flex justify-between items-center text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
        <div className="flex gap-6">
          <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span> Produção</span>
          <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span> Desenvolvimento</span>
          <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span> Incidente</span>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-slate-500 italic">Dica: Use as setas para mudar o mês e arraste barras para reprogramar</span>
        </div>
      </div>
    </div>
  );
}
