"use client";

import React, { useState, useMemo, useEffect } from 'react';
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
import NewTaskModal from '@/components/shared/NewTaskModal';
import AuthView from '@/components/views/AuthView';
import Papa from 'papaparse';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [workspaces, setWorkspaces] = useState([]);
  const [team, setTeam] = useState([]);
  const [activeWorkspace, setActiveWorkspace] = useState('');
  const [currentView, setCurrentView] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Carregar dados dos CSVs iniciais
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Tentar carregar do localStorage primeiro para persistência real
        const savedTasks = localStorage.getItem('muitomaisquedados_tasks');
        const savedWs = localStorage.getItem('muitomaisquedados_workspaces');
        const savedTeam = localStorage.getItem('muitomaisquedados_team');

        if (savedTasks && savedWs && savedTeam) {
          setTasks(JSON.parse(savedTasks));
          setWorkspaces(JSON.parse(savedWs));
          setTeam(JSON.parse(savedTeam));
          setActiveWorkspace('Todos Projetos');
          setIsLoading(false);
          return;
        }

        // Se não houver no localStorage, carregar dos CSVs
        const tasksRes = await fetch('/data/tasks.csv');
        const tasksText = await tasksRes.text();
        const parsedTasks = Papa.parse(tasksText, { header: true, dynamicTyping: true }).data
          .filter(t => t.id)
          .map(t => {
            const isPersonal = t.isPersonal === true || t.isPersonal === 'true';
            const isOngoing = t.isOngoing === true || t.isOngoing === 'true';
            const isFinished = t.status === 'Em Produção';
            const today = new Date().toISOString().split('T')[0];
            
            return {
              ...t,
              checklist: t.checklist ? JSON.parse(t.checklist) : [],
              isBlocked: t.isBlocked === true || t.isBlocked === 'true' || t.status === 'Incidente',
              blockReason: t.blockReason || (t.status === 'Incidente' ? 'Tarefa marcada como incidente crítico.' : ''),
              isPersonal: isPersonal,
              isOngoing: isOngoing,
              // Lógica de data automática para projetos pessoais ou em andamento não terminados
              date: ((isPersonal || isOngoing) && !isFinished) ? today : t.date
            };
          });
        
        const teamRes = await fetch('/data/team.csv');
        const teamText = await teamRes.text();
        const parsedTeam = Papa.parse(teamText, { header: true }).data.filter(m => m.id);

        const wsRes = await fetch('/data/workspaces.csv');
        const wsText = await wsRes.text();
        const parsedWs = Papa.parse(wsText, { header: true }).data.map(w => w.name).filter(Boolean);

        setTasks(parsedTasks);
        setTeam(parsedTeam);
        setWorkspaces(parsedWs);
        setActiveWorkspace('Todos Projetos');
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Sincronizar com localStorage sempre que houver mudanças
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('muitomaisquedados_tasks', JSON.stringify(tasks));
      localStorage.setItem('muitomaisquedados_workspaces', JSON.stringify(workspaces));
      localStorage.setItem('muitomaisquedados_team', JSON.stringify(team));
    }
  }, [tasks, workspaces, team, isLoading]);

  // Mover tarefa entre colunas (Kanban)
  const handleTaskMove = (taskId, newStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const handleQuickAdd = (status) => {
    const newTask = {
      id: Math.floor(Math.random() * 10000),
      name: "Novo Ticket Rápido",
      group: activeWorkspace || workspaces[0],
      status: status,
      priority: "Média",
      owner: user?.name,
      startDate: new Date().toISOString().split('T')[0],
      date: new Date().toISOString().split('T')[0],
      description: "",
      env: "Dev"
    };
    setTasks([newTask, ...tasks]);
    setSelectedTask(newTask);
  };

  const handleBugReport = (report) => {
    const newBug = {
      ...report,
      id: Math.floor(Math.random() * 10000),
      group: activeWorkspace === 'Todos Projetos' ? (workspaces[0] || 'DEVOPS & INFRA') : activeWorkspace,
      owner: user?.name,
      startDate: new Date().toISOString().split('T')[0],
      date: new Date().toISOString().split('T')[0],
      env: "Prod"
    };
    setTasks([newBug, ...tasks]);
  };

  // Exclusão de tarefa
  const handleDeleteTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    setSelectedTask(null);
  };

  // Exportação/Persistência via CSV
  const exportToCSV = () => {
    const tasksToExport = tasks.map(t => ({
      ...t,
      checklist: JSON.stringify(t.checklist || [])
    }));
    const csv = Papa.unparse(tasksToExport);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `syncsaas_database_backup_${new Date().getTime()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtro global com regra de privacidade (Somente meus dados ou Admin vê tudo)
  const filteredTasks = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return tasks.filter(task => {
      // 1. Regra de Privacidade/Visibilidade
      const isOwner = task.owner === user?.name;
      const canSeeTask = user?.isAdmin || isOwner;
      
      if (!canSeeTask) return false;

      // 2. Busca e Workspace
      const matchesSearch = !query || 
        task.name?.toLowerCase().includes(query) ||
        task.owner?.toLowerCase().includes(query) ||
        task.group?.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query) ||
        task.status?.toLowerCase().includes(query);
      
      const matchesWorkspace = activeWorkspace === 'Todos Projetos' || task.group === activeWorkspace;
      
      return matchesSearch && matchesWorkspace;
    });
  }, [tasks, searchQuery, activeWorkspace, user]);

  // Função para renderizar a view atual
  const renderView = () => {
    if (isLoading) return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

    switch (currentView) {
      case 'table': return <TableView tasks={filteredTasks} onTaskClick={setSelectedTask} />;
      case 'kanban': return (
        <KanbanView 
          tasks={filteredTasks} 
          onTaskClick={setSelectedTask} 
          onTaskMove={handleTaskMove}
          onQuickAdd={handleQuickAdd}
        />
      );
      case 'timeline': return (
        <TimelineView 
          tasks={filteredTasks} 
          onTaskClick={setSelectedTask}
          onTaskUpdate={(id, updates) => {
            setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
          }}
        />
      );
      case 'dashboard': return <DashboardView tasks={filteredTasks} team={team} />;
      case 'bugs': return <BugView tasks={filteredTasks} onReport={handleBugReport} />;
      case 'deadlines': return <DeadlineView tasks={filteredTasks} />;
      case 'requests': return <RequestView workspaces={workspaces} team={team} />;
      default: return <TableView tasks={filteredTasks} />;
    }
  };

  if (!user) {
    return (
      <AuthView 
        onLogin={(userData) => {
          setUser(userData);
          // Adicionar usuário à equipe se não existir
          setTeam(prev => {
            if (prev.find(m => m.name === userData.name)) return prev;
            return [...prev, { 
              id: Date.now(), 
              name: userData.name, 
              role: userData.level,
              avatar: userData.name.substring(0,2).toUpperCase()
            }];
          });
        }} 
      />
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        activeWorkspace={activeWorkspace} 
        setActiveWorkspace={setActiveWorkspace}
        currentView={currentView}
        setCurrentView={setCurrentView}
        workspaces={workspaces}
        user={user}
        onLogout={() => setUser(null)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          activeWorkspace={activeWorkspace}
          onNewTicket={() => setIsNewTaskModalOpen(true)}
          onExport={exportToCSV}
          tasks={tasks}
        />
        
        <main className="flex-1 overflow-auto p-6 scroll-smooth">
          <div className="max-w-[1600px] mx-auto">
            {renderView()}
          </div>
        </main>
      </div>

      {selectedTask && (
        <TaskDetailPanel 
          task={selectedTask} 
          workspaces={workspaces}
          team={team}
          currentUser={user}
          onWorkspacesChange={setWorkspaces}
          onClose={() => setSelectedTask(null)} 
          onSave={(updatedTask) => {
            setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
            setSelectedTask(null);
          }}
          onDelete={handleDeleteTask}
        />
      )}

      <NewTaskModal 
        isOpen={isNewTaskModalOpen} 
        workspaces={workspaces}
        team={team}
        onWorkspacesChange={setWorkspaces}
        onClose={() => setIsNewTaskModalOpen(false)}
        onAdd={(newTask) => setTasks([newTask, ...tasks])}
        currentUser={user}
      />
    </div>
  );
}
