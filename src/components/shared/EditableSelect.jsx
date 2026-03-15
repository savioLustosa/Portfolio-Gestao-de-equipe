"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Plus, Trash2, ChevronDown, Check } from 'lucide-react';

export default function EditableSelect({ label, options, selected, onSelect, onAdd, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newOption, setNewOption] = useState('');
  const containerRef = useRef(null);

  // Fechar ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (newOption.trim()) {
      onAdd(newOption.trim().toUpperCase());
      setNewOption('');
    }
  };

  return (
    <div className="relative w-full space-y-2" ref={containerRef}>
      {label && (
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-1">
          {label}
        </label>
      )}
      
      {/* Botão de Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:bg-white hover:border-blue-400 transition-all outline-none"
      >
        <span className="truncate">{selected}</span>
        <ChevronDown size={16} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 z-[70] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-h-60 overflow-y-auto p-2 space-y-1">
            {options.map((opt) => (
              <div 
                key={opt}
                className={`group flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                  selected === opt ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50 text-slate-600'
                }`}
                onClick={() => {
                  onSelect(opt);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center gap-2">
                  {selected === opt && <Check size={14} className="text-blue-600" />}
                  <span className="text-sm font-bold uppercase tracking-tight">{opt}</span>
                </div>
                
                {/* Botão de Deletar (visível apenas ao dar hover) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(opt);
                  }}
                  className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* Campo de Adicionar Nova Opção */}
          <div className="p-3 bg-slate-50 border-t border-slate-100">
            <div className="flex gap-2">
              <input 
                type="text"
                placeholder="Criar Workspace..."
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:border-blue-400 transition-all font-medium"
                onKeyDown={(e) => e.key === 'Enter' && handleAdd(e)}
              />
              <button 
                onClick={handleAdd}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
