"use client";

import React, { useState, useMemo } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import TableView from '@/components/views/TableView';
import KanbanView from '@/components/views/KanbanView';
import TimelineView from '@/components/views/TimelineView';
import DashboardView from '@/components/views/DashboardView';
import BugView from '@/components/views/BugView';
import DeadlineView from '@/components/views/DeadlineView';
import RequestView from '@/components/views/RequestView';
import TaskDetailPanel from '@/components/shared/TaskDetailPanel';
import { mockTasks } from '@/lib/mockData';

export default function App() {
  const [tasks, setTasks] = useState(mockTasks);
  const [activeWorkspace, setActiveWorkspace] = useState('Data & Analytics');
  const [currentView, setCurrentView] = useState('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);

  // Filtro global
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => 
      task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tasks, searchQuery]);

  // Função para renderizar a view atual
  const renderView = () => {
    switch (currentView) {
      case 'table': return <TableView tasks={filteredTasks} onSelectTask={setSelectedTask} />;
      case 'kanban': return <KanbanView tasks={filteredTasks} onSelectTask={setSelectedTask} />;
      case 'timeline': return <TimelineView tasks={filteredTasks} />;
      case 'dashboard': return <DashboardView tasks={filteredTasks} />;
      case 'bugs': return <BugView tasks={filteredTasks} />;
      case 'deadlines': return <DeadlineView tasks={filteredTasks} />;
      case 'requests': return <RequestView />;
      default: return <TableView tasks={filteredTasks} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar - Navegação fixa */}
      <Sidebar 
        activeWorkspace={activeWorkspace} 
        setActiveWorkspace={setActiveWorkspace}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {/* Área Principal */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          activeWorkspace={activeWorkspace}
        />
        
        <main className="flex-1 overflow-auto p-6 scroll-smooth">
          <div className="max-w-[1600px] mx-auto">
            {renderView()}
          </div>
        </main>
      </div>

      {/* Rich Ticket Panel / Modal Lateral */}
      {selectedTask && (
        <TaskDetailPanel 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)} 
          onSave={(updatedTask) => {
            setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
}
