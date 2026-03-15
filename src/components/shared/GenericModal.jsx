"use client";

import React, { useState } from 'react';
import { X, Send, AlertCircle, Info } from 'lucide-react';

export default function GenericModal({ isOpen, onClose, title, children, footer }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 border border-slate-200">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white rounded-full text-slate-400 hover:text-slate-600 transition-all shadow-sm border border-transparent hover:border-slate-200"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-6 overflow-y-auto max-h-[70vh]">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-8 py-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
